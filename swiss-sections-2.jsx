/* global React */
// Sections part 2: Writing, Talks, Lab (with 4 interactive demos), Testimonials, Specimens, Career, Contact

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// WRITING
// ─────────────────────────────────────────────────────────────
const Writing = ({ data }) => {
  return (
    <section className="ks-section" id="writing">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">06</div>
          <window.ScrambleH text="Writing" as="h2"/>
          <div className="ks-sec-meta">{data.writing.length} posts</div>
        </div>
        <div className="kr-list">
          {data.writing.map((p, i) => (
            <a className="kr-row ks-link" key={i} href={"#post-" + p.slug}>
              <div className="kr-date">{p.date}</div>
              <div className="kr-title">{p.title}</div>
              <div className="kr-ex">{p.excerpt}</div>
              <div className="kr-tag">{p.tag}</div>
              <div className="kr-read">{p.read}</div>
              <div className="kr-arrow">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// TALKS & PRESS
// ─────────────────────────────────────────────────────────────
const Talks = ({ data }) => {
  return (
    <section className="ks-section" id="talks">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">07</div>
          <window.ScrambleH text="Talks &amp; press" as="h2"/>
          <div className="ks-sec-meta">● delivered  ○ available</div>
        </div>
        <div className="kt-list">
          {data.talks.map((t, i) => (
            <div className="kt-row" key={i}>
              <div className="kt-date">{t.date}</div>
              <div>
                <div className="kt-title">{t.title}</div>
              </div>
              <div className="kt-venue">{t.venue}</div>
              <div className={"kt-status " + t.status}>{t.kind} · {t.status}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// LAB — 4 small interactive demos
// ─────────────────────────────────────────────────────────────

// 1. Tokenizer (very rough BPE-flavored split)
const LabTokenizer = () => {
  const [v, setV] = useState("Production-grade agentic RAG with hybrid retrieval");
  const tokens = useMemo(() => {
    // crude: split on whitespace + camel/punct, then break long words
    const raw = v.split(/(\s+|[.,!?;:()\-\/])/).filter(Boolean);
    const out = [];
    for (const w of raw) {
      if (w.length <= 6) { out.push(w); continue; }
      // chunk every 4-5 chars, swap occasional ▁ to feel BPE-y
      let i = 0;
      while (i < w.length) {
        const len = i === 0 ? Math.min(w.length, 5) : Math.min(w.length - i, 4);
        out.push((i === 0 ? "" : "##") + w.slice(i, i + len));
        i += len;
      }
    }
    return out;
  }, [v]);
  const charCount = v.length;
  const tokCount = tokens.filter(t => !/^\s+$/.test(t)).length;
  return (
    <div className="kl-cell lab-tok">
      <div className="kl-h"><span className="kl-num">L01</span><h3>Tokenizer (toy)</h3></div>
      <div className="kl-blurb">Type something. See a rough BPE-flavored split. Real tokenizers are smarter; this gives the shape.</div>
      <input value={v} onChange={e => setV(e.target.value)} placeholder="type to tokenize"/>
      <div className="lab-tok-out">
        {tokens.map((t, i) => /^\s+$/.test(t) ? null : <span key={i}>{t}</span>)}
      </div>
      <div className="lab-tok-stat">
        <span>chars: {charCount}</span>
        <span>tokens: {tokCount}</span>
        <span>ratio: {charCount ? (charCount / Math.max(1, tokCount)).toFixed(2) : "—"}</span>
      </div>
    </div>
  );
};

// 2. Embedding viz — 2D scatter, click chips to highlight cluster
const LabEmbedding = () => {
  const canvasRef = useRef(null);
  const [active, setActive] = useState("agents");
  const clusters = useMemo(() => ({
    agents: { label: "agents", color: 0, points: [
      ["LangGraph", .3, .35], ["MCP", .22, .42], ["state machine", .35, .28],
      ["self-correct", .28, .50], ["reflect", .40, .48]
    ]},
    retrieval: { label: "retrieval", color: 1, points: [
      ["BM25", .68, .72], ["ChromaDB", .72, .65], ["RRF", .78, .78],
      ["rerank", .80, .68], ["FAISS", .65, .80]
    ]},
    eval: { label: "evaluation", color: 2, points: [
      ["RAGAS", .50, .15], ["faithfulness", .58, .22], ["pytest", .42, .12], ["eval harness", .55, .08]
    ]},
    backend: { label: "backend", color: 3, points: [
      ["FastAPI", .15, .82], ["SSE", .22, .76], ["Pydantic", .10, .72], ["Docker", .25, .88]
    ]}
  }), []);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const w = c.clientWidth, h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    const ctx = c.getContext("2d"); ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    // grid
    ctx.strokeStyle = "rgba(10,10,10,.06)"; ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo((w/10)*i, 0); ctx.lineTo((w/10)*i, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, (h/10)*i); ctx.lineTo(w, (h/10)*i); ctx.stroke();
    }
    // points
    Object.entries(clusters).forEach(([key, c0]) => {
      const isActive = key === active;
      c0.points.forEach(([label, x, y]) => {
        const px = x * w, py = y * h;
        ctx.fillStyle = isActive ? "#0a0a0a" : "rgba(10,10,10,.18)";
        ctx.beginPath(); ctx.arc(px, py, isActive ? 5 : 3, 0, Math.PI * 2); ctx.fill();
        if (isActive) {
          ctx.fillStyle = "#0a0a0a"; ctx.font = "11px JetBrains Mono, monospace";
          ctx.fillText(label, px + 8, py + 3);
        }
      });
      // hull-ish circle around active
      if (isActive) {
        const cx = c0.points.reduce((s, p) => s + p[1], 0) / c0.points.length * w;
        const cy = c0.points.reduce((s, p) => s + p[2], 0) / c0.points.length * h;
        ctx.strokeStyle = "rgba(10,10,10,.5)"; ctx.setLineDash([3, 4]);
        ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  }, [active, clusters]);
  return (
    <div className="kl-cell">
      <div className="kl-h"><span className="kl-num">L02</span><h3>Embedding space (mock)</h3></div>
      <div className="kl-blurb">Stand-in for a 2D projection. Click a cluster to highlight related concepts in the latent space.</div>
      <canvas ref={canvasRef} className="lab-emb-canvas"/>
      <div className="lab-emb-controls">
        {Object.entries(clusters).map(([key, c0]) => (
          <button key={key} className={"lab-chip" + (key === active ? " is-on" : "")} onClick={() => setActive(key)}>{c0.label}</button>
        ))}
      </div>
    </div>
  );
};

// 3. RAG sandbox — step through agentic flow
const LabRAG = () => {
  const steps = [
    { stage: "router",       detail: "decides between vector / web / sql" },
    { stage: "query_rewrite",detail: "expands & decomposes the user query" },
    { stage: "retrieve",     detail: "ChromaDB top-20 + BM25 top-20 → RRF" },
    { stage: "rerank",       detail: "cross-encoder, keep top-5" },
    { stage: "grade",        detail: "are the docs actually relevant?" },
    { stage: "web_fallback", detail: "if not: Tavily search, redo retrieval" },
    { stage: "generate",     detail: "answer with citations, structured output" },
    { stage: "reflect",      detail: "OutputGuard: faithful? safe? else loop" }
  ];
  const [i, setI] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      if (i < steps.length - 1) setI(i + 1);
      else setRunning(false);
    }, 700);
    return () => clearTimeout(t);
  }, [running, i, steps.length]);
  return (
    <div className="kl-cell">
      <div className="kl-h"><span className="kl-num">L03</span><h3>Agentic RAG, stepped</h3></div>
      <div className="kl-blurb">The state machine, one transition at a time. Run, or click steps to inspect.</div>
      <div>
        {steps.map((s, k) => (
          <div className={"lab-rag-step" + (k === i ? " is-current" : "")} key={k} onClick={() => { setI(k); setRunning(false); }} style={{ cursor: "pointer" }}>
            <b>{String(k + 1).padStart(2, "0")}</b>
            <div>
              <div className="stage">{s.stage}</div>
              <div className="detail">{s.detail}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="lab-rag-bar">
        <button className="ks-btn" onClick={() => { setI(0); setRunning(true); }}>{running ? "Running…" : "Run"}</button>
        <button className="ks-btn" onClick={() => { setI(0); setRunning(false); }}>Reset</button>
      </div>
    </div>
  );
};

// 4. Latency lab — animated p50/p95
const LabLatency = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick(t => t + 1), 1200);
    return () => clearInterval(i);
  }, []);
  // generate 12 points with a slow drift
  const points = useMemo(() => {
    const r = (s) => { let x = Math.sin(s * 9999) * 10000; return x - Math.floor(x); };
    return Array.from({ length: 12 }, (_, k) => {
      const seed = (tick + k);
      return { p50: 240 + r(seed) * 60, p95: 420 + r(seed * 1.3) * 110 };
    });
  }, [tick]);
  const W = 100, H = 100;
  const path = (key) => {
    return points.map((p, i) => {
      const x = (i / (points.length - 1)) * W;
      const y = H - ((p[key] - 200) / 400) * H;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");
  };
  const last = points[points.length - 1];
  return (
    <div className="kl-cell">
      <div className="kl-h"><span className="kl-num">L04</span><h3>Latency, live-ish</h3></div>
      <div className="kl-blurb">Mocked p50/p95 trace. The kind of chart you actually look at when something's wrong in production.</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="lab-lat-svg" preserveAspectRatio="none">
        <line x1="0" y1={H} x2={W} y2={H} className="axis"/>
        <line x1="0" y1="0" x2="0" y2={H} className="axis"/>
        <path d={path("p95")} className="line" strokeDasharray="2 2"/>
        <path d={path("p50")} className="line"/>
      </svg>
      <div className="lab-lat-cap">
        <span>— p50 {last.p50.toFixed(0)}ms</span>
        <span>-- p95 {last.p95.toFixed(0)}ms</span>
        <span>updated {tick}s ago</span>
      </div>
    </div>
  );
};

const Lab = () => {
  return (
    <section className="ks-section" id="lab">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">08</div>
          <window.ScrambleH text="Lab" as="h2"/>
          <div className="ks-sec-meta">small interactive demos</div>
        </div>
        <div className="kl-grid">
          <LabTokenizer/>
          <LabEmbedding/>
          <LabRAG/>
          <LabLatency/>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────
const Testimonials = ({ data }) => {
  return (
    <section className="ks-section" id="testimonials">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">09</div>
          <window.ScrambleH text="Words from colleagues" as="h2"/>
        </div>
        <div className="kts-grid">
          {data.testimonials.map((t, i) => (
            <div className={"kts-cell" + (t.placeholder ? " is-placeholder" : "")} key={i}>
              <div className="kts-q">{t.quote}</div>
              <div className="kts-a">
                <b>{t.who}</b>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// SPECIMENS
// ─────────────────────────────────────────────────────────────
const Specimens = () => {
  return (
    <section className="ks-section" id="specimens">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">10</div>
          <window.ScrambleH text="Specimens" as="h2"/>
          <div className="ks-sec-meta">type · grid · color</div>
        </div>
        <div className="ksp-grid">
          <div className="ksp-cell">
            <h4>Type · display</h4>
            <div className="ksp-type-display">Aa Bb 01</div>
            <div className="ksp-type-h1">Helvetica Neue 700</div>
            <div className="ksp-type-h2">Inter Tight 600</div>
            <div className="ksp-type-body">Helvetica / Inter body — designed to be read at length, not skimmed in a hero.</div>
            <div className="ksp-type-mono">JetBrains Mono — labels, code, metadata</div>
          </div>
          <div className="ksp-cell">
            <h4>Grid · 12 cols</h4>
            <div className="ksp-grid-demo">
              {Array.from({ length: 12 }).map((_, i) => <div key={i}/>)}
            </div>
            <div className="ksp-type-mono">max-width 1320 · gap 16 · pad 32 · ruled to 1px</div>
            <div className="ksp-type-body" style={{ fontSize: 13 }}>
              Every section sits on the same grid. Sub-grids only break when content demands; the rest of the time the column rhythm carries.
            </div>
          </div>
          <div className="ksp-cell">
            <h4>Color · ink only</h4>
            <div className="ksp-color-row">
              <div style={{ background: "#0a0a0a" }}/>
              <div style={{ background: "#404040" }}/>
              <div style={{ background: "#6a6a66" }}/>
            </div>
            <div className="ksp-color-row">
              <div style={{ background: "#9a9a96" }}/>
              <div style={{ background: "#d8d8d2" }}/>
              <div style={{ background: "#f4f4f1" }}/>
            </div>
            <div className="ksp-type-mono" style={{ marginTop: 12 }}>
              No accent. The grid does the work the color usually does. If you must signal, use weight, scale, or position.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// CAREER
// ─────────────────────────────────────────────────────────────
const Career = ({ data }) => {
  return (
    <section className="ks-section" id="career">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">11</div>
          <window.ScrambleH text="Career" as="h2"/>
        </div>
        <div className="kc-list">
          {data.experience.map((j, i) => (
            <article className="kc-job" key={i}>
              <div className="kc-date">{j.date}</div>
              <div>
                <h3>{j.role} <em>at {j.company}</em></h3>
                <div className="kc-sub">{j.sub} · {j.location}</div>
                <ul>{j.bullets.map((b, k) => <li key={k}>{b}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
        <div className="kc-edu-cert">
          <div>
            <div className="ks-mini-l">Education</div>
            {data.education.map((e, i) => (
              <div className="kc-edu" key={i}>
                <div className="kc-edu-h">{e.school}</div>
                <div className="kc-edu-d">{e.degree}</div>
                <div className="kc-edu-m">{e.grade} · {e.date}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="ks-mini-l">Certifications · {data.certifications.length}</div>
            <div className="kc-cert">
              {data.certifications.map((c, i) => (
                <div className="kc-cert-cell" key={i}>
                  <span>{c.code}</span>
                  <div>
                    <div className="kc-cert-n">{c.name}</div>
                    <div className="kc-cert-i">{c.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────
const Contact = ({ data }) => {
  return (
    <section className="ks-section" id="contact">
      <div className="ks-grid">
        <div className="ks-sec-h">
          <div className="ks-sec-num">12</div>
          <window.ScrambleH text="Contact" as="h2"/>
        </div>
        <div className="kx-grid">
          <a href={`mailto:${data.contact.email}`} className="ks-link"><span>Email</span><b>{data.contact.email}</b></a>
          <a href={data.contact.linkedin.url} target="_blank" rel="noopener" className="ks-link"><span>LinkedIn</span><b>{data.contact.linkedin.label}</b></a>
          <a href={data.contact.github.url} target="_blank" rel="noopener" className="ks-link"><span>GitHub</span><b>{data.contact.github.label}</b></a>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Writing, Talks, Lab, Testimonials, Specimens, Career, Contact });
