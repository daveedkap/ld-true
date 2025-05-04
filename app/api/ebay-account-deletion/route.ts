// app/api/ebay-account-deletion/route.ts

import { createHash } from 'crypto'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const challengeCode = searchParams.get('challenge_code')
  const endpointUrl = process.env.EBAY_NOTIFICATION_ENDPOINT
  const verificationToken = process.env.EBAY_VERIFICATION_TOKEN

  if (!challengeCode || !verificationToken || !endpointUrl) {
    return new Response(
      JSON.stringify({ error: 'Missing required query or env variables' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Hash: challengeCode + verificationToken + endpointUrl
  const hash = createHash('sha256')
  hash.update(challengeCode)
  hash.update(verificationToken)
  hash.update(endpointUrl)
  const responseHash = hash.digest('hex')

  return new Response(
    JSON.stringify({ challengeResponse: responseHash }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}

export async function POST(req: Request) {
  const body = await req.json()
  console.log('📬 eBay Account Deletion Notification:', body)

  // Optional: Store in DB, alert admin, etc.
  return new Response('Received', { status: 200 })
}
