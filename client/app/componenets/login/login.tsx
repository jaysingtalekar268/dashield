"use client"
import React, { useState } from 'react'
import { registerUser } from '@/app/query/user.query';

function Login() {
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPwd, setUserPwd] = useState<string>("");

    const [warnUserName, setWarnUserName] = useState<string>();
    const [warnUserEmail, setWarnUserEmail] = useState<string>();
    const [warnUserPwd, setWarnUserPwd] = useState<string>();

    const handleRegistration = async () => {
        const userData= {
            userName,
            userEmail,
            userPwd
        }
        await registerUser(userData);
    }


    const handleUserName = (value: string) => {
        setUserName(value);
        if (value.length < 4 || value.length > 12)
            return setWarnUserName("User name shoould be of 4 to 12 characters")
        const regexp = new RegExp('[a-zA-Z]');
        if (!regexp.test(value))
            return setWarnUserName("User name shoould contain letters only")
        setWarnUserName("")
    }
    const handleUserEmail = (value: string) => {
        setUserEmail(value);
        const regexp = new RegExp('^[a-zA-Z0-9.-_%+]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}$');
        if (!regexp.test(value))
            return setWarnUserEmail("enter valid email address")
        setWarnUserEmail("");
    }
    const handleUserPwd = (value: string) => {
        setUserPwd(value);
        if (value.length < 6 || value.length > 12)
            return setWarnUserPwd("Password shoould be of 6 to 10 characters")
        let regexp = new RegExp('[0-9]');
        if (!regexp.test(value))
            return setWarnUserPwd("Password shoould contain at least one number ")
        regexp = new RegExp('[A-Z]+');
        if (!regexp.test(value))
            return setWarnUserPwd("Password shoould contain at least one uppercase letter ")
        regexp = new RegExp('[a-z]+');
        if (!regexp.test(value))
            return setWarnUserPwd("Password shoould contain at least one smallcase letter ")
        regexp = new RegExp('[@#$%+-]+');
        if (!regexp.test(value))
            return setWarnUserPwd("Password shoould contain at least one special character @ # $ % + - ")

        setWarnUserPwd("")
    }


    return (
        <div className='flex flex-col'>
            <span >Enter user Name</span>
            <input type="text" className='outline' onChange={(e) => handleUserName(e.target.value)} value={userName} />
            <span className='text-red-500'>{warnUserName}</span>
            <span >Enter user Email</span>
            <input type="text" className='outline' onChange={(e) => handleUserEmail(e.target.value)} value={userEmail} />
            <span className='text-red-500'>{warnUserEmail}</span>
            <span >Enter user Password</span>
            <input type="text" className='outline' onChange={(e) => handleUserPwd(e.target.value)} value={userPwd} />
            <span className='text-red-500'>{warnUserPwd}</span>
            <button onClick={handleRegistration}
                disabled={warnUserName !== "" && warnUserEmail !== "" && warnUserPwd !== ""}
            >Create Account</button>
        </div>
    )
}

export default Login