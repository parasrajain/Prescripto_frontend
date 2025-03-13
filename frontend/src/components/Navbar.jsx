// // import React, { useEffect, useState } from 'react'
// // // import {assets} from '../assets/assets_frontend'
// // import {assets} from '../assets/assets_frontend/assets'
// // import { NavLink, useNavigate } from 'react-router-dom'

// // const Navbar = () => {
// //   const navigate=useNavigate();
// //   const [showMenu,setshowMenu]=useState(false);
// //   const [Token,setToken]=useState(true);
// //   const [isOpen,setIsOpen]=useState(false);

// //   useEffect(()=>{
// //     console.log(isOpen)
// //   },[isOpen]
// //   )

// //   return (
// //     <div  className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
// //      <img onClick={()=>{navigate('/')}} className='w-44 cursor-pointer ' src={ assets.logo} />
// //      <ul className='hidden md:flex items-start gap-5 font-medium'>
// //         <NavLink to='/' >
// //             <li className='py-1'>HOME</li>
// //             <hr  className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden '/>
// //         </NavLink>

// //         <NavLink to='/doctors'>
// //             <li className='py-1'>ALL DOCTORS</li>
// //             <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden '/>
// //         </NavLink>

// //         <NavLink to='/about'>
// //             <li className='py-1'>ABOUT</li>
// //             <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
// //         </NavLink>

// //         <NavLink to='/contact'>
// //             <li className='py-1'>CONTACT</li>
// //             <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden '/>
// //         </NavLink>
// //      </ul>
// //      <div className=' flex items-center gap-4'>
// //       {
// //          Token
// //           ?<div onClick={()=>setIsOpen(prev => !prev)} className='flex items-center gap-2 group relative cursor-pointer'>
// //             <img  className='w-8 rounded-full' src={assets.profile_pic} alt="" />
// //             <img className='w=2.5' src={assets.dropdown_icon} alt="" />
  
// //             <div className={` ${isOpen ?'group:block':'hidden' }absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block`}>
// //               <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
// //                 <p onClick={()=>{navigate('/myprofile')}} className='hover:text-black cursor-pointer'>My Profile</p>
// //                 <p onClick={()=>{navigate('/myappointmnets')}} className='hover:text-black cursor-pointer'>My Appointments</p>
// //                 <p onClick={()=>{setToken(false)}} className='hover:text-black cursor-pointer'>Logout</p>
// //               </div>
// //             </div>

// //           </div>
// //           :<button onClick={()=>navigate('/login')} className='bg-[#5f6FFF]  text-white px-8 py-3 rounded-full font-light hidden md:block'>
// //           Create Account
// //         </button>
// //       }

// //       <img onClick={()=>setshowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        
// //         {/* mobile menu */}
// //         <div className={` ${showMenu ?  'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
// //           <div className='flex items-center justify-between px-5 py-6'>
// //             <img className='w-36' src={assets.logo} alt="" />
// //             <img  className='w-7' onClick={()=>setshowMenu(false)} src={assets.cross_icon} alt="" />
// //           </div>

// //           <ul className='flex flex-col items-center font-medium gap-2 mt-5 px-5 text-lg'>
// //             <NavLink  onClick={(()=>setshowMenu(false))} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
// //             <NavLink onClick={(()=>setshowMenu(false))} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
// //             <NavLink onClick={(()=>setshowMenu(false))} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
// //             <NavLink onClick={(()=>setshowMenu(false))} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
// //           </ul>
// //         </div>
// //      </div>
// //     </div>
// //   )
// // } 

// // export default Navbar


// import React, { useContext, useEffect, useState } from 'react';
// import { assets } from '../assets/assets_frontend/assets';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const Navbar = () => {
//   const navigate = useNavigate();
//   // const [Token, setToken] = useState(true);
//   const {token,setToken,userData}=useContext(AppContext)
//   const [isOpen, setIsOpen] = useState(false); // for controlling the dropdown on small screens
//   const [showMenu, setShowMenu] = useState(false); // for the mobile menu


//   const Logout =()=>{
//     setToken(false)
//     localStorage.removeItem('token')
//   }

//   // Log isOpen value on change
//   useEffect(() => {
//     // console.log(isOpen);
//   }, [isOpen]);

  

//   return (
//     <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
//       <img onClick={() => { navigate('/'); }} className='w-44 cursor-pointer' src={assets.logo} />

//       {/* Desktop menu */}
//       <ul className='hidden md:flex items-start gap-5 font-medium'>
//         <NavLink to='/'>
//           <li className='py-1'>HOME</li>
//         </NavLink>
//         <NavLink to='/doctors'>
//           <li className='py-1'>ALL DOCTORS</li>
//         </NavLink>
//         <NavLink to='/about'>
//           <li className='py-1'>ABOUT</li>
//         </NavLink>
//         <NavLink to='/contact'>
//           <li className='py-1'>CONTACT</li>
//         </NavLink>
//       </ul>

//       {/* User profile and menu */}
//       <div className='flex items-center gap-4'>
//         {token  && userData? (
//           <div onClick={() => setIsOpen(prev => !prev)} className='flex items-center gap-2 group relative cursor-pointer'>
//             {/* Profile picture */}
//             <img className='w-8 h-8 rounded-full object-cover' src={userData.image} alt="Profile" />

//             {/* Dropdown icon */}
//             <img className='w-2.5 cursor-pointer' src={assets.dropdown_icon} alt="Dropdown" />

//             {/* Dropdown menu (Mobile) */}
//             <div 
//               className={`${
//                 isOpen ? 'block' : 'hidden'
//               } absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 md:hidden`} // Visible on click for mobile
//             >
//               <div onClick={() => setIsOpen(prev => !prev)} className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
//                 <p onClick={() => { 
//                   navigate('/myprofile'); 
//                   setIsOpen(prev => !prev) }}
//                   className='hover:text-black cursor-pointer'>
//                   My Profile
//                 </p>
//                 <p onClick={() => { navigate('/myappointments'); setIsOpen(false); }} className='hover:text-black cursor-pointer'>
//                   My Appointments
//                 </p>
//                 <p onClick={() => {Logout; setIsOpen(false); }} className='hover:text-black cursor-pointer'>
//                   Logout
//                 </p>
//               </div>
//             </div>

//             {/* Dropdown menu for larger screens (Hover) */}
//             <div className='hidden absolute top-0 right-0 pt-14 lg:group-hover:block pointer-events-auto'>
//               <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
//                 <p onClick={() => { navigate('/myprofile'); }} className='hover:text-black cursor-pointer'>
//                   My Profile
//                 </p>
//                 <p onClick={() => { navigate('/myappointments'); }} className='hover:text-black cursor-pointer'>
//                   My Appointments
//                 </p>
//                 <p onClick={() => { setToken(false); }} className='hover:text-black cursor-pointer'>
//                   Logout
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <button onClick={() => navigate('/login')} className='bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block'>
//             Create Account
//           </button>
//         )}

//         {/* Mobile Menu Button */}
//         <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="Menu" />

//         {/* Mobile Menu */}
//         <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
//           <div className='flex items-center justify-between px-5 py-6'>
//             <img className='w-36' src={assets.logo} alt="Logo" />
//             <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
//           </div>

//           <ul className='flex flex-col items-center font-medium gap-2 mt-5 px-5 text-lg'>
//             <NavLink onClick={() => setShowMenu(false)} to='/'>
//               <p className='px-4 py-2 rounded inline-block'>Home</p>
//             </NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
//               <p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p>
//             </NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/about'>
//               <p className='px-4 py-2 rounded inline-block'>ABOUT</p>
//             </NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/contact'>
//               <p className='px-4 py-2 rounded inline-block'>CONTACT</p>
//             </NavLink>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false); // for controlling the dropdown on small screens
  const [showMenu, setShowMenu] = useState(false); // for the mobile menu

  const handleLogout = () => {
    setToken(false); // Update token state
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to home page
    setIsOpen(false); // Close the dropdown menu
  };

  // Log isOpen value on change
  useEffect(() => {
    // console.log(isOpen);
  }, [isOpen]);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={() => { navigate('/'); }} className='w-44 cursor-pointer' src={assets.logo} />

      {/* Desktop menu */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
        </NavLink>
      </ul>

      {/* User profile and menu */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div onClick={() => setIsOpen(prev => !prev)} className='flex items-center gap-2 group relative cursor-pointer'>
            {/* Profile picture */}
            <img className='w-8 h-8 rounded-full object-cover' src={userData.image} alt="Profile" />

            {/* Dropdown icon */}
            <img className='w-2.5 cursor-pointer' src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown menu (Mobile) */}
            <div
              className={`${
                isOpen ? 'block' : 'hidden'
              } absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 md:hidden`} // Visible on click for mobile
            >
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p
                  onClick={() => {
                    navigate('/myprofile');
                    setIsOpen(false);
                  }}
                  className='hover:text-black cursor-pointer'
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate('/myappointments');
                    setIsOpen(false);
                  }}
                  className='hover:text-black cursor-pointer'
                >
                  My Appointments
                </p>
                <p
                  onClick={handleLogout} // Call handleLogout function
                  className='hover:text-black cursor-pointer'
                >
                  Logout
                </p>
              </div>
            </div>

            {/* Dropdown menu for larger screens (Hover) */}
            <div className='hidden absolute top-0 right-0 pt-14 lg:group-hover:block pointer-events-auto'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p
                  onClick={() => {
                    navigate('/myprofile');
                  }}
                  className='hover:text-black cursor-pointer'
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate('/myappointments');
                  }}
                  className='hover:text-black cursor-pointer'
                >
                  My Appointments
                </p>
                <p
                  onClick={handleLogout} // Call handleLogout function
                  className='hover:text-black cursor-pointer'
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block'>
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="Menu" />

        {/* Mobile Menu */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="Logo" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
          </div>

          <ul className='flex flex-col items-center font-medium gap-2 mt-5 px-5 text-lg'>
            <NavLink onClick={() => setShowMenu(false)} to='/'>
              <p className='px-4 py-2 rounded inline-block'>Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
              <p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'>
              <p className='px-4 py-2 rounded inline-block'>ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'>
              <p className='px-4 py-2 rounded inline-block'>CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;