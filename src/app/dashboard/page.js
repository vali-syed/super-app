'use client'

import ProfileCard from '@/components/ProfileCard/page.js'
import NewsWidget from '@/components/NewsWidget/page.js'
import TimerWidget from '@/components/TimerWidget/page.js'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black flex justify-center items-center px-6 py-8 lg:p-8">
      <div className="w-full max-w-7xl">

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-12
            gap-6
            items-start
          "
        >

          {/*LEFT COLUMN*/}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">

            <ProfileCard />

            {/* <WeatherWidget /> */}

          </div>

          {/*CENTER COLUMN  */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">

            {/* Notes */}
            <div className="hidden lg:flex bg-yellow-300 rounded-3xl p-6 h-[380px] flex-col overflow-hidden">
              <h2 className="text-3xl font-bold mb-6">
                All notes
              </h2>

              <p className="text-lg leading-8 break-words overflow-hidden">
                This is how I am going to learn MERN Stack in next 3 months.
              </p>
            </div>

            <div className="hidden lg:block">
              <TimerWidget />
            </div>

          </div>

          {/*RIGHT COLUMN*/}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col">

            <NewsWidget />

          </div>

        </div>

      </div>
    </main>
  )
}
