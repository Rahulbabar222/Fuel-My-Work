"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import AccountSetting from '@/components/myDashboard/AccountSetting'
import Sidebar from '@/components/myDashboard/Sidebar'
import Home from '@/components/myDashboard/Home'
import MyProfile from '@/components/myDashboard/MyProfile'
import Payout from '@/components/myDashboard/Payout'

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState("home")

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/auth/login");
        }
        console.log(session)
    }, [session, status])


    const renderComponent = () => {
        switch (activeComponent) {
            case 'home':
                return <Home/>;
            case 'accountSetting':
                return <AccountSetting setActiveComponent={setActiveComponent} />;
            case 'myProfile':
                return <MyProfile/>;
            case 'payout':
                return <Payout/>;
            default:
                return null;
        }
    };

    return (
        <div style={{ height: "calc(100vh - 160px)" }} className='w-full flex '>
            <div className='bg-indigo-950/30 my-5 ml-5 w-full sm:w-1/5 p-3'>
                <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            </div>

            <div className='bg-indigo-950/30 my-5 mx-5 w-full sm:4/5 flex justify-center overflow-y-auto'>
                {renderComponent()}
            </div>
        </div>
    )
}

export default Dashboard