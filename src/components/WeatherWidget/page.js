"use client";

export default function WeatherWidget() {
    return (
        <div className="w-full h-[150px] rounded-[4px] overflow-hidden border-2 border-[#0ea5e9] bg-[#19204c]">
            <div className="h-[28px] bg-[#ff4fc8] flex items-center justify-between px-4 text-white text-[15px] font-semibold">
                <span>2-20-2023</span>
                <span>07:35 PM</span>
            </div>

            <div className="h-[82px] flex items-center px-4 text-white">
                <div className="flex items-center gap-3 w-[110px]">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 18a4 4 0 1 1 1.6-7.68A5 5 0 1 1 17 14h1a3 3 0 0 1 0 6H7" />
                        <path d="M13 14v6" />
                        <path d="M10 17l3 3 3-3" />
                    </svg>
                    <div className="text-[11px] leading-tight">
                        <div>Heavy rain</div>
                    </div>
                </div>

                <div className="w-[84px] text-center border-x border-white/20">
                    <div className="text-[26px] leading-none">24°C</div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-1 pl-3 text-[10px] leading-tight">
                    <div>3.7 km/h<br />Wind</div>
                    <div>83%<br />Humidity</div>
                    <div>1010 mbar<br />Pressure</div>
                    <div className="text-right">Sunny</div>
                </div>
            </div>
        </div>
    );
}
