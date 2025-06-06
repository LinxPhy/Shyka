interface Chatbot {
    chatbot_id: number,
    name: string,
    alias: string,
    description: string,
    category: string,
    image: string,
    initialMessage: string,
    tier: string,
    colour: string,
    chatbotMessage: string,
    messages: number,
    likes: number,
    voted: number
}

interface Log {
    log_id: number,
    user_id: string,
    alias: string,
    role: string,
    content: string,
    created_at: string
}

interface Auth {
    email: string,
    status: string
}

interface User {
    user_id: string,
    name: string,
    email: string,
    image: string
}

interface AuthContext {
    signedIn: boolean
    user: {
        user_id: string,
        name: string,
        email: string,
        image: string
    }
}