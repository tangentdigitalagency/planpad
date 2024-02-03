import {auth, currentUser} from "@clerk/nextjs"
import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!,
)

const liveblocks = new Liveblocks({
  secret: "sk_dev_wcmqXe4xBBRkHPhotKNgTMU9GA4V-PSUH37ds2tB7vknI2xrnh1jg4RPzU2J90W-",
});


export async function POST(request: Request) {

  const authorization = await auth();
  const user = await currentUser();

  console.log({authorization, user})

  if(!authorization || !user) {
    return new Response('Unauthorized', { status: 403 })
  }

  const { room } = await request.json();
  
  const board = await convex.query(api.board.get, { id: room })

  console.log({room, board, boardOrgId: board?.orgId, authorizationOrgId: authorization.orgId})
  
  if (board?.orgId !== authorization.orgId) {
    return new Response('Unauthorized')
  }

  const userInfo = {
    name: user.firstName || "Anonymous", 
    picture: user.imageUrl,
  }

  console.log({userInfo})

  const session = liveblocks.prepareSession(
    user.id,
    {userInfo}
  )
  
  if (room) {
    session.allow(room, session.FULL_ACCESS)
  }


  const { status, body } = await session.authorize();

  console.log({status, body})


  return new Response(body, {status})
}