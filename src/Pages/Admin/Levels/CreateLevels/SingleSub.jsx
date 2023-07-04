import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

const SingleSub = ({ item, packs,subId }) => {
    const [added, setAdded] = useState(true)
    const [forms, setForms] = useState('')

    useEffect(() => {
        setForms(item.price)
        const findData = packs.find(data => data.id === item.id)
        if(findData) return setAdded(true)
    }, [])
    const handleLocking = (id) => {
        setAdded(!added)
    }

(item.network === subId) && console.log(subId, item.network, 'checking')
   if(item.network === subId) return (
        <div className="grid grid-cols-7">
            <div className="col-span-5">
                <div className="flex mb-1 items-center justify-between flex-row w-full p-[0.77rem]">
                    <div className="text-sm flex items-center gap-3">
                        <div onClick={() => handleLocking(item.id)} className={`flex items-center justify-center w-5 cursor-pointer h-5 ${added ? 'bg-indigo-700 text-white' : 'text-slate-200 border'} hover:scale-150 transition-all`}> <FaCheck /> </div>
                        {item.title}
                    </div>
                    <div className="text-sm">&#8358;{item.price.toLocaleString()}</div>
                </div>
            </div>
            <div className="col-span-2">
                {added ? <input value={forms} onChange={e => setForms(e.target.value)} type="text" className="input" />
                :
                <div type="text" readOnly className="p-5 rounded-lg bg-slate-100" />
                }
            </div>
        </div>
    )
}

export default SingleSub