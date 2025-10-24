import { CardComments } from './CardComments';
import FormComment from './FormComment';
import PaginationComments from './Pagination';
import { Separator } from '../../../../components/ui/separator';
import { CardCommentsSkeleton } from './CardCommentsSkeleton';

interface TaskCommentsProps {
    comments: any[];
    isLoading: boolean;
    isError: boolean;
    page: number;
    size: number;
    totalPages: number;
    refetch?: () => void;
}

export function TaskComments({ comments, isLoading = false, isError, size, totalPages }: TaskCommentsProps) {
    return (
        <div className='p-5 border-1 border-border rounded-xl'>
            <h1 className="text-2xl font-bold mb-2">Comentários:</h1>
            <Separator className='mt-5 mb-5' />
            <div className='space-y-2'>
                {isLoading && Array.from({ length: size }).map((_, i) => <CardCommentsSkeleton key={i} />)}
                {isError && <p>Erro ao carregar comentários</p>}
                {!isLoading && !isError && comments.map(item => (
                    <CardComments
                        key={item.id}
                        content={item.content}
                        username={item.user?.username}
                        date={new Date()}
                    />
                ))}
            </div>
            <Separator className='mt-5 mb-5' />
            <h1 className="text-2xl font-bold mb-4">Faça um comentário</h1>
            <FormComment />
            <footer>
                <PaginationComments totalPages={totalPages} />
            </footer>
        </div>
    );
}
