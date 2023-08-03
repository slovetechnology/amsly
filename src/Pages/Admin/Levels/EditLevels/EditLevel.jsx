import React, { useCallback, useEffect, useState } from 'react'
import EditForm from './EditForm'
import { Api, GetUrl } from '/src/Components/Utils/Apis'
import { useParams } from 'react-router-dom'

const EditLevel = () => {
    const {id} = useParams()
    const [main, setMain] = useState({})
    const [loading, setLoading] = useState(true)

    const FetchSingleLevel = useCallback(async () => {
        const res = await GetUrl(`${Api.subs.single_level}/${id}`)
        if(res.status === 200) {
            setMain(res.msg)
            setLoading(false)
        }
    }, [id])

    useEffect(() => {FetchSingleLevel()}, [FetchSingleLevel])
  return (
    <div>
     {!loading &&   <EditForm main={main} />}
    </div>
  )
}

export default EditLevel