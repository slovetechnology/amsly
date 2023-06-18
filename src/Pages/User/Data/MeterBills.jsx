import React from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import ContactToAdmin from '../ContactToAdmin'
import { Link } from 'react-router-dom'

const MeterBills = () => {
    const companies = [
        "abuja",
        'eko',
        'lagos',
        'enugu',
        'ibadan',
        'ikeja',
        'jos',
        'kaduna',
        'kano',
        'portharcourt'
    ]
  return (
    <UserLayout pagetitle="Meter subscriptions">
        <div className="mt-10">
            <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
                <form>
                    <div className="mb-4">
                        <div className="w-fit ml-auto bg-red-500 rounded-lg p-1.5 text-white text-xs">&#8358;30 Charges Apply!!!</div>
                        <div className="capitalize">Electric Company</div>
                        <select className="input uppercase">
                            <option value="">--Select--</option>
                            {companies.map((item, i) => <option key={i}>{item} electric</option>)}
                        </select>
                    </div>
                    <div className="mb-4">
                        <div className="capitalize">meter section</div>
                        <select className="input uppercase">
                            <option value="">--Select--</option>
                            <option value="">Prepaid</option>
                            <option value="">Postpaid</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <div className="capitalize">Meter No. </div>
                        <input type="number" className="input" />
                    </div>
                    <div className="mb-4">
                        <div className="capitalize">Rechard Amount </div>
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
                        <button className="bg-indigo-600 capitalize rounded-full py-3 px-8 text-white">verify IUC</button>
                    </div>
                    <ContactToAdmin />
                </form>
            </div>
        </div>
    </UserLayout>
  )
}

export default MeterBills