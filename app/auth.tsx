import NextAuth, { NextAuthConfig } from "next-auth";
import axios from "axios";
import Google from "next-auth/providers/google";

const authOptions: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    // pages: {
    //     signIn: "/auth/signin",
    // },
    basePath: "/api/auth",
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};

export const providers = authOptions.providers.map((provider: any) => provider.id)
export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async signIn({ user, account }) {
            const model = account?.provider
            const login = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, { user, model })
            if (login.status === 200) return true
            return false
        },

        async session({ session, token }) {
            (session.user as any).user_id = token.id as string
            return session
        },


        async jwt({ token, profile }) {
            if (profile) token.id = profile.sub
            return token
        },
    },
    ...authOptions
});