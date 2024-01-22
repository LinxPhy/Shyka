

import { NextResponse } from "next/server"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(req: Request) {

    try {

        const amount = await req.json()
        const donationAmount = parseFloat( (amount.amount + '0' + '0') )

        if (donationAmount === undefined || donationAmount < 1 || donationAmount > 10000000) {
            console.log('Not in range')
            return NextResponse.json({ error: 'Invalid donation amount' })
        }

        const product = await stripe.products.create({
            name: 'Shyka Chatbot Donation',
            description: 'Donate to Shyka',
            type: 'good'
        })

        const price = await stripe.prices.create({
            unit_amount: donationAmount,
            currency: 'gbp',
            product: product.id,
        })

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: process.env.NEXT_CLIENT_URL,
            cancel_url: process.env.NEXT_CLIENT_URL,
        });

        return NextResponse.json({ url: session.url })

    } catch (error) {

        console.log(error)
        return NextResponse.json({ error: error })

    }

}



