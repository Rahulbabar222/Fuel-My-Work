"use client"
import React from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Dashboard = () => {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        router.push("/login");
    }
    
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard