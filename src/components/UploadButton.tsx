"use client"

import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogContent } from "@radix-ui/react-dialog";

const UploadButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog open={isOpen} onOpenChange={(v: boolean) => {
            if (!v) {
                setIsOpen(v)
            }
        }}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button>
                    Upload PDF
                </Button>
            </DialogTrigger>

            <DialogContent>
                Example of content
            </DialogContent>
        </Dialog>
    )

}

export default UploadButton;