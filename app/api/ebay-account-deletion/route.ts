// app/api/ebay-account-deletion/route.ts

import { createHash } from 'crypto'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const challengeCode = searchParams.get('challenge_code')
  const verificationToken = process.env.EBAY_VERIFICATION_TOKEN
  const endpointUrl = process.env.EBAY_NOTIFICATION_ENDPOINT

  if (!challengeCode || !verificationToken || !endpointUrl) {
    return new Response(
      JSON.stringify({ error: 'Missing challenge_code or env values' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Hash in the required order
  const hash = createHash('sha256')
  hash.update(challengeCode)
  hash.update(verificationToken)
  hash.update(endpointUrl)
  const challengeResponse = hash.digest('hex')

  // Return the correct response format
  return new Response(
    JSON.stringify({ challengeResponse }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  )
}

export async function POST(req: Request) {
  const body = await req.json()
  console.log('📬 eBay Account Deletion Notification:', body)

  return new Response('Received', { status: 200 })
}
