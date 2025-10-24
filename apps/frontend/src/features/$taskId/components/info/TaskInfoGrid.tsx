import { ITask } from '@repo/interfaces';
import { CardInfoTask, CardInfoTaskSkeleton } from './CardInfoTask';
import { Calendar, Users, Clock } from 'lucide-react';
import { convertData } from '../../../../utils/convert-time';

export function TaskInfoGrid({ data }: { data: ITask }) {
    const infoCards = [
        { title: 'Prazo', description: <p>{convertData(new Date(data.prazo).toDateString())}</p>, icon: <Calendar className="w-12 h-12" /> },
        { title: 'Status', description: <p>{data.status}</p>, icon: <Calendar className="w-12 h-12" /> },
        { title: 'Prioridade', description: <p>{data.priority}</p>, icon: <Calendar className="w-12 h-12" /> },
        { title: 'Contribuintes', description: <p>{data.assignedUsers as number}</p>, icon: <Users className="w-12 h-12" /> },
        { title: 'Criado em', description: <p>{convertData(new Date(data.createdAt).toDateString())}</p>, icon: <Clock className="w-12 h-12" /> },
    ];

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {infoCards.map(card => <CardInfoTask props={card} key={card.title} />)}
        </div>
    );
}

export function TaskInfoGridSkeleton() {
    const numberOfSkeletons = 6;

    return (
        <div className='grid grid-cols-4 gap-4'>
            {[...Array(numberOfSkeletons)].map((_, index) => (
                <CardInfoTaskSkeleton key={index} />
            ))}
        </div>
    );
}