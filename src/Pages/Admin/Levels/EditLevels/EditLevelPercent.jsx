

import React from 'react'
import { BsCheck } from 'react-icons/bs'

const EditLevelPercent = ({item, handelForms, handleAddup, localState}) => {
    const active = localState.find((data) => data.sub === item.id)
    return (
        <div className="mb-3">
            <div className="grid grid-cols-2">
                <div className="flex items-center gap-2">
                    <button onClick={() => handleAddup(item)} className={`w-4 h-4 flex items-center justify-center ${active ? 'bg-blue-700 text-white' : 'bg-slate-300 text-slate-700'}`}> <BsCheck /> </button>
                    <div className="text-sm text-zinc-600">All Percent</div>
                </div>
                <div className="w-fit ml-auto">
                    <div className="flex items-center gap-3">
                        <div className="text-sm"> %</div>
                        <div className="">
                            {active ?
                            <input onChange={e => handelForms(item.id, e.target.value)} value={item.percent || ''} type="text" className='border text-sm p-3 rounded-lg' /> : 
                            <input readOnly type="text" value={``} className='border text-sm p-3 bg-slate-100 rounded-lg' />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditLevelPercent