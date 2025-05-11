import { exchangeCodeForAccessToken, getAccountDetails } from "@/lib/aurinko"
import { db } from "@/server/db"
import { waitUntil } from '@vercel/functions'
import { auth, EmailAddress } from "@clerk/nextjs/server"
import { create } from "domain"
import { access } from "fs"
import axios from "axios";
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const { userId } = await auth()
    
if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    const url = new URL(req.url)
    const params = url.searchParams
    const status = params.get('status')
if (status != 'success') return NextResponse.json({ message: 'Failed to link account' }, { status: 400 })
// get the code to exchange for the access token
const code = params.get('code')
if (!code) return NextResponse.json({ message: 'No code provided' }, { status: 400 })
const token = await exchangeCodeForAccessToken(code)  
if (!token) return NextResponse.json({message: 'Failed to exchange code for access token' },{status:400})
const accountDetails = await getAccountDetails(token.accessToken)

    await db.account.upsert({
        where: { id: token.accountId.toString()

         },
         update: { accessToken: token.accessToken },

         create: {
                id: token.accountId.toString(),
                userId,
                emailAddress: accountDetails.email,
                name: accountDetails.name,
                accessToken: token.accessToken
            }
        })
        waitUntil(

            axios.post(`${process.env.NEXT_PUBLIC_URL}/api/initial-sync`, { accountId: token.accountId.toString(), userId }).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err.response.data)
            })
        )

    console.log('userid is', accountDetails)
    return NextResponse.redirect(new URL('/mail', req.url))
}