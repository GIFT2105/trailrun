"use client"
import Image from 'next/image'
import LoginForm from '../components/login'

export default function Home() {
  return (
    <main className="flex h-screen w-screen  flex-col items-center ">
   <h1 id='' className='font-abc  text-4xl font-bold mt-20  text-red-600   '>My Wines App</h1>
    <LoginForm  />
    </main>
  )
}
