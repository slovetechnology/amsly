import React from 'react'
import AdminLayout from '../../Components/Admin/AdminLayout'
import { FaArrowRight } from 'react-icons/fa'

const QueryTransaction = () => {
  return (
    <AdminLayout pagetitle="Query Users Email">
        <div className="w-11/12 mx-auto">
            <div className="bg-white rounded-lg mb-10 px-4 py-8">
                <div className="mt-10">
                    <div className="text-zinc-600">User's Email Address</div>
                    <input type="number" className="input" />
                    <div className="w-11/12 mx-auto"><button className="bg-indigo-600 rounded-lg w-full mt-5 py-3 uppercase text-white font-semibold flex items-center justify-center gap-10">search <FaArrowRight /> </button></div>
                </div>
            </div>
        </div>
    </AdminLayout>
  )
}

export default QueryTransaction