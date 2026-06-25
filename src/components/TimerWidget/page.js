"use client";

import { useEffect, useMemo, useState } from "react";

function ArrowButton({ direction, onClick }) {
  const rotation = direction === "up" ? "rotate(0 8 8)" : "rotate(180 8 8)";

  return (
    <button onClick={onClick} className="flex h-4 w-4 items-center justify-center">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M8 4 L13 10 H3 Z" fill="#8E8E8E" transform={rotation} />
      </svg>
    </button>
  );
}

function TimeControl({ label, value, onIncrease, onDecrease }) {
  return (
    <div className="flex w-[72px] flex-col items-center">
      <p className="text-[14px] font-medium text-[#8E8E8E]">{label}</p>
      <ArrowButton direction="up" onClick={onIncrease} />
      <p className="my-1 text-[24px] font-light leading-none text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </p>
      <ArrowButton direction="down" onClick={onDecrease} />
    </div>
  );
}

export default function TimerWidget() {
  const initialHours = 5;
  const initialMinutes = 8;
  const initialSeconds = 56;

  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const totalSeconds = useMemo(
    () => hours * 3600 + minutes * 60 + seconds,
    [hours, minutes, seconds]
  );

  const initialTotalSeconds =
    initialHours * 3600 + initialMinutes * 60 + initialSeconds;

  const progress = initialTotalSeconds
    ? ((initialTotalSeconds - totalSeconds) / initialTotalSeconds) * 100
    : 0;

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((currentSeconds) => {
        if (currentSeconds > 0) return currentSeconds - 1;

        setMinutes((currentMinutes) => {
          if (currentMinutes > 0) {
            setSeconds(59);
            return currentMinutes - 1;
          }

          setHours((currentHours) => {
            if (currentHours > 0) {
              setMinutes(59);
              setSeconds(59);
              return currentHours - 1;
            }

            setIsRunning(false);
            return 0;
          });

          return 0;
        });

        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, minutes, seconds, isRunning]);

  const changeHours = (amount) => {
    setHours((currentHours) => Math.max(0, Math.min(99, currentHours + amount)));
  };

  const changeMinutes = (amount) => {
    setMinutes((currentMinutes) => Math.max(0, Math.min(59, currentMinutes + amount)));
  };

  const changeSeconds = (amount) => {
    setSeconds((currentSeconds) => Math.max(0, Math.min(59, currentSeconds + amount)));
  };

  const handleStartPause = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setHours(initialHours);
      setMinutes(initialMinutes);
      setSeconds(initialSeconds);
    }

    setIsRunning((current) => !current);
  };

  const radius = 48;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex h-[200px] w-full items-center rounded-[12px] bg-[#1E2343] px-8 py-4">
      <div className="flex w-[160px] shrink-0 items-center justify-center">
        <div className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full bg-[#191E39]">
          <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
            <circle
              cx={radius}
              cy={radius}
              r={radius}
              fill="none"
              stroke="#2A2F55"
              strokeWidth="4"
            />
            <circle
              cx={radius}
              cy={radius}
              r={radius}
              fill="none"
              stroke="#FF6A6A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (progress / 100)}
              transform={`rotate(-90 ${radius} ${radius})`}
            />
          </svg>
          <span className="relative text-[16px] font-semibold tracking-[0.02em] text-white tabular-nums">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-center">
        <div className="flex items-center justify-center gap-5">
          <TimeControl
            label="Hours"
            value={hours}
            onIncrease={() => changeHours(1)}
            onDecrease={() => changeHours(-1)}
          />
          <span className="mt-6 text-[28px] leading-none text-white">:</span>
          <TimeControl
            label="Minutes"
            value={minutes}
            onIncrease={() => changeMinutes(1)}
            onDecrease={() => changeMinutes(-1)}
          />
          <span className="mt-6 text-[28px] leading-none text-white">:</span>
          <TimeControl
            label="Seconds"
            value={seconds}
            onIncrease={() => changeSeconds(1)}
            onDecrease={() => changeSeconds(-1)}
          />
        </div>

        <button
          onClick={handleStartPause}
          className="mt-3 h-[28px] w-[180px] rounded-full bg-[#FF6A6A] text-[18px] leading-none text-white"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}
