"use client"
import React, { useEffect, useState } from 'react'
import AdminSideMenu from './adminSideMenu'
import { getUserId } from '@/app/utils/userId'

function SideMenu() {
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        setUserRole(getUserId().role);
    }, []);


    return (
        <div className='w-1/6 border border-green-500 h-screen '>
            {userRole == "user" &&
                <div className='flex flex-col '>
                    <span>User</span>
                    <span>User</span>
                    <span>User</span>
                    <span>User</span>
                    <span>User</span>
                </div>}
            {userRole == "admin" && <AdminSideMenu />}
        </div>
    )

}

export default SideMenu