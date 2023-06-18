import React, { useState } from 'react'

const SingleLockToggler = ({ data, sendData }) => {
    const [active, setActive] = useState(data.locked === 'no' ? false : true)
    const handleToggle = () => {
        sendData(data)
        setActive(!active)
    }
    return (
        <div className="grid grid-cols-2 mb-8">
            <div className="">
                <div className="uppercase">{data.network}</div>
            </div>
            <div className="w-fit ml-auto">
                <div className="bg-slate-200 rounded-full h-5 relative w-16">
                    <div onClick={handleToggle} className={`absolute -top-1 cursor-pointer rounded-full h-7 w-7 ${active ? 'right-0 bg-indigo-600' : 'left-0 bg-slate-400'}`}></div>
                </div>
            </div>
        </div>
    )
}

export default SingleLockToggler