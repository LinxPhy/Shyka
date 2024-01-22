import connectDB from "@/app/lib/connectDb"
const User = require('@/app/schema/UserSchema')

async function getLogs(fingerprint: string) {

    await connectDB()

    const user = await User.findOne({ username: fingerprint })

    if (!user) return {}

    const logs = await User.populate(user, {
        path: 'chatbots',
        populate: {
            path: 'interactions',
            model: 'Logs'
        }
    })

    return logs

}

export default getLogs