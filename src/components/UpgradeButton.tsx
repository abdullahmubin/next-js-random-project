"use client"

import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { trpc } from '@/app/_trpc/client'
import { TestOkayFn, absoluteUrl } from '@/lib/utils'
import { stripe } from '@/lib/stripe';
import { PLANS } from '@/config/stripe'

const UpgradeButton = () => {

    // const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    //     onSuccess: ({ url }) => {
    //         window.location.href = url ?? "/dashboard/billing"
    //     }
    // })

    const okayCall = async () => {
        // TestOkayFn()
    }

    return (
        <Button onClick={() => okayCall()} className='w-full'>
            Upgrade now <ArrowRight className='h-5 w-5 ml-1.5' />
        </Button>
    )
}

export default UpgradeButton
