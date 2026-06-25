'use client'
import useUserStore from "@/store/useUserStore";
import useCategoryStore from "@/store/useCategoryStore";
import Image from 'next/image'

export default function ProfileCard(){

    const user = useUserStore((state) => state.user);
    const categories = useCategoryStore((state) => state.categories);
    const profile = {
        name: user?.name || 'KK Vinay',
        email: user?.email || 'Vinay090@gmail.com',
        username: user?.username || 'vinay060',
    };
    const profileCategories = categories?.length ? categories : ['Horror', 'Thriller', 'Action', 'Fiction'];

    return (
        <main className='flex h-[280px] w-full items-center rounded-[16px] bg-[#5746EA] px-6 py-5 overflow-hidden'>
            <div className='shrink-0'>
                <Image
                src = '/images/profile-image.png'
                alt = 'profile image'
                width = {260}
                height = {390}
                className='h-[190px] w-[125px] object-cover rounded-[28px]'
                loading='eager'
                />
            </div>
            <div className='ml-4 flex min-w-0 flex-1 flex-col justify-center'>
                <h1 className="truncate text-[15px] leading-none text-white">{profile.name}</h1>
                <p className="mt-1.5 truncate text-[15px] leading-none text-white">{profile.email}</p>
                <h1 className="mt-1 truncate text-[44px] font-bold leading-none text-white">{profile.username}</h1>
                <div className='mt-3 grid grid-cols-2 gap-x-3 gap-y-2'>
                    {profileCategories.map((item)=>(
                        <div key={item} className='truncate rounded-full bg-[#9F94FF] px-4 py-2 text-[12px] leading-none text-white'>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
