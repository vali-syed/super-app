'use client'
import useUserStore from "@/store/useUserStore";
import useCategoryStore from "@/store/useCategoryStore";
import Image from 'next/image'

export default function ProfileCard(){

    const user = useUserStore((state) => state.user);
    const categories = useCategoryStore((state) => state.categories);

    return (
        <main className='flex w-full max-w-[507px] min-h-[380px] bg-[#5746EA] p-6 lg:p-8 gap-6 lg:gap-10 rounded-[28px] overflow-hidden'>
            <div className='shrink-0'>
                <Image
                src = '/images/profile-image.png'
                alt = 'profile image'
                width = {209}
                height = {359}
                className='h-auto w-[160px] lg:w-[209px] object-contain'
                loading='eager'
                />
            </div>
            <div className='flex min-w-0 flex-col justify-center pt-2'>
                <h1 className="text-white text-xl md:text-2xl lg:text-3xl m-2 truncate">{user?.name}</h1>
                <p className="text-white text-xl md:text-2xl lg:text-3xl mb-2 truncate">{user?.email}</p>
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold break-words leading-tight">{user?.username}</h1>
                <div className='flex flex-wrap gap-3 lg:gap-4 mt-6'>
                    {categories?.map((item)=>(
                        <div key={item} className='bg-[#9F94FF] text-sm md:text-base lg:text-2xl text-white rounded-2xl px-4 lg:px-6 py-2 max-w-full truncate'>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
