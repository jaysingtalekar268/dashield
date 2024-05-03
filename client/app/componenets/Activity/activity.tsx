import React from 'react'

type activityProps = {
    activityData: {
        deviceDetails: {
            userAgent: string,
            platform: string,
            origin: string,
            referer: string,
        },
        loggedIn: Number,
        loggedOut: Number,
    }
}


function Activity({ activityData }: activityProps) {
    return (
        <div className='flex flex-col'>
            <span>Device Name:{activityData.deviceDetails.platform}</span>
            <span>Logged In: {new Date(Number(activityData.loggedIn)).toString()}</span>
            <span>Logged Out: {new Date(Number(activityData.loggedOut)).toString()}</span>
        </div>
    )
}

export default Activity