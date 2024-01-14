import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserInfoContext } from '../App';

const Header = () => {
    const [userInfo] = useContext(UserInfoContext);
    const { displayName, photoURL } = userInfo;
    return (
        <header className='bg-blue-500'>
            <nav className='container mx-auto text-white py-3 flex justify-between items-center'>
                <Link to='/'><h1 className='font-bold text-2xl tracking-wide'>sunglassHut</h1></Link>
                <ul className='flex justify-between gap-10 font-semibold text-xl items-center'>
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
            </nav>
        </header>
    );
};

export default Header;