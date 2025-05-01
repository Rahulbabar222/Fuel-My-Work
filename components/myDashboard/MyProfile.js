import React, { useState } from 'react'
import { useSession } from "next-auth/react"

const MyProfile = () => {
    const { data: session,update } = useSession();
    
    const [profileForm, setProfileForm] = useState({
        id:"",name:"",username:"",profileImage:"",
        coverImage:"",about:"",fuelCost:"",
        introLink:"",instagram:"",youtube:"",
        github:"",website:""
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/profile/page/${session.user.id}`, {
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

                setProfileForm({
                    name: session.user.name || "",
                    username: session.user.username || "",
                    id:session.user.id,

                });
        }, [session]);
   
    const handleChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.id]: e.target.value })
    }


    return (
        <div className='p-10 w-1/2 h-fit'>
            <h1 className='text-2xl font-bold p-3 '>Edit Profile</h1>
            <div className='p-10  bg-indigo-950/60 rounded-lg'>

                <label className='text-lg' htmlFor="coverImage">Cover Image Link</label>
                <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='' type="text" id="coverImage" />

                <label className='text-lg' htmlFor="profileImage">Profile Image Link</label>
                <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='' type="text" id="profileImage" />

                <label className='text-lg' htmlFor="name">About</label>
                <textarea
                    id="about"
                    placeholder="Write something about yourself, so your audience can know you better.."
                    className='mt-3 mb-5 w-full h-[200px] p-3 text-lg bg-gray-300 text-gray-700 rounded-lg resize-none'
                />

                <label className='text-lg' htmlFor="introLink">Introduction Video Link</label>
                <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='Youtube video link...' type="text" id="introLink" />

                <label className='text-lg' htmlFor="fuelCost">Fuel Cost</label>
                <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='Enter cost a single fuel...' type="number" id="fuelCost" />

                <hr className="border-t border-gray-400 my-4" />

                <h3 className='text-lg font-bold my-3 '>Link your Social Accounts</h3>

                <label className='text-lg' htmlFor="instagram">Instagram</label>
                <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="instagram" />

                <label className='text-lg' htmlFor="youtube">Youtube</label>
                <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="youtube" />

                <label className='text-lg' htmlFor="github">Github</label>
                <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="github" />

                <label className='text-lg' htmlFor="website">Website</label>
                <input className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="website" />

                <button
                    className="disabled:bg-zinc-500 text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full mx-2 my-5 font-semibold flex justify-center gap-2">
                    <span>Save</span>
                </button>
            </div>
        </div>
    )
}

export default MyProfile