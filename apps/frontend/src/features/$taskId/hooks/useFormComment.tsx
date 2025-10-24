import { useForm } from "react-hook-form";
import { commentSchema } from "../schema/comment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCommentDTO } from "@repo/dto";
import { useCommentMutation } from "../../tasks/hooks/useCommentMutation";
import { useParams } from "@tanstack/react-router";

export const useFormComment = () => {
    const mutationComment = useCommentMutation();
    const { taskId } = useParams({ from: '/tasks/$taskId' })

    const form = useForm({
        resolver: zodResolver(commentSchema)
    })

    const onSubmit = async (data: CreateCommentDTO) => {
        mutationComment.mutate({ id: taskId, comment: data.comment })
    }

    return { form, onSubmit }
}