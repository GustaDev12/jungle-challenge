import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useGetTasks } from '../../features/tasks/hooks/useGetTasks';
import { CardTasks, CardTasksSkeleton } from '../../features/tasks/components/CardTasks';
import Navbar from '../../components/layout/navbar';
import PaginationTasks from '../../features/tasks/components/Pagination';
import { TaskHeader } from '../../features/tasks/components/TasksHeader';
import { TaskFilters } from '../../features/tasks/components/TaskFilters';

export const Route = createFileRoute('/tasks/')({
  component: RouteComponent,
  validateSearch: (search) => ({
    page: search.page || Number(1),
    size: search.size || Number(10),
    status: search.status || '',
    priority: search.priority || '',
    title: search.title || '',
  })
})

function RouteComponent() {
  const { page, size, priority, status, title }: { page: number, size: number, priority: string, status: string, title: string } = useSearch({ from: '/tasks/' });
  const { data: response, isLoading, isSuccess } = useGetTasks(page, size, { title, status, priority });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[1500px] mx-auto py-5 px-5 md:px-3 lg:px-2 space-y-4">
 
        <TaskHeader />
        <TaskFilters />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: size }).map((_, i) => (
              <CardTasksSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {isSuccess && response?.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {response.data.map(item => (
                  <CardTasks key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Nenhuma tarefa encontrada</p>
              </div>
            )}
          </>
        )}

        {isSuccess && response.data.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhuma tarefa encontrada</p>
          </div>
        )}

      </div>

      <footer className='pb-5 pt-5'>
        {isSuccess && <PaginationTasks totalPages={response.meta.totalPages} />}
      </footer>

    </div>
  )
}
