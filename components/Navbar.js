"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'

const Navbar = () => {
    const { data: session } = useSession();
    const [dashboardDropdown, setDashboardDropdown] = useState(false)
    const [resourceDropdown, setResourceDropdown] = useState(false)
    const [hamburger, setHamburger] = useState()
    return (
        <nav className='h-[80px] flex justify-between items-center bg-indigo-950/30'>
            <div onClick={() => setHamburger(true)} className='flex lg:hidden items-center mx-3 px-3 py-2 rounded-full border border-white'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <path d="M4 5L20 5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M4 12L20 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M4 19L20 19" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <Image
                    width={30}
                    height={30}
                    quality={100}
                    src="/logo.png" alt="logo" />

            </div>
            {hamburger === true &&
                <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/80 z-10 '>
                    <div className=' w-2/3 flex flex-col m-5 py-5 px-10 bg-indigo-900 rounded-xl relative'>
                        <Link onClick={() => setHamburger(false)} href={"/"} className='my-3'>Home</Link>
                        <Link onClick={() => setHamburger(false)} href={"#"} className='my-3'>FAQs - NotActive</Link>
                        <Link onClick={() => setHamburger(false)} href={"#"} className='my-3'>Features - NotActive</Link>
                        <Link onClick={() => setHamburger(false)} href={"/creators"} className='my-3'>Creators</Link>
                        <Link onClick={() => setHamburger(false)} href={"#"} className='my-3 flex items-center gap-2'>
                            <span>iOS</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                                <path d="M12 5.75C12 3.75 13.5 1.75 15.5 1.75C15.5 3.75 14 5.75 12 5.75Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                                <path d="M12.5 8.09001C11.9851 8.09001 11.5867 7.92646 11.1414 7.74368C10.5776 7.51225 9.93875 7.25 8.89334 7.25C7.02235 7.25 4 8.74945 4 12.7495C4 17.4016 7.10471 22.25 9.10471 22.25C9.77426 22.25 10.3775 21.9871 10.954 21.7359C11.4815 21.5059 11.9868 21.2857 12.5 21.2857C13.0132 21.2857 13.5185 21.5059 14.046 21.7359C14.6225 21.9871 15.2257 22.25 15.8953 22.25C17.2879 22.25 18.9573 19.8992 20 16.9008C18.3793 16.2202 17.338 14.618 17.338 12.75C17.338 11.121 18.2036 10.0398 19.5 9.25C18.5 7.75 17.0134 7.25 15.9447 7.25C14.8993 7.25 14.2604 7.51225 13.6966 7.74368C13.2514 7.92646 13.0149 8.09001 12.5 8.09001Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                            </svg>
                        </Link>
                        <Link onClick={() => setHamburger(false)} href={"#"} className='my-3 flex items-center gap-2'>
                            <span>Andriod</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                                <path d="M6.5 9.5C6.5 6.46243 8.96243 4 12 4C15.0376 4 17.5 6.46243 17.5 9.5V16C17.5 17.4142 17.5 18.1213 17.0607 18.5607C16.6213 19 15.9142 19 14.5 19H9.5C8.08579 19 7.37868 19 6.93934 18.5607C6.5 18.1213 6.5 17.4142 6.5 16V9.5Z" stroke="#ffffff" strokeWidth="1.5"></path>
                                <path d="M20 11V17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M15 19V22" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M9 19V22" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M4 11V17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M10 4L8.5 2M14 4L15.5 2" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M6.5 10H17.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </Link>
                        <button onClick={() => setHamburger(false)} className='absolute top-5 right-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                <path d="M10.2471 6.7402C11.0734 7.56657 11.4866 7.97975 12.0001 7.97975C12.5136 7.97975 12.9268 7.56658 13.7531 6.74022L13.7532 6.7402L15.5067 4.98669L15.5067 4.98668C15.9143 4.5791 16.1182 4.37524 16.3302 4.25283C17.3966 3.63716 18.2748 4.24821 19.0133 4.98669C19.7518 5.72518 20.3628 6.60345 19.7472 7.66981C19.6248 7.88183 19.421 8.08563 19.0134 8.49321L17.26 10.2466C16.4336 11.073 16.0202 11.4864 16.0202 11.9999C16.0202 12.5134 16.4334 12.9266 17.2598 13.7529L19.0133 15.5065C19.4209 15.9141 19.6248 16.1179 19.7472 16.3299C20.3628 17.3963 19.7518 18.2746 19.0133 19.013C18.2749 19.7516 17.3965 20.3626 16.3302 19.7469C16.1182 19.6246 15.9143 19.4208 15.5067 19.013L13.7534 17.2598L13.7533 17.2597C12.9272 16.4336 12.5136 16.02 12.0001 16.02C11.4867 16.02 11.073 16.4336 10.2469 17.2598L10.2469 17.2598L8.49353 19.013C8.0859 19.4208 7.88208 19.6246 7.67005 19.7469C6.60377 20.3626 5.72534 19.7516 4.98693 19.013C4.2484 18.2746 3.63744 17.3963 4.25307 16.3299C4.37549 16.1179 4.5793 15.9141 4.98693 15.5065L6.74044 13.7529C7.56681 12.9266 7.98 12.5134 7.98 11.9999C7.98 11.4864 7.5666 11.073 6.74022 10.2466L4.98685 8.49321C4.57928 8.08563 4.37548 7.88183 4.25307 7.66981C3.63741 6.60345 4.24845 5.72518 4.98693 4.98669C5.72542 4.24821 6.60369 3.63716 7.67005 4.25283C7.88207 4.37524 8.08593 4.5791 8.49352 4.98668L8.49353 4.98669L10.2471 6.7402Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>

                    </div>
                </div>
            }

            <div className='hidden lg:block w-1/3 m-3'>
                <ul className='flex items-center'>
                    <Link href={"#"} className='px-3 font-semibold'>FAQs</Link>
                    <Link href={"#"} className='px-3 font-semibold'>Features</Link>
                    <Link href={"/creators"} className='px-3 font-semibold'>Creators</Link>
                    <button onClick={() => setResourceDropdown(!resourceDropdown)} onBlur={() => setTimeout(() => setResourceDropdown(false), 100)} className=' relative px-3 font-semibold cursor-pointer' >Resources
                        <div className={`z-10 ${resourceDropdown ? "block" : "hidden"} absolute top-13 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    <Link href="#" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center justify-center gap-2">
                                        <span>iOS</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                            <path d="M12 5.75C12 3.75 13.5 1.75 15.5 1.75C15.5 3.75 14 5.75 12 5.75Z" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            <path d="M12.5 8.09001C11.9851 8.09001 11.5867 7.92646 11.1414 7.74368C10.5776 7.51225 9.93875 7.25 8.89334 7.25C7.02235 7.25 4 8.74945 4 12.7495C4 17.4016 7.10471 22.25 9.10471 22.25C9.77426 22.25 10.3775 21.9871 10.954 21.7359C11.4815 21.5059 11.9868 21.2857 12.5 21.2857C13.0132 21.2857 13.5185 21.5059 14.046 21.7359C14.6225 21.9871 15.2257 22.25 15.8953 22.25C17.2879 22.25 18.9573 19.8992 20 16.9008C18.3793 16.2202 17.338 14.618 17.338 12.75C17.338 11.121 18.2036 10.0398 19.5 9.25C18.5 7.75 17.0134 7.25 15.9447 7.25C14.8993 7.25 14.2604 7.51225 13.6966 7.74368C13.2514 7.92646 13.0149 8.09001 12.5 8.09001Z" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round"></path>
                                        </svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"#"} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center justify-center gap-2">
                                        <span>Andriod</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                            <path d="M6.5 9.5C6.5 6.46243 8.96243 4 12 4C15.0376 4 17.5 6.46243 17.5 9.5V16C17.5 17.4142 17.5 18.1213 17.0607 18.5607C16.6213 19 15.9142 19 14.5 19H9.5C8.08579 19 7.37868 19 6.93934 18.5607C6.5 18.1213 6.5 17.4142 6.5 16V9.5Z" stroke="#000000" strokeWidth="1.5"></path>
                                            <path d="M20 11V17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M15 19V22" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M9 19V22" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M4 11V17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M10 4L8.5 2M14 4L15.5 2" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M6.5 10H17.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </button>
                </ul>
            </div>

            <Link href={"/"} className='hidden lg:flex gap-3 w-1/3 justify-center items-center' >
                <Image
                    width={50}
                    height={50}
                    quality={100}
                    src="/logo.png" alt="logo" />
                <h1 className='font-bold text-3xl hidden md:block w-fit text-center'>Fuel My Work</h1>
                <p className='text-lg hidden sm:block'>&reg;</p>
            </Link>

            <div className='w-1/3 m-3'>
                <ul className='flex justify-end items-center '>
                    {session ? (
                        ""
                    ) : (

                        <Link href={"/auth/login"}>
                            <li className='text-white hover:bg-white border border-indigo-500 hover:border-white hover:text-black flex justify-center  rounded-lg px-5 py-2.5 w-[100px] sm:w-fit mx-2 font-semibold'>
                                Log in</li>
                        </Link>
                    )}

                    {session ? (
                        <button onClick={() => setDashboardDropdown(!dashboardDropdown)} onBlur={() => setTimeout(() => setDashboardDropdown(false), 100)}
                            className='relative text-white hover:bg-white border border-indigo-500 hover:border-white hover:text-black  rounded-lg px-5 py-2.5 w-fit mx-2 font-semibold flex items-center'
                            type="button">
                            <span>Welcome</span>
                            <span className='hidden sm:block'>, {session.user.name ? session.user.name : session.user.email}</span>
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>

                            {/* <!-- Dropdown menu --> */}
                            <div className={`z-10 ${dashboardDropdown ? "block" : "hidden"} absolute right-0 top-13 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <Link href="/account/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/${session.user.username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            My Page
                                        </Link>
                                    </li>

                                    <li onClick={() => signOut({ callbackUrl: "/" })} className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Sign out
                                    </li>

                                </ul>
                            </div>

                        </button>
                    ) : (
                        < Link href={"/auth/signup"}>
                            <li className='text-indigo-950 bg-white border hover:scale-105 flex justify-center  rounded-lg px-5 py-2.5 w-[100px] sm:w-fit mx-2 font-semibold '>
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