import { NextResponse } from 'next/server'

const clientId = process.env.EBAY_CLIENT_ID!
const clientSecret = process.env.EBAY_CLIENT_SECRET!
const sellerUsername = 'ld_true'

let accessToken: string = ''
let tokenExpiresAt = 0

async function getAccessToken(): Promise<string> {
  const now = Date.now()
  if (accessToken && tokenExpiresAt > now) return accessToken

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'https://api.ebay.com/oauth/api_scope'
    }),
  })

  const data = await res.json()
  accessToken = data.access_token
  tokenExpiresAt = Date.now() + data.expires_in * 1000 - 60000
  return accessToken
}

export async function GET() {
  try {
    const token = await getAccessToken()

    const searchQueries = [
      'vintage 2000s baggy wide leg jeans',
      'vintage 2000s wide leg y2k bootcut jeans',
      '2000s vintage rare baggy wide leg jeans',
      'vintage 2000s baggy wide leg workwear pants',
      '2000s vintage baggy wide leg workwear cargo pants',
      '2000s vintage baggy wide leg cargo pants',
      'vintage 2000s wide leg baggy sweatpants',
      'vintage 2000s baggy wide leg track pants',
      '2000s vintage baggy wide leg ski pants',
      '2000s vintage baggy wide leg cargo shorts',
      'vintage 2000s baggy wide leg jorts',
      'vintage 2000s baggy wide leg jeans',
      'vintage 2000s boxy tee',
      'vintage 2000s baggy boxy hoodie',
      'vintage 2000s boxy jacket',
      'vintage 2000s beanie'
    ]

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
    }

    const allResults: any[] = []

    for (const query of searchQueries) {
      const encodedQuery = encodeURIComponent(query)
      const res = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodedQuery}&limit=50`, {
        headers,
      })

      if (!res.ok) continue // Skip failed searches

      const data = await res.json()
      const items = data.itemSummaries || []

      const userItems = items.filter(
        (item: any) => item?.seller?.username?.toLowerCase() === sellerUsername
      )

      allResults.push(...userItems)
    }

    // ✅ Deduplicate by itemId
    const deduped = Array.from(
      new Map(allResults.map(item => [item.itemId, item])).values()
    )

    return NextResponse.json(deduped)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

