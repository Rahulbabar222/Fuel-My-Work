"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import Image from 'next/image'
import { set } from 'mongoose'

const Forgotpasswordpage = () => {
    const [resetform, setResetform] = useState({ email: "", password: "", confirmpassword: "" })
    const [emailexist, setEmailexist] = useState()
    const [loading, setLoading] = useState(false);
    const router=useRouter()

    const handleChange = (e) => {
        setResetform({ ...resetform, [e.target.name]: e.target.value })
    }

    const handleContinue = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/account/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resetform),
            });

            const data = await res.json();

            if (res.ok && data.exists) {
                setLoading(false)
                setEmailexist(true);
            } else {
                setEmailexist(false);
                alert("Does not exist")
            }
        } catch (err) {
            setLoading(false)
            console.error(err);
            alert("Something went wrong.");
        }
    }

    const handleReset = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/account/reset-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resetform),
            });

            const data = await res.json();

            if (res.ok) {
                setLoading(false)
                toast("Password updated!");
                router.push("/auth/login");
            } else {
                toast(data.error || "Failed to update password.");
            }
        } catch (err) {
            setLoading(false)
            console.error(err);
            toast("Something went wrong.");
        }
    }
    return (
        
        <div className='flex justify-center items-center h-screen relative'>
            <ToastContainer/>
            <div className=' w-full sm:max-w-1/4 sm:min-w-1/4 flex flex-col items-center gap-5 p-10 m-10 bg-indigo-950/30  '>
                <Link href={"/"}><Image
                width={70} 
                height={70} 
                quality={100}
                src="/logo.png" alt="Logo"  /></Link>
                <h1 className='text-2xl font-bold'>Reset password</h1>
                <input onChange={handleChange} type="email" name="email" value={resetform.email} placeholder='Email Address' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />
                
                {emailexist === true &&
                 <>
                    <input onChange={handleChange} type="password" name="password" value={resetform.password} placeholder='Password' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />

                    <input onChange={handleChange} type="password" name="confirmpassword" value={resetform.confirmpassword} placeholder='Password' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />
                    {resetform.confirmpassword!= resetform.password && <p className='text-sm text-red-400'>Password do not match</p>}
                </>}

                {emailexist=== true?(
                    <button onClick={() => handleReset()}
                    disabled={!resetform.email || !resetform.password || !resetform.confirmpassword || loading}

                    className={`w-1/2 py-2 font-semibold text-center text-black rounded-full ${resetform.email && resetform.password && resetform.confirmpassword && resetform.confirmpassword=== resetform.password  ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-300 cursor-not-allowed"
                        }`}>
                    {loading?"Please Wait...":"Reset"}
                </button>
                ):(
                    <button onClick={() => handleContinue()}
                    disabled={!resetform.email || loading}

                    className={`w-1/2 py-2 font-semibold text-center text-black rounded-full ${resetform.email ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-300 cursor-not-allowed"
                        }`}>
                    {loading?"Please Wait...":"Continue"}
                </button>
                )}    

            </div>
        </div>

    )
}

export default Forgotpasswordpage
