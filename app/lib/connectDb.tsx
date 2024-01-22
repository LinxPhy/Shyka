const mongoose = require('mongoose')

const DATABASE_URL = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!DATABASE_URL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

declare global {
    var mongoose: { conn: any; promise: any };
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose: any) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
