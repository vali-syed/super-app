"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { singleDay } from "../layout";
import useUserStore from "@/store/useUserStore";

export default function SignUpForm(){

    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
    });

    useEffect(() => {
        if (user) {
            router.replace("/category");
        }
    }, [router,user]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const nextErrors = {
            name: "",
            username: "",
            email: "",
            mobile: "",
        };

        if (!formData.name.trim()) {
            nextErrors.name = "Field is required";
        }

        if (!formData.username.trim()) {
            nextErrors.username = "Field is required";
        }

        if (!formData.email.trim()) {
            nextErrors.email = "Field is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            nextErrors.email = "Enter a valid email";
        }

        if (!formData.mobile.trim()) {
            nextErrors.mobile = "Field is required";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            nextErrors.mobile = "Enter a valid 10-digit number";
        }

        setErrors(nextErrors);

        return !Object.values(nextErrors).some(Boolean);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const user = {
            name: formData.name.trim(),
            username: formData.username.trim(),
            email: formData.email.trim(),
            mobile: formData.mobile.trim(),
        };

        setUser(user);
        router.replace("/category");
    };

    return (
        <main className="flex min-h-screen w-full">
            {/*left side conatiner which contains image */}
            <div className="relative w-1/2 hidden lg:block">
                <Image
                    src = "/images/concert-night.png"
                    alt = "concert-night"
                    fill
                    className="objext-cover"
                    priority = {true}
                />
                <div className="absolute bottom-10 left-10 text-white">
                    <h2 className="text-4xl font-bold">Discover new things on super app</h2>
                </div>
            </div>
            {/*Right side form contianer*/}
            <div className="flex items-center justify-center w-full lg:w-1/2 p-6 bg-black">
                <div className="w-full max-w-[520px] text-center">
                    <h1 className={`${singleDay.className} font-bold text-[#72DB73] text-[67px] mb-2`}>Super app</h1>
                    <p className="mb-8 text-[24px] text-[#ffffff]">Create your new account</p>

                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full bg-[#292929] text-[#7C7C7C] mb-1 p-3 rounded-md focus:outline-none"/>
                        <p className={`text-red text-left text-[#FF0000] text-[14px] mb-1 ${errors.name ? "visible" : "invisible"}`}>{errors.name || "Field is required"}</p>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full bg-[#292929] text-[#7C7C7C] mb-1 p-3 rounded-md focus:outline-none"/>
                         <p className={`text-red text-left text-[#FF0000] text-[14px] mb-1 ${errors.username ? "visible" : "invisible"}`}>{errors.username || "Field is required"}</p>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-[#292929] text-[#7C7C7C] mb-1 p-3 rounded-md focus:outline-none"/>
                         <p className={`text-red text-left text-[#FF0000] text-[14px] mb-1 ${errors.email ? "visible" : "invisible"}`}>{errors.email || "Field is required"}</p>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" className="w-full bg-[#292929] text-[#7C7C7C] mb-1 p-3 rounded-md focus:outline-none"/>
                         <p className={`text-red text-left text-[#FF0000] text-[14px] mb-1 ${errors.mobile ? "visible" : "invisible"}`}>{errors.mobile || "Field is required"}</p>
                        
                        <label className="flex gap-2 text-[18px] text-white-400 pt-2 w-full">
                            <input type="checkbox" className="mr-2" />
                            Share my registration data with Superapp
                        </label>    
                         <p className="text-red text-left text-[#FF0000] text-[14px] mt-1 mb-1 invisible">Field is required</p>

                        <button type="submit" className="w-full bg-[#72DB73] text-black font-bold p-3 rounded-2xl mt-4">
                          SIGN UP
                        </button>
                    </form>
                    <p className="text-[18px] text-left text-white-500 mt-6 mb-6">
                       By clicking on Sign up. you agree to Superapp <span className="text-green-500"> Terms and Conditions of Use </span>
                    </p>
                    <p className="text-[18px] text-left text-white-500 mt-6 mb-6">
                      To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp Privacy Policy
                       <span className="text-green-500"> Privacy Policy</span>
                    </p>
                </div>
            </div>
        </main>
    )
}
