import React, { useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Autos } from '../../../Components/Utils/Utility'

const Automation = () => {
    return (
        <AdminLayout pagetitle="Automation">
            <div className="">
                <div>
                    <div className="w-11/12 max-w-3xl mx-auto flex flex-col">
                        {Autos.map((item, i) => (
                            <Link to={`/auth/admin/automation/${item.category}`} key={i} className="bg-white p-4 text-center cursor-pointer uppercase rounded-lg mb-2">{item.title}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Automation