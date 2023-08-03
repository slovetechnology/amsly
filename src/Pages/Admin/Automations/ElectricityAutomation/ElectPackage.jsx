
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Api, GetUrl } from '/src/Components/Utils/Apis'
import SetupElectMainAutomation from './SetupElectMainAutomation'
import ElectSingleAutomationPackage from './ElectSingleAutomationPackage'

const ElectPackage = () => {
    const { pack, net } = useParams()
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
        const response = await GetUrl(Api.subs.all_electricity_automations)
        if (response.status === 200) return response.msg
    }
    const { data, refetch } = useQuery('admin-automation-services-package-electricity', FetchAutomation)

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
        <AdminLayout pagetitle="electricity Automation Packages">
            {zone === 1 &&
                <SetupElectMainAutomation
                    tag={tag}
                    subitem={subitem}
                    allitems={allitems}
                    data={data}
                    resendSignal={() => refetch()}
                    net={net}
                    closeView={() => setZone(0)} />}
            <div className="mb-10 w-11/12 mx-auto">
                <Link to={`/auth/admin/automation/electricity/${net}`} className='bg-indigo-700 py-2 rounded-lg px-4 text-white text-sm capitalize w-fit'>back</Link>
            </div>
            <div className="w-11/12 mx-auto">
                {subdata.map((item, i) => (
                    item.network.toString() === pack &&
                    <ElectSingleAutomationPackage
                        altSingleAutService={altSingleAutService}
                        singleAutService={singleAutService}
                        item={item}
                        items={item}
                        tags={tags}
                        key={i} />
                ))}
            </div>
        </AdminLayout>
    )
}

export default ElectPackage