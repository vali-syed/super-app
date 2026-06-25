"use client";

import { useEffect, useMemo, useState } from "react";

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

    if (hours === 0 && minutes === 0 && seconds === 0) {
      setIsRunning(false);
      return;
    }

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

  const handleReset = () => {
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  return (
    <div className="w-full max-w-[1038px] h-[333px] bg-[#1E2343] rounded-[24px] flex items-center px-10 overflow-hidden">
      <div className="w-[220px] h-[220px] flex items-center justify-center shrink-0">
        <div className="relative w-[180px] h-[180px] flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.4)]">
          <svg className="absolute inset-0" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r="78"
              fill="none"
              stroke="#2B2F53"
              strokeWidth="8"
            />
            <circle
              cx="90"
              cy="90"
              r="78"
              fill="none"
              stroke="#ff6a6a"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 78}`}
              strokeDashoffset={`${2 * Math.PI * 78 * (1 - progress / 100)}`}
              transform="rotate(-90 90 90)"
            />
          </svg>
          <span className="relative text-white text-[28px] font-semibold whitespace-nowrap tabular-nums">
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-evenly text-[#949494] text-[20px] lg:text-[24px] font-medium">
          <p>Hours</p>
          <p>Minutes</p>
          <p>Seconds</p>
        </div>

        <div className="flex justify-evenly items-center mt-6">
          <div className="flex flex-col items-center">
            <button onClick={() => changeHours(1)} className="text-[#949494] text-3xl leading-none">+</button>
            <h1 className="text-white text-[48px] lg:text-[54px] font-light leading-none tabular-nums">
              {String(hours).padStart(2, "0")}
            </h1>
            <button onClick={() => changeHours(-1)} className="text-[#949494] text-3xl leading-none">-</button>
          </div>

          <span className="text-white text-[48px] lg:text-[54px] leading-none">:</span>

          <div className="flex flex-col items-center">
            <button onClick={() => changeMinutes(1)} className="text-[#949494] text-3xl leading-none">+</button>
            <h1 className="text-white text-[48px] lg:text-[54px] font-light leading-none tabular-nums">
              {String(minutes).padStart(2, "0")}
            </h1>
            <button onClick={() => changeMinutes(-1)} className="text-[#949494] text-3xl leading-none">-</button>
          </div>

          <span className="text-white text-[48px] lg:text-[54px] leading-none">:</span>

          <div className="flex flex-col items-center">
            <button onClick={() => changeSeconds(1)} className="text-[#949494] text-3xl leading-none">+</button>
            <h1 className="text-white text-[48px] lg:text-[54px] font-light leading-none tabular-nums">
              {String(seconds).padStart(2, "0")}
            </h1>
            <button onClick={() => changeSeconds(-1)} className="text-[#949494] text-3xl leading-none">-</button>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={handleStartPause}
            className="bg-[#ff6a6a] text-white w-[320px] h-[60px] rounded-full text-[30px]"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className="bg-transparent border border-[#ff6a6a] text-[#ff6a6a] w-[120px] h-[60px] rounded-full text-[20px]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
