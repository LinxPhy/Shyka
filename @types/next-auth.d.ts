import { DefaultSession } from "next-auth";

declare module "next-auth" {

    interface Session extends DefaultSession {
        user: {
            user_id: string,
            name: string,
            email: string,
            image: string
        }
    }

    interface User {
        user_id: string,
        name: string,
        email: string,
        image: string
    }

}