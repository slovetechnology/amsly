import React from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import slugify from 'slugify'

const AutomationService = () => {
  const { id } = useParams()
  const { subs } = useSelector(state => state.data)

  const handleDuplicates = () => {
    const genSubs = subs.filter((obj, index) => {
      return index === subs.findIndex(o => obj.tag === o.tag)
    })
    return genSubs.map((item, i) => (
      item.category.slice(0, 3) === id.slice(0, 3) && item.locked === 'no' &&
      <Link to={`/auth/admin/automation/${id}/${item.tag || slugify(item.network, {lower: true})}`} key={i} className="bg-white p-4 text-center cursor-pointer uppercase rounded-lg mb-2">{item.tag || item.network}</Link>
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

export default AutomationService