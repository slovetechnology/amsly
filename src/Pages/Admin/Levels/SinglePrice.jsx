import React, { useState } from 'react'

const SinglePrice = ({item}) => {
    const [form, setForm] = useState(0)
  return (
    <div className='mb-1'>
        <input type="number" value={form === 0 ? item : form} onChange={e => setForm(e.target.value)} className="input text-sm" />
    </div>
  )
}

export default SinglePrice