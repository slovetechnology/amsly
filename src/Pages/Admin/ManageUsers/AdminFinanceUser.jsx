import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import Loading from '../../../Components/General/Loading'
import { SwalAlert, ToastAlert } from '../../../Components/Utils/Utility'
import { Api, GetUrl, PostUrl } from '../../../Components/Utils/Apis'
import spins from '../../../Assets/Images/spins.gif'

const AdminFinanceUser = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [spiner, setSpiner] = useState(false)
    const [user, setUser] = useState({})
    const [loads, setLoads] = useState(false)
    const [forms, setForms] = useState({
        email: '',
        amount: '',
        note: '',
    })

    const handleForms = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }

    const handleSubmission = async e => {
        e.preventDefault()
        if (!forms.email) return ToastAlert(`User's email address is required`)
        if (!forms.amount) return ToastAlert(`Top up amount is required`)
        if (!forms.note) return ToastAlert(`Funding naration is required`)
        const formdata = {
            ...forms
        }
        setLoading(true)
        const res = await PostUrl(Api.user.finance_user_account, formdata)
        setLoading(false)
        if (res.status === 200) {
            setUser(res.user)
            SwalAlert('Request Successful', res.msg, 'success')
        } else {
            SwalAlert('Request Failed', res.msg, 'error')
        }
    }

    // find for the user by email
    const searchUser = () => {
        if (!forms.email) return ToastAlert('Enter a valid user\'s email address')
        setSpiner(true)
        setUser({})
        setLoads(false)
        const findUser = users.find((item) => item.email.toLowerCase() === forms.email.toLowerCase())
        setTimeout(() => {
            setSpiner(false)
            if (!findUser) {
                setForms({
                    ...forms,
                    email: ''
                })
                return ToastAlert('User not Found')
            }
            if (findUser.role === 'admin') {
                setForms({
                    ...forms,
                    email: ''
                })
                return ToastAlert('Cannot modify an Admin Account')
            }
            setUser(findUser)
            setLoads(true)
        }, 2000);
    }

    const fetchAllUsers = useCallback(async () => {
        const res = await GetUrl(Api.user.all_users)
        if (res.status === 200) return setUsers(res.msg)
    }, [])

    useEffect(() => {
        fetchAllUsers()
    }, [fetchAllUsers])
    return (
        <AdminLayout pagetitle="Finance User Account">
            {loading && <Loading />}
            <div className="w-11/12 mx-auto">
                <form onSubmit={handleSubmission} className="bg-white rounded-lg mb-10 px-4 py-8">
                    <div className="mt-10">
                        <div className="mb-6">
                            <div className="text-zinc-600">user email address</div>
                            <div className="flex items-center gap-4">
                                <input name="email" value={forms.email} onChange={handleForms} type="email" className="input" />
                                <button type='button' onClick={searchUser} className="bg-indigo-600 flex items-center justify-center capitalize text-white rounded-lg text-xs h-10 w-24"> {spiner ? <img src={spins} alt="" className="w-11" /> : 'search'} </button>
                            </div>
                        </div>
                        {loads ? <>
                            <div className="grid grid-cols-2 p-2 bg-sky-50 rounded-lg mb-3">
                                <div className="text-sm">previous Balance: <span className="text-orange-700 text-xl">&#8358;{parseInt(user.prevbalance).toLocaleString()}</span> </div>
                                <div className="text-sm text-right">Current Balance: <span className="text-orange-700 text-xl">&#8358;{parseInt(user.balance).toLocaleString()}</span> </div>
                            </div>
                            <div className="mb-6">
                                <div className="text-zinc-600">Amount</div>
                                <input name="amount" value={forms.amount} onChange={handleForms} type="number" className="input" />
                            </div>
                            <div className="mb-6">
                                <div className="text-zinc-600">Enter Naration</div>
                                <textarea name="note" value={forms.note} onChange={handleForms} cols="30" rows="10" className="input"></textarea>
                            </div>
                            <div className="w-11/12 mx-auto"><button className="bg-indigo-600 rounded-lg w-full mt-5 py-3 uppercase text-white font-semibold flex items-center justify-center gap-10">complete action </button></div>
                        </> : null}
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}

export default AdminFinanceUser