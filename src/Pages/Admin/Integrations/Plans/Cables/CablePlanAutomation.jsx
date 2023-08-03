

import React from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CablePlanAutomation = () => {
  const { subs } = useSelector(state => state.data)
  return (
    <AdminLayout pagetitle="Automation Service">
      <div className="w-11/12 max-w-3xl mx-auto flex flex-col">
        <Link to="/auth/admin/integration/plans" className='bg-indigo-700 py-2 rounded-lg mb-10 px-4 text-white text-sm capitalize w-fit'>back</Link>
        {subs.map((item, i) => (
          item.category?.slice(0, 7) === 'cable' && item.locked === 'no' && <Link to={`/auth/admin/integration/plans/cable/${item.id}`} key={i} className="bg-white p-4 text-center cursor-pointer uppercase rounded-lg mb-2">{item.network}</Link>
        ))}
      </div>
    </AdminLayout>
  )
}

export default CablePlanAutomation