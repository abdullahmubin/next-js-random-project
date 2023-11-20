import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
    // test: publicProcedure.query(() => {
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user?.id || !user?.email) throw new TRPCError({ code: "UNAUTHORIZED" });

        // check if user in the database

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