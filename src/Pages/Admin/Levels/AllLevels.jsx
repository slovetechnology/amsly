import { Api, GetUrl } from '/src/Components/Utils/Apis'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import React, { useCallback, useEffect, useState } from 'react'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import { Link } from 'react-router-dom'
import { SlPeople } from 'react-icons/sl'
import spins from '/src/Assets/Images/spins.gif'

const AllLevels = () => {
  const [loading, setLoading] = useState(true)
  const [levels, setLevels] = useState([])

  const FetchLevels = useCallback(async () => {
    setLoading(true)
    try {
      const res = await GetUrl(Api.subs.all_levels)
      if (res.status === 200) return setLevels(res.msg)
    } catch (error) {
      ErrorAlert(`${error}`)
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    FetchLevels()
  }, [FetchLevels])
  return (
    <AdminLayout>
      <div className="">
        <div className="w-11/12 mx-auto">
          <div className="mb-6 ml-4 font-semibold text-2xl">All Levels</div>
          {loading && <div className="w-fit mx-auto">
            <img src={spins} alt="" className="w-24" />
          </div>}
          {!loading && levels.map((item, i) => (
            <div className="mb-2 bg-white p-3 rounded-lg" key={i}>
              <div className="flex items-center gap-4">
                <div className="rounded-full p-3 bg-slate-200 text-2xl border border-slate-500"> <SlPeople /> </div>
                <div className="">
                  <div className="font-semibold"> <span className="font-light text-lg">Level:</span> {item.title}</div>
                  <div className="">Total Users: <span className="font-semibold text-lg">({item.users})</span> </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-10">
                <div onClick={() => { window.location = `/auth/admin/levels/edit/${item.id}` }} to='' className="bg-slate-400 py-2 px-3 text-white text-sm hover:bg-slate-600 rounded-md capitalize">edit</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AllLevels