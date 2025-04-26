"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession, signOut } from "next-auth/react"

const Navbar = () => {
    const { data: session } = useSession();
    const [dashboardDropdown, setDashboardDropdown] = useState(false)

    return (
        <nav className='h-[80px] flex justify-between items-center bg-indigo-950/30'>
            <div className='w-1/3 m-3'>
                <ul className='flex items-center'>
                    <li className='px-3 font-semibold'>FAQs</li>
                    <li className='px-3 font-semibold'>Features</li>
                    <li className='px-3 font-semibold'>Resources</li>
                </ul>
            </div>

            <Link href={"/"} className='flex gap-3  w-1/3 justify-center items-center' >
                <img src="/logo.png" width={"50"} alt="" />
                <h1 className='font-bold text-3xl hidden sm:block'>Fuel My Work</h1>
                <p className='text-lg hidden sm:block'>&reg;</p>
            </Link>

            <div className='w-1/3 m-3'>
                <ul className='flex justify-end items-center '>
                    {session ? (
                        ""
                    ) : (

                        <Link href={"/login"}>
                            <li className='text-white hover:bg-white border border-indigo-500 hover:border-white hover:text-black  rounded-lg px-5 py-2.5 w-fit mx-2 font-semibold'>
                                Log in</li>
                        </Link>
                    )}

                    {session ? (
                        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={() => setDashboardDropdown(!dashboardDropdown)} onBlur={() => setTimeout(() => setDashboardDropdown(false), 100)}
                            className='relative text-white hover:bg-white border border-indigo-500 hover:border-white hover:text-black  rounded-lg px-5 py-2.5 w-fit mx-2 font-semibold flex items-center'
                            type="button">
                            <span>Welcome</span>
                            <span className='hidden sm:block'>, {session.user.email}</span>
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>

                            {/* <!-- Dropdown menu --> */}
                            <div id="dropdown" className={`z-10 ${dashboardDropdown ? "block" : "hidden"} absolute right-0 top-13 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Your Page
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Settings
                                        </Link>
                                    </li>

                                    <li onClick={() => signOut({ callbackUrl: "/" })} className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Sign out
                                    </li>

                                </ul>
                            </div>

                        </button>
                    ) : (
                        < Link href={"/signup"}>
                            <li className='text-indigo-950 bg-white border hover:scale-105  rounded-lg px-5 py-2.5 w-fit mx-2 font-semibold '>
                                Sign up
                            </li>
                        </Link>
                    )}


                </ul>
            </div>
        </nav >
    )
}

export default Navbar