'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Link from 'next/link'
const Register = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [isSubmitting,setIsSubmitting] = useState(false)
    const {register} = useAuth()
    const router = useRouter()
    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        setError('')
        if(!email)
        setIsSubmitting(true)
        try {
            await register(username,email,password)
            router.push('/settings')
        } catch (err) {
            setError(err instanceof Error ? err.message : "failed")
        } finally {
            setIsSubmitting(false)
        }
    }
  return (
    <main>
        <section className='mx-auto max-w-sm px-4 py-16 sm:px-6'>
            <h1 className="mb-6 text-xl font-semibold text-foreground">Register</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="username" className='text-sm text-muted'>Username</label>
                    <input type="text" id='username' required value={username} onChange={(e)=>setUsername(e.target.value)} className='rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent' />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className='text-sm text-muted'>Email</label>
                    <input type="email" required value={email} onChange={(e)=> setEmail(e.target.value)} id='email' className='rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent' />
                </div>
                <div className="flex items-center justify-between ">
                    {/* birthDay */}
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className='text-sm text-muted'>Password</label>
                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required className='rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent' />

                    {error && <p className='text-sm text-red-500'>{error}</p>}
                </div>
                <button type='submit' disabled={isSubmitting} className='rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50'>
                    {isSubmitting ? 'Wait...' : 'Register'}
                </button>
            </form>
            <p className="mt-4 text-sm text-muted">
                Already have account ? <Link href="/login" className="font-medium text-accent hover:underline">
                Login
                </Link>
            </p>
        </section>
    </main>
  )
}

export default Register