"use client"
import React from 'react'
import axios from 'axios'
import { auth } from '@/auth'
const page = async () => {
    // const session = await auth();
    return (
        <div className='text-white'>
            <button onClick={async () => {
                const result = await axios.post("/api/room", {
                    room: "hello"
                })
                console.log(result.data.cookie)
                console.log(result.data.token)
            }} >
                create Room
            </button>
        </div>
    )
}

export default page