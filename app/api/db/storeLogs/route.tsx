import connectDB from "@/app/lib/connectDb"
const Logs = require('@/app/schema/LogsSchema')
const User = require('@/app/schema/UserSchema')

import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {

        await connectDB()

        const {fingerprint, alias, role, content}  = await req.json() 

        const logData = {
            alias: alias,
            role: role,
            content: content
        };

        const logs = new Logs(logData);
        await logs.save();


        const find = await User.findOne({ username: fingerprint }) || false
        const found = find ? find.chatbots.some((chatbot: any) => chatbot.alias === alias) : false

        if (!found) {

            const filter = { username: fingerprint };
            const update = {
                $addToSet: {
                    chatbots: {
                        $each: [{
                            alias: alias,
                            interactions: logs._id
                        }]
                    }
                }
            };

            const options = { upsert: true, new: true };

            await User.findOneAndUpdate(filter, update, options);

        } else {


            const filter = { username: fingerprint, 'chatbots.alias': alias };
            const update = {
                $addToSet: {
                    'chatbots.$.interactions': logs._id
                }
            };
            const options = { upsert: true, new: true };

            await User.findOneAndUpdate(filter, update, options);

        }

        return NextResponse.json({ success: "Sucess" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error })
    }

}