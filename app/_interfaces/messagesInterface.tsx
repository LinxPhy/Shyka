
enum Roles {
    user = 'user',
    system = 'system',
    assistant = 'assistant'
}


interface MessagesInterface {
    role: string
    content: string
}

export default MessagesInterface