import { Link } from 'react-router-dom'
import { Autos } from '/src/Components/Utils/Utility'
import React, { useState } from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'

const PlanAutomation = () => {
    const [active, setActive] = useState('')
    
    return (
        <AdminLayout>
            <div className={!active.tag ? '' : 'hidden'}>
                <div className="w-11/12 max-w-3xl mx-auto flex flex-col">
                    {Autos.map((item, i) => (
                        <Link to={`/auth/admin/integration/plans/${item.category}`} key={i} className="bg-white p-4 text-center cursor-pointer uppercase rounded-lg mb-2">{item.title}</Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    )
}

export default PlanAutomation