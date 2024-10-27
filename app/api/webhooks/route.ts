import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import dbConnect from '@/data/dbConnect'
import { User } from '@/data/schema'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  await dbConnect()

  switch (evt.type) {
    case 'user.created':
      await handleUserCreated(evt.data)
      break
    case 'user.updated':
      await handleUserUpdated(evt.data)
      break
    case 'user.deleted':
      await handleUserDeleted(evt.data)
      break
    default:
      console.log(`Event not handled: ${evt.type}`)
  }

  return new Response('', { status: 200 })
}

async function handleUserCreated(data: any) {
  const fullName = data.first_name + (data.last_name ? ` ${data.last_name}` : '');

  const newUser = new User({
    clerkId: data.id,
    fullName: fullName.trim(),
    email: data.email_addresses[0].email_address,
    imageUrl: data.image_url,
    createdAt: new Date(data.created_at)
  })

  await newUser.save()
  console.log('New user created:', newUser)
}

async function handleUserUpdated(data: any) {
  const fullName = data.first_name + (data.last_name ? ` ${data.last_name}` : '');

  const updatedUser = await User.findOneAndUpdate(
    { clerkId: data.id },
    {
      fullName: fullName.trim(),
      email: data.email_addresses[0].email_address,
      imageUrl: data.image_url,
    },
    { new: true }
  )

  if (updatedUser) {
    console.log('User updated:', updatedUser)
  } else {
    console.log('No user found to update')
  }
}

async function handleUserDeleted(data: any) {
  const deletedUser = await User.findOneAndDelete({ clerkId: data.id })

  if (deletedUser) {
    console.log('User deleted:', deletedUser)
  } else {
    console.log('No user found to delete')
  }
}
