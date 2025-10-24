
export const statusConfig = {
    TODO: { variant: 'outline' as const, label: 'Pendente', className: '' },
    IN_PROGRESS: { variant: 'default' as const, label: 'Em Progresso', className: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    REVIEW: { variant: 'secondary' as const, label: 'Revisão', className: 'bg-green-100 text-green-700 hover:bg-green-200' },
    DONE: { variant: 'destructive' as const, label: 'Concluida', className: 'bg-gray-100 text-gray-700 hover:bg-gray-200' }
};