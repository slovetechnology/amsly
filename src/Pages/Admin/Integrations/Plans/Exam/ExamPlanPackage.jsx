
import React from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Api, GetUrl } from '/src/Components/Utils/Apis'

const ExamPlanPackage = () => {
    const { pack } = useParams()
    const { subdata } = useSelector(state => state.data)
    const FetchAutomation = async () => {
        const response = await GetUrl(Api.subs.get_automation_service)
        if (response.status === 200) return response.msg
    }

    return (
        <AdminLayout pagetitle="Automation Packages">
            <div className="">
                <div className="w-full max-w-xl mx-auto">
                    <div className="mb-10"><Link to="/auth/admin/integration/plans/exam" className='bg-indigo-700 py-2 rounded-lg mb-10 px-4 text-white text-sm capitalize w-fit'>back</Link></div>
                    {subdata.map((item, i) => (
                        item.network.toString() === pack && item.lock === 'no' &&
                        <Link to={`/auth/admin/integration/plans/exam/${pack}/${item.id}`} key={i} className='bg-white hover:scale-110 py-6 text-center shadow-xl flex flex-col rounded-lg mb-4 transition-all'>
                            <div className="text-sm">{item.title} = &#8358;{item.price}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    )
}

export default ExamPlanPackage