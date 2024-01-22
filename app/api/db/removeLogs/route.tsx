import connectDB from "@/app/lib/connectDb"
const User = require('@/app/schema/UserSchema')
const Logs = require('@/app/schema/LogsSchema')
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {

        await connectDB()

        const { fingerprint, alias } = await req.json()

        const find = await User.findOne({ username: fingerprint })
        const interactions = find.chatbots.find((chatbot: any) => chatbot.alias === alias).interactions

        await Logs.deleteMany({ _id: { $in: interactions } })
        await User.findOneAndUpdate({ _id: find._id },  { $set: {'chatbots.$[elem].interactions' : []} }, { arrayFilters: [{ 'elem._id': { $exists: true } }] })
        

        return NextResponse.json({})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error })
    }

}