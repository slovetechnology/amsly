import { useSelector } from "react-redux";
import AdminLayout from "/src/Components/Admin/AdminLayout";
import React, { useCallback, useEffect, useState } from "react";
import { ErrorAlert } from "/src/Components/Utils/Utility";
import Loading from "/src/Components/General/Loading";
import { Api, PostUrl, GetUrl } from "/src/Components/Utils/Apis";
import { ToastAlert } from "/src/Components/Utils/Utility";
import { useNavigate, useParams } from "react-router-dom";
import EditSetupUser from "./EditSetupUser";
import EditSingleLevel from "./EditSingleLevel";
import EditLevelPercent from "./EditLevelPercent";
import DeleteLevelModal from "../DeleteLevelModal";

const EditForm = ({ main }) => {
  const LevelPack = "levelpack";
  const PackPercent = "packper";
  const PackUser = "userpack";
  const LevelType = "leveltype";
  const { subs } = useSelector((state) => state.data);
  const [active, setActive] = useState({});
  const [packs, setPacks] = useState([]);
  const [id, setId] = useState('')
  const [view, setView] = useState(false)
  const cs =
    "rounded-full py-3 text-xs lg:text-sm px-3 shadow-xl transition-all";
  const locals = JSON.parse(localStorage.getItem(LevelPack));
  const localper = JSON.parse(localStorage.getItem(PackPercent));
  const localuser = JSON.parse(localStorage.getItem(PackUser));
  const [localState, setLocalState] = useState(locals || []);
  const [perState, setPerState] = useState(localper || []);
  const [userState, setUserState] = useState(localuser) || [];
  const [percentState, setPercentState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(main.title || "");
  const btn =
    "py-4 px-6 rounded-full transition-all hover:scale-110 focus:scale-110 shadow-xl w-fit mx-auto font-semibold capitalize text-sm";
  const [zone, setZone] = useState(1);
  const { type } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const AdmingetUsers = useCallback(async () => {
    const res = await GetUrl(Api.user.all_users);
    if (res.status === 200) return setUsers(res.msg);
  }, []);

  useEffect(() => {
    AdmingetUsers();
  }, [AdmingetUsers]);

  const FetchOne = useCallback(() => {
    if (type === "edit") {
      // find the package that matches the ones from database
      const packarr = [];
      main.levelpack.map((ele) => {
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
      main.levelsub.map((ele) => {
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
      localStorage.setItem(PackUser, JSON.stringify(main.users));
      localStorage.setItem(LevelType, "edit");
    }
  }, []);

  useEffect(() => {
    FetchOne();
  }, [FetchOne]);

  const handleActive = (item) => {
    FetchOne()
    // loop through the packages under this subscription and add pricing to it
    let dataArr = [];
    item.sub.map((item) => {
      // find the pack from database that matches the current pack from the list and get its pricing
      const findpack = main.levelpack.find((ele) => ele.pack === item.id);
      const arrObj = {
        ...item,
        pricing: findpack ? findpack.pricing : item.price,
        former: findpack ? findpack.pricing : item.price,
      };
      dataArr.push(arrObj);
    });
    // add percent field to a new subscription that will work only when the subscription is a data gifting
    const getData = JSON.parse(localStorage.getItem(PackPercent));
    const findData = getData.find((ele) => ele.id === item.id);
    // find the subscription from database that matches the current subscription from the lst and get its percent
    const findsub = main.levelsub.find((ele) => ele.sub === item.id);
    const itemData = {
      ...item,
      percent: findsub ? findsub.percent : findData ? findData.percent : 100,
      former: findsub ? findsub.percent : findData ? findData.percent : 100,
    };
    setActive(itemData);
    setPacks(dataArr);

    // handle showing the percentage input if only the subscription is gifting or exam or cable
    const extras = ["cable", "exam"];
    const splited = item.network.split(" ");
    if (splited.includes("GIFTING") || extras.includes(item.category)) {
      setPercentState(true);
    } else {
      setPercentState(false);
    }
  };

  const handelForms = (index, value) => {
    // update the main package
    const mapped = packs.map((data) => {
      if (data.id === index) {
        return {
          ...data,
          pricing: value,
        };
      }
      return data;
    });
    setPacks(mapped);

    // update the local sotrage package
    const dataArr = JSON.parse(localStorage.getItem(LevelPack));
    const localMapped = dataArr.map((ele) => {
      if (ele.id === index) {
        return {
          ...ele,
          pricing: value,
        };
      }
      return ele;
    });
    localStorage.setItem(LevelPack, JSON.stringify(localMapped));
    setLocalState(localMapped);
  };

  const handleAddup = (data) => {
    const stor = JSON.parse(localStorage.getItem(LevelPack));
    const findData = stor.find((item) => item.id === data.id);
    if (!findData) {
      const dataArr = {
        ...data,
        pricing: data.pricing || data.price,
      };
      stor.push(dataArr);
      localStorage.setItem(LevelPack, JSON.stringify(stor));
      setLocalState(stor);
    } else {
      const filts = stor.filter((ele) => ele.id !== data.id);
      localStorage.setItem(LevelPack, JSON.stringify(filts));
      setLocalState(filts);
    }
  };

  const sendUser = (id) => {
    const stor = JSON.parse(localStorage.getItem(PackUser));
    const findData = stor.find((item) => item.id === id);
    if (!findData) {
      const dataArr = {
        id: id,
      };
      stor.push(dataArr);
      localStorage.setItem(PackUser, JSON.stringify(stor));
      setUserState(stor);
    } else {
      const filts = stor.filter((ele) => ele.id !== id);
      localStorage.setItem(PackUser, JSON.stringify(filts));
      setUserState(filts);
    }
  };

  const handleAddupPercent = (data) => {
    const stor = JSON.parse(localStorage.getItem(PackPercent));
    const findData = stor.find((item) => item.id === data.id);
    if (!findData) {
      const dataArr = {
        ...data,
        percent: 100,
      };
      stor.push(dataArr);
      localStorage.setItem(PackPercent, JSON.stringify(stor));
      setPerState(stor);
    } else {
      const filts = stor.filter((ele) => ele.id !== data.id);
      localStorage.setItem(PackPercent, JSON.stringify(filts));
      setPerState(filts);
    }
  };

  const handelFormsPercent = (index, value) => {
    // update the active subscripition
    setActive({
      ...active,
      percent: value,
    });

    // update the local sotrage subscription
    const dataArr = JSON.parse(localStorage.getItem(PackPercent));
    const localMapped = dataArr.map((ele) => {
      if (ele.id === index) {
        return {
          ...ele,
          percent: value,
        };
      }
      return ele;
    });
    localStorage.setItem(PackPercent, JSON.stringify(localMapped));
    setPerState(localMapped);

    // now get all the packages of this subscription in local storage and calculate on their pricing only
    const packArr = JSON.parse(localStorage.getItem(LevelPack));
    const mappedArr = packArr.map((ele) => {
      if (ele.network === index) {
        return {
          ...ele,
          pricing: (value * ele.price) / 100,
        };
      }
      return ele;
    });
    localStorage.setItem(LevelPack, JSON.stringify(mappedArr));
    setLocalState(mappedArr);
  };

  const handleSubmission = async () => {
    if (!title) return ErrorAlert("Level title is required!..");
    // filter out the percent and the id of the subscription
    const subsData = [];
    perState.map((ele) => {
      const itemData = {
        id: ele.id,
        percent: ele.percent,
      };
      subsData.push(itemData);
    });

    // filter out the pricing and the id of the package
    const packData = [];
    localState.map((ele) => {
      const itemData = {
        id: ele.id,
        pricing: ele.pricing,
      };
      packData.push(itemData);
    });
    const data = {
      packs: packData,
      subs: subsData,
      users: userState,
      title,
      id: main.id,
    };
    setLoading(true);
    const res = await PostUrl(Api.subs.update_level, data);
    setLoading(false);

    if (res.status === 200) {
      ToastAlert(res.msg);
      setTitle("");
      localStorage.setItem(LevelPack, JSON.stringify([]));
      localStorage.setItem(PackPercent, JSON.stringify([]));
      localStorage.setItem(PackUser, JSON.stringify([]));
      setLocalState([]);
      setPerState([]);
      setUserState([]);
      setTimeout(() => {
        navigate("/auth/admin/levels");
      }, 2000);
    } else {
      return ErrorAlert(res.msg);
    }
  };
  const handleOpening = () => {
    setId(main.id)
    setView(!view)
  }
  return (
    <AdminLayout>
      {loading && <Loading />}
        {view && <DeleteLevelModal id={id} closeView={() => setView(!view)} />}
      <div className="w-11/12 mx-auto">
        <div className="bg-white rounded-lg py-4 px-3">
          <div className="w-fit ml-auto">
            <button onClick={handleOpening} className="bg-red-600 text-white rounded-lg text-sm shadow-xl capitalize py-3 px-6">delete</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
            <div className="">
              <div className="text-sm">Title of Level</div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
              />
            </div>
            <div className=""></div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5 mb-10">
            <button
              onClick={() => setZone(1)}
              className={`${btn} ${
                zone === 1
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              add packages
            </button>
            <button
              onClick={() => setZone(2)}
              className={`${btn} ${
                zone === 2
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              connect users
            </button>
          </div>
          <div className={zone === 1 ? "" : "hidden"}>
            <div className="my-5">Select Subscriptions for this level</div>
            <div className="flex flex-wrap gap-3 items-center">
              {subs.map(
                (item, i) =>
                  item.locked === "no" && (
                    <button
                      onClick={() => handleActive(item)}
                      key={i}
                      className={`${
                        active.id === item.id
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100"
                      } ${cs}`}
                    >
                      {item.network}
                    </button>
                  )
              )}
            </div>
            {active?.id && (
              <div className="mt-10">
                {percentState && (
                  <EditLevelPercent
                    item={active}
                    handelForms={handelFormsPercent}
                    handleAddup={handleAddupPercent}
                    localState={perState}
                  />
                )}
                <div className="">
                  {packs.map(
                    (item, i) =>
                      item.lock === "no" && (
                        <EditSingleLevel
                          key={i}
                          item={item}
                          handelForms={handelForms}
                          handleAddup={handleAddup}
                          localState={localState}
                        />
                      )
                  )}
                </div>
              </div>
            )}
          </div>
          <div className={zone === 2 ? "" : "hidden"}>
            <div className="my-5">Select Users for this level</div>
            <div className="grid grid-cols-1 gap-3">
              {users.map(
                (ele, i) =>
                  ele.role !== "admin" && (
                    <EditSetupUser
                      sendUser={sendUser}
                      localState={userState}
                      user={ele}
                      key={i}
                    />
                  )
              )}
            </div>
          </div>
        </div>
        <div className="w-fit ml-auto mt-10">
          <button
            onClick={handleSubmission}
            className="bg-blue-700 text-white shadow-xl rounded-full py-3 px-7 capitalize"
          >
            Update level
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditForm;
