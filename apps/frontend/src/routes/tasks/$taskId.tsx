import Navbar from '../../components/layout/navbar'
import { createFileRoute } from '@tanstack/react-router'
import { useParams } from '@tanstack/react-router'
import { useGetTaskById } from '../../features/$taskId/hooks/useGetTaskById'
import { useGetComments } from '../../features/$taskId/hooks/useGetComments'
import { useSearch } from '@tanstack/react-router'
import { TaskHeader, TaskHeaderSkeleton } from '../../features/$taskId/components/header/TaskHeader'
import { TaskInfoGrid, TaskInfoGridSkeleton } from '../../features/$taskId/components/info/TaskInfoGrid'
import { TaskComments } from '../../features/$taskId/components/comments/TaskComments'
import { useWebSocketContext } from '../../providers/websocket-provider' 
import { useEffect } from 'react' 

export const Route = createFileRoute('/tasks/$taskId')({
  component: RouteComponent,
  validateSearch: (search) => ({
    title: search.title || '',
    status: search.status || '',
    priority: search.priority || '',
    page: search.page || 1,
    size: search.size || 10,
    commentPage: search.commentPage || Number(1),
    commentSize: search.commentSize || Number(5)
  }),
})

function RouteComponent() {
  const { taskId } = useParams({ from: '/tasks/$taskId' })
  const search: { title: string, status: string, priority: string, page: number, size: number, commentPage: number, commentSize: number } = useSearch({ from: '/tasks/$taskId' })
  const { data: response, isPending, isError } = useGetTaskById(taskId, search.title, search.status, search.priority, search.page, search.size)

  const {
    data: dataComments,
    isPending: isPendingComments,
    isError: isErrorComments,
  } = useGetComments(taskId, search.commentPage, search.commentSize);

  const { joinTaskRoom, leaveTaskRoom } = useWebSocketContext();

  useEffect(() => {
    joinTaskRoom(taskId);
    return () => {
      leaveTaskRoom(taskId);
    };
  }, [taskId, joinTaskRoom, leaveTaskRoom]);

  if (isError) return <p>Não foi possível carregar os dados sobre a tarefa!</p>

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-[1500px] mx-auto py-5">

        {isPending || !response.data ? (
          <>
            <TaskHeaderSkeleton />
            <TaskInfoGridSkeleton />
          </>
        ) : (
          <div className='px-5 md:px-3 lg:px-2 space-y-4'>
            <TaskHeader
              title={response.data.title}
              description={response.data.description || ''}
            />

            <TaskInfoGrid
              data={response.data}
            />

            <TaskComments
              comments={dataComments?.comments || []}
              isLoading={isPendingComments}
              isError={isErrorComments}
              page={search.commentPage}
              size={search.commentSize}
              totalPages={dataComments?.meta.totalPages || 0}
            />
          </div>
        )}

      </div>
    </div >
  )
}