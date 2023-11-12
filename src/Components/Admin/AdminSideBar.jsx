import React, { useState } from "react";
import man from "../../Assets/Images/man.png";
import {
  FcAssistant,
  FcCalculator,
  FcComboChart,
  FcCommandLine,
  FcComments,
  FcContacts,
  FcEngineering,
  FcFeedback,
  FcGlobe,
  FcHome,
  FcLibrary,
  FcLock,
  FcMultipleDevices,
  FcPortraitMode,
  FcProcess,
  FcSalesPerformance,
  FcServices,
  FcSettings,
} from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FcNegativeDynamic } from "react-icons/fc";
import { FcMindMap } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import { SlArrowDown, SlPower } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Autos, ServicesLinks } from "../Utils/Utility";

const AdminSideBar = ({closeSidebar}) => {
  const location = useLocation();
  const { user, subs, levels } = useSelector((state) => state.data);
  const [currentdrop, setCurrentDrop] = useState("");
  const navigate = useNavigate();
  const [serv, setServ] = useState("");

  const handleCurentDrop = (val) => {
    if (currentdrop !== val) {
      setCurrentDrop(val);
    } else {
      setCurrentDrop("");
    }
  };

  const handleServ = (item) => {
    if (serv !== item) {
      setServ(item);
    } else {
      setServ("");
    }
  };
  

  return (
    <>
      <div className="h-[13rem] sidehd relative bg-gradient-to-t from-indigo-600 to-indigo-900">
        <div className="flex items-center justify-center gap-2 pt-3 flex-col w-full">
          <img src={man} alt="" className="w-24" />
          <div className="text-indigo-100 capitalize">{user.username}</div>
        </div>
      </div>
      <div className="mt-10 flex flex-col w-11/12 mx-auto">
        <Link
          to="/auth/admin"
          className={`sidelink ${
            location.pathname === "/auth/admin"
              ? "bg-indigo-600 text-white"
              : ""
          }`}
        >
          {" "}
          <FcHome className="text-2xl" /> Dashboard
        </Link>

        <div className={`transition-all overflow-hidden`}>
          <div
            onClick={() => handleCurentDrop("deps")}
            className={`sidelink cursor-pointer ${
              location.pathname === "/" ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {" "}
            <FcSalesPerformance className="text-2xl" /> Deposit Summary{" "}
            <div className="w-fit ml-auto">
              <SlArrowDown />
            </div>
          </div>
          {currentdrop === "deps" && (
            <div className="ml-8 gap-3 flex flex-col capitalize text-zinc-600">
              <Link to="" className="sidelink1">
                Auto-Funding Summary
              </Link>
              <Link to="" className="sidelink1">
                Manual-Funding Summary
              </Link>
              <Link to="" className="sidelink1">
                Flutterwave Summary
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/auth/admin/all_transactions"
          className={`sidelink ${
            location.pathname === "/auth/admin/all_transactions"
              ? "bg-indigo-600 text-white"
              : ""
          }`}
        >
          <FcCalculator className="text-2xl" /> All Transactions
        </Link>
        <Link
          to="/auth/admin/sales_analysis"
          className={`sidelink ${
            location.pathname === "/auth/admin/sales_analysis"
              ? "bg-indigo-600 text-white"
              : ""
          }`}
        >
          <FcCalculator className="text-2xl" /> Sales Analysis
        </Link>
        {/* -------------- service settings ------------------ */}
        <div className="p-2 text-slate-500">Services Settings</div>
        <div className={`transition-all overflow-hidden`}>
          <div
            onClick={() => handleCurentDrop("integrations")}
            className={`sidelink cursor-pointer ${
              location.pathname === "/" ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {" "}
            <FcGlobe className="text-2xl" /> Integrations{" "}
            <div className="w-fit ml-auto">
              <SlArrowDown />
            </div>
          </div>
          {currentdrop === "integrations" && (
            <div className="ml-8 flex flex-col capitalize text-zinc-600">
              <Link to="/auth/admin/integration/new" className="sidelink1">
                Add New Api Service
              </Link>
              <Link to="/auth/admin/integration" className="sidelink1">
                All Api Services
              </Link>
              <Link to="/auth/admin/integration/plans" className="sidelink1">
                All Api Plans
              </Link>
            </div>
          )}
        </div>
        <div className={`transition-all overflow-hidden`}>
          <div
            onClick={() => handleCurentDrop("services")}
            className={`sidelink cursor-pointer ${
              location.pathname === "/" ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {" "}
            <FcEngineering className="text-2xl" /> Services{" "}
            <div className="w-fit ml-auto">
              <SlArrowDown />
            </div>
          </div>
          {currentdrop === "services" && (
            <div className="ml-8 flex flex-col capitalize text-zinc-600">
              <Link
                to="/auth/admin/service/new"
                className="text-sm pb-3 sidelink cursor-pointer font-semibold"
              >
                Create Services
              </Link>
              {Autos.map((ele, k) => (
                <div key={k}>
                  <div
                    onClick={() => handleServ(ele.category)}
                    className="text-sm pb-3 sidelink cursor-pointer font-semibold"
                  >
                    {ele.title}{" "}
                    <div className="w-fit ml-auto text-xs">
                      <SlArrowDown />
                    </div>
                  </div>
                  <div className="ml-3">
                    {serv === ele.category &&
                      subs.map(
                        (item, i) =>
                          ele.category?.slice(0, 3) === item.category?.slice(0, 3) &&
                          item.locked === "no" && (
                            <div
                              onClick={() => {
                                navigate(`/auth/admin/service/view/${item.id}`);
                                closeSidebar()
                              }}
                              key={i}
                              className="sidelink1 cursor-pointer"
                            >
                              {item.network}
                            </div>
                          )
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`transition-all overflow-hidden`}>
          <div
            onClick={() => handleCurentDrop("levels")}
            className={`sidelink cursor-pointer ${
              location.pathname === "" ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {" "}
            <FcComboChart className="text-2xl" /> Levels{" "}
            <div className="w-fit ml-auto">
              <SlArrowDown />
            </div>
          </div>
          {currentdrop === "levels" && (
            <div className="ml-8 flex flex-col capitalize text-zinc-600">
              <Link to="/auth/admin/levels/new" className="sidelink1">
                Create New Levels
              </Link>
              <Link to="/auth/admin/levels" className="sidelink1">
                All Levels
              </Link>
              {levels.map((item, i) => (
                <Link
                  key={i}
                  to={`/auth/admin/levels/edit/${item.id}`}
                  className="sidelink1"
                  onClick={() => {
                    closeSidebar()
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link
          to="/auth/admin/automation"
          className={`sidelink ${
            location.pathname === "/auth/admin/automation"
              ? "bg-indigo-600 text-white"
              : ""
          }`}
        >
          <FcCommandLine className="text-2xl" /> Site Automation
        </Link>
        <div className={`transition-all overflow-hidden`}>
          <div
            onClick={() => handleCurentDrop("locks")}
            className={`sidelink cursor-pointer ${
              location.pathname === "/" ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {" "}
            <FcServices className="text-2xl" /> Lock Services{" "}
            <div className="w-fit ml-auto">
              <SlArrowDown />
            </div>
          </div>
          {currentdrop === "locks" && (
            <div className="ml-8 gap-3 flex flex-col capitalize text-zinc-600">
              {ServicesLinks.map((item, i) => (
                <Link key={i} to={`${item.link}`} className="sidelink1">
                  Lock {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* ---------------- platform settings ------------- */}
        <div className="p-2 text-slate-500">Platform Settings</div>
        <div className={`transition-all overflow-hidden`}>
          <div
            onClick={() => handleCurentDrop("pages")}
            className={`sidelink cursor-pointer ${
              location.pathname === "/" ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {" "}
            <FcContacts className="text-2xl" /> pages{" "}
            <div className="w-fit ml-auto">
              <SlArrowDown />
            </div>
          </div>
          {currentdrop === "pages" && (
            <div className="ml-8 flex flex-col capitalize text-zinc-600">
              <Link
                to="/auth/admin/query_transactions"
                className={`sidelink ${
                  location.pathname === "/auth/admin/query_transactions"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcMindMap className="text-2xl" /> Query Users
              </Link>
              <Link
                to="/auth/admin/all_users"
                className={`sidelink ${
                  location.pathname === "/auth/admin/all_users"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcConferenceCall className="text-2xl" /> View All Users
              </Link>
              <Link
                to=""
                className={`sidelink ${
                  location.pathname === "/" ? "bg-indigo-600 text-white" : ""
                }`}
              >
                <FcProcess className="text-2xl" />
                Scan Duplicate Records
              </Link>
              <Link
                to="/auth/admin/finance_user"
                className={`sidelink ${
                  location.pathname === "/auth/admin/finance_user"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcNegativeDynamic className="text-2xl" /> Finance User
              </Link>
              <Link
                to="/auth/admin/upgrade_user"
                className={`sidelink ${
                  location.pathname === "/auth/admin/upgrade_user"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcAssistant className="text-2xl" /> Upgrade User
              </Link>
              <Link
                to="/auth/admin/users_mobile"
                className={`sidelink ${
                  location.pathname === "/auth/admin/users_mobile"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcMultipleDevices className="text-2xl" /> Users Mobile
              </Link>
              <Link
                to="/auth/admin/users_emails"
                className={`sidelink ${
                  location.pathname === "/auth/admin/users_emails"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcFeedback className="text-2xl" /> Users Email
              </Link>
              <Link
                to="/auth/admin/block_account"
                className={`sidelink ${
                  location.pathname === "/auth/admin/block_account"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcLock className="text-2xl" /> Block User
              </Link>
              <Link
                to="/auth/admin/reset_user_password"
                className={`sidelink ${
                  location.pathname === "/auth/admin/reset_user_password"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcPortraitMode className="text-2xl" /> Reset U-Password
              </Link>
              <Link
                to="/auth/admin/reset_user_pin"
                className={`sidelink ${
                  location.pathname === "/auth/admin/reset_user_pin"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcPortraitMode className="text-2xl" /> Reset U-Pin
              </Link>
              <Link
                to="/auth/admin/update_bank_info"
                className={`sidelink ${
                  location.pathname === "/auth/admin/update_bank_info"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcLibrary className="text-2xl" /> Update Bank Info
              </Link>
              <Link
                to="/auth/admin/update_contact_info"
                className={`sidelink ${
                  location.pathname === "/auth/admin/update_contact_info"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <FcComments className="text-2xl" /> Update Contact
              </Link>
              <Link
                to="/auth/admin/manage_notification"
                className={`sidelink ${
                  location.pathname === "/auth/admin/manage_notification"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <BsBell className="text-xl" /> Notification
              </Link>
              <Link
                to="/auth/admin/manage_kyc"
                className={`sidelink ${
                  location.pathname === "/auth/admin/manage_kyc"
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <BsBell className="text-xl" /> Manage Kyc
              </Link>
              <Link
                to=""
                className={`sidelink ${
                  location.pathname === "/" ? "bg-indigo-600 text-white" : ""
                }`}
              >
                <FcSettings className="text-2xl" /> Account Settings
              </Link>
            </div>
          )}
        </div>
        <Link
          to=""
          className={`sidelink ${
            location.pathname === "/" ? "bg-indigo-600 text-white" : ""
          }`}
        >
          <SlPower className="text-xl text-red-400" /> Logout
        </Link>
      </div>
    </>
  );
};

export default AdminSideBar;
