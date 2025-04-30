"use client"
import Payment from '@/components/myPage/Payment';
import React, {use, useEffect, useState } from 'react'

const Username = ({ params }) => {
    const { username } = use(params);
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
                console.log(pageform)
            } catch (err) {
                console.error("Error fetching profile:", err);
                setProfileexist(false);
            }
        };
        fetchProfile();
    }, [username]);
    return (
        <> 
        {/* loading screen */}
        {profileexist===null &&
         <div>cdcd</div>}

        {/* profilepage */}
        {profileexist===true &&
          <div>
          <div className='flex flex-col items-center'>
              <div className='cover w-full '>
                  <img className='object-cover w-full max-h-[400px]' src="/cover.png" alt="" />
              </div>
              <div className='cover rounded-md  '>
                  <img className='object-cover border border-zinc-400 rounded-md w-[150px] h-[150px] -mt-[75px]' src="/profile.png" alt="" />
              </div>
          </div>
          <div className='w-full h-fit gap-2 flex flex-col items-center my-3'>
              <h2 className='text-4xl font-semibold'>{pageform.name}</h2>
              <h6 className='text-sm'>345 Igniters 🔥</h6>
              <div className='flex gap-3'>
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 448 512">
                          <path
                              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                  </span>
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 448 512">
                          <path
                              d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                      </svg>
                  </span>
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 496 512">
                          <path
                              d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" />
                      </svg>
                  </span>

                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 576 512">
                          <path
                              d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                      </svg>
                  </span>
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 512 512">
                          <path
                              d="M373 138.6c-25.2 0-46.3-17.5-51.9-41l0 0c-30.6 4.3-54.2 30.7-54.2 62.4l0 .2c47.4 1.8 90.6 15.1 124.9 36.3c12.6-9.7 28.4-15.5 45.5-15.5c41.3 0 74.7 33.4 74.7 74.7c0 29.8-17.4 55.5-42.7 67.5c-2.4 86.8-97 156.6-213.2 156.6S45.5 410.1 43 323.4C17.6 311.5 0 285.7 0 255.7c0-41.3 33.4-74.7 74.7-74.7c17.2 0 33 5.8 45.7 15.6c34-21.1 76.8-34.4 123.7-36.4l0-.3c0-44.3 33.7-80.9 76.8-85.5C325.8 50.2 347.2 32 373 32c29.4 0 53.3 23.9 53.3 53.3s-23.9 53.3-53.3 53.3zM157.5 255.3c-20.9 0-38.9 20.8-40.2 47.9s17.1 38.1 38 38.1s36.6-9.8 37.8-36.9s-14.7-49.1-35.7-49.1zM395 303.1c-1.2-27.1-19.2-47.9-40.2-47.9s-36.9 22-35.7 49.1c1.2 27.1 16.9 36.9 37.8 36.9s39.3-11 38-38.1zm-60.1 70.8c1.5-3.6-1-7.7-4.9-8.1c-23-2.3-47.9-3.6-73.8-3.6s-50.8 1.3-73.8 3.6c-3.9 .4-6.4 4.5-4.9 8.1c12.9 30.8 43.3 52.4 78.7 52.4s65.8-21.6 78.7-52.4z" />
                      </svg>
                  </span>
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 512 512">
                          <path
                              d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                      </svg>
                  </span>
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 448 512">
                          <path
                              d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                  </span>
              </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center h-fit w-full px-5 '>
              <div className=' w-full md:w-2/3 lg:w-1/3 h-fit m-5 bg-indigo-950/60 p-5 rounded-lg' >
                  <h3 className='text-xl font-bold'>About {pageform.name}</h3>
                  <p className='my-3 '>
                      Indoor Cycle & Strength At-Home Workout Programs
                  </p>
                  <div className='cover rounded-md w-full'>
                      <iframe
                          className='w-full h-[250px] rounded-md'
                          src="https://www.youtube.com/embed/QtaorVNAwbI?autoplay=0"
                          title="YouTube video"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                      ></iframe>
                  </div>
                  <p className='my-3 '>This page was created for those of you that asked how you could support the workouts I have created on YouTube.<br /><br />
                      Your kindness does not go unnoticed and this is very much appreciated. I can't say thank you enough for allowing me into your workouts and for being my workout bff. </p>
                  <hr className="border-t border-gray-300" />
                  <h3 className='text-xl font-bold my-3'>Recent Igniters</h3>
                  <ul >
                      <li className='flex items-center gap-3 mb-5'>
                          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full flex'>
                              <img className='object-cover rounded-full' src="/profile/image-5.png" alt="" />
                          </div>
                          <div className='w-full'>
                              <p><span className='font-bold'>Wendy Charles</span> fueled your work.</p>
                              <p className='bg-white/80 text-black p-2 mt-2 rounded-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, distinctio.</p>
                          </div>
                      </li>

                      <li className='flex items-center gap-3 mb-5'>
                          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full'>
                              <img className='object-cover rounded-full' src="/profile/image-4.png" alt="" />
                          </div>
                          <div className='w-full'>
                              <p><span className='font-bold'>Wendy Charles</span> fueled your work.</p>
                              <p className='bg-white/80 text-black p-2 mt-2 rounded-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, distinctio.</p>
                          </div>
                      </li>

                      <li className='flex items-center gap-3 mb-5'>
                          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full'>
                              <img className='object-cover rounded-full' src="/profile/default.png" alt="" />
                          </div>
                          <div className='w-full'>
                              <p><span className='font-bold'>Wendy Charles</span> fueled your work.</p>
                          </div>
                      </li>

                      <li className='flex items-center gap-3 mb-5'>
                          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full'>
                              <img className='object-cover rounded-full' src="/profile/image-3.png" alt="" />
                          </div>
                          <div className='w-full'>
                              <p><span className='font-bold'>Wendy Charles</span> fueled your work.</p>
                              <p className='bg-white/80 text-black p-2 mt-2 rounded-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, distinctio.</p>
                          </div>
                      </li>

                      <li className='flex items-center gap-3 mb-5'>
                          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full'>
                              <img className='object-cover rounded-full' src="/profile/image-2.png" alt="" />
                          </div>
                          <div className='w-full'>
                              <p><span className='font-bold'>Wendy Charles</span> fueled your work.</p>
                          </div>
                      </li>

                      <li className='flex items-center gap-3 mb-5'>
                          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full'>
                              <img className='object-cover rounded-full' src="/profile/default.png" alt="" />
                          </div>
                          <div className='w-full'>
                              <p><span className='font-bold'>Wendy Charles</span> fueled your work.</p>
                              <p className='bg-white/80 text-black p-2 mt-2 rounded-md'>Lorem ipsum dolor sit.</p>
                          </div>
                      </li>

                      <li className='flex items-center gap-3 mb-5'>
                          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full'>
                              <img className='object-cover rounded-full' src="/profile/image-1.png" alt="" />
                          </div>
                          <div className='w-full'>
                              <p><span className='font-bold'>Wendy Charles</span> fueled your work.</p>
                          </div>
                      </li>
                  </ul>

                  <button className="text-indigo-950 bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full m-2 font-semibold ">
                      Show More
                  </button>
              </div>
              <div className='w-full md:w-2/3 lg:w-1/3 h-fit m-5 rounded-lg' >
                  <Payment name={pageform.name}/>
                  <div>

                  </div>

              </div>
          </div>
      </div>
        } 

        {/* Profile do not exist */}
        {profileexist===false &&    
        <div>
                Profile do not exist
            </div>
        }
        
        </>
    )
}

export default Username