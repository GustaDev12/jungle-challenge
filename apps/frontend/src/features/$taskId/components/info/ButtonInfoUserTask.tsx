import { ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Spinner } from '../../../../components/ui/spinner';
import { useJoinTaskMutation } from '../../hooks/useJoinTask';
import { useParams } from '@tanstack/react-router';
import { useGetUserInTask } from '../../hooks/useGetUserInTask';
import { Skeleton } from '../../../../components/ui/skeleton';
import { useQuitTask } from '../../hooks/useQuitTask';

export const ButtonInfoUserTask = () => {
    const { taskId } = useParams({ from: '/tasks/$taskId' });
    const { isPending: isJoinPending, mutate: mutateJoin } = useJoinTaskMutation();
    const { isPending: isQuitPending, mutate: mutateQuit } = useQuitTask();
    const { isPending: isPedingUserTask, isSuccess, data } = useGetUserInTask(taskId);

    if (isPedingUserTask) return (
        <Skeleton className='w-[130px] h-9 rounded-md'></Skeleton>
    )

    return (
        <>
            {isSuccess && data.status &&
                < Button
                    onClick={() => mutateQuit()}
                    variant={"destructive"}> <ArrowLeft />
                    {isQuitPending && <Spinner />}
                    {!isJoinPending && <span className='flex items-center gap-2'><UserPlus /> Desvincular</span>}
                </Button >
            }
            {isSuccess && !data.status &&
                < Button onClick={() => mutateJoin()} >
                    {isJoinPending && <Spinner />}
                    {!isJoinPending && <span className='flex items-center gap-2'><UserPlus /> Contribuir</span>}
                </Button >
            }
        </>
    )
}
