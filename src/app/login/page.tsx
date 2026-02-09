'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/state/hooks';
import Header from "@/components/Header";
import { dataBaseMockUsers } from "@/state/user/dataBaseMock";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const id = useAppSelector((state) => state.user.user?.id);

  useEffect(() => {
    if (!error) return;

    const timeout = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  const generateJWT = (login: string, password: string) => {
    const user = dataBaseMockUsers.find(
      (u) => u.login === login && u.password === password
    );

    if (!user) {
      setError('Username o Password no coinciden');
      return;
    }

    setError('');

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        id: user.id,
        name: user.name,
      })
    );
    const signature = btoa('mock-signature');

    const token = `${header}.${payload}.${signature}`;

    localStorage.setItem('token', token);
    router.push('/');
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateJWT(username, password);
  };

  return (
    <>
      <Header />
      <main>
        <h3 className="text-center text-indigo-800 text-4xl tracking-[2px] mt-10 mb-4">
          Login
        </h3>
        <section className="w-[90%] mx-auto max-w-125 py-20 text-stone-700 mb-26">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <p className="text-red-600 text-center font-medium">
              {error ? error : ''}
            </p>
            <button
              type="submit"
              className="py-5 rounded-full text-center text-stone-100 text-xl tracking-[2px] mx-auto mt-4 shadow-xl/20 w-[90%] bg-sky-600 hover:bg-sky-500 cursor-pointer"
            >
              Login
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;