/* global React */
// Sections part 1: Hero (3 treatments), Now Playing, About, Work, Stack, Process

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// HERO — three treatments (classic / fillscreen / runner)
// ─────────────────────────────────────────────────────────────
const HeroClassic = ({ data, glitchWord }) => (
  <>
    <div className="h-classic-headline">
      <h1>
        <span className="l1">{data.identity.name}.</span>
        <span className="l2">
          Engineer of <span className="ks-rgb" data-text={glitchWord} key={glitchWord} style={{ fontStyle: "italic", fontWeight: 700, color: "var(--ink)" }}>{glitchWord}</span> systems.
        </span>
      </h1>
    </div>
    <div className="h-classic-side">
      <div className="ks-side-block">
        <div className="ks-mini-l">Status</div>
        <div className="ks-side-v"><span className="ks-pulse"/>{data.identity.status}</div>
      </div>
      <div className="ks-side-block">
        <div className="ks-mini-l">Currently</div>
        <div className="ks-side-v">M.Sc. Big Data &amp; AI · SRH Berlin</div>
      </div>
      <div className="ks-side-block">
        <div className="ks-mini-l">Languages</div>
        <div className="ks-side-v">EN C2 · DE B1</div>
      </div>
    </div>
    <div className="h-classic-deck">
      <p>{data.identity.bio_short}</p>
      <div className="ks-cta">
        <a href={`mailto:${data.contact.email}`} className="ks-btn ks-btn-primary">Get in touch <span>↗</span></a>
        <a href="#work" className="ks-btn">Index of work</a>
      </div>
    </div>
    <div className="h-classic-stats">
      {data.metrics.map((m, i) => (
        <div className="ks-stat" key={i}>
          <div className="ks-stat-v">{m.value}</div>
          <div className="ks-stat-l">{m.label}</div>
        </div>
      ))}
    </div>
  </>
);

const HeroFill = ({ data }) => (
  <div className="h-fill-frame">
    <h1 className="h-fill-name">
      <span>Kaustubh</span>
      <span className="surname">Salunke.</span>
    </h1>
    <div className="h-fill-meta">
      <div><span>Role</span><b>AI / ML Engineer</b></div>
      <div><span>Location</span><b>Berlin · DE</b></div>
      <div><span>Status</span><b>Open</b></div>
      <div><span>Index</span><b>vol. 1</b></div>
      <div><span>Year</span><b>2026</b></div>
    </div>
    <div className="h-fill-foot">
      <p className="h-fill-deck">{data.identity.bio_short}</p>
      <div className="ks-cta">
        <a href={`mailto:${data.contact.email}`} className="ks-btn ks-btn-primary">Get in touch <span>↗</span></a>
        <a href="#work" className="ks-btn">Index of work</a>
      </div>
    </div>
  </div>
);

const HeroRunner = ({ data }) => {
  const lines = useMemo(() => ([
    "$ whoami",
    "kaustubh — ai/ml engineer, berlin",
    "$ open --resume",
    "→ 2+ years at accenture · 20% pipeline speedup · ace award",
    "$ ls projects/",
    "agentic-rag/  multi-agent-research/  pizza-agent/  neural-stocks/",
    "$ cat status",
    "open to ai/ml engineer & data scientist roles · berlin / remote",
    "$ ▮"
  ]), []);
  const [shown, setShown] = useState(0);
  const [partial, setPartial] = useState("");

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const ln = lines[i];
        for (let c = 0; c <= ln.length; c++) {
          if (cancelled) return;
          setPartial(ln.slice(0, c));
          await new Promise(r => setTimeout(r, ln.startsWith("$") ? 28 : 14));
        }
        setShown(i + 1);
        setPartial("");
        await new Promise(r => setTimeout(r, 220));
      }
    };
    run();
    return () => { cancelled = true; };
  }, [lines]);

  return (
    <>
      <div className="h-runner-left">
        <h1>{data.identity.name}.<br/>Engineer of production systems.</h1>
        <div className="h-runner-term">
          {lines.slice(0, shown).map((ln, i) => (
            <span key={i} className="ln">{ln.startsWith("$") ? ln : <em>{ln}</em>}</span>
          ))}
          {shown < lines.length && <span className="ln">{partial}<span className="cur"/></span>}
        </div>
      </div>
      <div className="h-runner-right">
        <div className="h-runner-card">
          <div className="ks-mini-l">Status</div>
          <div className="ks-side-v" style={{ fontSize: 16 }}>
            <span className="ks-pulse"/>{data.identity.status}
          </div>
        </div>
        <div className="h-runner-card" style={{ padding: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {data.metrics.map((m, i) => (
              <div key={i} style={{
                padding: "14px 16px",
                borderRight: i % 2 === 0 ? "1px solid var(--ink)" : 0,
                borderBottom: i < 2 ? "1px solid var(--ink)" : 0
              }}>
                <div style={{ fontFamily: "var(--font-d)", fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontFamily: "var(--font-m)", fontSize: 10.5, color: "var(--ink-muted)", marginTop: 6 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-runner-card">
          <div className="ks-cta">
            <a href={`mailto:${data.contact.email}`} className="ks-btn ks-btn-primary">Get in touch <span>↗</span></a>
            <a href="#work" className="ks-btn">Work</a>
          </div>
        </div>
      </div>
    </>
  );
};

const Hero = ({ data, hero, glitchWord, clock }) => {
  return (
    <header className="ks-hero" data-hero={hero} id="top">
      <div className="ks-grid">
        <div className="ks-meta-row">
          <span><b>01</b> Index of work</span>
          <span><b>02</b> Berlin · {clock} CET</span>
          <span><b>03</b> 2026 / vol.1</span>
          <span style={{ marginLeft: "auto" }}><b>↑</b> scroll to read</span>
        </div>
        <div className="h-classic"><HeroClassic data={data} glitchWord={glitchWord}/></div>
        <div className="h-fill"><HeroFill data={data}/></div>
        <div className="h-runner"><HeroRunner data={data}/></div>
      </div>
    </header>
  );
};

// ─────────────────────────────────────────────────────────────
// NOW PLAYING
// ─────────────────────────────────────────────────────────────
const NowPlaying = ({ data }) => {
  const np = data.now_playing;
  return (
    <section className="ks-section" id="now">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">01</div>
          <window.ScrambleH text="Now playing" as="h2"/>
          <div className="ks-sec-meta">last updated {np.updated}</div>
        </div>
        <div className="np-grid">
          {np.items.map((it, i) => (
            <div className="np-cell" key={i}>
              <div className="np-kind"><span className="dot"/>{it.label}</div>
              <div className="np-text">{it.text}</div>
              <div className="np-meta">{it.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────
const About = ({ data }) => {
  return (
    <section className="ks-section" id="about">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">02</div>
          <window.ScrambleH text="About" as="h2"/>
        </div>
        <div className="kab-bio">
          {data.identity.bio_long.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <aside className="kab-aside">
          <div className="ks-mini-l">Fact sheet</div>
          <ul>
            <li><span>Based</span><b>{data.identity.location}</b></li>
            <li><span>Years shipping ML</span><b>2+</b></li>
            <li><span>Awards</span><b>Accenture ACE</b></li>
            <li><span>Education</span><b>M.Sc. Big Data &amp; AI</b></li>
            <li><span>Available</span><b>Immediate</b></li>
            <li><span>Pronouns</span><b>he / him</b></li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// WORK — projects with expand-in-place rows
// ─────────────────────────────────────────────────────────────
const Work = ({ data }) => {
  const [open, setOpen] = useState(null);
  return (
    <section className="ks-section" id="work">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">03</div>
          <window.ScrambleH text="Index of work" as="h2"/>
          <div className="ks-sec-meta">{data.projects.length} entries</div>
        </div>
        <div className="kw-list">
          {data.projects.map((p, i) => (
            <div className={"kw-row" + (open === p.slug ? " is-open" : "")} key={p.slug}>
              <div className="kw-row-h" onClick={() => setOpen(open === p.slug ? null : p.slug)}>
                <div className="kw-num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="kw-title">{p.title}</div>
                  <div className="kw-summary">{p.summary}</div>
                </div>
                <div className="kw-tag">{p.tag}</div>
                <div className="kw-year">{p.year}</div>
                <div className="kw-toggle">+</div>
              </div>
              <div className="kw-row-body">
                <div>
                  <div className="kw-body-grid">
                    <div>
                      <p className="kw-desc">{p.desc}</p>
                      <div className="kw-stack">
                        {p.stack.map((s, k) => <span key={k}>{s}</span>)}
                      </div>
                      <div className="kw-arch">
                        {p.architecture.map((a, k) => (
                          <React.Fragment key={k}>
                            <span>{a}</span>
                            {k < p.architecture.length - 1 && <i>→</i>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="kw-hl">
                        {p.highlights.map((h, k) => (
                          <div key={k}><span>{h.k}</span><b>{h.v}</b></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// STACK — grouped chips by category, no frequency bars
// ─────────────────────────────────────────────────────────────
const Stack = ({ data }) => {
  // Group items by their `group` field, preserving first-seen order.
  const groups = React.useMemo(() => {
    const m = new Map();
    data.stack_visual.forEach(row => {
      if (!m.has(row.group)) m.set(row.group, []);
      m.get(row.group).push(row);
    });
    return Array.from(m, ([group, items]) => ({ group, items }));
  }, [data.stack_visual]);

  return (
    <section className="ks-section" id="stack">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">04</div>
          <window.ScrambleH text="Stack" as="h2"/>
          <div className="ks-sec-meta">tools, by category</div>
        </div>
        <div className="ks-stack-frame">
          {groups.map((g, i) => (
            <div className="ks-stack-group" key={i}>
              <div className="ks-stack-glabel">
                <span className="ks-stack-gnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="ks-stack-gname">{g.group}</span>
                <span className="ks-stack-gcount">{g.items.length}</span>
              </div>
              <div className="ks-stack-items">
                {g.items.map((it, k) => (
                  <span className="ks-stack-chip" key={k}>
                    <b>{it.name}</b>
                    <i>{it.recency}</i>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// PROCESS — 5 steps with mini SVG diagrams
// ─────────────────────────────────────────────────────────────
const ProcessIcon = ({ n }) => {
  // simple geometric, line-only, ink-only, swiss
  const icons = {
    "01": <svg viewBox="0 0 80 56" className="kp-svg"><rect x="10" y="10" width="60" height="36"/><line x1="10" y1="22" x2="70" y2="22"/><circle cx="18" cy="16" r="1.5" className="fill"/></svg>,
    "02": <svg viewBox="0 0 80 56" className="kp-svg"><line x1="10" y1="46" x2="70" y2="46"/><rect x="14" y="32" width="10" height="14"/><rect x="30" y="22" width="10" height="24"/><rect x="46" y="14" width="10" height="32"/><line x1="62" y1="10" x2="62" y2="46" strokeDasharray="2 3"/></svg>,
    "03": <svg viewBox="0 0 80 56" className="kp-svg"><circle cx="20" cy="28" r="8"/><circle cx="40" cy="28" r="8"/><circle cx="60" cy="28" r="8"/><line x1="28" y1="28" x2="32" y2="28"/><line x1="48" y1="28" x2="52" y2="28"/></svg>,
    "04": <svg viewBox="0 0 80 56" className="kp-svg"><polyline points="10,40 25,28 40,32 55,18 70,22"/><circle cx="25" cy="28" r="2" className="fill"/><circle cx="40" cy="32" r="2" className="fill"/><circle cx="55" cy="18" r="2" className="fill"/><line x1="10" y1="46" x2="70" y2="46"/></svg>,
    "05": <svg viewBox="0 0 80 56" className="kp-svg"><path d="M 14 34 L 14 22 L 24 16 L 40 16 L 40 40 L 24 40 Z"/><line x1="40" y1="28" x2="56" y2="28"/><polygon points="56,24 64,28 56,32" className="fill"/></svg>
  };
  return icons[n] || null;
};
const Process = ({ data }) => {
  return (
    <section className="ks-section" id="process">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">05</div>
          <window.ScrambleH text="Process" as="h2"/>
          <div className="ks-sec-meta">how I actually work</div>
        </div>
        <div className="ks-process">
          {data.process.map((s, i) => (
            <div className="kp-step" key={i}>
              <div className="kp-num">{s.n}</div>
              <ProcessIcon n={s.n}/>
              <div className="kp-title">{s.title}</div>
              <div className="kp-blurb">{s.blurb}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Hero, NowPlaying, About, Work, Stack, Process });
