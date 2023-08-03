
import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import SingleLockToggler from '../../../Components/Admin/SingleLockToggler'
import { Api, GetUrl, PostUrl } from '../../../Components/Utils/Apis'
import Loading from '../../../Components/General/Loading'
import { SwalAlert } from '../../../Components/Utils/Utility'

const LockExam = () => {
  const [subs, setSubs] = useState([])
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchSubData = useCallback(async () => {
    const res = await GetUrl(Api.subs.all_subscriptions)
    if (res.status === 200) {
      return setSubs(res.subs)
    }
  }, [])

  useEffect(() => {
    fetchSubData()
  }, [fetchSubData])

  const UpdateService = async () => {
    const data = {
      packages: forms,
    }
    setLoading(true)
    const res = await PostUrl(Api.subs.subscription_locks, data)
    setLoading(false)
    if(res.status === 200) {
      fetchSubData()
      SwalAlert("Request Successful", res.msg, 'success')
    }else {
      SwalAlert("Request Failed", res.msg, 'error')
    }
  }

  const sendData = data => {
    if (data.locked === 'yes') {
      const mapped = subs.map(item => {
        if (item.id === data.id) {
          item.locked = 'no';
        }
        return item
      })
      setForms(mapped)
    }
    else {
      const mapped = subs.map(item => {
        if (item.id === data.id) {
          item.locked = 'yes';
        }
        return item
      })
      setForms(mapped)
    }
  }
  return (
    <AdminLayout pagetitle="Lock Exams">
      {loading && <Loading /> }
      <div className="bg-white px-3 pb-4 pt-10 rounded-lg w-full max-w-3xl mx-auto">
        <div className="mb-3">
          {subs.map((item, i) => (
            item.category === 'exam' && <SingleLockToggler sendData={sendData} key={i} data={item} />
          ))}
          {/* <SingleLockToggler title="mtn sme" />
                <SingleLockToggler title="mtn gifting" />
                <SingleLockToggler title="glo gifting" />
                <SingleLockToggler title="glo cg" />
                <SingleLockToggler title="9mobile cg" />
                <SingleLockToggler title="9mobile sme" />
                <SingleLockToggler title="airtel cg" />
                <SingleLockToggler title="airtel sme" /> */}
        </div>
      </div>
      <div className="ml-auto w-fit mt-10">
        <button onClick={UpdateService} className="bg-indigo-600 rounded-full py-3 px-5 text-white capitalize">update service</button>
      </div>
    </AdminLayout>
  )
}

export default LockExam