import Link from 'next/link'
import React from 'react'

const Navbar = () => {
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
                <h1 className='font-bold text-3xl'>Fuel My Work</h1>
                <p className='text-lg'>&reg;</p>
            </Link>

            <div className='w-1/3 m-3'>
                <ul className='flex justify-end items-center '>
                    <Link href={"/login"}><li className='text-white hover:bg-white border border-indigo-500 hover:border-white hover:text-black  rounded-lg px-5 py-2.5 w-fit mx-2 font-semibold'>Log in</li></Link>
                    <Link href={"/signup"}><li className='text-indigo-950 bg-white border hover:scale-105  rounded-lg px-5 py-2.5 w-fit mx-2 font-semibold '>Sign up</li></Link>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar