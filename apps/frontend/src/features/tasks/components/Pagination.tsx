import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../../components/ui/pagination"

import { useNavigate, useSearch } from "@tanstack/react-router"

export default function PaginationTasks({ totalPages }: { totalPages: number }) {
    const navigate = useNavigate({ from: '/tasks' });
    const { page } = useSearch({ from: '/tasks/' })

    const handleNextPage = () => {
        navigate({
            to: "/tasks",
            search: (oldParms) => ({
                page: Number(totalPages),
                size: oldParms.size
            })
        })
    }

    const handlePreviousPage = () => {
        navigate({
            to: "/tasks",
            search: (oldParms) => ({
                page: 1,
                size: oldParms.size
            })
        })
    }

    const handlePagination = (page: number) => {
        navigate({
            to: '/tasks',
            search: (oldParms) => ({
                page: page,
                size: oldParms.size
            })
        })
    }

    return (
        <Pagination>
            <PaginationContent>

                <PaginationItem>
                    <PaginationPrevious size={"sm"} onClick={handlePreviousPage} />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, key) => (
                    <PaginationItem onClick={() => { handlePagination(key + 1) }}>
                        <PaginationLink isActive={key + 1 == page} size={'sm'}>{key + 1}</PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext size={'sm'} onClick={handleNextPage} />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}