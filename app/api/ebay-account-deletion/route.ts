// app/api/ebay-account-deletion/route.ts

import { createHash } from 'crypto'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const challengeCode = searchParams.get('challenge_code')
  const verificationToken = process.env.EBAY_VERIFICATION_TOKEN
  const endpointUrl = process.env.EBAY_NOTIFICATION_ENDPOINT

  if (!challengeCode || !verificationToken || !endpointUrl) {
    return new Response(
      JSON.stringify({ error: 'Missing required values' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }
    )
  }

  // Generate hash: sha256(challengeCode + verificationToken + endpointUrl)
  const hash = createHash('sha256')
  hash.update(challengeCode)
  hash.update(verificationToken)
  hash.update(endpointUrl)
  const challengeResponse = hash.digest('hex')

  // Carefully construct JSON and prevent BOM by not using template literals or static strings
  const body = Buffer.from(JSON.stringify({ challengeResponse }), 'utf8')

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': body.length.toString()
    }
  })
}

export async function POST(req: Request) {
  const body = await req.json()
  console.log('📬 Received eBay Deletion Notification:', body)

  return new Response('Received', { status: 200 })
}
