import axios from "axios"
import Cookies from "js-cookie"

// const server = `https://amsly.jogglecryp.com/api`
const server = `http://localhost:5002/api`


const user_urls = {
    register_user: 'user/user-register',
    verify_signup_otp: `user/verify-otp`,
    resend_verify_otp: `user/resend-otp`,
    user_login: `user/user-login`,
    user_info: `user/`,
    admin_info: `user/admin`,
    user_logout: `user/user-logout`,
    setup_pin: `user/setup-pin`,
    confirm_access: `user/confirm-access`,
    all_mobiles: `user/all-mobiles`,
    all_emails: `user/all-emails`,
    all_users: `user/all-users`,
    block_account: `user/block-account`,
    contact_info: `user/contact-info`,
    get_contact_info: "user/get-contact-info",
    create_transaction_pin: "user/create-transaction-pin",
    update_user_password: "user/update-user-password",
    update_user_pin: "user/update-user-pin",
    finance_user_account: "user/finance-user-account",
    all_downliners: "user/all-downliners",
}

const subs_urls = {
    create_subscription: "subscription/create-subscription",
    all_subscriptions: "subscription/all-subscriptions",
    delete_subscription: "subscription/delete-subscription",
    edit_subscription: "subscription/edit-subscription",

    all_subscriptiondata: "subscription/all-subscriptiondata",
    update_subscriptiondata: "subscription/update-subscriptiondata",
    delete_subscriptiondata: "subscription/delete-subscriptiondata",

    subscription_locks: "subscription/subscription-locks",

    add_subscription_service: "subscription/add-subscription-service",
    update_subscription_service: "subscription/update-subscription-service",

    get_automation_service: "subscription/get-automation-services",
    get_single_automation_service: "subscription/get-single-automation-service",
    delete_automation_service: "subscription/delete-automation-services",
    update_package_automation: "subscription/update-package-autmation",
    user_get_automation: "subscription/user-get-automation",
    suspend_automation: "subscription/suspend-automation-service-for-package",
    other_automation: "subscription/other-automation-service",

    add_api_plans: "subscription/add-api-plans",
    update_api_plans: "subscription/update-api-plans",
    all_api_plans: "subscription/all-api-plans",
    single_api_plans: "subscription/single-api-plans",

    add_level: "subscription/add-level-plan",
    update_level: "subscription/update-level-plan",
    delete_level: "subscription/delete-level-plan",
    single_level: "subscription/single-level",
    all_levels: "subscription/all-levels",
    upgrade_user_level: "subscription/upgrade-account-level",

    add_airtime_automation: "subscription/airtime-automation",
    all_airtime_automations: `subscription/get-all-airtime-automations`,

    add_cable_automation: "subscription/cable-automation",
    all_cable_automations: `subscription/get-all-cable-automations`,

    add_exam_automation: "subscription/exam-automation",
    all_exam_automations: `subscription/get-all-exam-automations`,

    add_electricity_automation: "subscription/electricity-automation",
    all_electricity_automations: `subscription/get-all-electricity-automations`,
}
const bill_urls = {
    data: "bills/data",
    airtime: "bills/airtime",
    cable: "bills/cable",
    electricity: "bills/electricity",
    exam: "bills/exam",
    verify_iuc: "bills/verify-iuc",
    verify_meter: "bills/verify-meter",
}

const transaction_urls = {
    user: `transactions/user/all`,
    admin: `transactions/admin/all`
}

export const Api = {
    user: user_urls,
    subs: subs_urls,
    bills: bill_urls,
    transactions: transaction_urls,
}

export const NormalPostUrl = async (endpoint, data) => {
    const res = await axios.post(`${server}/${endpoint}`, data)
    return res.data
}

// secure api routes 
const token = Cookies.get('session')

const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    }
}

export const PostUrl = async (endpoint, data) => {
    const res = await axios.post(`${server}/${endpoint}`, data, options)
    return res.data
}

export const GetUrl = async (endpoint) => {
    const res = await axios.get(`${server}/${endpoint}`, options)
    return res.data
}

export const UpdateUrl = async (endpoint, data) => {
    const res = await axios.put(`${server}/${endpoint}`, data, options)
    return res.data
}

export const DeleteUrl = async (endpoint, data) => {
    const res = await axios.delete(`${server}/${endpoint}`, data, options)
    return res.data
}

// decoder (DSTV) = 8058033490

// {
//     "status": "success",
//     "status_code": "200",
//     "balance": "86668",
//     "mobile": "08139067401",
//     "email": "chrisokey4@gmail.com"
//   }

// {
//     "status": "success",
//     "status_code": "200",
//     "old_balance": "85812",
//     "new_balance": 85704,
//     "time": "07-Jun-23  11:13 AM",
//     "amountPaid": "108",
//     "message": "MTN SME 500MB Purchase Successful on 08139067401 Dear Customer, You have successfully shared 500MB Data to 2348139067401. Your SME data balance is 676.72GB expires 07/09/2023. Thankyou",
//     "api_response": "Dear Customer, You have successfully shared 500MB Data to 2348139067401. Your SME data balance is 676.72GB expires 07/09/2023. Thankyou"
//   }
// {
//     "code": "200",
//     "status": "true",
//     "message": "MTN 500MB Data Purchase To 08037979513 (Dear Customer, You have successfully shared 500MB Data to 2348037979513. Your SME data balance is 287.5GB expires 07/09/2023. Thankyou)"
//   }

// cooplug sub
//https://cooplug.com/api/data?token=api_55abbfa30928c4abe98bcac2f5bcfc12&refid=REF-UNIQUE723723828932&plan_id=mtn500&network=mtn&mobile=08139067401

// bofia sub
// {
//     "mobile"
//   : 
//   "08139067401",
//   "network"
//   : 
//   "MTN",
//   "plan_code"
//   : 
//   "500",
//   "request_id"
//   : 
//   "REF-UNIQUE723723828932",
//   "token"
//   : 
//   "api_f6336383411f1c3400f0c4ffd9ee9265"
//   }