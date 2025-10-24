import { Card, CardContent, CardHeader } from '../../../../components/ui/card'
import { Skeleton } from '../../../../components/ui/skeleton'

export function CardCommentsSkeleton() {
    return (
        <Card className='bg-transparent'>
            <CardHeader className='flex-row items-start justify-between space-y-0 '>
                <div className='flex gap-3 flex-1'>
                    <Skeleton className='h-9 w-9 rounded-full'>
                    </Skeleton>
                    <div className='flex flex-col gap-1 flex-1'>
                        <header className='w-full flex items-baseline  gap-2'>
                            <Skeleton className='h-2 w-[100px] rounded-full'>
                            </Skeleton>
                            <Skeleton className='h-2 w-[20px] rounded-full'>
                            </Skeleton>
                        </header>
                        <CardContent className='p-0'>
                            <Skeleton className='h-3 w-[300px] rounded-full'>
                            </Skeleton>
                        </CardContent>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}