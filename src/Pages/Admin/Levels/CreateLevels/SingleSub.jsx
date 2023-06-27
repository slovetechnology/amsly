import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

const SingleSub = ({item}) => {
    const [added, setAdded] = useState(false)
    const handleLocking = (id) => {
        setAdded(!added)
    }
    return (
        <div className="flex mb-1 items-center justify-between flex-row w-full p-[0.77rem]">
            <div className="text-sm flex items-center gap-3">
                <div onClick={() => handleLocking(item.id)} className={`flex items-center justify-center w-5 cursor-pointer h-5 ${added ? 'bg-indigo-700 text-white' : 'text-slate-400 border'} hover:scale-150 transition-all`}> <FaCheck /> </div>
                {item.title}
            </div>
            <div className="text-sm">{item.price}</div>
        </div>
    )
}

export default SingleSub