import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { stripe } from "./stripe"
import { PLANS } from "@/config/stripe"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${process.env.PORT ?? 3000
    }${path}`
}

export async function TestOkayFn() {

  // const billingUrl = absoluteUrl('/dashboard/billing')

  // // if (!userId)
  // //     throw new TRPCError({ code: 'UNAUTHORIZED' })

  // const dbUser = { stripeCustomerId: "1234" }

  // // await db.user.findFirst({
  // //     where: {
  // //         id: userId,
  // //     },
  // // })

  // // if (!dbUser)
  // //     throw new TRPCError({ code: 'UNAUTHORIZED' })

  // const subscriptionPlan = {
  //   isSubscribed: false,
  //   stripeCustomerId: "1234",
  // }
  // // await getUserSubscriptionPlan()

  // if (
  //   subscriptionPlan.isSubscribed &&
  //   dbUser.stripeCustomerId
  // ) {
  //   const stripeSession =
  //     await stripe.billingPortal.sessions.create({
  //       customer: dbUser.stripeCustomerId,
  //       return_url: billingUrl,
  //     })

  //   return { url: stripeSession.url }
  // }

  // const stripeSession =
  //   await stripe.checkout.sessions.create({
  //     success_url: billingUrl,
  //     cancel_url: billingUrl,
  //     payment_method_types: ['card', 'paypal'],
  //     mode: 'subscription',
  //     billing_address_collection: 'auto',
  //     line_items: [
  //       {
  //         price: PLANS.find(
  //           (plan) => plan.name === 'Pro'
  //         )?.price.priceIds.test,
  //         quantity: 1,
  //       },
  //     ],
  //     metadata: {
  //       userId: 1234,
  //     },
  //   })

  // return { url: stripeSession.url }

}