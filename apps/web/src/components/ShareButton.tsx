"use client"
import React, { useState } from 'react'
import { Share } from "@/components/icons/share"
import { Close } from "@/components/icons/close"
import axios from 'axios'
import toast from 'react-hot-toast'
export const ShareButton = () => {
  const [name, setName] = useState("");
  const [toggler, setToggler] = useState(false);
  const handleShare = async () => {
    try {
      const result = await axios.post("/api/room", { name });
      const url = window.location.href;
      const sharetoken = result.data.shareToken;
      const new_url = url + "/" + sharetoken;
      window.history.pushState({}, "", `/home/#room=${sharetoken}`);
      navigator.clipboard.writeText(new_url);
      toast.success("shareable link create successfully!!")
      setToggler(false)
      setName("")
    }
    catch (err) {
      console.log(err)
      toast.error("unable to create shareable link")
    }
  }
  return (
    <div className='text-white'>
      <button
        onClick={() => setToggler(!toggler)}
        aria-label="Share" className='flex w-24 justify-between bg-purple-500 p-3 rounded'
      >
        <span className='uppercase'>Share</span><Share />
      </button>
      {toggler && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          style={{ top: 0, left: 0, width: '100vw', height: '100vh' }}
        >
          <div className="bg-gray-800 p-8 rounded shadow-lg relative w-1/3">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={() => setToggler(false)}
              aria-label="Close"
            >
              <Close />
            </button>
            <div className='flex flex-col justify-center items-center gap-y-3'>
              <span className='text-purple-500 font-bold text-lg'>
                Live collaboration
              </span>
              <span>
                Invite people to collaborate on your drawing.
              </span>
              <div className='flex w-full justify-center'>
                <button className='bg-blue-800 px-3 py-2 w-fit rounded-md' onClick={handleShare}>Create Room</button>
              </div>
              <span>Or</span>
              <span className='text-purple-500 font-bold text-lg'>
                Shareable link
              </span>

              <span>
                Export as a read-only link.
              </span>
              <div className='flex w-full justify-center'>
                <button className='bg-blue-800 px-3 py-2 w-fit rounded-md' onClick={handleShare}>Create Room</button>
              </div>
              {/* <input type="text" placeholder='Enter your project name' className='border-1 p-4 rounded-md' value={name} onChange={(e) => setName(e.target.value)} /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
