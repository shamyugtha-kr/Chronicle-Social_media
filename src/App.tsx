import './globals.css';
import SignIn from './auth/forms/SignIn';
import SignUp from './auth/forms/SignUp';
import { Routes, Route } from 'react-router-dom';
import Home from './root/pages/Home';
import AuthLayout from './auth/AuthLayout';
import RootLayout from './root/RootLayout';
import { Toaster } from "@/components/ui/toaster"



const App = () => {
  return (
    <main className='flex h-screen'>
      
      <Routes> 
        {/*public */}
        <Route element={<AuthLayout/>}>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        </Route>

        {/*private */}
        <Route element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        </Route>
        
      </Routes>
      <Toaster />

    </main>
  )
}

export default App