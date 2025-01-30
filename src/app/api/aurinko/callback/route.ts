import { auth } from "@clerk/nextjs/server"

import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const { userId } = await auth()

    console.log('userid is', userId)
    return NextResponse.json({ message: 'Hello World' })
}