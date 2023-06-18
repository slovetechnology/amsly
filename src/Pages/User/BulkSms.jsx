import React from 'react'
import UserLayout from '../../Components/User/UserLayout'

const BulkSms = () => {
    return (
        <UserLayout pagetitle="send bulk sms">
            <div className="mt-10">
                <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
                    <form>
                        <div className="mb-4">
                            <div className="w-fit ml-auto bg-red-500 rounded-lg p-1.5 text-white text-xs">&#8358;29 Charges Apply!!!</div>
                            <div className="capitalize">Sender ID (Max 10chars)</div>
                            <input type="text" placeholder='Business Name' className="input" />
                        </div>
                    </form>
                </div>
            </div>
        </UserLayout>
    )
}

export default BulkSms