import { Outlet, Navigate } from "react-router-dom"


const AuthLayout = () => {
  const isAuthentic = false;
  return (
   <>
   {isAuthentic ? (
    <Navigate to={"/"} />
  ) : (
    <>
    <section className="flex flex-1 justify-center items-center flex-col py-10">
    <Outlet/>
    </section>
    <img src="/assets/images/frontImg.png"
    alt="Front-Image"
    className="hidden  xl:block h-screen bg-no-repeat object-cover"/>

    </>
   )}
   </>
  )
}

export default AuthLayout