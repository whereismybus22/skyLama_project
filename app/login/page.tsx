"use client"
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 , Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image'
import BrandLogo from "@/public/Brand.png"
import QuestAILogo from "@/public/QuesLogo.png"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Header = () => {
  return (
    <div className=' w-full h-[25vh] mt-[5vh] flex flex-col items-center jusc ' >
      <Image src={BrandLogo} alt='BrandLogo Image Here' className=' w-[5vw] ' />
      <div className=' text-2xl text-[#7F20CF] ' >Welcome to</div>
      <div className=' text-2xl font-extrabold text-[#7F20CF] ' >Ques.AI</div>
    </div>
  )
}

const FormModel = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [username , setUsername] = useState("")
  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate a network request
      const res = await signIn('credentials', {
      email: email,
      password: password,
      username:username,
      redirect: false,
    });
    router.push('/dashboard')

    } catch (error) {
      console.error("Error during form submission:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = email.trim() !== ''

  return (
    <form onSubmit={handleSubmit} className='space-y-4 mt-[1vh] ' noValidate>
      <div className='space-y-2'>
        <label 
          htmlFor='email'
          className='text-sm font-medium text-black'>
          Username
        </label>
        <div className='relative'>
          <Input
            type='Username'
            name='Username'
            placeholder='Username'
            required
            disabled={isLoading}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='h-10 bg-background ring-accent-foreground placeholder:text-muted-foreground'
            autoComplete='email'
          />
        </div>
        <label 
          htmlFor='email'
          className='text-sm font-medium text-black'>
          Email
        </label>
        <div className='relative'>
          <Input
            type='email'
            name='email'
            placeholder='Email Address'
            required
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           className='h-10 bg-background ring-accent-foreground placeholder:text-muted-foreground'
            autoComplete='email'
          />
        </div>
        <label 
          htmlFor='email'
          className='text-sm font-medium text-black'>
          Password
        </label>
        <div className='relative'>
          <Input
            type='text'
            name='password'
            placeholder='password'
            required
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='h-10 bg-background ring-accent-foreground placeholder:text-muted-foreground'
            autoComplete='email'
          />
        </div>
        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full mt-[2vh] h-10 text-base font-medium transition-colors
          ${!isFormValid || isLoading
              ? 'dark:bg-[#063f30] text-white '
              :"w-full h-10 mt-[2vh] font-bold text-lg text-[#fafafa] dark:duration-300 border-1 border-neutral-200  duration-300 ] cursor-pointer"}
      `}
        >
          {isLoading && <Loader2 className='animate-spin mr-2' />}
          {isLoading ? 'Signing' : 'Signin'}
        </Button>
      </div>
    </form>
  )
}

function Page() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className=' w-[100vw] h-[100vh] flex ' >
            <div className=' w-[65vw] h-[100vh] bg-[#be7af5] pt-14 pl-16 ' >
                <div className='  ' >
                  <div className=' "w-full h-[5vh] flex items-center gap-3 " , " md:w-full md:h-[5vh]  " ' >
                    <Image src={QuestAILogo} alt='Quest Logo Imahe Here' className=' w-[10vw] ' />
                  </div>
                  <div className=' w-[50vw] h-[60vh] mt-[5vh] z-40 ' >
                    <div className=' w-[70%] text-[5vw] leading-[12vh] tracking-tighter font-extrabold text-white ' > Your podcast will no longer be just a hobby. </div>
                    <div className=' w-[35%] text-[2.5vw] font-extrabold text-[#fafafa] , " xl:text-[1.1vw] lg:text-[1.6vw] md:text-[1.6vw] md:mt-1 " '> Supercharge Your Distribution using our AI assistant! </div>
                  </div>
                </div>
            </div>
            <Card className='w-[35vw] h-[100vh] bg-white pt-4 rounded-none border-none flex '>
                <CardHeader className="space-y-2">
                    <Header />
                </CardHeader>
                <CardContent>
                    <FormModel />
                </CardContent>
                <CardDescription className=' w-[100%] mt-[2vh] pl-[1.5vw] pr-[1.5vw] h-full text-center text-gray-400 font-bold text-[3vw] , " md:text-[1.5vw] lg:text-[1.3vw] xl:text-[1.2vw] md:mt-1 " '>
                </CardDescription>
            </Card>
        </div>
    </div>
  )
}

export default Page
