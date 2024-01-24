import React, { Suspense, useCallback, useLayoutEffect, useState } from "react";
import { Api, GetUrl } from "/src/Components/Utils/Apis";
import { useParams } from "react-router-dom";
const EditForm = React.lazy(() => import("./EditForm"));
import spins from '/src/Assets/Images/spins.gif'
import AdminLayout from "/src/Components/Admin/AdminLayout";
import {useSelector} from 'react-redux'
import { LevelPack, LevelType, PackPercent } from "./EditForm";

const EditLevel = () => {
  const { id } = useParams();
  const [main, setMain] = useState({});
  const [loading, setLoading] = useState(true);
  const { subs } = useSelector((state) => state.data);

  const FetchSingleLevel = useCallback(async () => {
    setLoading(true)
    const res = await GetUrl(`${Api.subs.single_level}/${id}`);
    if (res.status === 200) {
      setMain(res.msg);

      // find the package that matches the ones from database
      const packarr = [];
      res.msg.levelpack.map((ele) => {
        subs.map((data) => {
          data.sub.map((item) => {
            if (item.id === ele.pack) {
              const submit = {
                ...item,
                pricing: ele.pricing,
                former: ele.pricing,
              };
              packarr.push(submit);
            }
            return item;
          });
          return data;
        });
        return ele;
      });
      // find the subscriptions that matches the ones from database
      const subarr = [];
      res.msg.levelsub.map((ele) => {
        subs.map((data) => {
          if (data.id === ele.sub) {
            const submit = {
              ...data,
              percent: ele.percent,
              former: ele.percent,
            };
            subarr.push(submit);
          }
          return data;
        });
        return ele;
      });
      localStorage.setItem(PackPercent, JSON.stringify(subarr));
      localStorage.setItem(LevelPack, JSON.stringify(packarr));
      localStorage.setItem(LevelType, "edit");
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
