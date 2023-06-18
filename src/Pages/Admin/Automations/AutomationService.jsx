import React from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AutomationService = () => {
  const { id } = useParams()
  const { subs } = useSelector(state => state.data)
  return (
    <AdminLayout pagetitle="Automation Service">
      <div className="w-11/12 max-w-3xl mx-auto flex flex-col">
        <Link to="/auth/admin/automation" className='bg-indigo-700 py-2 rounded-lg mb-10 px-4 text-white text-sm capitalize w-fit'>back</Link>
        {subs.map((item, i) => (
          item.category === id && <Link to={`/auth/admin/automation/${id}/${item.id}`} key={i} className="bg-white p-4 text-center cursor-pointer uppercase rounded-lg mb-2">{item.network}</Link>
        ))}
      </div>
    </AdminLayout>
  )
}

export default AutomationService