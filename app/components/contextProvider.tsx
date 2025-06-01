'use client'

import { createContext } from 'react';

export const AuthContext = createContext({});

export function ContextProvider({ auth, children }: { auth: any, children: React.ReactNode }) {

    let signedIn : boolean = false
    let user : User = {
        user_id: '',
        name: '',
        email: '',
        image: ''
    }

    if (auth?.user) {
        signedIn = true
        
        const { user_id, name, email, image } = auth?.user || {}
        user = { user_id, name, email, image }

    }
    
    return (
      <AuthContext.Provider value={{ signedIn, user }}>
        {children}
      </AuthContext.Provider>
    )
}