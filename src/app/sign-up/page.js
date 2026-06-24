import Image from "next/image";
import { singleDay } from "../layout";

export default function signUpForm(){
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
            <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-black">
                <div className="w-full w-max-md">
                    <h1 className={`${singleDay.className} font-bold text-[#72DB73] text-[67px] mb-2`}>Super app</h1>
                    <p className="mb-8 text-[24px] text-[#ffffff]">Create your new account</p>

                    <form>
                        <input type="text" placeholder="Name" className="w-full md:w-[518px] bg-[#292929] text-[#7C7C7C] mb-2 p-2 focus:outline-none"/>
                        <input type="text" placeholder="Username" className="w-full md:w-[518px] bg-[#292929] text-[#7C7C7C] mb-2 p-2 focus:outline-none "/>
                        <input type="Email" placeholder="Username" className="w-full md:w-[518px] bg-[#292929] text-[#7C7C7C] mb-2 p-2 focus:outline-none "/>
                        <input type="Mobile" placeholder="Username" className="w-full md:w-[518px] bg-[#292929] text-[#7C7C7C] mb-2 p-2 focus:outline-none "/>
                        
                        <label className="flex items-center text-[20px] text-white-400 pt-4">
                            <input type="checkbox" className="mr-2" />
                            Share my registration data with Superapp
                        </label>

                        <button className="w-full bg-[#72DB73] text-black font-bold md:w-[518px] p-3 md:rounded-2xl mt-4">
                          SIGN UP
                        </button>
                    </form>
                    <p className="text-[18px] text-white-500 mt-6 mb-6">
                       By clicking on Sign up. you agree to Superapp <span className="text-green-500"> Terms and Conditions of Use </span>
                    </p>
                    <p className="text-[18px] text-white-500 mt-6 mb-6">
                      To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp Privacy Policy
                       <span className="text-green-500"> Privacy Policy</span>
                    </p>
                </div>
            </div>
        </main>
    )
}
