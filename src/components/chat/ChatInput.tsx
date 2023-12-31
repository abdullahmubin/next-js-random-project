import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const ChatInput = () => {

    return <div className="absolute bottom-0 left-0 w-full">
        <form className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max--w-2xl sl:mx-w-3xl">
            <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                <div className="relative flex flex-col w-full flex-grow p-4">
                    <div className="relative">
                        <Textarea rows={1} maxRows={4} placeholder="Enter your question" />
                        <Button aria-label="send message" className="absolute bottom-1.5 right-[8px]">
                            <Send className='h-4 w-4' />
                        </Button>
                    </div>

                </div>

            </div>
        </form>
    </div>
}

export default ChatInput;
