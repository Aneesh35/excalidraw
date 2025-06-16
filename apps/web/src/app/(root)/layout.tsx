import React from 'react'
import { ModeToggle } from '@/components/toggler'
import { Toaster } from "react-hot-toast"
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Toaster position='top-center' />
            <div>{children}</div>
        </div>
    )
}

export default layout