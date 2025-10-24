import { useForm } from "react-hook-form"
import { RegisterUserDto } from '@repo/dto'
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../schemas/register.schema"
import { useRegisterMutation } from "./useRegisterMutation"

export const useRegisterForm = () => {
    const registerMutation = useRegisterMutation();
    const form = useForm<RegisterUserDto>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterUserDto) => {
        registerMutation.mutate(data)
    }

    return {
        form,
        onSubmit
    }
}