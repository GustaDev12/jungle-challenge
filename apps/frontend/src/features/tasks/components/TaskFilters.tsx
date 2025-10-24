import { Input } from "../../../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { PriorityEnum, StatusEnum } from "@repo/dto";
import { useState } from "react";

export function TaskFilters() {
    const navigate = useNavigate();
    const search = useSearch({ from: "/tasks/" });

    const [filters, setFilters] = useState({
        title: (search.title as string || ''),
        status: (search.status as string || ''),
        priority: (search.priority as string || ''),
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    }

    function handleSelect(name: string, value: string) {
        setFilters({ ...filters, [name]: value });
    }

    function applyFilters() {
        navigate({
            to: '/tasks',
            search: {
                page: search.page,
                size: search.size,
                title: filters.title,
                priority: filters.priority == 'todos' ? '' : filters.priority,
                status: filters.status == 'todos' ? '' : filters.status
            }
        })
    }

    return (
        <div className="flex flex-wrap gap-3 items-end mb-8">
            <Input
                placeholder="Buscar por nome..."
                name="title"
                value={filters.title}
                onChange={handleChange}
                className="w-full md:w-60"
            />

            <Select
                value={filters.status}
                onValueChange={(value) => handleSelect("status", value)}
            >
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='todos'>Todos</SelectItem>
                    {Object.values(StatusEnum).map(item => {
                        return <SelectItem value={item}>{item}</SelectItem>
                    })}
                </SelectContent>
            </Select>

            <Select
                value={filters.priority}
                onValueChange={(value) => handleSelect("priority", value)}
            >
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='todos'>Todos</SelectItem>
                    {Object.values(PriorityEnum).map(item => {
                        return <SelectItem value={item}>{item}</SelectItem>
                    })}
                </SelectContent>
            </Select>

            <Button onClick={applyFilters}>Filtrar</Button>
        </div>
    );
}
