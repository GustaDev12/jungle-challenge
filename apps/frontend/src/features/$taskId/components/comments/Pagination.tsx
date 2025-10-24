import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../../../components/ui/pagination"

import { useNavigate, useSearch } from "@tanstack/react-router"

export default function PaginationComments({ totalPages }: { totalPages: number }) {
    const navigate = useNavigate({ from: '/tasks/$taskId' });
    const { page } = useSearch({ from: '/tasks/$taskId' })

    const handleNextPage = () => {
        navigate({
            to: "/tasks/$taskId",
            search: (oldParms) => ({
                page: Number(totalPages),
                size: oldParms.size
            })
        })
    }

    const handlePreviousPage = () => {
        navigate({
            to: "/tasks/$taskId",
            search: (oldParms) => ({
                page: 1,
                size: oldParms.size
            })
        })
    }

    const handlePagination = (page: number) => {
        navigate({
            to: '/tasks/$taskId',
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