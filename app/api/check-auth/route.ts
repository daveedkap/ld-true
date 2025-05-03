// app/api/check-auth/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const isAuthed = req.cookies.get('auth')?.value === 'true'
  if (isAuthed) {
    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } else {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
}
