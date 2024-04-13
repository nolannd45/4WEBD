
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API } from "../utils/API.js";

const Header = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState('');

    function deco(){
        localStorage.clear()
        window.location.reload(false);
    
      }
      async function loadUser(id){
        if (user){
            const aa = await API.userById(id)
            setUser(aa.data)
        }
        
      }
    
    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setUser(JSON.parse(localStorage.getItem('user')))
        loadUser(user?.userId)


        // eslint-disable-next-line
    }, [])


    return (
        <header className='flex flex-col md:flex-row items-center justify-between px-4 h-14 text-center shadow-2xl bg-[#4B0082] mb-2 text-white w-full sticky top-0 z-10'>
            <div className='text-3xl font-bold'>
                <Link to={'/'} className='hover:text-gray-400 duration-100'>Akkor Hotel ltd</Link>
            </div>
            <div className='text-xl '>
                
                <Link to={'/mybook'} className='mx-2 hover:scale-105 hover:text-slate-400'>Mes réservations</Link>
                {token ? 
                <button className='bg-black text-white font-semibold rounded-full p-3 cursor-pointer '>
                    <Link value="logout" className='cursor-pointer text-2xl' onClick={deco}>Déconnexion</Link>
                </button>
                : 
                <button  className='bg-black text-white font-semibold rounded-full p-3 cursor-pointer ' >
                    <Link to={'/login'} value="profile" className='cursor-pointer text-2xl'>Connexion</Link>
                </button>
               }
                

            </div>
        </header>
    )
}

export default Header;