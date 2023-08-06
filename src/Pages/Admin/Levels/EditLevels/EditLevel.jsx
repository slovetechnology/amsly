import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Api, GetUrl } from "/src/Components/Utils/Apis";
import { useParams } from "react-router-dom";
const EditForm = React.lazy(() => import("./EditForm"));

const EditLevel = () => {
  const { id } = useParams();
  const [main, setMain] = useState({});
  const [loading, setLoading] = useState(true);

  const FetchSingleLevel = useCallback(async () => {
    const res = await GetUrl(`${Api.subs.single_level}/${id}`);
    if (res.status === 200) {
      setMain(res.msg);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    FetchSingleLevel();
  }, [FetchSingleLevel]);
  return (
    <div>
      {!loading && (
        <>
          <Suspense fallback='Loading...'>
            <EditForm main={main} />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default EditLevel;
