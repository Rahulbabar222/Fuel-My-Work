"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link'

const AccountSetting = ({setActiveComponent}) => {
    const [accountdetails, setAccountdetails] = useState({ name: "", username: "", email: "",})
    const { data: session,update } = useSession();
    const [active, setActive] = useState("general");
    const [passwordform, setPasswordform] = useState({oldPassword:"",newPassword:"",confirmPassword:"",id:""})

    useEffect(() => {
            setAccountdetails({
                name: session.user.name || "",
                username: session.user.username || "",
                email: session.user.email || "",
                updatedAt:session.user.updatedAt,
                id:session.user.id
            });
            setPasswordform({...passwordform,id:session.user.id})
    }, [session]);

    const handleGeneralChange = (e) => {
        setAccountdetails({ ...accountdetails, [e.target.id]: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setPasswordform({ ...passwordform, [e.target.name]: e.target.value })
    }

    //General Setting
    const handleSave = async () => {
        try {
            const res = await fetch("/api/dashboard/accountsetting/general", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(accountdetails),
            });

            const data = await res.json();

            if (res.ok) {
                update()
                alert("Profile updated!");
                setActiveComponent("home")
            } else {
                alert(data.error || "Failed to update profile.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };


    //Password setting
    const handleUpdate=async()=>{
        try {
            const res = await fetch("/api/dashboard/accountsetting/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwordform),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Password updated!");
            } else {
                alert(data.error || "Failed to update password.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }

    }

    return (
            <div className='p-10 w-1/2 h-fit'>
                <h1 className='text-2xl font-bold px-3 '>Account Setting</h1>
                <div className='px-3 text-lg font-semibold my-2 flex gap-5'>
                    <h2 onClick={()=>setActive("general")} className={`${active==="general"?"text-white": "text-zinc-400"} cursor-pointer`}>General Setting</h2>
                    <h2 onClick={()=>setActive("password")} className={`${active==="password"?"text-white": "text-zinc-400"} cursor-pointer`}>Change Password</h2>
                </div>

                {/* //Generaltab */}
                {active==="general" &&
                <div className='p-10  bg-indigo-950/60 rounded-lg'>
                    <label className='text-lg' htmlFor="name">Name <span className='text-red-400'>{accountdetails.name?"":"* required"}</span></label>
                    <input onChange={handleGeneralChange} value={accountdetails.name} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Name' type="text" name="name" id="name" />

                    <label className='text-lg' htmlFor="username">Username <span className='text-red-400'>{accountdetails.username?"":"* required"}</span></label>
                    <input onChange={handleGeneralChange} value={accountdetails.username} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Username' type="text" id="username" />

                    <label className='text-lg' htmlFor="email">Email <span className='text-red-400'>{accountdetails.email?"":"* required"}</span></label>
                    <input onChange={handleGeneralChange} value={accountdetails.email} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Email' type="email" id="email" />
                    
                    <button disabled={!accountdetails.name || !accountdetails.email || !accountdetails.username} onClick={() => handleSave()} 
                    className="disabled:bg-zinc-500 text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full mx-2 my-5 font-semibold flex justify-center gap-2">
                        <span>Save</span>
                    </button>
                </div>
                }

                {/* pass change tab */}
                {active==="password" &&
                <div className='p-10  bg-indigo-950/60 rounded-lg'>
                    <p className='text-sm'>*Setting password for first time?<Link className='underline' href={"/auth/forgotpassword"} > Click here</Link></p>
                    <p className={`text-sm ${passwordform.oldPassword === passwordform.newPassword?"text-red-400":"text-white"}`}>*Old Password and New password cannot be same.</p>
                    
                    <label className='text-lg' htmlFor="oldPassword">Old Password</label>
                    <input onChange={handlePasswordChange} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Old Password' type="password" name="oldPassword"/>
                    <label className='text-lg' htmlFor="newPassword">New Password</label>
                    <input onChange={handlePasswordChange} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='New Password' type="password" name="newPassword"/>
                    <label className='text-lg' htmlFor="confirmPassword">Conifrm Password</label>
                    <input onChange={handlePasswordChange} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Confirm Password' type="password" name="confirmPassword"/>
                    {passwordform.confirmPassword !== passwordform.newPassword &&
                    <p className='text-sm text-red-400'>Confirm Password not same as New Password.</p>}
                    <button disabled={!passwordform.oldPassword || !passwordform.newPassword || !passwordform.confirmPassword || passwordform.confirmPassword !== passwordform.newPassword} onClick={() => handleUpdate()} 
                    className="disabled:bg-zinc-500 text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full mx-2 my-5 font-semibold flex justify-center gap-2">
                        <span>Update</span>
                    </button>
                </div>
                }
            </div>
    )
}

export default AccountSetting