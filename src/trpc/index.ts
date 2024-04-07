import { z } from 'zod';
import { privateProcedure, publicProcedure, router } from './trpc';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';
import { stripe } from '@/lib/stripe';
import { PLANS } from '@/config/stripe';
import { absoluteUrl } from '@/lib/utils';

console.log('test test test')
export const appRouter = router({

    // test: publicProcedure.query(() => {
    authCallback: publicProcedure.query(async () => {
        debugger;
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        console.log('user user');
        console.log(user)

        if (!user?.id || !user?.email) throw new TRPCError({ code: "UNAUTHORIZED" });

        // check if user in the database

        // const dbUser = await db.user.findFirst({
        //     where: {
        //         id: user.id
        //     }
        // })

        // if(!dbUser) {
        //     // create the user in db

        //     // await db.user.create({
        //     //     data: {
        //     //         id: user.id
        //     //     }
        //     // })
        // }

        return { success: true }

        // })
    }),
    createStripeSession: privateProcedure.mutation(
        async ({ ctx }) => {
            const { userId } = ctx

            const billingUrl = absoluteUrl('/dashboard/billing')

            if (!userId)
                throw new TRPCError({ code: 'UNAUTHORIZED' })

            const dbUser = { stripeCustomerId: 1234 }

            // await db.user.findFirst({
            //     where: {
            //         id: userId,
            //     },
            // })

            if (!dbUser)
                throw new TRPCError({ code: 'UNAUTHORIZED' })

            const subscriptionPlan = {
                isSubscribed: false,
                stripeCustomerId: 1234,
            }
            // await getUserSubscriptionPlan()

            if (
                subscriptionPlan.isSubscribed &&
                dbUser.stripeCustomerId
            ) {
                const stripeSession =
                    await stripe.billingPortal.sessions.create({
                        customer: dbUser.stripeCustomerId,
                        return_url: billingUrl,
                    })

                return { url: stripeSession.url }
            }

            const stripeSession =
                await stripe.checkout.sessions.create({
                    success_url: billingUrl,
                    cancel_url: billingUrl,
                    payment_method_types: ['card', 'paypal'],
                    mode: 'subscription',
                    billing_address_collection: 'auto',
                    line_items: [
                        {
                            price: PLANS.find(
                                (plan) => plan.name === 'Pro'
                            )?.price.priceIds.test,
                            quantity: 1,
                        },
                    ],
                    metadata: {
                        userId: userId,
                    },
                })

            return { url: stripeSession.url }
        }
    ),
    getUserFiles: publicProcedure.query(async ({ ctx }) => {
        const { userId, user } = ctx;

        //     return await db.file.findMany({
        //     where: {
        //         userId: userId
        //     }
        // })

        return [{ name: 'a' }, name: 'b']
    })

    // hello: procedure
    //     .input(
    //         z.object({
    //             text: z.string(),
    //         }),
    //     )
    //     .query((opts) => {
    //         return {
    //             greeting: `hello ${opts.input.text}`,
    //         };
    //     }),
});

// export type definition of API
export type AppRouter = typeof appRouter;