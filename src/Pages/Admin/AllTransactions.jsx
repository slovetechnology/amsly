import React from 'react'
import AdminLayout from '../../Components/Admin/AdminLayout'

const AllTransactions = () => {
    return (
        <AdminLayout pagetitle="All Transactions">
            <div className="">
                <div className="bg-white w-11/12 mx-auto p-4 rounded-lg">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="">
                            <div className="capitalize">Services</div>
                            <select className="input">
                                <option value="">--Select--</option>
                                <option value="">ALL</option>
                                <option value="">DATA PURCHASE</option>
                                <option value="">AIRTIME PURCHASE</option>
                                <option value="">CABLE PRUCHASE</option>
                                <option value="">ELECTRICITY PAYMENT</option>
                                <option value="">EXAM PURCHASE</option>
                                <option value="">DATA PIN</option>
                                <option value="">AIRTIME PIN</option>
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize">status</div>
                            <select className="input">
                                <option value="">--Select--</option>
                                <option value="">ALL</option>
                                <option value="">SUCCESSFUL</option>
                                <option value="">UNSUCCESSFUL</option>
                                <option value="">PENDING</option>
                                <option value="">REFUND</option>
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize">network</div>
                            <select className="input">
                                <option value="">--Select--</option>
                                <option value="">ALL</option>
                                <option value="">MTN CG DATA</option>
                                <option value="">MTN SME DATA</option>
                                <option value="">MTN GIFTING</option>
                                <option value="">GLO GIFTING</option>
                                <option value="">GLO CG</option>
                                <option value="">AIRTEL GIFTING</option>
                                <option value="">AIRTEL CG</option>
                                <option value="">9MOBILE GIFTING</option>
                                <option value="">9MOBILE SME</option>
                                <option value="">9MOBILE CG</option>
                                <option value="">DSTV</option>
                                <option value="">GOTV</option>
                                <option value="">STAR TIMES</option>
                                <option value="">WAEC</option>
                                <option value="">NECO</option>
                                <option value="">NABTEP</option>
                                <option value="">ELECTRICITY BILL</option>
                                <option value="">DATA PIN</option>
                                <option value="">AIRTIME PIN </option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button className="w-full bg-indigo-600"></button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AllTransactions