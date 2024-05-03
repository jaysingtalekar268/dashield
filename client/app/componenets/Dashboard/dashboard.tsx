"use client"
import React, { useEffect, useState } from 'react'
import Activity from '../Activity/activity'
import { logoutUser } from '@/app/query/user.query'
import { getUserActivities } from '@/app/query/activity.query';
import { useRouter } from 'next/navigation';
import { getUserId } from '@/app/utils/userId';
import AdminDashboard from './adminDashboard';
function Dashboard() {

    const [activities, setActivities] = useState([]);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        setUserRole(getUserId().role)
    }, []);

    const router = useRouter();

    const handleGetActivities = async () => {
        const response = await getUserActivities();

        if (response?.success) {
            console.warn(response)
            setActivities(response.activites);
        }
    }

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result.success)
            router.replace("/")
    }
    if (userRole === "user") {
        return (
            <div>
                <div className='grid gap-y-2'>
                    {activities && activities.map((activity, index) =>
                        <Activity key={index} activityData={activity} />)}
                </div>
                <div className='flex flex-col'>
                    <button onClick={handleLogout}>logout</button>
                    <button onClick={handleGetActivities}>get activites</button>
                </div>
            </div>

        )
    } else {
        return (<div>
            <AdminDashboard></AdminDashboard>
        </div>
        )
    }
}

export default Dashboard