import React from 'react'
import { ModeToggle } from '@/components/toggler'
import { Toaster } from "react-hot-toast"
import { signOut,auth } from '@/auth'
import { redirect } from 'next/navigation'

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session=await auth();
    return (
        <div>
            {session &&
            <div className='w-full p-5 bg-white text-black flex'>
                <form action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                }}>
                    <button type='submit'>signOut</button>
                </form>
            </div>
}
            <Toaster position='top-center' />
            <div>{children}</div>
        </div>
    )
}

export default layout