import React, { useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Autos } from '../../../Components/Utils/Utility'

const Automation = () => {
    const [active, setActive] = useState({id: 0, tag: ''})
    return (
        <AdminLayout pagetitle="Automation">
            <div className="">
                <div className={!active.tag ? '' : 'hidden'}>
                    <div className="w-11/12 max-w-3xl mx-auto flex flex-col">
                        {Autos.map((item, i) => (
                            <Link to={`/auth/admin/automation/${item.category}`} key={i} className="bg-white p-4 text-center cursor-pointer uppercase rounded-lg mb-2">{item.title}</Link>
                        ))}
                    </div>
                </div>
                {active.id === 4 && <div className="">
                    <div className="bg-white p-6 rounded-lg">
                        <div className="uppercase border-b pb-2 mb-2 flex items-center gap-3"> <div className="cursor-pointer bg-slate-100 rounded-full p-3" onClick={() => setActive({id: 0, tag: ''})}> <FaArrowLeft /> </div> {active.tag}</div>
                        <div className="">
                            <div className="mb-5">
                                <div className="uppercase">gotv</div>
                                <select className="input">
                                    <option value="">--Select--</option>
                                </select>
                            </div>
                            <div className="mb-5">
                                <div className="uppercase">dstv</div>
                                <select className="input">
                                    <option value="">--Select--</option>
                                </select>
                            </div>
                            <div className="mb-5">
                                <div className="uppercase">startimes</div>
                                <select className="input">
                                    <option value="">--Select--</option>
                                </select>
                            </div>
                        </div>
                        <div className="border-t mt-3 pt-3">
                            <div className="w-fit  mx-auto">
                                <button className="w-fit px-12 rounded-lg bg-indigo-600 text-white uppercase py-3">update</button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </AdminLayout>
    )
}

export default Automation