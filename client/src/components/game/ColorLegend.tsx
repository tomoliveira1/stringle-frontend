/**
 * Stringle — ColorLegend Component
 * Design: Minimalismo Editorial Tech
 * Exibe a legenda de cores para o jogador entender os feedbacks
 */

interface LegendItem {
  color: string;
  label: string;
  description: string;
}

const LEGEND: LegendItem[] = [
  {
    color: "bg-emerald-500",
    label: "Verde",
    description: "Letra correta na posição certa",
  },
  {
    color: "bg-amber-500",
    label: "Amarelo",
    description: "Letra existe, posição errada",
  },
  {
    color: "bg-indigo-500",
    label: "Azul",
    description: "Letra em outra palavra da frase",
  },
  {
    color: "bg-gray-600 dark:bg-gray-700",
    label: "Cinza",
    description: "Letra não existe",
  },
];

export function ColorLegend() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto px-4">
      {LEGEND.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded ${item.color} flex-shrink-0`} />
          <div className="flex gap-1.5 items-baseline">
            <span className="text-xs font-semibold text-foreground">{item.label}:</span>
            <span className="text-xs text-muted-foreground">{item.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ColorLegend;
