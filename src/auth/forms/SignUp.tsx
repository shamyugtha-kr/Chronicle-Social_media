import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,

  FormField,
  FormItem,
 
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValid } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"

import { useToast } from "@/hooks/use-toast"
import { useCreateNewAccount, useSignInAccount } from "@/lib/react-query/quriesAndMutations"
import { useUserContext } from "@/context/AuthContext"





const SignUp = () => {


const navigate = useNavigate();
  const { toast } = useToast()
  const {checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const {mutateAsync:createUserAccount, isPending : isCreatingAccount} = 
  useCreateNewAccount();

  const {mutateAsync:signInAccount, isPending : isSigningIn} = useSignInAccount();

   // 1. Define your form.
   const form = useForm<z.infer<typeof SignUpValid>>({
    resolver: zodResolver(SignUpValid),
    defaultValues: {
      name:"",
      username: "",
      email:"",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValid>) {
    try {
      // Create a new user account
      const newUser = await createUserAccount(values);
  
      if (!newUser) {
        return toast({
          title: "Sign up failed. Please try again.",
        });
      }
  
      // Check if a session already exists before attempting to sign in
      const sessionExists = await checkAuthUser();
      
      if (!sessionExists) {
        // No active session, create one
        const session = await signInAccount({
          email: values.email,
          password: values.password
        });
  
        if (!session) {
          toast({ title: "Something went wrong. Please log in with your new account." });
          navigate("/sign-in");
          return;
        }
      } else {
        // Handle session already active
        toast({
          title: "Session already active. You are logged in.",
        });
        navigate('/');
        return;
      }
  
      // Final session check before navigation
      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        navigate('/');
      } else {
        return toast({
          title: "Sign up failed. Please try again.",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred. Please check your input and try again.",
      });
      console.error(error);
    }
  }
  

  return (
    <div>
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img
        src="assets/images/logo.png"
        alt="logo"
        width={100}
        height={100}/>
         <p className="text-light-1 small-medium md:base-regular mt-2">Moments that connect us.</p>
         <h2 className="h3-bold md:h2-bold pt-3 "> Create your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Please enter your deatils to use Chronicle</p>



      
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5  w-3/4 mt-4 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="Name" type="text" className="shad-input " {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="Userame" type="text" className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="Email" type="email" className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="Password" type="password" className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="bg-gradient-to-r from-[#ff218c] to-[#ff8d19]">  {isCreatingAccount ? (<div className="gap-2 flex-center">
          <Loader/>Loading...</div>) : 
        (<div>Sign Up</div>)}</Button>

        <p className="text-small-regular text-light-2 text-center ">Already have an account?
          <Link to={"/sign-in"} className="text-small-semibold ml-1 text-[#496aff]"> Sign In</Link>
        </p>
      </form>
      </div>
    </Form>
    
    </div>
  )
}

export default SignUp