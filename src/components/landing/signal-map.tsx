"use client";

// Abstract trade-corridor network — not a literal geographic map. Nodes sit
// on a stylized grid loosely ordered west-to-east (not projected to scale),
// representing 20 of the world's highest-volume container ports and
// strategic shipping chokepoints. A handful pulse to represent
// actively-tracked corridors. This is the hero area's one orchestrated
// motion moment: motion is spent in one place, not scattered everywhere.

const NODES = [
  // Americas
  { id: "la-longbeach", x: 30, y: 150, label: "Los Angeles–Long Beach", pulse: true, color: "#3987e5" },
  { id: "nyc-nj", x: 130, y: 95, label: "New York–New Jersey", pulse: false, color: "#3987e5" },
  { id: "panama", x: 150, y: 195, label: "Panama Canal", pulse: true, color: "#d95926" },
  { id: "santos", x: 230, y: 300, label: "Santos", pulse: false, color: "#199e70" },
  // Europe / Mediterranean
  { id: "rotterdam", x: 345, y: 70, label: "Rotterdam", pulse: false, color: "#3987e5" },
  { id: "antwerp", x: 335, y: 82, label: undefined, pulse: false, color: "#3987e5" },
  { id: "hamburg", x: 365, y: 60, label: "Hamburg", pulse: false, color: "#3987e5" },
  { id: "gibraltar", x: 320, y: 140, label: undefined, pulse: false, color: "#3987e5" },
  { id: "tanger", x: 300, y: 155, label: "Tanger Med", pulse: true, color: "#3987e5" },
  { id: "piraeus", x: 395, y: 130, label: "Piraeus", pulse: false, color: "#199e70" },
  // Middle East / Africa
  { id: "suez", x: 425, y: 165, label: "Suez Canal", pulse: true, color: "#d95926" },
  { id: "jebelali", x: 495, y: 185, label: "Jebel Ali", pulse: false, color: "#d95926" },
  { id: "capeofgoodhope", x: 320, y: 305, label: undefined, pulse: false, color: "#d95926" },
  // South / Southeast Asia
  { id: "portklang", x: 600, y: 225, label: "Port Klang", pulse: false, color: "#199e70" },
  { id: "singapore", x: 625, y: 235, label: "Singapore", pulse: true, color: "#199e70" },
  // East Asia
  { id: "shenzhen", x: 615, y: 200, label: undefined, pulse: false, color: "#199e70" },
  { id: "hongkong", x: 628, y: 192, label: undefined, pulse: false, color: "#199e70" },
  { id: "shanghai", x: 670, y: 150, label: "Shanghai", pulse: true, color: "#199e70" },
  { id: "ningbo", x: 695, y: 165, label: "Ningbo-Zhoushan", pulse: false, color: "#199e70" },
  { id: "qingdao", x: 660, y: 118, label: "Qingdao", pulse: false, color: "#199e70" },
  { id: "busan", x: 710, y: 95, label: "Busan", pulse: false, color: "#3987e5" },
] as const;

const EDGES: [string, string][] = [
  // Trans-Pacific
  ["la-longbeach", "shanghai"],
  ["la-longbeach", "busan"],
  // Panama route
  ["la-longbeach", "panama"],
  ["panama", "nyc-nj"],
  ["panama", "santos"],
  // Trans-Atlantic
  ["nyc-nj", "rotterdam"],
  // European cluster
  ["rotterdam", "antwerp"],
  ["rotterdam", "hamburg"],
  ["rotterdam", "gibraltar"],
  // Mediterranean / Suez corridor
  ["gibraltar", "tanger"],
  ["gibraltar", "piraeus"],
  ["piraeus", "suez"],
  ["tanger", "capeofgoodhope"],
  ["suez", "capeofgoodhope"],
  // Suez to Asia via Middle East
  ["suez", "jebelali"],
  ["jebelali", "portklang"],
  ["portklang", "singapore"],
  // Southeast / East Asia cluster
  ["singapore", "shenzhen"],
  ["singapore", "hongkong"],
  ["shenzhen", "hongkong"],
  ["hongkong", "shanghai"],
  ["shanghai", "ningbo"],
  ["shanghai", "qingdao"],
  ["qingdao", "busan"],
];

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function SignalMap() {
  return (
    <svg
      viewBox="0 0 760 360"
      className="h-full w-full"
      role="img"
      aria-label="Stylized network of 20 major monitored trade corridors, ports and chokepoints"
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
        const my = (na.y + nb.y) / 2 - 16;
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
