// src/components/layout/RightRail.tsx
import { useEffect, useState } from "react";

type WeatherState = {
  tempC: number | null;
  condition: string | null;
};

const WEATHER_LABELS: Record<number, string> = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Drizzle",
  61: "Rain",
  71: "Snow",
  80: "Showers",
};

const QUOTES = [
  {
    author: "Sun Tzu · The Art of War",
    text: "In the midst of chaos, there is also opportunity.",
  },
  {
    author: "Sun Tzu · The Art of War",
    text: "The whole secret lies in confusing the enemy, so that he cannot fathom our real intent.",
  },
  {
    author: "Sun Tzu · The Art of War",
    text: "Victorious warriors win first and then go to war. Defeated warriors go to war first and then seek to win.",
  },
  {
    author: "Marcus Aurelius",
    text: "You have power over your mind, not outside events. Realize this, and you will find strength.",
  },
  {
    author: "Epictetus",
    text: "We suffer more often in imagination than in reality.",
  },
  {
    author: "Seneca",
    text: "Luck is what happens when preparation meets opportunity.",
  },
  {
    author: "Miyamoto Musashi",
    text: "Perceive that which cannot be seen with the eye.",
  },
  {
    author: "Carl von Clausewitz",
    text: "Everything is very simple in war, but the simplest thing is difficult.",
  },
  {
    author: "Archilochus",
    text: "We don't rise to the level of our expectations, we fall to the level of our training.",
  },
  {
    author: "Old Proverb",
    text: "A jack of all trades is a master of none, but oftentimes better than a master of one.",
  },
  {
    author: "Relentless Mindset",
    text: "When you want it as badly as you want to breathe, you stop making excuses.",
  },
  {
    author: "Conqueror's Doctrine",
    text: "Burn the boats. With no retreat, every decision moves you closer to survival or victory.",
  },
];

const QUOTE_DURATION_MS = 16000;
const QUOTE_SEGMENTS = 24;

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

// Pong Game Component
const PongGame = () => {
  const [ballX, setBallX] = useState(50);
  const [ballY, setBallY] = useState(50);
  const [ballDX, setBallDX] = useState(2);
  const [ballDY, setBallDY] = useState(1.5);
  const [leftPaddleY, setLeftPaddleY] = useState(40);
  const [rightPaddleY, setRightPaddleY] = useState(40);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBallX((x) => {
        let newX = x + ballDX;
        let newDX = ballDX;

        if (newX <= 5 && ballY >= leftPaddleY && ballY <= leftPaddleY + 20) {
          newX = 5;
          newDX = Math.abs(ballDX) * (1 + Math.random() * 0.2);
          setBallDX(newDX);
        } else if (
          newX >= 95 &&
          ballY >= rightPaddleY &&
          ballY <= rightPaddleY + 20
        ) {
          newX = 95;
          newDX = -Math.abs(ballDX) * (1 + Math.random() * 0.2);
          setBallDX(newDX);
        } else if (newX <= 0) {
          setRightScore((s) => s + 1);
          newX = 50;
          setBallY(50);
          newDX = 2;
          setBallDX(newDX);
          setBallDY(1.5 * (Math.random() > 0.5 ? 1 : -1));
        } else if (newX >= 100) {
          setLeftScore((s) => s + 1);
          newX = 50;
          setBallY(50);
          newDX = -2;
          setBallDX(newDX);
          setBallDY(1.5 * (Math.random() > 0.5 ? 1 : -1));
        }

        return newX;
      });

      setBallY((y) => {
        let newY = y + ballDY;
        let newDY = ballDY;

        if (newY <= 0 || newY >= 100) {
          newDY = -ballDY;
          setBallDY(newDY);
          newY = Math.max(0, Math.min(100, newY));
        }

        return newY;
      });

      setLeftPaddleY((y) => {
        const target = ballY - 10;
        const speed = 1.2;
        if (y < target) return Math.min(y + speed, 80);
        if (y > target) return Math.max(y - speed, 0);
        return y;
      });

      setRightPaddleY((y) => {
        const target = ballY - 10;
        const speed = 1.2;
        if (y < target) return Math.min(y + speed, 80);
        if (y > target) return Math.max(y - speed, 0);
        return y;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [ballX, ballY, ballDX, ballDY, leftPaddleY, rightPaddleY]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[0.58rem] text-zinc-600">
        <span>Pong Simulator</span>
      </div>

      <div className="flex justify-between text-[0.65rem] font-mono text-orange-400">
        <span>P1: {leftScore}</span>
        <span>P2: {rightScore}</span>
      </div>

      <div className="relative h-32 w-full border border-neutral-800 bg-black">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-zinc-700" />
        <div
          className="absolute left-1 w-1 h-5 bg-orange-500"
          style={{ top: `${leftPaddleY}%` }}
        />
        <div
          className="absolute right-1 w-1 h-5 bg-orange-500"
          style={{ top: `${rightPaddleY}%` }}
        />
        <div
          className="absolute w-1.5 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            left: `${ballX}%`,
            top: `${ballY}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="text-[0.55rem] text-zinc-600 uppercase tracking-wider">
        AUTO · AI vs AI
      </div>
    </div>
  );
};

// Fun Facts Carousel
const FunFactsCarousel = () => {
  const facts = [
    { icon: "🍖", text: "My favorite food is KBBQ" },
    { icon: "🎓", text: "I was a double major in Philosophy" },
    { icon: "🤠", text: "I'm from Dallas, Texas" },
    { icon: "🏀", text: "Steph Curry is the best player of all time" },
  ];

  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[0.58rem] text-zinc-600">
        <span>Fun Facts</span>
      </div>

      <div className="relative border border-neutral-800 bg-black/60 p-3 h-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-orange-500/40" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-orange-500/40" />

        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-2xl mb-1">{facts[currentFact].icon}</div>
          <div className="text-[0.65rem] text-zinc-300 normal-case leading-snug px-2">
            {facts[currentFact].text}
          </div>
        </div>
      </div>

      <div className="flex gap-1 justify-center">
        {facts.map((_, idx) => (
          <div
            key={idx}
            className={`w-1 h-1 rounded-full transition-colors ${
              idx === currentFact ? "bg-orange-500" : "bg-zinc-700"
            }`}
          />
        ))}
      </div>

      <div className="text-[0.55rem] text-zinc-600 uppercase tracking-wider text-center">
        {currentFact + 1} / 4
      </div>
    </div>
  );
};

const RightRail = ({ isOpen = false }: { isOpen?: boolean }) => {
  const [now, setNow] = useState<Date>(() => new Date());
  const [sessionStart] = useState<Date>(() => new Date());
  const [weather, setWeather] = useState<WeatherState>({
    tempC: null,
    condition: null,
  });
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteProgress, setQuoteProgress] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=33.64&longitude=-117.84&current_weather=true",
          { signal: controller.signal }
        );
        if (!res.ok) return;
        const data = await res.json();

        const tempC = data?.current_weather?.temperature ?? null;
        const code: number | undefined = data?.current_weather?.weathercode;
        const condition =
          code !== undefined ? WEATHER_LABELS[code] ?? "Clear" : null;

        setWeather({ tempC, condition });
      } catch {
        // silent fail
      }
    })();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const start = Date.now();

    const step = () => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      const ratio = Math.min(elapsed / QUOTE_DURATION_MS, 1);
      const seg = Math.floor(ratio * QUOTE_SEGMENTS);
      setQuoteProgress(seg);

      if (elapsed >= QUOTE_DURATION_MS) {
        setQuoteProgress(0);
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
      } else {
        requestAnimationFrame(step);
      }
    };

    const id = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [quoteIndex]);

  const localTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const localDate = now.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const sessionDuration = formatDuration(
    now.getTime() - sessionStart.getTime()
  );

  const tempDisplay =
    weather.tempC != null ? `${Math.round(weather.tempC)}°C` : "--°C";
  const conditionDisplay = weather.condition ?? "Scanning…";

  const quote = QUOTES[quoteIndex];

  return (
    <aside
      className={`
        fixed right-0 top-0 z-40
        flex h-screen w-[240px] flex-col
        border-l border-zinc-800
        bg-black/95
        px-5 py-6
        text-[0.6rem]
        uppercase tracking-[0.24em]
        text-zinc-500
        transition-all duration-300 ease-out
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
      style={{
        transitionProperty: "transform, opacity",
        transitionTimingFunction: isOpen
          ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "cubic-bezier(0.4, 0, 1, 1)",
      }}
    >
      <div className="mb-5 flex items-center justify-between text-[0.58rem]">
        <span className="text-zinc-600">HUD // OPS CONSOLE</span>
      </div>

      <div className="mb-4 space-y-1 font-mono">
        <div className="flex items-center justify-between text-[0.58rem] text-zinc-600">
          <span>Local Time</span>
        </div>
        <div className="flex flex-col items-start text-[0.82rem] text-zinc-100">
          <span>{localTime}</span>
          <span className="mt-1 text-[0.62rem] text-zinc-500">{localDate}</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-[0.58rem] text-zinc-600">
          <span>Session</span>
        </div>
        <div className="flex flex-col items-start font-mono text-[0.75rem] text-zinc-100">
          <span>{sessionDuration}</span>
          <span className="mt-1 text-[0.6rem] text-zinc-500">
            Page open · live
          </span>
        </div>
      </div>

      <div className="mb-4 space-y-1 font-mono">
        <div className="flex items-center justify-between text-[0.58rem] text-zinc-600">
          <span>WX · Irvine, CA</span>
        </div>
        <div className="flex flex-col items-start text-[0.75rem] text-zinc-100">
          <span>{tempDisplay}</span>
          <span className="mt-1 text-[0.6rem] text-zinc-400">
            {conditionDisplay}
          </span>
        </div>
      </div>

      <div className="mb-5">
        <PongGame />
      </div>

      <div className="mb-5">
        <FunFactsCarousel />
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex items-center justify-between text-[0.58rem] text-zinc-600">
          <span>Doctrine</span>
        </div>

        <div className="space-y-1 text-[0.6rem] normal-case leading-relaxed text-zinc-300">
          <p className="text-[0.62rem]">"{quote.text}"</p>
          <p className="text-[0.58rem] text-zinc-500">— {quote.author}</p>
        </div>

        <div className="mt-3 flex gap-[3px]">
          {Array.from({ length: QUOTE_SEGMENTS }).map((_, idx) => {
            const active = idx <= quoteProgress;
            return (
              <div
                key={idx}
                className="h-[6px] flex-1 rounded-sm"
                style={{
                  backgroundColor: active ? "#fb923c" : "#18181b",
                  opacity: active ? 0.95 : 0.35,
                  boxShadow: active ? "0 0 6px rgba(251,146,60,0.6)" : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Glitch effect overlay when opening */}
      <div
        className={`
          absolute inset-0 pointer-events-none
          transition-opacity duration-200
          ${isOpen ? "opacity-0" : "opacity-100"}
        `}
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(249, 115, 22, 0.03) 2px, rgba(249, 115, 22, 0.03) 4px)",
          mixBlendMode: "screen",
        }}
      />
    </aside>
  );
};

export default RightRail;
