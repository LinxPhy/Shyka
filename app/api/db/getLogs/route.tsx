import connectDB from "@/app/lib/connectDb"
const User = require('@/app/schema/UserSchema')
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {

        await connectDB()

        const { fingerprint, alias } = await req.json()
        const user = await User.findOne({ username: fingerprint })

        if (!user) return NextResponse.json({})

        const allLogs = await User.findOne({ username: fingerprint })
            .populate({
                path: 'chatbots',
                populate: { path: 'interactions', model: 'Logs' }
            }).exec()

        const chatbot = allLogs.chatbots.find((chatbot: any) => chatbot.alias === alias);

        if (chatbot && chatbot.interactions) {
            const logs = chatbot.interactions;
            const extractedData = logs.map(({ role, content } : any) => ({ role, content }));
            return NextResponse.json({ logs: extractedData })

        } else {
            return NextResponse.json({})
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error })
    }

}