import React, { Suspense, useCallback, useLayoutEffect, useState } from "react";
import { Api, GetUrl } from "/src/Components/Utils/Apis";
import { useParams } from "react-router-dom";
const EditForm = React.lazy(() => import("./EditForm"));
import spins from '/src/Assets/Images/spins.gif'
import AdminLayout from "/src/Components/Admin/AdminLayout";

const EditLevel = () => {
  const { id } = useParams();
  const [main, setMain] = useState({});
  const [loading, setLoading] = useState(true);

  const FetchSingleLevel = useCallback(async () => {
    setLoading(true)
    const res = await GetUrl(`${Api.subs.single_level}/${id}`);
    if (res.status === 200) {
      setMain(res.msg);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [id]);

  useLayoutEffect(() => {
    FetchSingleLevel();
  }, [FetchSingleLevel]);
  return (
    <AdminLayout>
      {loading ? <>
      <div className="w-fit mx-auto"> <img src={spins} alt="" className="w-20" /> </div>
      </> : (
        <>
          <Suspense fallback='Loading...'>
            <EditForm main={main} HandleRefresh={() => FetchSingleLevel()} />
          </Suspense>
        </>
      )}
    </AdminLayout>
  );
};

export default EditLevel;
