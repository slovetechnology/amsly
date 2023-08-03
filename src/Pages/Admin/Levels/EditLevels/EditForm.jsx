

import { useSelector } from 'react-redux'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import React, { useCallback, useEffect, useState } from 'react'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import Loading from '/src/Components/General/Loading'
import { Api, PostUrl, GetUrl } from '/src/Components/Utils/Apis'
import { ToastAlert } from '/src/Components/Utils/Utility'
import EditSingleLevel from './EditSingleLevel'
import EditLevelPercent from './EditLevelPercent'
import EditSetupUser from './EditSetupUser'

const EditForm = ({main}) => {
    const { subs } = useSelector(state => state.data)
    const [active, setActive] = useState({})
    const [packs, setPacks] = useState([])
    const cs = 'rounded-full py-3 text-xs lg:text-sm px-3 shadow-xl transition-all'
    const [localState, setLocalState] = useState(main.levelpack)
    const [perState, setPerState] = useState(main.levelsub)
    const [userState, setUserState] = useState(main.users)
    const [percentState, setPercentState] = useState(false)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState(main.title || '')
    const btn = 'py-4 px-6 rounded-full transition-all hover:scale-110 focus:scale-110 shadow-xl w-fit mx-auto font-semibold capitalize text-sm'
    const [zone, setZone] = useState(1)

    const [users, setUsers] = useState([])

    const AdmingetUsers = useCallback(async () => {
        const res = await GetUrl(Api.user.all_users)
        if (res.status === 200) return setUsers(res.msg)
    }, [])

    useEffect(() => {
        AdmingetUsers()
    }, [AdmingetUsers])

    const handleActive = item => {
        // loop through the packages under this subscription and add pricing to it
        let dataArr = []
        item.sub.map((item) => {
            const arrObj = {
                level: main.id,
                pack: item.id,
                price: item.price,
                pricing: item.price
            }
            dataArr.push(arrObj)
        })
        // add percent field to a new subscription that will work only when the subscription is a data gifting
        const getData = perState
        const findData = getData.find(ele => ele.sub === item.id)
        const itemData = {
            ...item,
            percent: findData ? findData.percent : 100
        }
        setActive(itemData)
        setPacks(dataArr)
        console.log(dataArr, itemData, findData, getData, item, 'foundungs')

        // // handle showing the percentage input if only the subscription is gifting or exam or cable
        const extras = ['cable', 'exam']
        const splited = item.network.split(' ')
        if (splited.includes('GIFTING') || extras.includes(item.category)) {
            setPercentState(true)
        } else {
            setPercentState(false)
        }
    }

    const handelForms = (index, value) => {
        // update the main package
        const mapped = packs.map((data) => {
            if (data.id === index) {
                return {
                    ...data,
                    pricing: value
                }
            }
            return data
        })
        setPacks(mapped)

        // update the local sotrage package
        const dataArr = localState
        const localMapped = dataArr.map((ele) => {
            if (ele.pack === index) {
                return {
                    ...ele,
                    pricing: value
                }
            }
            return ele
        })
        setLocalState(localMapped)
    }

    const handleAddup = (data) => {
        const stor = localState
        const findData = stor.find(item => item.pack === data.id)
        if (!findData) {
            const dataArr = {
                ...data,
                pricing: data.pricing || data.price,
            }
            stor.push(dataArr)
            setLocalState(stor)
        } else {
            const filts = stor.filter((ele) => ele.pack !== data.id)
            setLocalState(filts)
        }
    }

    const sendUser = (id) => {
        const stor = userState
        const findData = stor.find(item => item.id === id)
        if (!findData) {
            const dataArr = {
                id: id
            }
            stor.push(dataArr)
            setUserState(stor)
        } else {
            const filts = stor.filter((ele) => ele.id !== id)
            setUserState(filts)
        }
    }

    const handleAddupPercent = (data) => {
        const stor = perState
        const findData = stor.find(item => item.sub === data.id)
        if (!findData) {
            const dataArr = {
                ...data,
                percent: 100
            }
            stor.push(dataArr)
            setPerState(stor)
        } else {
            const filts = stor.filter((ele) => ele.id !== data.id)
            setPerState(filts)
        }
    }

    const handelFormsPercent = (index, value) => {
        // update the active subscripition
        setActive({
            ...active,
            percent: value
        })

        // update the local sotrage subscription
        const dataArr = perState
        const localMapped = dataArr.map((ele) => {
            if (ele.id === index) {
                return {
                    ...ele,
                    percent: value
                }
            }
            return ele
        })
        setPerState(localMapped)

        // now get all the packages of this subscription and calculate on their pricing only
        const packArr = localState
        const mappedArr = packArr.map((ele) => {
            if (ele.network === index) {
                return {
                    ...ele,
                    pricing: value * ele.price / 100
                }
            }
            return ele
        })
        setLocalState(mappedArr)
    }

    const handleSubmission = async () => {
        if (!title) return ErrorAlert('Level title is required!..')
        // filter out the percent and the id of the subscription
        const subsData = []
        perState.map((ele) => {
            const itemData = {
                id: ele.id,
                percent: ele.percent
            }
            subsData.push(itemData)
        })

        // filter out the pricing and the id of the package
        const packData = []
        localState.map((ele) => {
            const itemData = {
                id: ele.id,
                pricing: ele.pricing
            }
            packData.push(itemData)
        })
        const data = {
            packs: packData,
            subs: subsData,
            users: userState,
            title
        }
        console.log(data)
        // setLoading(true)
        // const res = await PostUrl(Api.subs.add_level, data)
        // setLoading(false)

        // if (res.status === 200) {
        //     ToastAlert(res.msg)
        //     setTitle('')
        //     setLocalState([])
        //     setPerState([])
        // } else {
        //     return ErrorAlert(res.msg)
        // }
    }
    return (
        <AdminLayout>
            {loading && <Loading />}
            <div className="w-11/12 mx-auto">
                <div className="bg-white rounded-lg py-4 px-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                        <div className="">
                            <div className="text-sm">Title of Level</div>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input" />
                        </div>
                        <div className=""></div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-5 mb-10">
                        <button onClick={() => setZone(1)} className={`${btn} ${zone === 1 ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}>add packages</button>
                        <button onClick={() => setZone(2)} className={`${btn} ${zone === 2 ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}>connect users</button>
                    </div>
                    <div className={zone === 1 ? '' : 'hidden'}>
                        <div className="my-5">Select Subscriptions for this level</div>
                        <div className="flex flex-wrap gap-3 items-center">
                            {subs.map((item, i) => (
                                item.locked === 'no' && <button onClick={() => handleActive(item)} key={i} className={`${active.id === item.id ? 'bg-blue-600 text-white' : 'bg-slate-100'} ${cs}`}>{item.network}</button>
                            ))}
                        </div>
                        {active?.id && <div className="mt-10">
                            {percentState &&
                                <EditLevelPercent
                                    item={active}
                                    handelForms={handelFormsPercent}
                                    handleAddup={handleAddupPercent}
                                    localState={perState}
                                />
                            }
                            <div className="">
                                {packs.map((item, i) => (
                                    item.lock === 'no' &&
                                    <EditSingleLevel
                                        key={i}
                                        item={item}
                                        handelForms={handelForms}
                                        handleAddup={handleAddup}
                                        localState={localState}
                                    />
                                ))}
                            </div>
                        </div>}
                    </div>
                    <div className={zone === 2 ? '' : 'hidden'}>
                        <div className="my-5">Select Users for this level</div>
                        <div className="grid grid-cols-1 gap-3">
                            {users.map((ele, i) => (
                               ele.role !== 'admin' && <EditSetupUser
                                    sendUser={sendUser}
                                    localState={userState}
                                    user={ele}
                                    key={i}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-fit ml-auto mt-10">
                    <button onClick={handleSubmission} className="bg-blue-700 text-white shadow-xl rounded-full py-3 px-7 capitalize">update level</button>
                </div>
            </div>
        </AdminLayout>
    )
}

export default EditForm