'use client'

import ProfileCard from '@/components/ProfileCard/page.js'
import NotesWidget from '@/components/NotesWidget/page.js'

export default function Dashboard() {

    return (
        <main>
            <div>
                <h1>Dashboard</h1>
                <ProfileCard />
                <NotesWidget />
            </div>
        </main> 
    )
}