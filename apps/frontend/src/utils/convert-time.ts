import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale';

export const convertTime = (dateParm: Date) => {
    const localDate = new Date(dateParm)
    const date = formatDistanceToNow(localDate, { addSuffix: true, locale: ptBR })

    return date || 'Agora mesmo'
}

export const convertData = (dateParm: string) => {
    const date = new Date(dateParm)
    const data_convert = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC'
    })
    return data_convert
}