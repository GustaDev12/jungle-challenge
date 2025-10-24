import type { ITask } from "@repo/interfaces";
import { Calendar, Users, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Link, useSearch } from "@tanstack/react-router";
import { priorityConfig } from "../constants/priority.config";
import { statusConfig } from "../constants/status.config";
import { convertData } from "../../../utils/convert-time";

export function CardTasks(props: ITask) {
    const priority = priorityConfig[props.priority];
    const search = useSearch({ from: '/tasks/' })
    const status = statusConfig[props.status];
    const prazoDate = new Date(props.prazo);
    const isOverdue = prazoDate < new Date() && props.status != "DONE"
    const assignedUsers = props.assignedUsers as number

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg leading-tight break-words max-w-[200px]">{props.title}</CardTitle>
                    <Badge variant={'default'} className={priority.className}>
                        {priority.label}
                    </Badge>
                </div>
                {props.description && (
                    <CardDescription className="line-clamp-2">
                        {props.description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Prazo: {convertData(new Date(props.prazo).toDateString())}</span>
                    {isOverdue && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>
                        {assignedUsers as number} {assignedUsers === 1 ? 'pessoa' : 'pessoas'} {' '}
                        contribuindo
                    </span>
                </div>

            </CardContent>

            <CardFooter className="flex items-center justify-between ">
                <Badge variant={status.variant} className={status.className}>
                    {status.label}
                </Badge>
                <Link
                    to='/tasks/$taskId'
                    params={{ taskId: props.id }}
                    search={{ ...search, commentPage: 1, commentSize: 10 }}
                >
                    <Button size={'sm'}>
                        Ver mais
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export function CardTasksSkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardHeader>

            <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-28" />
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-9 w-20 rounded-md" />
            </CardFooter>
        </Card>
    )
}
