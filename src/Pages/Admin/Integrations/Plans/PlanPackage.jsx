import React from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Api, GetUrl } from '/src/Components/Utils/Apis'

const PlanPackage = () => {
    const { pack, id } = useParams()
    const { subdata } = useSelector(state => state.data)
    const FetchAutomation = async () => {
        const response = await GetUrl(Api.subs.get_automation_service)
        if (response.status === 200) return response.msg
    }

    return (
        <AdminLayout pagetitle="Automation Packages">
            <div className="">
                <div className="w-full max-w-xl mx-auto">
                    {subdata.map((item, i) => (
                        item.network.toString() === pack &&
                        <Link to={`/auth/admin/integration/plans/${id}/${pack}/${item.id}`} key={i}className='bg-white hover:scale-110 py-6 text-center bg-white shadow-xl flex flex-col rounded-lg mb-4 transition-all'>
                            <div className="text-sm">{item.title} = &#8358;{item.price}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    )
}

export default PlanPackage