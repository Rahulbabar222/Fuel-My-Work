"use client"
import React, { useState ,useEffect} from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'

const Signuppage = () => {
    const [signupform, setSignupform] = useState({email:"",password:"",confirmpassword:""})
    const [emailexist, setEmailexist] = useState()
    const router = useRouter()

    const { data: session } = useSession();
    useEffect(() => {
        if (session) {
          router.push("/account/dashboard");
        }
      }, [session]);

    const handleChange = (e) => {
        setSignupform({...signupform,[e.target.name]:e.target.value})
    }

    const handleContinue = async () => {
        try {
            const res = await fetch("/api/account/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupform),
            });

            const data = await res.json();

            if (res.ok && data.exists) {
                setEmailexist(true);
            } else {
                setEmailexist(false);
            }
        } catch (err) {
            console.error(err);
            toast("Something went wrong.");
        }
    }

    const handleSignup = async () => {
        try {
            const res = await fetch("/api/account/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupform),
            });

            const data = await res.json();

            if (res.ok) {
                toast("Signup Successful!");
                router.push("/auth/login");
            } else {
                toast(data.error || "Failed to Signup.");
            }
        } catch (err) {
            console.error(err);
            toast("Something went wrong.");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen relative'>
            <ToastContainer/>
            <div className=' w-full sm:max-w-1/4 sm:min-w-1/4 flex flex-col items-center gap-5 p-10 m-10 bg-indigo-950/30  '>
                <Link href={"/"}><img src="/logo.png" alt="" width={"50"} /></Link>
                <div className='flex flex-col items-center'>
                <h1 className='text-3xl font-bold'>Welcome</h1>
                <h2 className='text-2xl font-bold'>Sign up</h2>
                </div>
                <input onChange={handleChange} type="email" name="email" value={signupform.email} placeholder='Email Address' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />
                {emailexist && <Link href={"/auth/login"} className='text-sm text-red-400 underline'>Email Already exist, click here to login</Link>}

                {emailexist===false &&
                <>
                <input onChange={handleChange} type="password" name="password" value={signupform.password} placeholder='Password' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />
                <input onChange={handleChange} type="password" name="confirmpassword" value={signupform.confirmpassword} placeholder='Conifrm Password' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />
                {signupform.confirmpassword!= signupform.password && <p className='text-sm text-red-400'>Password do not match</p>}

                </>}

                {/* continue button */}

                {emailexist===false?(
                    <>
                <button
                    disabled={!signupform.email || !signupform.password || !signupform.confirmpassword}
                    onClick={() => handleSignup()}
                    className={`w-1/2 py-2 font-semibold text-center text-black rounded-full ${signupform.email && signupform.password &&signupform.confirmpassword && signupform.password===signupform.confirmpassword ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-300 cursor-not-allowed"
                        }`}>
                    Signup
                </button>
                <Link href={"/auth/forgotpassword"} className='underline'>Forgot password?</Link>
                </>
                ):(
                <button
                    disabled={!signupform.email}
                    onClick={() => handleContinue()}
                    className={`w-1/2 py-2 font-semibold text-center text-black rounded-full ${signupform.email ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-300 cursor-not-allowed"
                        }`}>
                    Continue
                </button>

                )}  
            </div>

        </div>
    )
}

export default Signuppage