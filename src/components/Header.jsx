import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserInfoContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [userInfo] = useContext(UserInfoContext);
    const [openMenu, setOpenMenu] = useState(false);
    const { displayName, photoURL } = userInfo;
    return (
        <header className='bg-blue-500 relative'>
            <nav className='container mx-auto text-white py-3 px-2 flex justify-between items-center'>
                <Link to='/'><h1 className='font-bold text-2xl tracking-wide'>sunglassHut</h1></Link>
                <ul className='justify-between gap-10 font-semibold text-xl items-center hidden md:flex'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                    {
                        displayName &&
                        <li className='flex items-center gap-2'>
                            <img src={photoURL || 'user.png'} alt="" className='w-10 rounded-full' />
                            <p>{displayName}</p>
                        </li>
                    }
                </ul>
                <FontAwesomeIcon icon={faBars} className='md:hidden text-xl p-2 bg-white text-black rounded-sm cursor-pointer' onClick={() => setOpenMenu(!openMenu)} />
            </nav>
            {
                openMenu &&
                <div className='absolute top-2 w-full md:hidden z-10'>
                    <div className='text-blue-500 bg-white w-[95%] py-5 px-3 mx-auto shadow border border-gray-200'>
                        <FontAwesomeIcon icon={faXmark} className='md:hidden text-xl p-2 bg-blue-500 text-white rounded-sm cursor-pointer absolute right-6' onClick={() => setOpenMenu(!openMenu)} />

                        <Link to='/'><h1 className='font-bold text-2xl text-style'>sunglassHut</h1></Link>
                        <ul className='flex flex-col gap-3 mt-5 font-semibold text-xl'>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                            {
                                displayName &&
                                <li className='flex items-center gap-2'>
                                    <img src={photoURL || 'user.png'} alt="" className='w-10 rounded-full' />
                                    <p>{displayName}</p>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            }
        </header>
    );
};

export default Header;