import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/Images/logo.svg'
import data from '../../Assets/Images/data.jpg'
import electric from '../../Assets/Images/electric.png'
import airtime from '../../Assets/Images/airtime.svg'
import dstv from '../../Assets/Images/dstv.png'
import airtel from '../../Assets/Images/airtel.png'
import mtn from '../../Assets/Images/mtn.png'
import glo from '../../Assets/Images/glo.jpg'
import mobile from '../../Assets/Images/9mobile.png'
import { FaBars, FaClock, FaFacebook, FaInstagram, FaLocationArrow, FaMailBulk, FaPhone, FaPhoneAlt, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FcAbout, FcContacts, FcHome, FcMoneyTransfer, FcServices } from 'react-icons/fc'
import { AiFillSignal } from 'react-icons/ai'


const plans = [
  {
    Icons: airtel,
    name: 'Airtel',
    text: 'Our goal is to help you harness the full benefits of the 21st century by providing you with uninterrupted internet access 24/7 all year round.',
  },
  {
    Icons: mtn,
    name: 'Mtn',
    text: 'Our fast, pocket friendly and affordable airtime, data and bills payment packages are all designed to suit and support all your needs.',
  },
  {
    Icons: glo,
    name: 'Glo',
    text: 'We are committed to helping you achieve your dreams and attain your full potentials because we believe..',
  },
  {
    Icons: mobile,
    name: '9Mobile',
    text: 'We are committed to helping you achieve your dreams and attain your full potentials because we believe..',
  },
]
const contact = [
  {
    Icons: <FaMailBulk />,
    name: 'Email: ',
    text: 'support@Example.com',
  },
  {
    Icons: <FaPhoneAlt />,
    name: 'Call: ',
    text: '234567890098765',
  },
  {
    Icons: <FaClock />,
    name: 'Working Time: ',
    text: '05.00AM to 12.00AM',
  },
  {
    Icons: <FaLocationArrow />,
    name: 'Location: ',
    text: 'Lagos Nigeria',
  },
]
const why = [
  {
    Icons: <AiFillSignal />,
    name: 'Automation Services',
    text: 'Our goal is to help you harness the full benefits of the 21st century by providing you with uninterrupted internet access 24/7 all year round.',
  },
  {
    Icons: <AiFillSignal />,
    name: 'Swift Delivery',
    text: 'Our fast, pocket friendly and affordable airtime, data and bills payment packages are all designed to suit and support all your needs.',
  },
  {
    Icons: <AiFillSignal />,
    name: 'Customer Support',
    text: 'We are committed to helping you achieve your dreams and attain your full potentials because we believe..',
  },
]

const services = [
  {
    icon: data,
    name: 'Data Bundle',
    text: '',
  },
  {
    icon: electric,
    name: 'Bill Payment',
    text: 'Because we understand your needs, we have made bills and utilities payment more convenient.',
  },
  {
    icon: airtime,
    name: 'Airtime VTU',
    text: 'Making an online airtime recharge has become very easy, affordable and secure on cooplug.com',
  },
  {
    icon: dstv,
    name: 'Cable Subscription',
    text: 'Start enjoying this very low rates Data plan for your internet browsing and online services.',
  },
  {
    icon: dstv,
    name: 'Cable Subscription',
    text: 'Start enjoying this very low rates Data plan for your internet browsing and online services.',
  },
  {
    icon: dstv,
    name: 'Cable Subscription',
    text: 'Start enjoying this very low rates Data plan for your internet browsing and online services.',
  },
  {
    icon: dstv,
    name: 'Cable Subscription',
    text: 'Start enjoying this very low rates Data plan for your internet browsing and online services.',
  },
  {
    icon: dstv,
    name: 'Cable Subscription',
    text: 'Start enjoying this very low rates Data plan for your internet browsing and online services.',
  },
]
const HomePage = () => {
  const Cs = 'capitalize text-orange-400 flex items-center gap-2 hover:text-blue-900 text-lg font-medium'
  const [scroll, setScroll] = useState(false)
  const [form, setForm] = useState({
    email: '',
    message: '',
  })

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  window.onscroll = function () {
    siteScroll()
  }

  function siteScroll() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }
  return (
    <div>
      <div className="">
        <div className="banner w-full lg:h-[43rem] h-[30rem]">
          <div className={`fixed w-full z-30 top-0 ${scroll ? 'bg-white shadow-lg border-b' : ''}`}>
            <div className="flex items-center px-10 py-6 justify-between">
              <div className=""> <img src={logo} alt="" className="w-32 " /> </div>
              <div className=""><Link to='/quickaccess' className={`${Cs} bg-orange-500 text-white px-3 py-2 rounded-xl`}>Quick Access</Link></div>
              <div className="">
                <div className="lg:flex hidden items-center gap-5">
                  <Link to='' className={`${Cs}`}>home <FcHome className='text-2xl' /> </Link>
                  <Link to='' className={`${Cs}`}>services <FcServices className='text-2xl' /> </Link>
                  <Link to='' className={`${Cs}`}>pricing <FcMoneyTransfer className='text-2xl' /> </Link>
                  <Link to='' className={`${Cs}`}>about <FcAbout className='text-2xl' /> </Link>
                  <Link to='' className={`${Cs}`}>contact <FcContacts className='text-2xl' /> </Link>
                  <Link to='/login' className={`${Cs} bg-orange-500 text-white px-3 py-2 rounded-xl`}>sign in</Link>
                </div>
                <div className="cursor-pointer text-3xl lg:hidden text-orange-500"> <FaBars /> </div>
              </div>
            </div>
          </div>
          <br /><br /><br /><br /><br />


          <div className="lg:mx-[10rem] mx-6 lg:my-20">
            <div className="text-white text-start texting">
              <div className="lg:text-5xl text-2xl mb-3 font-semibold">
                <h3>Welcome To [sitename] Digital Services That Offer Services Like Cheap Data</h3>
              </div>
              <p className="text-xl font-medium text-gray-200">A technology platform that offers solutions to digital needs at best possible price without compromising quality.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mb-20 my-16 mx-10 lg:mx-20">
          <div className="text-center">
            <h1 className="text-4xl text-orange-500 font-bold">Our Core Services</h1>
            <div className="flex items-center py-5 justify-center"> <div className="px-6 py-0.5 bg-orange-600 rounded-lg"></div> </div>
            <p className="text-blue-900 text-xl font-medium">We offer instant recharge of Airtime, Databundle, CableTV (DStv, GOtv & Startimes), Electricity Bill Payment and Airtime to Cash & E-pins</p>
          </div>
        </div>
        <div className="mb-20">
          <div className="lg:grid grid-cols-4 gap-5 w-[90%] mx-auto">
            {services.map((item, i) => (
              <div className="bg-white lg:w-[16rem] mb-3 flex items-center justify-center text-center px-4 h-[15rem] rounded-lg shadow-xl" key={i}>
                <div className="">
                  <div className="">
                    <div className="flex items-center justify-center mb-5">  <img src={item.icon} alt="" className="h-12" /> </div>
                    <div className="">
                      <h1 className="font-bold text-xl mb-2"> {item.name} </h1>
                      <p className="text-gray-500"> {item.text} </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <div className="mt-10 mb-10">
          <div className="bg-team h-fit">
            <div className="">
              <div className="grid grid-cols-0">
                <div className='bg-gray-200/90 lg:w-[50%]'>
                  <div className="mx-10 py-20 lg:h-[67vh]">
                    <div className="text-orange-500 text-3xl font-bold">Get started with [sitename]</div>
                    <p className="lg:text-xl text-lg font-medium my-3">Take your business to the next level and unlock special perks by just purchasing Data Bundles, AirtimeVTU, Cable Subscription, Billspayment e.t.c.</p>
                  </div>
                </div>
                <div className="overflow-hidden">  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-400">Why [sitename?]</h1>
          <div className="flex items-center py-4 justify-center"> <div className="px-6 py-0.5 bg-orange-600 rounded-lg"></div> </div>
          <p className="text-xl font-medium text-blue-900">Here are few reason why we are consider to be the best.</p>
        </div>
        <div className="mb-10">
          <div className="my-16">
            <div className="lg:flex items-center justify-center grid-cols-4 gap-5 w-[90%] mx-auto">
              {why.map((item, i) => (
                <div className="bg-white lg:w-[20rem] mb-3 flex items-center justify-center text-center px-4 h-[15rem] rounded-lg shadow-xl" key={i}>
                  <div className="">
                    <div className="">
                      <div className="flex items-center justify-center mb-5"> {item.Icons} </div>
                      <div className="">
                        <h1 className="text-lg mb-2"> {item.name} </h1>
                        <p className="text-gray-500"> {item.text} </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-orange-500">Affordable Plans & Pricing</h1>
          </div>
          <div className="my-10">
            <div className="lg:flex items-center justify-center grid-cols-4 gap-5 w-[90%] mx-auto">
              {plans.map((item, i) => (
                <div className="bg-white lg:w-[20rem] mb-3 flex items-center justify-center text-center px-4 h-[23rem] rounded-lg shadow-xl" key={i}>
                  <div className="">
                    <div className="">
                      <div className="flex items-center justify-center mb-5"> <img src={item.Icons} alt="" className="w-10" /> </div>
                      <div className="">
                        <h1 className="text-xl mb-2 font-medium"> {item.name} </h1>
                        {/* <p className="text-gray-500"> {item.text} </p> */}
                        <div className="flex gap-4 items-center justify-center border-b py-2">
                          <h3 className="text-md font-semibold">Volume</h3>
                          <h3 className="text-md font-semibold">Validity</h3>
                          <h3 className="text-md font-semibold">Price</h3>
                        </div>
                        <div className="flex gap-4 items-center justify-center border-b py-2">
                          <p className="">1gb</p>
                          <p className="">30 Days</p>
                          <p className="">#3000</p>
                        </div>
                        <div className="flex gap-4 items-center justify-center border-b py-2">
                          <p className="">1gb</p>
                          <p className="">30 Days</p>
                          <p className="">#3000</p>
                        </div>
                        <div className="flex gap-4 items-center justify-center border-b py-2">
                          <p className="">1gb</p>
                          <p className="">30 Days</p>
                          <p className="">#3000</p>
                        </div>
                        <div className="flex gap-4 items-center justify-center border-b py-2">
                          <p className="">1gb</p>
                          <p className="">30 Days</p>
                          <p className="">#3000</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mb-20">
          <div className="bg-gray-200 w-full py-10 px-10 h-fit">
            <div className="text-center">
              <h1 className="text-2xl font-medium text-orange-500">For more info about our services, reach us by filling the below form.</h1>
            </div>
            <div className="mb-10">
              <div className="my-16">
                <div className="lg:flex items-center justify-center grid-cols-4 gap-5 w-[90%] mx-auto">
                  {contact.map((item, i) => (
                    <div className="bg-white lg:w-[20rem] mb-3 flex items-center justify-center text-center px-4 h-[15rem] rounded-lg shadow-xl" key={i}>
                      <div className="">
                        <div className="">
                          <div className="flex items-center justify-center mb-5"> {item.Icons} </div>
                          <div className="">
                            <h1 className="text-lg mb-2"> {item.name} </h1>
                            <p className="text-gray-500"> {item.text} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-blue-950 py-16 w-full">
          <div className="lg:flex items-start justify-between mx-16">
            <div className="">
              <div className="">
                <h1 className="text-xl font-semibold text-orange-400">About Us</h1>
                <p className="text-lg font-medium text-gray-100 mb-5">[sitename] platform is generally design for <br /> you and you families. Pay all your bills <br /> from anywhere you are.</p>
              </div>
              <div className="flex items-center gap-2 mb-4 text-md text-gray-100"> <FaLocationArrow /> <span>Lagos Nigeria Nigeria.</span> </div>
              <div className="flex items-center gap-2 mb-4 text-md text-gray-100"> <FaPhoneAlt /> <span>2345678987</span> </div>
              <div className="flex items-center gap-2 mb-4 text-md text-gray-100"> <FaMailBulk /> <span className="">support@Example.com</span> </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="mb-4">
                <h1 className="text-xl font-semibold mb-5 text-orange-400">Newsletter</h1>
                <p className="text-lg text-gray-100 font-medium">Subscribe to our mailing list to receives daily <br /> updates direct to your inbox!</p>
              </div>
              <form className='mb-6' onSubmit={handleSubmit}>
                <div className="flex">
                  <input type="email" placeholder='Email Address' className='outline-none border-gray-300 w-[16rem] py-3 px-2 rounded-tl-lg rounded-bl-lg ' />
                  <button className='border-gray-300 py-3 text-white bg-orange-400 rounded-tr-lg rounded-br-lg px-5 '>Subscribe</button>
                </div>
              </form>
              <div className="flex gap-3 text-4xl items-center">
                <Link to='' className='text-orange-400 hover:text-white'> <FaFacebook /> </Link>
                <Link to='' className='text-orange-400 hover:text-white'> <FaInstagram /> </Link>
                <Link to='' className='text-orange-400 hover:text-white'> <FaTwitter /> </Link>
                <Link to='' className='text-orange-400 hover:text-white'> <FaYoutube /> </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage