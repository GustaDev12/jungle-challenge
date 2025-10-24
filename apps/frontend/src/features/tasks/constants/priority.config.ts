export const priorityConfig = {
    LOW: { variant: 'secondary' as const, label: 'Baixa', className: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    MEDIUM: { variant: 'secondary' as const, label: 'Média', className: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
    HIGH: { variant: 'secondary' as const, label: 'Alta', className: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
    URGENT: { variant: 'destructive' as const, label: 'Urgente', className: 'bg-red-100 text-red-700 hover:bg-red-200' }
};
