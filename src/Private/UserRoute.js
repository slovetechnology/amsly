import React, { useCallback, useEffect, useState } from 'react'
import { Api, GetUrl } from '../Components/Utils/Apis'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { dispatchSubscriptiondata, dispatchSubscriptions, dispatchUser } from '../app/reducer'

const UserRoute = ({ children }) => {
    const [allowed, setAllowed] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fetchuser = useCallback(async () => {
        try {
            const res = await GetUrl(Api.user.user_info)
            if (res.status === 200) {
                setAllowed(true)
                dispatch(dispatchUser(res.msg))
            } else {
                navigate('/login')
            }
        } catch (error) {
            console.log('error')
        }
    }, [])

    useEffect(() => {
        fetchuser()
    }, [fetchuser])
    
    const fetchSubs = useCallback(async () => {
        const res = await GetUrl(Api.subs.all_subscriptions)
        if (res.status === 200) {
            dispatch(dispatchSubscriptions(res.subs))
            dispatch(dispatchSubscriptiondata(res.subdata))
        }
    }, [dispatch])

    useEffect(() => {
        fetchuser()
        fetchSubs()
    }, [fetchuser, fetchSubs])


    if(allowed) {
        return children
    }
    // return allowed ? children : navigate('/login')
}

export default UserRoute