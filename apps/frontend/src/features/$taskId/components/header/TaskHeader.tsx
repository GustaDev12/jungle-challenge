import { Skeleton } from '../../../../components/ui/skeleton';
import { ButtonInfoUserTask } from '../info/ButtonInfoUserTask';

interface TaskHeaderProps {
    title: string;
    description: string;
}

export function TaskHeader({ title, description }: TaskHeaderProps) {

    return (
        <header className="mb-8 w-full flex items-center justify-between">
            <div className='space-y-2'>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-muted-foreground max-w-[800px]">{description}</p>
            </div>
            <div className='flex items-center space-x-2'>
                <ButtonInfoUserTask />
            </div>
        </header>
    )
}

export function TaskHeaderSkeleton() {
    return (
        <header className="mb-8 w-full flex items-center justify-between">
            <div className='space-y-2'>
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-[800px] max-w-full" />
            </div>
            <div className='flex items-center space-x-2'>
                <Skeleton className="h-10 w-32" />
            </div>
        </header>
    )
}