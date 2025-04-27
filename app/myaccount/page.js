"use client"
import React from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

const MyAccount = () => {
    const { data: session } = useSession();
        const router = useRouter();
    
        if (!session) {
            router.push("/login");
        }
  return (
    <div className='flex justify-center items-center w-screen '>
            <div className='p-10 w-1/2'>
                <h1 className='text-2xl font-bold px-3'>My Account</h1>
                <div className='py-3 px-3'>
                    <h3 className='font-semibold text-lg'>Edit profile</h3>
                </div>
                <div className='p-10  bg-indigo-950/60 rounded-lg'>
                    <label className='text-lg' htmlFor="name">Name</label>
                    <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Name' type="text" name="name" id="name" />

                    <label className='text-lg' htmlFor="name">Username</label>
                    <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Username' type="text" name="name" id="name" />

                    <label className='text-lg' htmlFor="name">Email</label>
                    <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Email' type="email" name="name" id="name" />
                    
                    <label className='text-lg' htmlFor="name">Profile image link</label>
                    <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Profile Image' type="text" name="name" id="name" />

                    <label className='text-lg' htmlFor="name">Cover image link</label>
                    <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Cover Image' type="text" name="name" id="name" />

                    <button className="text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full mx-2 my-5 font-semibold flex justify-center gap-2">
                            <span>Save</span>
                    </button>
                </div>
            </div>
    </div>
  )
}

export default MyAccount