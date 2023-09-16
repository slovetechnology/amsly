import { useCallback, useEffect, useState } from 'react'
import { Api, GetUrl } from '../Components/Utils/Apis'
import { useNavigate } from 'react-router-dom'
import { dispatchLevels, dispatchSubscriptiondata, dispatchSubscriptions, dispatchUser } from '../app/reducer'
import { useDispatch } from 'react-redux'

const AdminRoute = ({ children }) => {
    const [allowed, setAllowed] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fetchuser = useCallback(async () => {
        try {
            const res = await GetUrl(Api.user.admin_info)
            if (res.status === 200) {
                setAllowed(true)
                dispatch(dispatchUser(res.msg))
                dispatch(dispatchLevels(res.levels))
            } else {
                navigate('/login')
            }
        } catch (error) {
            navigate('/login')
            console.log('error')
        }
    }, [dispatch, navigate])
    
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

export default AdminRoute