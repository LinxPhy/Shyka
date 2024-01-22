

import connectDB from "@/app/lib/connectDb"
const Record = require('@/app/schema/RecordSchema')
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {

        await connectDB()

        const {alias} = await req.json()
        await Record.findOneAndUpdate({ alias: alias }, { $inc: { messages: 1 } }, { upsert: true })

        return NextResponse.json({})

    } catch (error){

        console.log(error)
        return NextResponse.json({})
    }

}

