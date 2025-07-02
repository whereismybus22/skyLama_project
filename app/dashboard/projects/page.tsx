import { authOptions } from '@/app/lib/auth';
import { AppbarClient } from '@/app/UI/AppbarClient';
import { CreateProject } from '@/app/UI/CreateProject';
import FetchProject from '@/app/UI/FetchProject';
import { getServerSession } from 'next-auth';
// import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {
    const session = await getServerSession(authOptions);
      if (!session?.user) {
        redirect('/api/auth/signin')
      }
        console.log(session.user.id,
  session.user.email)
  return (
    <div className=' w-full min-h-[100vh] ' >
      <AppbarClient />
      <div className=' pl-[6vw] pr-[6vw] ' >
        <div className=' w-full h-[10vh] flex items-center text-4xl font-extrabold justify-between ' >
          <div>Projects</div>
          <div> <CreateProject /> </div>
        </div>
        <div className=' mt-[5vh] ' >
          <FetchProject />
        </div>
      </div>
    </div>
  )
}
