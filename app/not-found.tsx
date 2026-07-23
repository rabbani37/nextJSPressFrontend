import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
       <div className='flex min-h-screen items-center justify-center'>
         <div className='text-center space-y-4'>
            <h2 className='text-3xl font-bold'>Not Found</h2>
            <p className='text-xl font-medium'>Could not find requested resource</p>
            <Button> <Link href="/">Return Home</Link></Button>
        </div>
       </div>
    )
}