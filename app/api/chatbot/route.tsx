import { NextResponse } from "next/server"

export async function GET() {
    
    try{
        return NextResponse.json({chat: "area"})
    } catch (error){
        console.log(error)
        return NextResponse.json({error: error})
    }

}

