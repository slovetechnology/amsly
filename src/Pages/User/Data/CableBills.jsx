import React, { useCallback, useEffect, useState } from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import ContactToAdmin from '../ContactToAdmin'
import { Link } from 'react-router-dom'
import { Api, GetUrl } from '../../../Components/Utils/Apis'

const CableBills = () => {
    const [subs, setSubs] = useState([])
    const [subdata, setSubdata] = useState([])
    const [singlesub, setSinglesub] = useState(null)
    const [datas, setDatas] = useState([])
    const fetchSubscription = useCallback(async () => {
        try {
            const res = await GetUrl(Api.subs.all_subscriptions)
            setSubs(res.subs)
            setSubdata(res.subdata)
        } catch (error) {
            return false
        }
    }, [])

    useEffect(() => {
        fetchSubscription()
    }, [fetchSubscription])

    const handleSubs = e => {
        const id = e.target.value
        if (id) {
            setSinglesub(id)
            const filter = subdata.filter((item) => item.network === parseInt(id))
            setDatas(filter)
        }
    }
    return (
        <UserLayout pagetitle="cable subscriptions">
            <div className="mt-10">
                <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
                    <form>
                        <div className="mb-4">
                            <div className="w-fit ml-auto bg-red-500 rounded-lg p-1.5 text-white text-xs">Zero Charges Apply!!!</div>
                            <div className="capitalize">Choose Decoder</div>
                            <select onChange={handleSubs} className="input uppercase">
                                <option value="">--Select--</option>
                                {subs?.map((item, i) => (
                                    item.category === 'cable' && <option key={i} value={item.id}>{item.network}</option>
                                ))}
                                {/* <option value="">DSTV</option>
                            <option value="">GOTV</option>
                            <option value="">STARTIMES</option> */}
                            </select>
                        </div>
                        <div className="mb-4">
                            <div className="capitalize">Choose Package</div>
                            <select className="input">
                                <option value="">--Select--</option>
                                {datas.map((item, i) => (
                                    <option key={i} value={item.id}>{item.title} = &#8358;{item.price}</option>
                                ))}
                                {/* <option value="">--Select--</option>
                            <option value="">Gotv Supa = &#8358;6400</option>
                            <option value="">Gotv Max = &#8358;6400</option>
                            <option value="">Gotv Jinja = &#8358;6400</option>
                            <option value="">Gotv Jolli = &#8358;6400</option>
                            <option value="">Gotv Smallie = &#8358;6400</option> */}
                            </select>
                        </div>
                        <div className="mb-4">
                            <div className="capitalize">Smart IUC No. </div>
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

export default CableBills