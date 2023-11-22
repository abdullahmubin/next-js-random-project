// 'use client'

// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    console.log('user')
    console.log(user)

    if (!user || !user.id) redirect("/auth-callback?origin=dashboard")
    // https://kinde.com/docs/developer-tools/nextjs-sdk/
    // console.log(user.email)
    // console.log(getUser().isRevalidate);
    console.log(user?.email);



    return (<div>hi {user?.email} bye</div>)
}

export default Page;