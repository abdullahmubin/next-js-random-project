"use client"

import { ChevronDown, ChevronUp, Loader2, RotateCcw, Scale, Search } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useResizeDetector } from 'react-resize-detector'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

import SimpleBar from 'simplebar-react'
import PdfFullscreen from './PdfFullscreen';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfRendererProps {
    url: string
}

// More pdf check env file.
const PdfRenderer = ({ url }: PdfRendererProps) => {

    const [numPages, setNumPages] = useState<number>();
    const [currPage, setCurrPage] = useState<number>(1);
    const [typePage, setPageNumber] = useState<string>();
    const [scalVal, setScaleVal] = useState<number>(1)

    const [rotation, setRotation] = useState<number>(0)

    const { width, ref } = useResizeDetector()

    const handlePageSubmit = () => {
        setCurrPage(Number(typePage))
    }

    return (
        <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
            <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">

                <div className="flex items-center gap-1.5">

                    <Button disabled={currPage <= 1}
                        onClick={() => {
                            setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))
                        }}
                        variant={'ghost'} aria-label='previous page'>
                        <ChevronDown className='h-4 w-4' />
                    </Button>

                    <div className='flex items-center gap-1.5'>
                        <Input className='w-12 h-8'
                            value={typePage}
                            onChange={(e) => setPageNumber(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    handlePageSubmit()
                                }
                            }} />
                        <p className='text-zinc-700 text-sm space-x-1'>
                            <span>/</span>
                            <span>{numPages ?? "x"}</span>
                        </p>
                    </div>

                    <Button
                        disabled={
                            numPages === undefined ||
                            currPage === numPages
                        }
                        onClick={() => {
                            setCurrPage((prev) => prev + 1 > numPages! ? numPages! : prev + 1)
                        }}
                        variant={'ghost'} aria-label='next page'>
                        <ChevronUp className='h-4 w-4' />
                    </Button>

                </div>

                <div className='space-x-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='gap-1.5' aria-label='zoom' variant='ghost'>
                                <Search className='h-4 w-4' />
                                {scalVal * 100}%<ChevronDown className='h-3 w-3 opacity-50' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => setScaleVal(1)}>
                                100%
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScaleVal(1.5)}>
                                150%
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScaleVal(2)}>
                                200%
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant='ghost'
                        onClick={() => setRotation((prev) => prev + 90)} aria-label='rotate 90 degrees'>
                        <RotateCcw className='h-4 w-4' />
                    </Button>

                    <PdfFullscreen />
                </div>

            </div>

            <div className='flex-1 w-full max-h-screen'>
                <SimpleBar autoHide={false} className='max-h[cal(100vh-10rem)]'>
                    <div ref={ref}>
                        <Document onLoadError={() => {

                        }
                        } loading={
                            <div className='flex justify-center'>
                                <Loader2 className='my-24 h-6 w-6 animate-spin' />
                            </div>
                        }
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                            file={"https://nosql.premisehq.co/API/FileHandler/GetFile?AppKey=&Url=Attachment/EmailAttachment/26082019120545_CERTIFICATES20182019.pdf"} className="max-h-full">
                            <Page pageNumber={currPage} scale={scalVal} rotate={rotation} />
                            {/* <Page width={width ? width : 1} pageNumber={1} /> */}
                        </Document>
                    </div>
                </SimpleBar>
            </div>

        </div>
    )
}

export default PdfRenderer;