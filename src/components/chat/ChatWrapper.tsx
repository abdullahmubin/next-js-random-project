"use client"

import { Loader2 } from "lucide-react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";


const ChatWrapper = () => {


    // if (true) return (
    //     <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
    //         <div className="flex-1 flex justify-center items-center flex-col mb-28">
    //             <div className="flex flex-col items-center gap-2">
    //                 <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />

    //                 <h3 className="font-semibold text-xl">
    //                     Loading...
    //                 </h3>
    //                 <p className="">
    //                     were preparing your PDF.
    //                 </p>
    //             </div>
    //         </div>
    //     </div>
    // )

    return (
        <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
            <div className="flex-1 justify-between flex flex-col mb-28">
                <Messages />
            </div>

            <ChatInput />

        </div>
    )
}

export default ChatWrapper;