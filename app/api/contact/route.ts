// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import ContactSubmission from '@/models/Contact'
import { sendContactEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 })
    }

    await connectToDatabase()

    await ContactSubmission.create({ name, email, message })

    await sendContactEmail(name, email, message)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[CONTACT_ERROR]', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
