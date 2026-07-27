import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"


const PublicBNewsCard
    = () => {
        return (
            <Card className="relative mx-auto w-full max-w-sm pt-0">
                <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                <Image
                width={500}
                height={250}
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSa94zk3GT0FYun1NXbDWlAQ4AF5ArFrEMA7Fft7SQQw&s=10'}
                    alt="Event cover"
                    className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                />
                <CardHeader>
                    <CardAction>
                        <Badge variant="secondary">Featured</Badge>
                    </CardAction>
                    <CardTitle>Design systems meetup</CardTitle>
                    <CardDescription>
                        A practical talk on component APIs, accessibility, and shipping
                        faster.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full">View Event</Button>
                </CardFooter>
            </Card>
        )
    }


export default PublicBNewsCard
