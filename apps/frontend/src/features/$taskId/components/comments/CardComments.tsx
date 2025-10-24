import {
    Card, CardContent, CardHeader
} from '../../../../components/ui/card'

import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { convertTime } from '../../../../utils/convert-time'

export function CardComments(props: { username: string | undefined, content: string, date: Date }) {
    return (
        <Card className='bg-transparent'>
            <CardHeader className='flex-row items-start justify-between space-y-0 '>
                <div className='flex gap-3 flex-1'>
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="https://github.com/shadcn.png" alt={`Avatar de ${props.username ?? 'usuário desconhecido'}`} />
                        <AvatarFallback>GV</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1 flex-1'>
                        <header className='w-full flex items-baseline justify-between gap-2'>
                            <h3 className='text-sm font-semibold leading-none'>
                                {props.username || "Usuário não identificado."}
                            </h3>
                            <span
                                className='text-xs text-muted-foreground whitespace-nowrap'
                            >
                                {convertTime(props.date)}
                            </span>
                        </header>
                        <CardContent className='p-0'>
                            <p className='text-sm text-muted-foreground break-words line-clamp-3'>
                                {props.content}
                            </p>
                        </CardContent>
                    </div>
                </div>
            </CardHeader>
        </Card >
    )
}