import ChatWrapper from "@/components/chat/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface PageProps {
    params: {
        fileid: string
    }
}

const Page = ({ params }: PageProps) => {
    const { fileid } = params;

    const fileInfo = {
        id: fileid,
        url: ''
    }

    return (
        <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
            <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
                <div className="flex-1 xl:flex">
                    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl-flex-1 xl:pl-6">
                        <PdfRenderer url={fileInfo.url} />
                    </div>
                </div>

                <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
                    <ChatWrapper />
                </div>
            </div>
        </div>
    )
}

export default Page;