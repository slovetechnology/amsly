import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Admin/AdminLayout'
import HomeTag from '../../Components/Admin/HomeTag'
import { Api, GetUrl } from '/src/Components/Utils/Apis'
import { ErrorAlert } from '/src/Components/Utils/Utility'

const AHome = () => {
    const [loading, setLoading] = useState(true)
    const [details, setDetails] = useState([])
    const [totalBal, setTotalBal] = useState(0)
    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true)
            try {
                const res = await GetUrl(Api.user.admin_dashboard)
                if (res.status === 200) {
                    setDetails(res.details)
                    setTotalBal(res.userBal)
                }
            } catch (err) {
                ErrorAlert(`${err}`)
            } finally {
                setLoading(false)
            }
        }
        fetchDashboard()
    }, [])
    return (
        <>
            <AdminLayout pagetitle="Admin Dashboard">
                <div className="w-11/12 mx-auto">
                    <div className="bg-slate-800 abgtag -z-[1] relative p-3 mb-10">
                        <div className="border rounded-lg z-[1] relative py-6 px-4">
                            <div className="flex flex-col items-center relative justify-center">
                                <div className="text-slate-100 capitalize">total users balance</div>
                                <div className="text-white text-2xl">&#8358;{totalBal}</div>
                            </div>
                        </div>
                    </div>
                   {!loading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {details.map((item, i) => (
                            <HomeTag key={i} item={item} />
                        ))}
                    </div>}
                </div>
            </AdminLayout>
        </>
    )
}

export default AHome
