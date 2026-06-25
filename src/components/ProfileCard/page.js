'use client'
import useUserStore from "@/store/useUserStore";
import useCategoryStore from "@/store/useCategoryStore";
import Image from 'next/image'

export default function ProfileCard(){

    const user = useUserStore((state) => state.user);
    const categories = useCategoryStore((state) => state.categories);

    return (
        <main className='flex w-full max-w-[650px] bg-[#5746EA] p-8 gap-10   rounded-[28px] mr-8'>
            <div>
                <Image
                src = '/images/profile-image.png'
                alt = 'profile image'
                width = {209}
                height = {359}
                loading='eager'
                />
            </div>
            <div className='flex flex-col justify-center pt-2'>
                <h1 className="text-white text-xl md:text-2xl lg:text-3xl m-2]">{user?.name}</h1>
                <p className="text-white text-xl md:text-2xl lg:text-3xl mb-2">{user?.email}</p>
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">{user?.username}</h1>
                <div className='flex flex-wrap gap-4 mt-6'>
                    {categories?.map((item)=>(
                        <div key={item} className='bg-[#9F94FF] text-xl md:text-2xl lg:text-3xl text-white rounded-2xl px-6 py-2'>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}