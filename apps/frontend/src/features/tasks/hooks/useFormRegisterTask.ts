import { useForm } from "react-hook-form";
import { registerTask } from "../schemas/register-task.schema";
import { CreateTaskDTO } from "@repo/dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterTaskMutation } from "./useRegisterMutation";

export const useFormRegisterTask = () => {
    const registerMutation = useRegisterTaskMutation();
    const form = useForm({
        resolver: zodResolver(registerTask),
        defaultValues: {
            title: '',
            description: '',
        }
    })


    const onSubmit = async (data: CreateTaskDTO) => {
        registerMutation.mutate(data)
    }

    return {
        form,
        onSubmit,
        isPending: registerMutation.isPending,
    }
}