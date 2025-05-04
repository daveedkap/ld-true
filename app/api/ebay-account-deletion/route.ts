// app/api/ebay-account-deletion/route.ts
export async function POST(req: Request) {
    const body = await req.json();
    console.log('eBay account deletion notification received:', body);
  
    // Optional: log, store in DB, or just acknowledge
    return new Response('Notification received', { status: 200 });
  }
  