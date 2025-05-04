import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';


const Home = () => {
    const { data: session, status } = useSession();
    const [igniters, setIgniters] = useState([])
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        if (status === "loading") return
        const fetchIgniters = async () => {
            try {
                const res = await fetch(`/api/profile/igniters/${session.user.username}`, {
                    method: "GET",
                });

                if (!res.ok) {
                    return;
                }

                const data = await res.json();
                setIgniters(data.igniters);//data obtained is object and need to extract array to map

            } catch (err) {
                console.error("Error fetching igniters:", err);
            }
        };
        fetchIgniters();
    }, [session])

    useEffect(() => {
        const total = igniters
            .filter(item => item.amount)
            .reduce((sum, item) => sum + item.amount, 0);

        setAmount(total);
    }, [igniters]);

    const copytoClipboard = (text) => {
        navigator.clipboard.writeText(text);
    }
    return (
        <div className='w-full flex flex-col items-center'>

            {status === "loading" ? (
                <div>loading....</div>
            ) : (
                <>
                    <div className='my-5 py-5 sm:px-10 lg:px-20 w-full xl:w-2/3 xl:px-0 h-fit bg-indigo-950/40 rounded-xl'>

                        <div className='flex flex-col lg:flex-row items-center justify-between px-4'>
                            <div className='flex flex-col lg:flex-row items-center gap-5'>
                                <div className='rounded-full cover'>
                                    <img className='object-cover w-[100px] h-[100px] rounded-full' src="/profile.png" alt="" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-lg text-center lg:text-start'>Hi, {session.user.name || session.user.username}</h2>
                                    <h3 className='text-gray-300 text-center lg:text-start'>fuelmywork.com/{session.user.username}</h3>
                                </div>
                            </div>
                            <button onClick={() => { copytoClipboard(`fuelmywork.com/${session.user.username}`); toast("Copied to clipboard ") }} className='flex mt-5 lg:mt-0 items-center gap-2 text-black bg-white px-3 py-1 rounded-full hover:scale-105'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                    <path d="M8 7C8 7 10.1958 4.28386 11.4044 3.23889C11.5987 3.0709 11.8169 2.99152 12.0337 3.00072C12.2282 3.00897 12.4215 3.08844 12.5958 3.23912C13.8041 4.28428 16 7 16 7M12.0337 4L12.0337 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M8 11C6.59987 11 5.8998 11 5.36502 11.2725C4.89462 11.5122 4.51217 11.8946 4.27248 12.365C4 12.8998 4 13.5999 4 15V16C4 18.357 4 19.5355 4.73223 20.2678C5.46447 21 6.64298 21 9 21H15C17.357 21 18.5355 21 19.2678 20.2678C20 19.5355 20 18.357 20 16V15C20 13.5999 20 12.8998 19.7275 12.365C19.4878 11.8946 19.1054 11.5122 18.635 11.2725C18.1002 11 17.4001 11 16 11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span className='font-semibold'>Share Page</span>
                            </button>
                        </div>

                        <hr className='m-7 border-zinc-700' />

                        <div>
                            <div className='flex items-center gap-5 px-5 '>
                                <h3 className='text-3xl font-medium'>Earnings</h3>
                                <button className='flex items-center px-3 py-1 rounded-full border-2 border-gray-400'>
                                    <span>Last 30 days</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none">
                                        <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                            </div>

                            <div className='px-5 mt-5'>
                                <h3 onClick={() => console.log(igniters)} className='text-5xl font-semibold'>₹ {amount}</h3>
                            </div>
                        </div>
                    </div>

                    <div className='mb-5 py-5 sm:px-10 lg:px-25 w-full xl:w-2/3 xl:px-0 h-fit bg-indigo-950/40 rounded-xl'>
                        {igniters ? (
                            <div className='w-full h-[500px]'>
                                <ul className='px-5' >
                                    <li className='text-lg font-semibold'>Total {igniters.length} Igniters have fueled your work.</li>
                                    <hr className='my-4 border-zinc-700' />
                                    {igniters && igniters.length > 0 ? (
                                        igniters.map(igniter => (
                                            <li key={igniter.paidAt} className='flex items-center gap-3 mb-7'>
                                                <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full flex'>
                                                    <img className='object-cover rounded-full' src="/profile/default.png" alt="" />
                                                </div>
                                                <div className='w-full'>
                                                    <p><span className='font-bold'>{igniter.senderName}</span> fueled your work with ₹ {igniter.amount}.</p>
                                                    {igniter.message && <p className='bg-white/80 text-black p-2 mt-2 rounded-md'>{igniter.message}</p>}
                                                    <div className='p-2 mt-2 rounded-md border border-zinc-700'>
                                                        {igniter.fromUseremail === "Anonymous" && igniter.fromUsername === "Anonymous" ? (
                                                            <p>This was a Anonymous support, Keep up good work!</p>
                                                        ) : (
                                                            <>
                                                                <p>Appreciate your supporter</p>
                                                                <p>Email - {igniter.fromUseremail}</p>
                                                                <p>User Page - <Link className='underline' href={`/${igniter.fromUsername}`}>{igniter.fromUsername}</Link></p>
                                                            </>
                                                        )}

                                                    </div>
                                                </div>
                                            </li>
                                        ))) : (
                                        <li className='text-lg py-2'>No Igniters🔥 yet — be the first to fuel their journey!</li>
                                    )}
                                </ul>
                            </div>
                        ) : (
                            <div className='w-full h-[300px] flex flex-col items-center justify-center gap-5'>
                                <p className='text-5xl'>🔥</p>
                                <h3 className='text-lg font-medium'>You dont have any igniters yet</h3>
                                <h3 className='text-gray-300'>Share your page with your audience to get started.</h3>
                            </div>
                        )}


                    </div >
                </>
            )}

        </div >
    )

}

export default Home