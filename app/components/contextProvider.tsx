'use client'

import { createContext } from 'react';

export const AuthContext = createContext({});

export function ContextProvider({ auth, children }: { auth: any, children: React.ReactNode }) {

    let signedIn : boolean = false
    let user : User = {
        name: '',
        email: '',
        image: ''
    }

    if (auth?.user) {
        signedIn = true
        
        const { name, email, image } = auth?.user || {}
        user = { name, email, image }

    }

    

    return (
      <AuthContext.Provider value={{ signedIn, user }}>
        {children}
      </AuthContext.Provider>
    )
}