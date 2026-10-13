import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

const sources = ["Website", "CRM", "Cloud", "SaaS", "Database", "Mobile", "Files"];
const stages = [
  { k: "Data", d: "Personal data enters from every system." },
  { k: "Relationships", d: "Currents connect subjects, assets and systems." },
  { k: "Privacy context", d: "Purpose, consent and ownership attach to each flow." },
  { k: "Risk", d: "Sensitivity, destination and volume qualify exposure." },
  { k: "Policy", d: "Applicable policy is evaluated in context." },
  { k: "Decision", d: "Each current is allowed, masked, reviewed or blocked." },
];
const outs = [
  { y: 110, label: "Allow", tone: "sky" },
  { y: 230, label: "Mask", tone: "purple" },
  { y: 350, label: "Review", tone: "purple" },
  { y: 450, label: "Block", tone: "risk" },
] as const;

const W = 1200, H = 540, LX = 600;
const srcY = (i: number) => 50 + i * 72;
const inPath = (i: number) => `M 0 ${srcY(i)} C 260 ${srcY(i)}, 380 ${230 + i * 14}, ${LX} ${230 + i * 14}`;
const outPath = (j: number, y0: number) => `M ${LX} ${y0} C 820 ${y0}, 900 ${outs[j]!.y}, ${W - 120} ${outs[j]!.y}`;

export function DataCurrentHero() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      setStage(5);
    }
  }, []);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setStage((s) => (s + 1) % stages.length), 2600);
    return () => clearInterval(t);
  }, [playing]);

  const toneStroke = (t: string) => (t === "risk" ? "stroke-risk" : t === "purple" ? "stroke-purple" : "stroke-sky");

  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-2xl border bg-background">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="hero-svg-title hero-svg-desc">
          <title id="hero-svg-title">Data Current Field</title>
          <desc id="hero-svg-desc">Seven data sources flow as currents through the PrivacySEK intelligence layer, which adds relationships, privacy context, risk and policy, and then routes each current to a decision: allow, mask, review or block.</desc>
          <defs>
            <linearGradient id="lens" x1="0" x2="1">
              <stop offset="0" stopColor="var(--soft-purple)" stopOpacity="0" />
              <stop offset="0.5" stopColor="var(--soft-purple)" stopOpacity="1" />
              <stop offset="1" stopColor="var(--soft-purple)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* intelligence layer spanning the environment */}
          <rect x={LX - 110} y="0" width="220" height={H} fill="url(#lens)" />
          <line x1={LX} x2={LX} y1="20" y2={H - 20} className="stroke-purple/30" strokeDasharray="2 6" />
          {sources.map((s, i) => (
            <g key={s}>
              <path id={`in-${i}`} d={inPath(i)} fill="none" className="stroke-sky/60" strokeWidth="1.6" />
              <path d={inPath(i)} fill="none" className="stroke-sky current-flow" strokeWidth="1.6" />
              <circle r="3.5" className="particle fill-blue">
                <animateMotion dur={`${4 + (i % 3)}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                  <mpath href={`#in-${i}`} />
                </animateMotion>
              </circle>
              <text x="14" y={srcY(i) - 10} className="fill-muted-foreground font-mono" fontSize="13">{s.toUpperCase()}</text>
            </g>
          ))}
          {/* relationships */}
          <g className={`transition-opacity duration-700 ${stage >= 1 ? "opacity-100" : "opacity-0"}`}>
            {[[1, 4], [2, 3], [0, 5], [4, 6]].map(([a, b]) => (
              <path key={`${a}-${b}`} d={`M 420 ${240 + a! * 12} Q 470 ${170 + (a! + b!) * 10}, 520 ${240 + b! * 12}`} fill="none" className="stroke-purple/50" strokeWidth="1" />
            ))}
            {[380, 470, 540].map((x, i) => <circle key={x} cx={x} cy={246 + i * 22} r="5" className="fill-background stroke-purple" strokeWidth="1.5" />)}
          </g>
          {/* context labels */}
          <g className={`transition-opacity duration-700 ${stage >= 2 ? "opacity-100" : "opacity-0"}`} fontSize="12">
            {["purpose: support", "consent: granted", "owner: CX"].map((l, i) => (
              <g key={l} transform={`translate(${LX - 96}, ${60 + i * 34})`}>
                <rect width="192" height="24" rx="12" className="fill-background stroke-purple/40" />
                <text x="12" y="16" className="fill-purple-deep font-mono">{l}</text>
              </g>
            ))}
          </g>
          {/* risk */}
          <g className={`transition-opacity duration-700 ${stage >= 3 ? "opacity-100" : "opacity-0"}`}>
            <circle cx={LX} cy="300" r="26" className="fill-soft-risk stroke-risk" strokeWidth="1.5" />
            <text x={LX} y="305" textAnchor="middle" fontSize="12" className="fill-foreground font-mono">HIGH</text>
            <text x={LX + 36} y="340" fontSize="12" className="fill-muted-foreground font-mono">sensitivity × destination</text>
          </g>
          {/* policy */}
          <g className={`transition-opacity duration-700 ${stage >= 4 ? "opacity-100" : "opacity-0"}`}>
            <rect x={LX - 70} y="440" width="140" height="30" rx="6" className="fill-purple" />
            <text x={LX} y="460" textAnchor="middle" fontSize="12" className="fill-primary-foreground font-mono">POLICY · Data protection and Enforcement</text>
          </g>
          {/* outputs */}
          {outs.map((o, j) => (
            <g key={o.label} className={`transition-opacity duration-700 ${stage >= 5 ? "opacity-100" : "opacity-25"}`}>
              <path id={`out-${j}`} d={outPath(j, 250 + j * 20)} fill="none" className={`${toneStroke(o.tone)} ${o.label === "Mask" ? "" : ""}`} strokeWidth="1.8" strokeDasharray={o.label === "Mask" ? "3 5" : undefined} />
              {o.label === "Block" ? (
                <g transform={`translate(${W - 120}, ${o.y})`} className="stroke-risk" strokeWidth="2.5">
                  <line x1="-8" y1="-8" x2="8" y2="8" /><line x1="8" y1="-8" x2="-8" y2="8" />
                </g>
              ) : (
                <circle cx={W - 120} cy={o.y} r="6" className={o.tone === "sky" ? "fill-sky" : "fill-purple"} />
              )}
              <text x={W - 100} y={o.y + 4} fontSize="13" className="fill-foreground font-mono font-medium">{o.label.toUpperCase()}</text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ol className="flex flex-wrap gap-1.5" aria-label="How PrivacySEK reads data">
          {stages.map((s, i) => (
            <li key={s.k}>
              <button
                onClick={() => { setPlaying(false); setStage(i); }}
                aria-current={stage === i ? "step" : undefined}
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${i <= stage ? "border-purple/50 bg-soft-purple text-purple-deep" : "text-muted-foreground"}`}
              >
                {s.k}
              </button>
            </li>
          ))}
        </ol>
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">{stages[stage]!.d}</p>
          <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause animation" : "Play animation"} className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border">
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
