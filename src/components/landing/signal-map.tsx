"use client";

// Abstract trade-corridor network — not a literal geographic map. Nodes sit on
// a stylized grid; a handful pulse to represent actively-tracked corridors.
// This is the hero's one orchestrated motion moment: motion is spent in one
// place, not scattered across every element.

const NODES = [
  { id: "tanger", x: 60, y: 150, label: "Tanger Med", pulse: true, color: "#3987e5" },
  { id: "gibraltar", x: 95, y: 130, label: undefined, pulse: false, color: "#3987e5" },
  { id: "suez", x: 230, y: 165, label: "Suez", pulse: true, color: "#d95926" },
  { id: "rotterdam", x: 150, y: 55, label: "Rotterdam", pulse: false, color: "#3987e5" },
  { id: "shanghai", x: 400, y: 90, label: "Shanghai", pulse: true, color: "#199e70" },
  { id: "capeofgoodhope", x: 160, y: 300, label: undefined, pulse: false, color: "#d95926" },
  { id: "casablanca", x: 50, y: 190, label: undefined, pulse: false, color: "#3987e5" },
  { id: "singapore", x: 370, y: 190, label: "Singapore", pulse: false, color: "#199e70" },
  { id: "newyork", x: 10, y: 60, label: undefined, pulse: false, color: "#3987e5" },
];

const EDGES: [string, string][] = [
  ["newyork", "tanger"],
  ["tanger", "gibraltar"],
  ["gibraltar", "rotterdam"],
  ["tanger", "casablanca"],
  ["gibraltar", "suez"],
  ["suez", "singapore"],
  ["singapore", "shanghai"],
  ["suez", "capeofgoodhope"],
  ["capeofgoodhope", "tanger"],
];

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function SignalMap() {
  return (
    <svg
      viewBox="0 0 440 340"
      className="h-full w-full"
      role="img"
      aria-label="Stylized map of monitored trade corridors with active signal nodes"
    >
      <defs>
        <radialGradient id="nodeGlowCyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3987e5" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3987e5" stopOpacity="0" />
        </radialGradient>
      </defs>

      {EDGES.map(([a, b], i) => {
        const na = nodeById(a);
        const nb = nodeById(b);
        const mx = (na.x + nb.x) / 2;
        const my = (na.y + nb.y) / 2 - 18;
        return (
          <path
            key={i}
            d={`M ${na.x} ${na.y} Q ${mx} ${my} ${nb.x} ${nb.y}`}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
          />
        );
      })}

      {NODES.map((n) => (
        <g key={n.id}>
          {n.pulse && (
            <circle
              cx={n.x}
              cy={n.y}
              r={5}
              fill="none"
              stroke={n.color}
              strokeWidth={1.5}
              className="signal-ping"
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
          )}
          <circle cx={n.x} cy={n.y} r={n.pulse ? 4 : 2.5} fill={n.color} />
          {n.label && (
            <text
              x={n.x + 8}
              y={n.y + 3}
              fontSize={10}
              fontFamily="var(--font-mono)"
              fill="#a1a1aa"
            >
              {n.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
