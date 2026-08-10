"use client";

import React, { useEffect, useState, useRef } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

const STATS: StatItem[] = [
  { value: 2, suffix: "+", label: "Years Experience", icon: "🏆" },
  { value: 15, suffix: "+", label: "Projects Delivered", icon: "🚀" },
  { value: 10, suffix: "+", label: "Live Applications", icon: "🌐" },
  { value: 50, suffix: "+", label: "GitHub Repositories", icon: "💻" },
];

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration, active]);

  return count;
}

const StatCard = ({
  stat,
  active,
  index,
}: {
  stat: StatItem;
  active: boolean;
  index: number;
}) => {
  const count = useCountUp(stat.value, 1600 + index * 100, active);

  return (
    <div
      className={`flex flex-col items-center gap-3 p-8 transition-all duration-700`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <span className="text-4xl mb-1">{stat.icon}</span>
      <div className="flex items-end gap-1">
        <span className="text-5xl md:text-6xl font-bold text-white tabular-nums">
          {count}
        </span>
        <span className="text-3xl font-bold text-gray-400 mb-1">
          {stat.suffix}
        </span>
      </div>
      <p className="text-gray-400 text-base font-medium tracking-wide uppercase text-sm">
        {stat.label}
      </p>
    </div>
  );
};

const Stats: React.FC = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={ref}
      className="py-16 bg-gray-950 border-y border-gray-800/50 relative overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-900/50 via-gray-950 to-gray-900/50"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-800/50">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
