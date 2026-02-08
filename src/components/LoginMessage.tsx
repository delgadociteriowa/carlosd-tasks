import Link from "next/link";

const LoginMessage = () => {
  return (
    <>
    <p className="text-gray-600 text-base sm:text-lg md:text-xl text-center mb-10">
        Bienvenido al sistema de gestión de tareas.<br/>  
        Por favor, ingrese para empezar a gestionar sus tareas.
      </p>
      <Link href="/login" className="block w-40 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-2xl text-center no-underline text-stone-100 text-xl tracking-[2px] mx-auto shadow-xl/20 transition-colors">Login</Link>
    </>
  )
};

export default LoginMessage;
