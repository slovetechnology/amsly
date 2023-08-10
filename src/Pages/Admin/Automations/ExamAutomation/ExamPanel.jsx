

import React, { useCallback, useEffect, useState } from 'react'
import { Api, GetUrl } from '/src/Components/Utils/Apis'

const ExamPanel = ({ id, tag, items, singleAutService }) => {
    const [data, setData] = useState('')
    const fetchService = useCallback(async () => {
        const res = await GetUrl(`${Api.subs.other_automation}/${items.id}/${tag}/exam`)
        console.log(res.msg, 'airtime autos')
        if (res.status === 200) {
            return setData(res.msg)
        }
    }, [id])
    

    useEffect(() => {
        if (id) {
            fetchService()
        }
    }, [fetchService, id])

    return (
        <div onClick={() => singleAutService(id, items)} className="text-xs border capitalize rounded-lg flex items-center justify-center cursor-pointer py-2">
            {data || `--${tag} Service--`}
        </div>
    )
}


export default ExamPanel