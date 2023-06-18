import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { Api, GetUrl } from '../../../Components/Utils/Apis'
import spins from '../../../Assets/Images/spins.gif'
import { useSelector } from 'react-redux'
import moment from 'moment'

const AllUsers = () => {
    const { user } = useSelector(state => state.data)
    const [forms, setForms] = useState('')
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const fetchAllUser = useCallback(async () => {
        const res = await GetUrl(Api.user.all_users)
        if (res.status === 200) {
            setLoading(false)
            setData2(res.msg)
            return setData(res.msg)
        }
    }, [])

    useEffect(() => {
        fetchAllUser()
    }, [fetchAllUser])

    const handleSearch = (text) => {
        const filtered = data2.filter(user => {
            return user.email.toLowerCase().includes(text.toLowerCase())
        })
        if(filtered) {
            setData(filtered)
        }else {
            setData(data2)
        }
    }
    return (
        <AdminLayout pagetitle="All users">
            <div className="grid grid-cols-1 mb-5 pr-5 md:grid-cols-2">
                <div className=""></div>
                <div className="flex items-center gap-2">
                    <input value={forms} onChange={e => setForms(e.target.value)} onKeyUp={e => handleSearch(e.target.value)} type="text" placeholder='Email Address' className="input" />
                </div>
            </div>
            {loading && <div className="w-fit mx-auto"> <img src={spins} className='w-20' alt="" /> </div>}
            {!loading && data.map((item, i) => (
                item.id !== user.id && <div className="bg-white mb-2 p-3 rounded-lg" key={i}>
                    <div className="grid grid-cols-2">
                        <div className="font-semibold capitalize">fullname</div>
                        <div className="text-right">{item.firstname} {item.lastname}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="font-semibold capitalize">username</div>
                        <div className="text-right">{item.username}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="font-semibold capitalize">email address</div>
                        <div className="text-right">{item.email}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="font-semibold capitalize">phone number</div>
                        <div className="text-right">{item.phone}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="font-semibold capitalize">total transactions</div>
                        <div className="text-right">0</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="font-semibold capitalize">user role</div>
                        <div className="text-right">{item.role}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="font-semibold capitalize">account level</div>
                        <div className="text-right uppercase">level {item.level}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="font-semibold capitalize">Joined on</div>
                        <div className="text-right uppercase">{moment(item.createdAt).calendar()}</div>
                    </div>
                </div>
            ))}
        </AdminLayout>
    )
}

export default AllUsers