import React, { useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SingleAutomationPackage from './SingleAutomationPackage'
import SetupMainAutomtion from './SetupMainAutomtion'
import { Api, GetUrl } from '../../../Components/Utils/Apis'
import { useQuery } from 'react-query'

const AutomationPackage = () => {
    const { pack, id } = useParams()
    const { subdata } = useSelector(state => state.data)
    const [subitem, setSubitem] = useState(null)
    const [zone, setZone] = useState(0)
    const [tag, setTag] = useState('')
    const [allitems, setAllitems] = useState({})
    const tags = {
        main: 'main',
        alternate: 'alternate'
    }

    const FetchAutomation = async () => {
        const response = await GetUrl(Api.subs.get_automation_service)
        if (response.status === 200) return response.msg
    }
    const { data, refetch } = useQuery('admin-automation-services-package', FetchAutomation)


    const singleAutService = (value, items) => {
        setSubitem(value)
        setTag(tags.main)
        setZone(1)
        setAllitems(items)
    }

    const altSingleAutService = (value, items) => {
        setSubitem(value)
        setTag(tags.alternate)
        setZone(1)
        setAllitems(items)
    }
    return (
        <AdminLayout pagetitle="Automation Packages">
            {zone === 1 &&
                <SetupMainAutomtion
                    tag={tag}
                    subitem={subitem}
                    allitems={allitems}
                    data={data}
                    resendSignal={() => refetch()}
                    closeView={() => setZone(0)} />}
            <div className="mb-10 w-11/12 mx-auto">
                <Link to={`/auth/admin/automation/${id}`} className='bg-indigo-700 py-2 rounded-lg px-4 text-white text-sm capitalize w-fit'>back</Link>
            </div>
            <div className="w-11/12 mx-auto">
                {subdata.map((item, i) => (
                    item.network.toString() === pack &&
                    <SingleAutomationPackage
                        altSingleAutService={altSingleAutService}
                        singleAutService={singleAutService}
                        item={item} 
                        items={item}
                        tags={tags}
                        key={i} />
                ))}
                <div className="w-fit mt-10 ml-auto">
                    <button className="bg-indigo-600 text-white rounded-full py-3 px-5 capitalize">save changes</button>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AutomationPackage