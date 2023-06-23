import React from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { FaArrowRight } from 'react-icons/fa'

const SalesAnalysis = () => {
    const months = ['january', 'feburary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033]
    return (
        <AdminLayout pagetitle="Query Sales Analysis">
            <div className="w-11/12 mx-auto">
                <div className="bg-white rounded-lg mb-10 px-4 py-8">
                    <div className="mt-10">
                        <div className="text-zinc-600">  </div>
                        <div className="grid grid-cols-3 gap-7">
                            <select className="input">
                                {new Array(31).fill().map((item, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <select className="input uppercase">
                                {months.map((item, i) => (
                                    <option key={i} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <select className="input uppercase">
                                {years.map((item, i) => (
                                    <option key={i} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-11/12 mx-auto"><button className="bg-indigo-600 rounded-lg w-full mt-5 py-3 uppercase text-white font-semibold flex items-center justify-center gap-10">search Date <FaArrowRight /> </button></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default SalesAnalysis