import { ToastAlert } from '/src/Components/Utils/Utility';
import UserLayout from '/src/Components/User/UserLayout'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { refLink } from '/src/Components/Utils/Utility';
import { Api, GetUrl } from '/src/Components/Utils/Apis';
import moment from 'moment';
import { SlPeople, SlUser } from 'react-icons/sl';

const Downlines = () => {
    const copyref = useRef()
    const {user} = useSelector(state => state.data)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const AllDownliners = useCallback(async () => {
        const res = await GetUrl(Api.user.all_downliners)
        if(res.status === 200) {
            setLoading(false)
            return setUsers(res.msg)
        }
    }, [])

    useEffect(() => {
        AllDownliners()
    }, [AllDownliners])
    const copyFunc = () => {

        // Select the text field
        copyref.current.select();
        copyref.current.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyref.current.value);

        // Alert the copied text
        ToastAlert('copied')
    }
  return (
    <UserLayout pagetitle="My Downlines">
        <div className="w-11/12 mx-auto">
            <div className="bg-white rounded-lg p-3 shadow-xl">
                <div className="bg-red-50 p-4 text-red-800 font-semibold rounded-lg mb-5 shadow-xl">My Referral Link</div>
                <div className="flex items-center gap-4">
                    <input ref={copyref} type="text" readOnly value={refLink(user.refid)} className="input" />
                    <button onClick={copyFunc} className="bg-indigo-600 text-white rounded-full shadow-xl py-2 px-10 capitalize">copy</button>
                </div>
            </div>
            <div className="mt-5">
                {users.length > 0 ? users.map((item, i) => (
                    <div className="bg-white shadow-xl rounded-lg p-2" key={i}>
                        <div className="flex items-center gap-2">
                            <div className="rounded-full p-2.5 bg-indigo-600/50 border border-indigo-600 text-2xl text-indigo-100">
                                <SlUser/>
                            </div>
                            <div className="">
                                <div className="text-sm text-zinc-600">FullName: {item.firstname} {item.lastname}</div>
                                <div className="text-sm text-zinc-600">Status: {item.status}</div>
                                <div className="text-sm text-zinc-600">Date Registered: {moment(item.createdAt).format('DD-MM-YYYY h:mA')}</div>
                            </div>
                        </div>
                    </div>
                )) : <div className="text-slate-600 text-center mt-10 flex items-center flex-col gap-4"> <SlPeople className='text-6xl' /> You have no referrals on your record yet!...</div> }
            </div>
        </div>
    </UserLayout>
  )
}

export default Downlines