

import React, { useState } from 'react'
import { BsPerson } from 'react-icons/bs'

const EditSetupUser = ({user, sendUser, localState}) => {
    const active = localState?.find((data) => data.id === user.id)
  return (
    <div>
        <div className={`border ${active ? 'border-blue-700' : 'border-slate-300'} transition-all rounded-lg p-3`}>
            <div className="grid grid-cols-6">
                <div className="col-span-4">
                    <div className="flex gap-2">
                        <div className={`rounded-full w-fit p-3 transition-all ${active ? 'bg-blue-600/70 text-blue-100 border border-blue-700' : 'bg-slate-400/40 text-slate-800 border border-slate-700'}`}> <BsPerson /> </div>
                        <div className="">
                            <div className="text-sm">Name: <span className="text-zinc-600">{user.firstname}</span> </div>
                            <div className="text-sm">Current Level: <span className="text-slate-700">{user.level?.title}</span> </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 w-fit ml-auto">
                    <div onClick={() => sendUser(user.id)} className={`rounded-full w-6 h-6 cursor-pointer hover:scale-110 transition-all active:scale-110 ${active ? 'bg-blue-700' : 'bg-slate-300'}`}></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditSetupUser