import React, { useCallback, useEffect, useState } from 'react'
import UserLayout from '/src/Components/User/UserLayout'
import { Api, GetUrl } from '/src/Components/Utils/Apis'
import SingleTransactionComponent from '/src/Components/General/SingleTransactionComponent'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import spiner from '../../../Assets/Images/spins.gif'
import { PostUrl } from '/src/Components/Utils/Apis'
import { Autos } from '/src/Components/Utils/Utility'
import { useSelector } from 'react-redux'

const AllTransactions = () => {
  const [trans, setTrans] = useState([])
  const [trans2, setTrans2] = useState([])
  const [loading, setLoading] = useState(true)
  const [showReset, setShowReset] = useState(false)
  const { subs } = useSelector(state => state.data)
  const [filter, setFilter] = useState({
      limit: 10,
      category: 'all',
      status: 'all',
      service: 'all',
      search: '',
  })
  const [total, setTotal] = useState({
      all: 0,
      data: 0
  })

  const handleForms = e => {
      setFilter({
          ...filter,
          [e.target.name]: e.target.value
      })
      setShowReset(true)
  }

  const fetchTransactions = useCallback(async (params) => {
      try {
          const res = params.length < 1 ?  await GetUrl(`${Api.transactions.user}?limit=${filter.limit}`) : params
          setTrans2(res.msg)
          setTotal({
              all: res.total,
              data: res.msg.length
          })
          return setTrans(res.msg)
      } catch (error) {
          ErrorAlert(res.msg)
      } finally {
          setLoading(false)
      }
  }, [])

  useEffect(() => {
      fetchTransactions([])
  }, [fetchTransactions])

  const handleFiltering = async () => {
      const res = await PostUrl(Api.transactions.user_filter_transactions, filter)
      fetchTransactions(res)
  }
  const ResetFilter = () => {
      setFilter({
          limit: 10,
          service: 'all',
          search: '',
          category: 'all',
          status: 'all',
      })
      fetchTransactions([])
      setShowReset(false)
  }
  return (
    <UserLayout pagetitle="all transactions">
      <div className="">
        <div className="w-11/12 mx-auto">
                <div className="bg-white w-11/12 mx-auto p-4 rounded-lg">
                  {showReset &&  <div className="w-fit ml-auto">
                        <button onClick={ResetFilter} className="bg-blue-600 text-white py-2 rounded-lg capitalize px-4">reset</button>
                    </div>}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="">
                            <div className="capitalize">categories</div>
                            <select name="category" value={filter.category} onChange={handleForms} className="input capitalize">
                                <option value="all">All</option>
                                {Autos.map((item, i) => (
                                    <option key={i} value={item.category}>{item.category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize">status</div>
                            <select name="status" value={filter.status} onChange={handleForms} className="input">
                                <option value="all">All</option>
                                <option value="success">SUCCESS</option>
                                <option value="failed">FAILED</option>
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize">services</div>
                            <select name="service" value={filter.service} onChange={handleForms} className="input">
                                <option value="all">All</option>
                                {subs.map((item, i) => (
                                    <option value={item.network} key={i}>{item.network}</option>
                                ))}
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize"> Search by Phone / Meter No. </div>
                            <input name="search" value={filter.search} onChange={handleForms} type="number" placeholder='Search By Phone' className="input" />
                        </div>
                        <div className="">
                            <div className="capitalize">transactions per page</div>
                            <select name="limit" value={filter.limit} onChange={handleForms} className="input">
                                <option value="10">10 per page</option>
                                <option value="50">50 per page</option>
                                <option value="100">100 per page</option>
                                <option value="150">150 per page</option>
                                <option value="200">200 per page</option>
                                <option value="300">300 per page</option>
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize"> &nbsp; </div>
                            <button onClick={handleFiltering} className="bg-blue-600 text-white text-sm capitalize w-full py-3.5 rounded-lg">apply filter</button>
                        </div>
                    </div>
                </div>
          <div className="mt-10">
            {!loading ? trans.map((item, i) => (
              <SingleTransactionComponent item={item} key={i} />
            )) :
              <div className="w-fit mx-auto"> <img src={spiner} alt="" className="w-24" /> </div>
            }
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default AllTransactions