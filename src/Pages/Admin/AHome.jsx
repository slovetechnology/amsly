import React from 'react'
import AdminLayout from '../../Components/Admin/AdminLayout'
import HomeTag from '../../Components/Admin/HomeTag'

const AHome = () => {
    return (
        <>
            <AdminLayout pagetitle="Admin Dashboard">
                <div className="w-11/12 mx-auto">
                    <div className="bg-slate-800 abgtag -z-[1] relative p-3 mb-10">
                        <div className="border rounded-lg z-[1] relative py-6 px-4">
                            <div className="flex flex-col items-center relative justify-center">
                                <div className="text-slate-100 capitalize">total users balance</div>
                                <div className="text-white text-2xl">&#8358;1,895,849.00</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {new Array(5).fill().map((item, i) => (
                            <HomeTag key={i} amount={`868,869,860`} title={`sucessful user sales`} />
                        ))}
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default AHome
