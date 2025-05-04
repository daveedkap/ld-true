// app/api/ebay-account-deletion/route.ts

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const challengeCode = searchParams.get("challenge_code");
  
    if (!challengeCode) {
      return new Response("Missing challenge_code", { status: 400 });
    }
  
    return Response.json({
      challengeResponse: challengeCode,
      verificationToken: process.env.EBAY_VERIFICATION_TOKEN,
    });
  }
  
  export async function POST(req: Request) {
    const body = await req.json();
    console.log("📬 eBay Deletion Notification:", body);
  
    // Optionally log to a DB or alert system
  
    return new Response("Received", { status: 200 });
  }
  