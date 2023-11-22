import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';

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