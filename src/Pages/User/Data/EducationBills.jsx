import React from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import ContactToAdmin from '../ContactToAdmin'
import { Link } from 'react-router-dom'

const EducationBills = () => {
  return (
    <UserLayout pagetitle="cable subscriptions">
        <div className="mt-10">
            <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
                <form>
                    <div className="mb-4">
                        <div className="capitalize">Education type</div>
                        <select className="input">
                            <option value="">--Select--</option>
                            <option value="">WAEC - &#8358;2680</option>
                            <option value="">NECO - &#8358;2680</option>
                            <option value="">NABTEB - &#8358;2680</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <div className="capitalize">Reciever Mobile No. </div>
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

export default EducationBills