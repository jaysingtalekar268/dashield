"use client"
import React, { useState } from 'react'

function Login() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPwd, setUserPwd] = useState("");
    return (
        <div className='flex flex-col'>
            <span >Enter user Name</span>
            <input type="text" className='outline' onChange={(e) => setUserName(e.target.value)} value={userName} />
            <span >Enter user Email</span>
            <input type="text" className='outline' onChange={(e) => setUserEmail(e.target.value)} value={userEmail} />
            <span >Enter user Password</span>
            <input type="text" className='outline' onChange={(e) => setUserPwd(e.target.value)} value={userPwd} />
        </div>
    )
}

export default Login