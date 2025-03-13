// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets_frontend/assets';

// const Appointments = () => {
//   const {docId}=useParams()
//   const {doctors,currencySymbol}=useContext(AppContext)
//   const daysOfWeek=['SUN','MON','TUE','THU','FRI','SAT'];

//   const [docInfo,setDocInfo]=useState(null);
//   const [docSlot,setdocSlot]=useState([]);
//   const [slotInd,setslotInd]=useState(0);
//   const [slotTime,setslotTime]=useState('');

//   const getAvailableslot=async () => {
//     setdocSlot([]);

//     // getting curr date 
//     const today=new Date();
//     for(let i=0;i<7;i++)
//     {
//       // geting date with index
//       let currDate=new Date(today);
//       currDate.setDate(today.getDate()+i);

//       // settting end time of date
//       let endTime=new Date();
//       endTime.setDate(today.getDate()+i);
//       endTime.setHours(21,0,0,0)

//       // setting hrs
//       if(today.getDate()===currDate.getDate())
//       {
//         currDate.setHours(currDate.getHours()>10 ? currDate.getHours()+1 :10)
//         currDate.setMinutes(currDate.getMinutes()>30 ? 30 : 0)

//       }
//       else
//       {
//         currDate.setHours(10);
//         currDate.setMinutes(0);

//       }

//       let Timeslots=[];

//       while(currDate<endTime)
//       {
//         let formattedTime =currDate.toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'})

//         // addslot to array
//         Timeslots.push(
//           {
//             datetime:new Date(currDate),
//             time:formattedTime
//           }
//         )

//         // inc time by 30
//         currDate.setMinutes(currDate.getMinutes()+30);
//       }

//       setdocSlot((prev)=>([...prev,Timeslots]));
        
//     }

//   }

//   // console.log(docId);
//   const fetchDocInfo = async ()=>{
//     const docInfo=doctors.find((doc) =>doc._id === docId)
//     setDocInfo(docInfo);
//     console.log(docInfo);
//   }

//   useEffect(()=>{
//     fetchDocInfo();
//   },[doctors,docId])

//   useEffect(()=>{
//     getAvailableslot();
//   },[docInfo])

//   useEffect(()=>{
//     console.log(docSlot);
//   },[docSlot])


//   return docInfo && (
//     <div>
//       {/* doc details */}
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div>
//           <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
//         </div>

//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           {/* info -name-degree */}
//           <p className= 'flex items-center gap-2 text-2xl text-gray-900 font-medium'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//           </div>

//           {/* doc about */}
//           <div>
//             <p className='flex items-center gap-1 mt-3 text-sm font-medium text-gray-900'>
//               About <img src={assets.info_icon} alt="" />
//             </p>

//             <p className='text-sm text-gray-500 mt-1 max-w-[700px]'>
//               {docInfo.about}
//             </p>
//           </div>

//           <p className='text-gray-500 font-medium mt-4'>
//           Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
//           </p>

//         </div>
//       </div>
      
//       {/* booking slotsss */}
//       <div className='sm:ml-72 sm:p1-4 mt-4 font-medium text-gray-700'>
//         <p>Booking Slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
//           {
//             docSlot.length && docSlot.map((item,index)=>(
//               <div className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotInd===index ? 'bg-[#5f6FFF] text-white':'border border-gray-200'}`} key={index}>
//                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                 <p>{item[0] && item[0].datetime.getDate()} </p>
//               </div>

//             ))
//           }
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Appointments

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets_frontend/assets';
// import RelatedDoctors from '../components/RelatedDoctors';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';


// const Appointments = () => {
//   const { docId } = useParams();
//   const { doctors, currencySymbol,backendUrl,token ,getDoctorsData } = useContext(AppContext);
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

//   const navigate = useNavigate()

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlot, setdocSlot] = useState([]);
//   const [slotInd, setslotInd] = useState(0);
//   const [slotTime, setslotTime] = useState('');
//   const getAvailableslot = () => {
//     let slots = [];
//     const today = new Date();
  
//     for (let i = 0; i < 7; i++) {
//       let currDate = new Date(today);
//       currDate.setDate(today.getDate() + i);
  
//       let endTime = new Date(currDate);
//       endTime.setHours(21, 0, 0, 0); // End time at 9:00 PM
  
//       // Set the start time for the current day
//       if (i === 0) {
//         // If the current time is before 10:00 AM, start from 10:00 AM
//         if (currDate.getHours() < 10) {
//           currDate.setHours(10, 0, 0, 0);
//         } else {
//           // Round up to the next half-hour
//           const minutes = currDate.getMinutes();
//           if (minutes > 30) {
//             currDate.setHours(currDate.getHours() + 1, 0, 0, 0);
//           } else {
//             currDate.setMinutes(30, 0, 0);
//           }
//         }
//       } else {
//         // For future days, start from 10:00 AM
//         currDate.setHours(10, 0, 0, 0);
//       }
  
//       let Timeslots = [];
  
//       while (currDate < endTime) {
//         let formattedTime = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
//         let day = currDate.getDate();
//         let month = currDate.getMonth() + 1; // Months are 0-indexed
//         let year = currDate.getFullYear(); // Call the method
  
//         const slotDate = `${day}_${month}_${year}`;
//         const slotTime = formattedTime;
  
//         // Check if the slot is available
//         const isSlotAvailable =
//           !docInfo.slots_booked[slotDate] || !docInfo.slots_booked[slotDate].includes(slotTime);
  
//         if (isSlotAvailable) {
//           Timeslots.push({
//             datetime: new Date(currDate),
//             time: formattedTime,
//           });
//         }
  
//         // Increment time by 30 minutes
//         currDate.setMinutes(currDate.getMinutes() + 30);
//       }
  
//       slots.push(Timeslots);
//     }
  
//     setdocSlot(slots);
//   };

//   // const getAvailableslot = () => {
//   //   let slots = [];
//   //   const today = new Date();

//   //   for (let i = 0; i < 7; i++) {
//   //     let currDate = new Date(today);
//   //     currDate.setDate(today.getDate() + i);

//   //     let endTime = new Date(currDate);
//   //     endTime.setHours(21, 0, 0, 0); // End time at 9:00 PM

//   //     if (i === 0) {
//   //       currDate.setHours(currDate.getHours() < 10 ? 10 : currDate.getHours());
//   //       currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
//   //     } else {
//   //       currDate.setHours(10);
//   //       currDate.setMinutes(0);
//   //     }

//   //     let Timeslots = [];

//   //     while (currDate < endTime) {
//   //       let formattedTime=currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//   //       let day = currDate.getDate()
//   //       let month = currDate.getMonth()+1
//   //       let year = currDate.getFullYear()

//   //       const slotDate = day+"_"+month+"_"+year
//   //       const slotTime =formattedTime

//   //       const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)?false:true


//   //       if(isSlotAvailable)
//   //       {
//   //         Timeslots.push({
//   //           datetime: new Date(currDate),
//   //           // time: currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//   //           time:formattedTime
//   //         });
//   //       }

//   //       // Timeslots.push({
//   //       //   datetime: new Date(currDate),
//   //       //   // time: currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//   //       //   time:formattedTime
//   //       // });

//   //       currDate.setMinutes(currDate.getMinutes() + 30);
//   //     }

//   //     slots.push(Timeslots);
//   //   }

//   //   setdocSlot(slots);
//   // };

//   const fetchDocInfo = () => {
//     const docInfo = doctors.find((doc) => doc._id === docId);
//     setDocInfo(docInfo);
//   };

//   const bookAppointment = async ()=>{
//     console.log('token',token);
    
//     if(!token)
//     {
//       toast.warn('Login To Book Appointment ')
//       return navigate('/login')
//     }
//     try{
//       const date=docSlot[slotInd][0].datetime
//       let day=date.getDate();
//       let month=date.getMonth()+1;
//       let year = date.getFullYear()

//       const slotDate=day+"_"+month+"_"+year
//       console.log(slotDate);
//       console.log('url ',backendUrl);
      
//       // const {data}= await axios.post(backendUrl+'/api/users/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
//       const { data } = await axios.post(
//         `${backendUrl}/api/user/book-appointment`, // URL
//         { docId, slotDate, slotTime }, // Request body
//         { headers: { token } } // Headers
//       );
//       console.log('data: ',data);
//       if(data.success)
//       {
//         toast.success(data.message)
//         getDoctorsData()
//         navigate('/myappointments')
//       }
//       else{
//         toast.error(data.message)
//       }
      


//     }
//     catch(error){
//       console.log(error);
//       toast.error(error.message)
      

//     }
//   }

//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docId]);

//   useEffect(() => {
//     if (docInfo) {
//       getAvailableslot();
//     }
//   }, [docInfo]);

//   return docInfo && (
//     <div>
//       {/* Doctor Details */}
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           <p className='flex items-center gap-2 text-2xl text-gray-900 font-medium'>
//             {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
//           </p>
//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//           </div>
//           <p className='flex items-center gap-1 mt-3 text-sm font-medium text-gray-900'>
//             About <img src={assets.info_icon} alt="" />
//           </p>
//           <p className='text-sm text-gray-500 mt-1 max-w-[700px]'>{docInfo.about}</p>
//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
//           </p>
//         </div>
//       </div>
      
//       {/* Booking Slots */}
//       <div className='sm:ml-72 sm:p1-4 mt-4 font-medium text-gray-700'>
//         <p>Booking Slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {docSlot.length > 0 && docSlot.map((item, index) => (
//             <div key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotInd === index ? 'bg-[#5f6FFF] text-white' : 'border border-gray-200'}`} onClick={() => setslotInd(index)}>
//               <p>{item.length > 0 && daysOfWeek[item[0].datetime.getDay()]}</p>
//               <p>{item.length > 0 && item[0].datetime.getDate()}</p>
//             </div>
//           ))}
//         </div>

//         <div className={`flex items-center gap-3 w-full overflow-x-scroll mt-4 `}>
//           {
//             docSlot.length && docSlot[slotInd].map((item,index)=>(
              
//               <p onClick={()=>(setslotTime(item.time))} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5f6FFF] text-white' : 'text-gray-400 border border-gray-300'} `} key={index}>
//                 {
//                   item.time.toLowerCase()
//                 }
//               </p>
//             ))
//           }
//         </div>
//         <button onClick={bookAppointment} className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>
//         Book an appointment
//         </button>
//       </div>

//       {/* realted doctors */}
//       <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//     </div>
//   );
// };

// export default Appointments;


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// import { assets } from '../assets/assets_frontend/assets';

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setdocSlot] = useState([]);
  const [slotInd, setslotInd] = useState(0);
  const [slotTime, setslotTime] = useState('');

  // Fetch available slots
  const getAvailableslot = () => {
    let slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      let endTime = new Date(currDate);
      endTime.setHours(21, 0, 0, 0); // End time at 9:00 PM

      // Set the start time for the current day
      if (i === 0) {
        // If the current time is before 10:00 AM, start from 10:00 AM
        if (currDate.getHours() < 10) {
          currDate.setHours(10, 0, 0, 0);
        } else {
          // Round up to the next half-hour
          const minutes = currDate.getMinutes();
          if (minutes > 30) {
            currDate.setHours(currDate.getHours() + 1, 0, 0, 0);
          } else {
            currDate.setMinutes(30, 0, 0);
          }
        }
      } else {
        // For future days, start from 10:00 AM
        currDate.setHours(10, 0, 0, 0);
      }

      let Timeslots = [];

      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currDate.getDate();
        let month = currDate.getMonth() + 1; // Months are 0-indexed
        let year = currDate.getFullYear(); // Call the method

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        // Check if the slot is available
        const isSlotAvailable =
          !docInfo.slots_booked?.[slotDate] || !docInfo.slots_booked[slotDate].includes(slotTime);

        if (isSlotAvailable) {
          Timeslots.push({
            datetime: new Date(currDate),
            time: formattedTime,
          });
        }

        // Increment time by 30 minutes
        currDate.setMinutes(currDate.getMinutes() + 30);
      }

      slots.push(Timeslots);
    }

    setdocSlot(slots);
  };

  // Fetch doctor info
  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login To Book Appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.warn('Please select a time slot');
      return;
    }

    try {
      const date = docSlot[slotInd][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData(); // Refresh doctor data
        navigate('/myappointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    }
  };

  // Fetch doctor info on component mount
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // Fetch available slots when docInfo changes
  useEffect(() => {
    if (docInfo) {
      getAvailableslot();
    }
  }, [docInfo]);

  return docInfo ? (
    <div>
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl text-gray-900 font-medium'>
            {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <p className='flex items-center gap-1 mt-3 text-sm font-medium text-gray-900'>
            About <img src={assets.info_icon} alt="" />
          </p>
          <p className='text-sm text-gray-500 mt-1 max-w-[700px]'>{docInfo.about}</p>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:p1-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlot.length > 0 &&
            docSlot.map((item, index) => (
              <div
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotInd === index ? 'bg-[#5f6FFF] text-white' : 'border border-gray-200'
                }`}
                onClick={() => setslotInd(index)}
              >
                <p>{item.length > 0 && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item.length > 0 && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlot.length > 0 &&
            docSlot[slotInd].map((item, index) => (
              <p
                onClick={() => setslotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime ? 'bg-[#5f6FFF] text-white' : 'text-gray-400 border border-gray-300'
                }`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>
        <button
          onClick={bookAppointment}
          className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Appointments;

