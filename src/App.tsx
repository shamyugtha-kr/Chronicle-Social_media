import './globals.css';
import SignIn from './auth/forms/SignIn';
import SignUp from './auth/forms/SignUp';
import { Routes, Route } from 'react-router-dom';
import Home from './root/pages/Home';
import AuthLayout from './auth/AuthLayout';
import RootLayout from './root/RootLayout';
import { Toaster } from "@/components/ui/toaster"
import { AllUsers, CreatePost, EditPost, Explore, PostDetails, Profile, Saved, UpdateProfile } from './root/pages';




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
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/saved' element={<Saved/>}/>
        <Route path='/all-users' element={<AllUsers/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/update-post/:id' element={<EditPost/>}/>
        <Route path='/posts/:id' element={<PostDetails/>}/>
        <Route path='/profile/:id/*' element={<Profile/>}/>
        <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
        </Route>
        
      </Routes>
      <Toaster />

    </main>
  )
}

export default App