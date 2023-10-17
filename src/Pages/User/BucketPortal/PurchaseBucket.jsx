import { FaArrowLeft } from 'react-icons/fa'
import UserLayout from '/src/Components/User/UserLayout'
import React from 'react'
import { Link } from 'react-router-dom'

const PurchaseBucket = () => {
    return (
        <UserLayout>
            <div className="w-11/12 mx-auto">
                <Link to='/bucket_portal'>
                    <div className="flex items-center gap-2">
                        <FaArrowLeft />
                        <div className="capitalize">back</div>
                    </div>
                </Link>
                <div className="mt-10">
                    <div className="font-bold capitalize mb-3">buy and keep <span className="text-zinc-600">[cannot expire]</span> </div>
                    <div className="bg-white p-5 rounded-lg">
                        <div className="text-sm uppercase mb-2">select plan</div>
                        <select name="" id="" className="input">
                            <option value="">--Choose Plan--</option>
                            <option value="">1000gb (Sme Smart) - &#8358;22,000</option>
                            <option value="">1000gb (Sme Smart) - &#8358;22,000</option>
                            <option value="">1000gb (Sme Smart) - &#8358;22,000</option>
                        </select>
                        <div className="mt-5">
                            <button className="bg-blue-600 text-white py-3 w-full uppercase rounded-lg">subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default PurchaseBucket