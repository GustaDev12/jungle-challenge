import { Card, CardTitle, CardHeader } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Skeleton } from '../../../../components/ui/skeleton'
import React from "react";

interface ICardInfoTaskProps {
    title: string,
    description: React.ReactNode,
    icon: any
}

export function CardInfoTask({ props }: { props: ICardInfoTaskProps }) {
    return (
        <Card className='bg-transparent'>
            <CardHeader className='flex items-center space-x-1'>
                <Button size={'icon-lg'} variant={"outline"}>
                    {props.icon}
                </Button>
                <div>
                    <CardTitle>{props.title}</CardTitle>
                    {props.description}
                </div>
            </CardHeader>
        </Card>
    )
}

export function CardInfoTaskSkeleton() {
    return (
        <div className="flex items-center space-x-4 rounded-lg border p-4 shadow-sm h-[130px]">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-grow">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-32" />
            </div>
        </div>
    )
}