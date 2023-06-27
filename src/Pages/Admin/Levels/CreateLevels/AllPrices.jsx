import React, { useState } from 'react'

const AllPrices = ({item}, data) => {
  const [form, setForm] = useState(item.price)
  // console.log(data)
  return (
    <div className="bg-slate-50 p-3 mb-1 rounded-lg">
      <div className="grid grid-cols-2 mb-2">
        <div className="">
          <div className="flex items-center gap-2 mt-3">
            <input type="checkbox" />
            <div className="text-sm">{item.title} </div>
          </div>
        </div>
        <div className="w-fit ml-auto">
          <div className="flex items-center gap-3">
            <div className="text-sm">&#8358; {item.price}</div>
            <input value={form} onChange={e => setForm(e.target.value)} type="text" placeholder={`#`} className="text-sm border bg-transparent rounded-lg p-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPrices