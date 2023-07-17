import React from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AutomationNetwork = () => {
  const { id, net } = useParams()
  const { subs } = useSelector(state => state.data)
  
  const handleDuplicates = () => {
    return subs.map((item, i) => (
      (item.tag?.slice(0, 3).toLowerCase() || item.network?.slice(0, 3).toLowerCase()) === net.slice(0, 3) && item.locked === 'no' && 
    <Link to={`/auth/admin/automation/${id}/${net}/${item.id}`} key={i} className="bg-white p-4 text-center cursor-pointer uppercase rounded-lg mb-2">{item.network}</Link>
    ))
  }

  return (
    <AdminLayout pagetitle="Automation Service">
      <div className="w-11/12 max-w-3xl mx-auto flex flex-col">
        <Link to={`/auth/admin/automation/${id}`} className='bg-indigo-700 py-2 rounded-lg mb-10 px-4 text-white text-sm capitalize w-fit'>back</Link>
        {handleDuplicates()}
      </div>
    </AdminLayout>
  )
}

export default AutomationNetwork