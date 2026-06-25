'use client'

import ProfileCard from '@/components/ProfileCard/page.js'
import WeatherWidget from '@/components/WeatherWidget/page.js'
import NewsWidget from '@/components/NewsWidget/page.js'
import TimerWidget from '@/components/TimerWidget/page.js'
import NotesWidget from '@/components/NotesWidget/page.js'

export default function Dashboard() {
  return (
    <main className="lg:flex min-h-screen w-full items-start justify-center bg-black px-16 py-8">
    <div className="w-full max-w-[1800px] grid grid-cols-[minmax(360px,480px)_minmax(300px,360px)_minmax(340px,1fr)] grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-x-8 gap-y-6 items-start">
      <div className="flex flex-col gap-3 self-stretch">
        <ProfileCard />
        <WeatherWidget />
      </div>

      <div className="flex flex-col gap-3 self-stretch">
        <NotesWidget />
      </div>

      <div className="row-span-2 self-stretch">
        <NewsWidget />
      </div>

        <div className="col-span-2 self-stretch">
            <TimerWidget />
         </div>
    </div>

    </main>
  )
}
