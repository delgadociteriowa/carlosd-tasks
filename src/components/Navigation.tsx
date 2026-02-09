'use client';
import { useAppSelector, useAppDispatch } from '@/state/hooks';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { logout } from "@/state/user/userSlice";
import HamburguerIcon from '../assets/icon-hamburger.svg'
import CloseIcon from '../assets/icon-close.svg'

const Navigation = () => {
  const [isLogged, setIsLogged] = useState(false);

  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.user.user?.id);
  
  useEffect(() => {
    setIsLogged(!!id);
  }, [id]);

  const handleLogout = () => {
    const confirmLogout = window.confirm('¿Desea cerrar sesión?');

    if (!confirmLogout) return;

    dispatch(logout());
    localStorage.removeItem('token');
  };

  return (
    <nav id="nav" className="nav w-[90%] my-0 mx-auto max-w-300 py-5 px-0 grid grid-cols-[max-content_max-content] justify-between">
      <h1 className="mr-auto font-brand text-3xl text-stone-700 no-underline z-40">Gestión de Tareas</h1>
      <ul className="nav__links absolute bg-stone-200/90 inset-0 z-30 min-h-125 sm:min-h-100 py-0 pl-[5%] pr-0 grid gap-7 md:static md:min-h-0 md:p-0 md:bg-transparent md:grid-flow-col md:gap-[1em]">
        <li className="list-none">
          <Link href="/" className="text-stone-600 hover:text-stone-800 no-underline text-2xl ml-2.5 md:text-xl">Home</Link>
        </li>
        <li className="list-none">
           {isLogged ? (
              <button onClick={handleLogout} className="py-2 px-5 rounded-full text-stone-100 text-sm tracking-[1px] bg-sky-600 hover:bg-sky-500 shadow-md cursor-pointer">
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="text-stone-600 hover:text-stone-800 no-underline text-2xl ml-2.5 md:text-xl"
              >
                Login
              </Link>
            )}
        </li>
      </ul>
      <a href="#" className="nav__close place-self-center cursor-pointer z-40">
        <Image src={CloseIcon} alt="Close icon" width={20} height={20} className="block w-5 h-5" /> 
      </a>
      <a href="#nav" className="nav__hamburguer place-self-center cursor-pointer z-40">
        <Image src={HamburguerIcon} alt="Menu icon" width={20} height={20} className="block w-5 h-5" /> 
      </a>
    </nav>
  );
};

export default Navigation;