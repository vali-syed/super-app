"use client"

import {useState} from 'react'
import Image from 'next/image'
import {singleDay} from "../layout"
import {useRouter} from "next/navigation"
import useCategoryStore from "@/store/useCategoryStore"

const categories = [
  {
    id: 1,
    name: "Action",
    imageUrl:"/images/action.png",
    bgColor: "#FF5209",
  },
  {
    id: 2,
    name: "Drama",
    imageUrl: "/images/drama.png",
    bgColor: "#D7A4FF",
  },
  {
    id: 3,
    name: "Romance",
    imageUrl: "/images/romance.png",
    bgColor: "#148A08",
  },
  {
    id: 4,
    name: "Thriller",
    imageUrl: "/images/thriller.png",
    bgColor: "#84C2FF",
  },
  {
    id: 5,
    name: "Western",
    imageUrl: "/images/western.png",
    bgColor: "#902500",
  },
  {
    id: 6,
    name: "Horror",
    imageUrl: "/images/horror.png",
    bgColor: "#7358FF",
  },
  {
    id: 7,
    name: "Fantasy",
    imageUrl: "/images/fantasy.png",
    bgColor: "#FF4ADE",
  },
  {
    id: 8,
    name: "Music",
    imageUrl: "/images/music.png",
    bgColor: "#E61E32",
  },
  {
    id: 9,
    name: "Fiction",
    imageUrl: "/images/fiction.png",
    bgColor: "#6CD061",
  },
];

export default function CategoryPage() {

    const router = useRouter();
    const selectedCategories = useCategoryStore((state) => state.categories);
    const setSelectedCategories = useCategoryStore((state) => state.setCategories);
    const setCategories = useCategoryStore((state) => state.setCategories);

    const [showError, setShowError] = useState(false);

    const handleCategoryClick = (categoryName) => {
    const alreadySelected =
    selectedCategories.includes(categoryName);

    if (alreadySelected) {
        setSelectedCategories(
        selectedCategories.filter(
            (item) => item !== categoryName
        )
        );
    } else {
        setSelectedCategories([
        ...selectedCategories,
        categoryName,
        ]);
    }
    };

    const handleNext = () => {
        if (selectedCategories.length < 3) {
        setShowError(true);
        return;
    }

    setShowError(false);

    setCategories(selectedCategories);

    router.push("/dashboard");
    };

    return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-10">
        <div className="w-full max-w-7xl flex gap-20">
    
            {/* LEFT SECTION */}
            <section className="w-[35%] flex flex-col justify-center">
      
                <h1 className={`${singleDay.className} text-[#72DB73] text-5xl mb-8`}> Super app </h1>

                <h2 className="text-5xl font-bold leading-tight mb-10">
                    Choose your <br />
                    entertainment <br />
                    category
                </h2>

                {/* Selected Categories */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {
                        selectedCategories.map((category) => (
                            <div key={category} className='bg-[#148A08] rounded-2xl mr-4 p-2'>
                            {category}
                            <button
                                className='text-[#085C00] ml-4'
                                onClick={() =>
                                setSelectedCategories(
                                    selectedCategories.filter(
                                    (item) => item !== category
                                    )
                                )
                                }
                            >
                                X
                            </button>
                            </div>
                        ))
                    }
                </div>

                {/* Error */}
                <div className="flex items-center gap-2">
                    {
                        showError && selectedCategories.length < 3 && (
                        <p className="text-red-500">
                        Minimum 3 category required
                        </p>
                    )}
                </div>
            </section>

            {/* RIGHT SECTION */}
            <section className="w-[65%]">
                <div className="grid grid-cols-3 gap-6">
                   {
                    categories.map((category) => (
                        <div
                        key={category.id}
                        onClick={() =>
                            handleCategoryClick(category.name)
                        }
                            style={{
                            backgroundColor: category.bgColor,
                        }}
                        className={`cursor-pointer rounded-lg p-3 ${
                            selectedCategories.includes(category.name)
                            ? "border-4 border-green-500"
                            : ""
                        }`}
                        >
                        <h3>{category.name}</h3>
                        <Image
                            src={category.imageUrl}
                            alt={category.name}
                            width={209}
                            height={118}
                        />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-10">
                    <button
                    onClick={handleNext}
                    className="bg-[#148A08] px-10 py-3 rounded-full text-white"
                    >
                    Next Page
                    </button>
                </div>
            </section>
        </div>
    </main>
    )
}
