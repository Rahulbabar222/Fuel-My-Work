"use client"
import Payment from '@/components/myPage/PaymentSection';
import SocialLink from '@/components/myPage/SocialLink';
import React, { use, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


const Username = ({ params }) => {
    const { username } = use(params);
    const [igniters, setIgniters] = useState([])
    const [pageform, setPageform] = useState({})
    const [profileexist, setProfileexist] = useState(null)
    

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/profile/page/${username}`, {
                    method: "GET",
                });

                if (!res.ok) {
                    setProfileexist(false);
                    return;
                }

                const data = await res.json();
                setPageform(data);
                setProfileexist(true);
            } catch (err) {
                toast("Error fetching profile:", err);
                setProfileexist(false);
            }
        };
        fetchProfile();

        const fetchIgniters = async () => {
            try {
                const res = await fetch(`/api/profile/igniters/${username}`, {
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
    }, [username]);
    return (
        <>
            {/* loading screen */}
            {profileexist === null &&
                <div style={{ height: "calc(100vh - 160px)" }} className='w-full flex justify-center items-center'>
                    <div className='w-full sm:max-w-1/4 sm:min-w-1/4 flex justify-center items-center p-10 m-10 bg-indigo-950/30 rounded-md '>
                        Please wait, Loading...
                    </div>
                </div>}

            {/* profilepage */}
            {profileexist === true &&
                <div>
                    <ToastContainer/>
                    <div className='flex flex-col items-center'>
                        <div className='cover w-full '>
                            <img className='object-cover w-full max-h-[400px]' src={pageform.coverImage} alt="" />
                        </div>
                        <div className='cover rounded-md  '>
                            <img className='object-cover border border-zinc-400 rounded-md w-[150px] h-[150px] -mt-[75px]' src={pageform.profileImage} alt="" />
                        </div>
                    </div>
                    <div className='w-full h-fit gap-2 flex flex-col items-center my-3'>
                        <h2 className='text-4xl font-semibold'>{pageform.name ? pageform.name : pageform.username}</h2>
                        <h6 className='text-sm'>345 Igniters 🔥
                        </h6>

                        <div className='flex flex-wrap justify-center gap-3 w-1/2 sm:w-fit'>
                            {/* SocialLinks  */}
                            <SocialLink
                                website={pageform.website}
                                behance={pageform.behance}
                                discord={pageform.discord}
                                github={pageform.github}
                                facebook={pageform.facebook}
                                instagram={pageform.instagram}
                                linkedin={pageform.linkedin}
                                pinterest={pageform.pinterest}
                                telegram={pageform.telegram}
                                youtube={pageform.youtube}
                                snapchat={pageform.snapchat}
                                reddit={pageform.reddit}
                                x={pageform.x}
                                whatsapp={pageform.whatsapp}
                            />
                        </div>

                    </div>
                    <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center h-fit w-full px-5 '>
                        <div className=' w-full md:w-2/3 lg:w-1/3 h-fit m-5 bg-indigo-950/60 p-5 rounded-lg' >
                            <h3 className='text-xl font-bold'>About {pageform.name ? pageform.name : pageform.username}</h3>
                            <p className='my-3 '>
                                {pageform.title}
                            </p>
                            {pageform.introLink &&
                                <div className='cover rounded-md w-full'>
                                    <iframe
                                        className='w-full h-[250px] rounded-md'
                                        src={`${pageform.introLink}?autoplay=0`}
                                        title="YouTube video"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            }

                            <p className='my-3 '>{pageform.about}</p>
                            <hr className="border-t border-gray-300" />
                            <h3 className='text-xl font-bold my-3'>Recent Igniters</h3>
                            <ul >
                                {igniters && igniters.length > 0 ? (
                                    igniters.map(igniter => (
                                        <li key={igniter.paidAt} className='flex items-center gap-3 mb-5'>
                                            <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full flex'>
                                                <img className='object-cover rounded-full' src="/profile/default.png" alt="" />
                                            </div>
                                            <div className='w-full'>
                                                <p><span className='font-bold'>{igniter.senderName}</span> fueled your work.</p>
                                                {igniter.message && <p className='bg-white/80 text-black p-2 mt-2 rounded-md'>{igniter.message}</p>}
                                            </div>
                                        </li>
                                    ))) : (
                                    <li className='text-lg py-2'>No Igniters🔥 yet — be the first to fuel their journey!</li>
                                )}
                            </ul>

                            <button className="text-indigo-950 bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full m-2 font-semibold ">
                                Show More
                            </button>
                        </div>
                        <div className='w-full md:w-2/3 lg:w-1/3 h-fit m-5 rounded-lg' >
                            <Payment
                                username={pageform.username}
                                fuelCost={pageform.fuelCost}
                                id={pageform.id} />
                            <div>


                            </div>

                        </div>
                    </div>
                </div>
            }

            {/* Profile do not exist */}
            {profileexist === false &&
                <div style={{ height: "calc(100vh - 160px)" }} className='w-full flex justify-center items-center'>
                    <div className='w-full sm:max-w-1/4 sm:min-w-1/4 flex justify-center items-center p-10 m-10 bg-indigo-950/30 text-center rounded-md'>
                        Profile with username-{username} doesnt exist.
                    </div>
                </div>}

        </>
    )
}

export default Username