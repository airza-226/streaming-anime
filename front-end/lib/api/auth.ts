import { User } from "@/types/user"
import { apiFetch } from "./client"

type AuthResponse = {
    token:string
    user:string
}

export function login(email:string,password:string) {
    return apiFetch<AuthResponse>('/api/auth/login',{
        method:"POST",
        body:JSON.stringify({email,password})
    })
}

export function register(username:string,email:string,password:string) {
    return apiFetch<AuthResponse>('/api/auth/register',{
        method:'POST',
        body:JSON.stringify({username,email,password})
    })
}

export function getMe() {
    return apiFetch<User>('/api/auth/me')
}