import React from 'react'
import AdminLayout from '../../Components/Admin/AdminLayout'
import { FaArrowRight } from 'react-icons/fa'

const UpdateBankInfo = () => {
    return (
        <AdminLayout>
            <div className="w-11/12 mx-auto">
                <div className="bg-white rounded-lg mb-10 px-4 py-8">
                    <div className="text-xl text-zinc-600 font-semibold uppercase">update manual <span className="text-red-600"> bank information</span> </div>
                    <div className="bg-orange-50 p-3 text-orange-800 rounded-lg text-sm">This is the account number that will be shown to your users to make payment into for manual funding. </div>
                    <div className="p-3 rounded-lg bg-slate-50 mt-6">
                        <div className="grid grid-cols-2 p-1 text-sm">
                            <div className="">Account Name</div>
                            <div className="text-right">Account Name</div>
                        </div>
                        <div className="grid grid-cols-2 p-1 text-sm">
                            <div className="">Account Number</div>
                            <div className="text-right">86959544003</div>
                        </div>
                        <div className="grid grid-cols-2 p-1 text-sm">
                            <div className="">Banking institute</div>
                            <div className="text-right">first bank</div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="mb-6">
                            <div className="text-zinc-600">Account Number</div>
                            <input type="text" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">Account Name</div>
                            <input type="text" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">Bank Name</div>
                            <input type="text" className="input" />
                        </div>
                        <div className="w-11/12 mx-auto"><button className="bg-indigo-600 rounded-lg w-full mt-5 py-3 uppercase text-white font-semibold flex items-center justify-center gap-10">Update bank information <FaArrowRight /> </button></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default UpdateBankInfo