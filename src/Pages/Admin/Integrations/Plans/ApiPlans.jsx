import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Api, GetUrl } from '/src/Components/Utils/Apis'
import React, { useCallback, useEffect, useState } from 'react'
import spins from '/src/Assets/Images/spins.gif'
import { Link } from 'react-router-dom'

const ApiPlans = () => {
    const [loading, setLoading] = useState(true)
    const [autos, setAutos] = useState([])
    const fetchAllApiPlans = useCallback(async () => {
        const res = await GetUrl(Api.subs.all_api_plans)
        if (res.status === 200) {
            setAutos(res.msg)
            return setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAllApiPlans()
    }, [fetchAllApiPlans])
    return (
        <AdminLayout pagetitle="All APi Data Plans">
            <div className="">
                {loading && <div className="w-fit mx-auto"> <img src={spins} alt="" className="w-24" /> </div>}
                <div className="">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {autos.map((item, i) => (
                            <div className="bg-white p-2 rounded-lg shadow-xl h-fit" key={i}>
                                <div className="bg-indigo-600 text-white p-3 rounded-lg text-center uppercase text-sm">{item.title} {item.planName}s</div>
                                <div className="p-3">
                                    {item.plans.length > 0 ? item.plans.map((data, index) => (
                                        <div className="text-sm py-1.5 uppercase text-slate-600" key={index}> {index + 1}. {data.plan}</div>
                                    )) : <div className="text-center text-slate-600 text-sm uppercase">No {item.planName} Added</div> }
                                    <div className="flex items-center justify-end border-t mt-3 pt-3">
                                       <div className=""> <Link to={`/auth/admin/integration/plans/edit/${item.id}`} className='bg-blue-500 text-white py-2.5 p-4 text-sm rounded-lg uppercase'>edit</Link> </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ApiPlans