"use client";

import { useEffect, useState } from "react";

const format = (tz: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" });

/** Live local time, e.g. "Roorkee, 1:04 AM". Renders the city alone until mounted. */
export function Clock({ city, timeZone }: { city: string; timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const f = format(timeZone);
    const tick = () => setTime(f.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span>
      {city}
      {time && (
        <>
          , <time suppressHydrationWarning>{time}</time>
        </>
      )}
    </span>
  );
}
