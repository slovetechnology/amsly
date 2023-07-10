
import React, { useCallback, useEffect, useState } from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import { Api, GetUrl } from '../../../Components/Utils/Apis'
import SingleTransactionComponent from '/src/Components/General/SingleTransactionComponent'

const FailedTransactions = () => {
  const [trans, setTrans] = useState([])
  const fetchTransactions = useCallback(async () => {
    const res = await GetUrl(Api.transactions.user)
    return setTrans(res.msg)
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])
  return (
    <UserLayout pagetitle="Failed transactions">
      <div className="">
        <div className="w-11/12 mx-auto">
          <div className="">
            {trans.map((item, i) => (
            item.status !== 'success' &&  <SingleTransactionComponent item={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default FailedTransactions