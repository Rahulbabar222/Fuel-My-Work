"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'


const MyAccount = () => {
    const [accountdetails, setAccountdetails] = useState({ name: "", username: "", email: "", profileimage: "", coverimage: "" })
    const { data: session,status,update } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/auth/login");
        } else {
            setAccountdetails({
                name: session.user.name || "",
                username: session.user.username || "",
                email: session.user.email || "",
                profileimage: session.user.profileimage || "",
                coverimage: session.user.coverimage || "",
                updatedAt:session.user.updatedAt,
                id:session.user.id
            });
        }
        console.log(`Account details-${accountdetails}`)
    }, [session,status]);

    const handleChange = (e) => {
        setAccountdetails({ ...accountdetails, [e.target.id]: e.target.value })
    }


    const handleSave = async () => {
        try {
            const res = await fetch("/api/account/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(accountdetails),
            });

            const data = await res.json();

            if (res.ok) {
                update()
                alert("Profile updated!");
                router.push("/account/dashboard");
            } else {
                alert(data.error || "Failed to update profile.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className='flex justify-center items-center w-screen '>
            <div className='p-10 w-1/2'>
                <h1 className='text-2xl font-bold px-3'>My Account</h1>
                <div className='py-3 px-3'>
                    <h3 className='font-semibold text-lg'>Edit profile</h3>
                </div>
                <div className='p-10  bg-indigo-950/60 rounded-lg'>
                    <label className='text-lg' htmlFor="name">Name <span className='text-red-400'>{accountdetails.name?"":"* required"}</span></label>
                    <input onChange={handleChange} value={accountdetails.name} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Name' type="text" name="name" id="name" />

                    <label className='text-lg' htmlFor="username">Username <span className='text-red-400'>{accountdetails.username?"":"* required"}</span></label>
                    <input onChange={handleChange} value={accountdetails.username} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Username' type="text" id="username" />

                    <label className='text-lg' htmlFor="email">Email <span className='text-red-400'>{accountdetails.email?"":"* required"}</span></label>
                    <input onChange={handleChange} value={accountdetails.email} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Email' type="email" id="email" />

                    <label className='text-lg' htmlFor="profileimage">Profile image link</label>
                    <input onChange={handleChange} value={accountdetails.profileimage} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Profile Image' type="text" id="profileimage" />

                    <label className='text-lg' htmlFor="coverimage">Cover image link</label>
                    <input onChange={handleChange} value={accountdetails.coverimage} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Cover Image' type="text" id="coverimage" />

                    <button disabled={!accountdetails.name || !accountdetails.email || !accountdetails.username} onClick={() => handleSave()} 
                    className="disabled:bg-zinc-500 text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full mx-2 my-5 font-semibold flex justify-center gap-2">
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyAccount