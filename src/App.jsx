
import React, { useEffect } from 'react'
import Aos from "aos";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/Forms/Register'
import Login from './Pages/Forms/Login'
import Dashboard from './Pages/User/Dashboard'
import KycUpload from './Pages/User/KycUpload'
import AHome from './Pages/Admin/AHome'
import QueryTransaction from './Pages/Admin/Transactions/QueryTransaction'
import UpgradeUser from './Pages/Admin/ManageUsers/UpgradeUser'
import UsersMobile from './Pages/Admin/ManageUsers/UsersMobile'
import UsersEmails from './Pages/Admin/ManageUsers/UsersEmails'
import BlockUser from './Pages/Admin/ManageUsers/BlockUser'
import AdminResetUserPassword from './Pages/Admin/ManageUsers/AdminResetUserPassword'
import UpdateBankInfo from './Pages/Admin/UpdateBankInfo'
import AdminContactInfo from './Pages/Admin/AdminContactInfo'
import ManageNotification from './Pages/Admin/ManageNotification'
import VerifySignup from './Pages/Forms/VerifySignup';
import AdminRoute from './Private/AdminRoute';
import UserRoute from './Private/UserRoute';
import SalesAnalysis from './Pages/Admin/Transactions/SalesAnalysis';
import AllTransactions from './Pages/Admin/Transactions/AllTransactions';
import LockCables from './Pages/Admin/Locks/LockCables';
import LockData from './Pages/Admin/Locks/LockData';
import ManageLevels from './Pages/Admin/Levels/ManageLavels';
import Automation from './Pages/Admin/Automations/Automation';
import UserAllTransactions from './Pages/User/Transactions/AllTransactions'
import SuccessTransactions from './Pages/User/Transactions/SuccessTransactions';
import FailedTransactions from './Pages/User/Transactions/FailedTransactions';
import AirtimeBills from './Pages/User/Data/AirtimeBills';
import AirtimeSns from './Pages/User/Data/AirtimeSns';
import CableBills from './Pages/User/Data/CableBills';
import EducationBills from './Pages/User/Data/EducationBills';
import MeterBills from './Pages/User/Data/MeterBills';
import Data from './Pages/User/Data/Data';
import ManageDataPin from './Pages/User/Data/ManageDataPin';
import CreateService from './Pages/Admin/Services/CreateService';
import ManageService from './Pages/Admin/Services/ManageService';
import HomePage from './Pages/General/HomePage';
import AutomationService from './Pages/Admin/Automations/AutomationService';
import CreateAutomation from './Pages/Admin/Integrations/CreateAutomation';
import AllAutomations from './Pages/Admin/Integrations/AllAutomations';
import AutomationPackage from './Pages/Admin/Automations/AutomationPackage';
import AllUsers from './Pages/Admin/ManageUsers/AllUsers';
import UpdateIngeration from './Pages/Admin/Integrations/UpdateIntegration';
import AdminFinanceUser from './Pages/Admin/ManageUsers/AdminFinanceUser';
import SetupPlan from './Pages/Admin/Integrations/Plans/SetupPlan';
import UpdateApiPlan from './Pages/Admin/Integrations/Plans/UpdateApiPlan';
import AdminResetUserPin from './Pages/Admin/ManageUsers/AdminResetUserPin';
import PlanAutomation from './Pages/Admin/Integrations/Plans/PlanAutomation';
import PlanService from './Pages/Admin/Integrations/Plans/PlanService';
import PlanPackage from './Pages/Admin/Integrations/Plans/PlanPackage';



const App = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<UserRoute><Dashboard /></UserRoute>} />
      <Route path="/kyc_upload" element={<UserRoute><KycUpload /></UserRoute>} />
      <Route path="/all-transactions" element={<UserRoute><UserAllTransactions /></UserRoute>} />
      <Route path="/success-transactions" element={<UserRoute><SuccessTransactions /></UserRoute>} />
      <Route path="/failed-transactions" element={<UserRoute><FailedTransactions /></UserRoute>} />
      <Route path="/data_bundle" element={<UserRoute><Data /></UserRoute>} />
      <Route path="/airtime_bills" element={<UserRoute><AirtimeBills /></UserRoute>} />
      <Route path="/share_bills" element={<UserRoute><AirtimeSns /></UserRoute>} />
      <Route path="/cable_bills" element={<UserRoute><CableBills /></UserRoute>} />
      <Route path="/education_bills" element={<UserRoute><EducationBills /></UserRoute>} />
      <Route path="/meter_bills" element={<UserRoute><MeterBills /></UserRoute>} />
      <Route path="/create_pin" element={<UserRoute><ManageDataPin /></UserRoute>} />

      <Route path="/auth/admin" element={<AdminRoute><AHome /></AdminRoute>} />
      <Route path="/auth/admin/query_transactions" element={<AdminRoute><QueryTransaction /> </AdminRoute>} />
      <Route path="/auth/admin/upgrade_user" element={<AdminRoute><UpgradeUser /> </AdminRoute>} />
      <Route path="/auth/admin/users_mobile" element={<AdminRoute><UsersMobile /> </AdminRoute>} />
      <Route path="/auth/admin/users_emails" element={<AdminRoute><UsersEmails /> </AdminRoute>} />
      <Route path="/auth/admin/finance_user" element={<AdminRoute><AdminFinanceUser /> </AdminRoute>} />
      <Route path="/auth/admin/block_account" element={<AdminRoute><BlockUser /> </AdminRoute>} />
      <Route path="/auth/admin/all_users" element={<AdminRoute><AllUsers /> </AdminRoute>} />
      <Route path="/auth/admin/reset_user_password" element={<AdminRoute><AdminResetUserPassword /> </AdminRoute>} />
      <Route path="/auth/admin/reset_user_pin" element={<AdminRoute><AdminResetUserPin /> </AdminRoute>} />
      <Route path="/auth/admin/update_bank_info" element={<AdminRoute><UpdateBankInfo /> </AdminRoute>} />
      <Route path="/auth/admin/update_contact_info" element={<AdminRoute><AdminContactInfo /> </AdminRoute>} />
      <Route path="/auth/admin/manage_notification" element={<AdminRoute><ManageNotification /> </AdminRoute>} />
      <Route path="/auth/admin/sales_analysis" element={<AdminRoute><SalesAnalysis /> </AdminRoute>} />
      <Route path="/auth/admin/all_transactions" element={<AdminRoute><AllTransactions /> </AdminRoute>} />
      <Route path="/auth/admin/levels" element={<AdminRoute><ManageLevels /> </AdminRoute>} />
      <Route path="/auth/admin/lock-cables" element={<AdminRoute><LockCables /> </AdminRoute>} />
      <Route path="/auth/admin/lock-data" element={<AdminRoute><LockData /> </AdminRoute>} />
      <Route path="/auth/admin/automation" element={<AdminRoute><Automation /> </AdminRoute>} />
      <Route path="/auth/admin/automation/:id" element={<AdminRoute><AutomationService /> </AdminRoute>} />
      <Route path="/auth/admin/automation/:id/:pack" element={<AdminRoute><AutomationPackage /> </AdminRoute>} />
      <Route path="/auth/admin/service/new" element={<AdminRoute><CreateService /> </AdminRoute>} />
      <Route path="/auth/admin/service/view/:id" element={<AdminRoute><ManageService /> </AdminRoute>} />
      <Route path="/auth/admin/integration/new" element={<AdminRoute><CreateAutomation /> </AdminRoute>} />
      <Route path="/auth/admin/integration" element={<AdminRoute><AllAutomations /> </AdminRoute>} />
      <Route path="/auth/admin/integration/edit/:id" element={<AdminRoute><UpdateIngeration /> </AdminRoute>} />
      <Route path="/auth/admin/integration/plans/edit/:id" element={<AdminRoute><UpdateApiPlan /> </AdminRoute>} />
      <Route path="/auth/admin/integration/plans" element={<AdminRoute><PlanAutomation /> </AdminRoute>} />
      <Route path="/auth/admin/integration/plans/:id" element={<AdminRoute><PlanService /> </AdminRoute>} />
      <Route path="/auth/admin/integration/plans/:id/:pack" element={<AdminRoute><PlanPackage /> </AdminRoute>} />
      <Route path="/auth/admin/integration/plans/:id/:pack/:auto" element={<AdminRoute><SetupPlan /> </AdminRoute>} />

      <Route path="/" element={<HomePage />} />
      
      <Route path="/register" element={<Register />} />
      <Route path="/verify_account" element={<VerifySignup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
