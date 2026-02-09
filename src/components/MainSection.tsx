'use client';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/state/hooks';
import { setUser } from '@/state/user/userSlice';
import TaskManager from './TaskManager';
import LoginMessage from './LoginMessage';

const MainSection = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.user.user?.id)

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {return;}

    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const { id } = payload;

      if (id) {
        dispatch(setUser(id));
      }
    } catch {
      console.error('The token could not be parsed');
    }
  }, []);

  return (
    <main>
      <h1 className="text-indigo-800 text-3xl sm:text-4xl md:text-5xl text-center my-10">
        Sistema de Gestión de Tareas
      </h1>
      {
        id ? <TaskManager/> : <LoginMessage/> 
      }
    </main>
  )
};

export default MainSection;