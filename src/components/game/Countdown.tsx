/**
 * Stringle — Countdown Component
 * Design: Minimalismo Editorial Tech
 * Contador regressivo até meia-noite (próxima palavra)
 */

import { useEffect, useState } from "react";
import { getTimeUntilMidnight } from "@/utils/getDailyWord";

export function Countdown() {
  const [time, setTime] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xs text-muted-foreground uppercase tracking-widest">
        Próxima palavra em
      </p>
      <div
        className="text-2xl font-bold tabular-nums text-foreground"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
      </div>
    </div>
  );
}

export default Countdown;
