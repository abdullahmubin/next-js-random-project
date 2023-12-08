"use client"

import { ChevronDown, Loader2 } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useResizeDetector } from 'react-resize-detector'
import { Button } from './ui/button';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfRendererProps {
    url: string
}

// More pdf check env file.
const PdfRenderer = ({ url }: PdfRendererProps) => {

    const { width, ref } = useResizeDetector()

    return (
        <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
            <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">

                <div className="flex items-center gap-1.5">

                    <Button variant={'ghost'} aria-label='previous page'>
                        <ChevronDown className='h-4 w-4' />
                    </Button>

                    <div className='flex items-center gap-1.5'>

                    </div>

                </div>
            </div>

            <div className='flex-1 w-full max-h-screen'>
                <div ref={ref}>
                    <Document onLoadError={() => {

                    }
                    } loading={
                        <div className='flex justify-center'>
                            <Loader2 className='my-24 h-6 w-6 animate-spin' />
                        </div>
                    } file={"https://nosql.premisehq.co/API/FileHandler/GetFile?AppKey=&Url=Attachment/EmailAttachment/26082019120545_CERTIFICATES20182019.pdf"} className="max-h-full">
                        <Page pageNumber={1} />
                        {/* <Page width={width ? width : 1} pageNumber={1} /> */}
                    </Document>
                </div>
            </div>

        </div>
    )
}

export default PdfRenderer;