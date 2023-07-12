import React, { useEffect, useState } from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import ContactToAdmin from '../ContactToAdmin'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AirtimeBills = () => {
    const {subs} = useSelector(state => state.data)
    const [packs, setPacks] = useState([])

    useEffect(() => {
        const findData = subs.find((item) => item.category.endsWith('-vtu'))
        setPacks(findData?.sub)
    }, [])
  return (
    <UserLayout pagetitle="buy your airtime VTU">
        <div className="mt-10">
            <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
                <form>
                    <div className="mb-4">
                        <div className="capitalize">Choose Network</div>
                        <select className="input">
                            <option value="">--Select--</option>
                            {packs?.length > 0 && packs.map((item, i) => (
                                <option key={i} value={item.id}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <div className="capitalize">recharge amount </div>
                        <input type="number" className="input" />
                    </div>
                    <div className="mb-4">
                        <div className="capitalize">mobile number </div>
                        <input type="number" className="input" />
                    </div>
                    <div className="mb-4">
                        <div className="grid grid-cols-2">
                        <div className="capitalize">transaction pin  </div>
                        <div className="text-right">Don't have! <Link to='/create_pin' className='text-indigo-600'>Create Pin</Link> </div>
                        </div>
                        <input type="text" className="input" />
                    </div>
                    <div className="w-fit ml-auto">
                        <button className="bg-indigo-600 capitalize rounded-full py-3 px-8 text-white">make payment</button>
                    </div>
                    <ContactToAdmin />
                </form>
            </div>
        </div>
    </UserLayout>
  )
}

export default AirtimeBills