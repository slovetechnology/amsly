import React, { useEffect, useState } from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import { useSelector } from 'react-redux'
import CreatePin from './CreatePin'
import DataBundle from './DataBundle'

const Data = () => {
    const [screen, setScreen] = useState(0)
    const {user} = useSelector(state => state.data)
    useEffect(() => {
        if(user.datapin === null) {
            setScreen(1)
        }else {
            setScreen(2)
        }
    }, [])
  return (
    <UserLayout>
        {screen === 1 && <CreatePin sendSignal={() => setScreen(2)} /> }
        {screen === 2 && <DataBundle /> }
    </UserLayout>
  )
}

export default Data