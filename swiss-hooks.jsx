/* global React */
// Hooks shared across the standalone Swiss site.
// - useScramble: reveal-on-enter scramble decode for headings/text
// - useReveal: IntersectionObserver helper that toggles `is-revealed`
// - useScrollProgress: 0..1 progress through the page
// - useSectionTracker: which section anchor is most in view
// - useClock: ticking Berlin time

const { useState, useEffect, useRef, useCallback, useMemo } = React;

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+-/<>?";

// useScramble — pass a target string + a `start` flag. Returns the current
// transitional string. Each character settles after a short random delay.
function useScramble(target, start, opts = {}) {
  const { speed = 30, settleDelay = 6 } = opts;
  const [out, setOut] = useState(target);
  const rafRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    if (!start) { setOut(target); return; }

    const len = target.length;
    const queue = Array.from({ length: len }, (_, i) => ({
      from: SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
      to: target[i],
      start: Math.floor(Math.random() * settleDelay),
      end: settleDelay + Math.floor(Math.random() * 18) + i * 0.6
    }));
    stateRef.current = { tick: 0, queue };

    const step = () => {
      const s = stateRef.current;
      s.tick += 1;
      let done = 0;
      const chars = s.queue.map(q => {
        if (s.tick < q.start) return " ";
        if (s.tick > q.end)   { done++; return q.to; }
        // 28% chance to refresh the random char
        if (Math.random() < 0.28) {
          q.from = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        return q.from;
      });
      setOut(chars.join(""));
      if (done < len) {
        rafRef.current = setTimeout(step, 1000 / speed);
      }
    };
    step();
    return () => clearTimeout(rafRef.current);
  }, [target, start, speed, settleDelay]);

  return out;
}

// useReveal — observe a ref; toggle `is-revealed` on the element when it
// enters the viewport. Returns the ref to attach.
function useReveal(opts = {}) {
  const { threshold = 0.18, once = true } = opts;
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add("is-revealed");
          setRevealed(true);
          if (once) io.unobserve(el);
        } else if (!once) {
          el.classList.remove("is-revealed");
          setRevealed(false);
        }
      });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return [ref, revealed];
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    return () => { window.removeEventListener("scroll", fn); window.removeEventListener("resize", fn); };
  }, []);
  return p;
}

function useSectionTracker(ids) {
  const [current, setCurrent] = useState(ids[0]);
  useEffect(() => {
    const fn = () => {
      const top = window.scrollY + window.innerHeight * 0.35;
      let best = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= top) best = id;
      }
      setCurrent(best);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    return () => { window.removeEventListener("scroll", fn); window.removeEventListener("resize", fn); };
  }, [ids.join("|")]);
  return current;
}

function useClock(tz = "Europe/Berlin") {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const i = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  const formatted = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false
      }).format(t);
    } catch { return "—"; }
  }, [t, tz]);
  return formatted;
}

// Reusable scramble heading component
function ScrambleH({ text, as = "h2", className = "", ...rest }) {
  const [ref, revealed] = useReveal({ threshold: 0.4 });
  const out = useScramble(text, revealed, { speed: 60, settleDelay: 4 });
  const Tag = as;
  return <Tag ref={ref} className={className + " ks-scramble"} {...rest}>{out}</Tag>;
}

// Reveal wrapper — adds `ks-reveal` & toggles `is-revealed` on enter
function Reveal({ as = "div", className = "", children, threshold = 0.18, ...rest }) {
  const [ref] = useReveal({ threshold });
  const Tag = as;
  return <Tag ref={ref} className={"ks-reveal " + className} {...rest}>{children}</Tag>;
}

Object.assign(window, { useScramble, useReveal, useScrollProgress, useSectionTracker, useClock, ScrambleH, Reveal });
