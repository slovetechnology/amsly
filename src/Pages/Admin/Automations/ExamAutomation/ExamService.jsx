

import React from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import slugify from 'slugify'

const ExamService = () => {
  const { subs } = useSelector(state => state.data)
  
  const handleDuplicates = () => {
    const genSubs = subs.filter((obj, index) => {
      return index === subs.findIndex(o => obj.tag === o.tag && obj.category.startsWith(o.category))
    })
    return subs.map((item, i) => (
      item.category.startsWith(`exam`) && item.locked === 'no' &&
      <Link to={`/auth/admin/automation/exam/${item.tag || slugify(item.network, {lower: true})}`} key={i} className="bg-white p-4 text-center cursor-pointer uppercase rounded-lg mb-2">{item.tag || item.network}</Link>
    ))
  }
  
  return (
    <AdminLayout pagetitle="Automation networks">
      <div className="w-11/12 max-w-3xl mx-auto flex flex-col">
        <Link to="/auth/admin/automation" className='bg-indigo-700 py-2 rounded-lg mb-10 px-4 text-white text-sm capitalize w-fit'>back</Link>
        {handleDuplicates()}
      </div>
    </AdminLayout>
  )
}

export default ExamService