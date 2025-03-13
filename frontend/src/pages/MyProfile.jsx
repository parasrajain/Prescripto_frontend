import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  // const [userData, setUserData] = useState({
  //   name: "Edward Vincent",
  //   image: assets.profile_pic,
  //   email: "abc@gmail.com",
  //   phone: "123456789",
  //   address: {
  //     line1: "57th Cross, Richmond ",
  //     line2: "Circle, Church Road, London",
  //   },
  //   gender: "Male",
  //   dob: "18-06-2000",
  // });

  const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext);
  // console.log('data',userData)

  const [isEdit, setEdit] = useState(false);
  const [image,setImage]=useState(false)

  const updateUserProfileData=async()=>{
    try{
      const formData = new FormData()
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image)

      const {data}=await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}}) 
      if(data.success)
      {
        toast.success(data.message)
        await loadUserProfileData()
        setEdit(false)
        setImage(false)
      }
    }
    catch(error)
    {
      toast.error(data.message)
    }


  }

  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {
        isEdit
        ?<label htmlFor="image">
          <div className="inline-block cursor-pointer relative">
            <img className="w-36 opacity-75 rounded" src={image?URL.createObjectURL(image):userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image?'':assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image"  hidden/>
        </label>
        :
        <img className="w-36 rounded" src={userData.image} alt="" />
      }
      {isEdit  ? (
        <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Eail Id :</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone :</p>
          {isEdit  ? (
            <input className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, phone: e.target.value }));
              }}
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p className="font-medium">Address :</p>
          {
            isEdit 
            ?<p> <input className="bg-gray-50" value={userData.address.line1} onChange={(e) => {
              setUserData((prev) => ({ ...prev, address: {...prev, line1:e.target.value} }));
            }} type="text"  />
            <br />
            <input  className="bg-gray-50"value={userData.address.line2} onChange={(e) => {
                setUserData((prev) => ({ ...prev, address: {...prev, line2:e.target.value} }));
              }} type="text" />
              </p>
            :
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>

      </div>

      <div>
        <p className="text-neutral-500 underline mt-3" >BASIC INFORMATION </p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender :</p>
          {
            isEdit?
            <select className="max-w-20 bg-gray-100" value={userData.gender} onChange={(e) => {
              setUserData((prev) => ({ ...prev, gender: e.target.value }));
            }}>
              <option value="Male">Male</option>
              <option value="Female">Female </option>
            </select>
            :
            <p className="text-gray-400">
              {userData.gender}
            </p>
          }

          <p className="font-medium">Birthday :</p>
          {
            isEdit ?
            <input className="max-w-28 bg-gray-100 " value={userData.dob} onChange={(e) => {
              setUserData((prev) => ({ ...prev, dob:e.target.value }));
            }} type="date" name="" id="" />
            :<p className="text-gray-400">{userData.dob}</p>
          }
        </div>
      </div>

      <div className="mt-10">
        {
          isEdit
          ?<button className="border border-[#5f6FFF] px-8 py-2 rounded-full hover:text-white transition-all hover:bg-[#5f6FFF]" onClick={updateUserProfileData}>Save Information</button>
          :<button className="border border-[#5f6FFF] px-8 py-2 rounded-full hover:text-white transition-all hover:bg-[#5f6FFF] " onClick={()=>setEdit(true)}>Edit </button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
