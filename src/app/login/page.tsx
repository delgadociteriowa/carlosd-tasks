'use client';
import Header from "@/components/Header";

const Login = () => {
  return (
    <>
      <Header />
      <main>
        <h3 className="text-center text-indigo-800 text-4xl tracking-[2px] mt-10 mb-4">
          Login
        </h3>
        <section className="w-[90%] mx-auto max-w-125 py-20 text-stone-700 mb-26">
          <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                username
              </label>
              <input
                type="text"
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                password
              </label>
              <input
                type="password"
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

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