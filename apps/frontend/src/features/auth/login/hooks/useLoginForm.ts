import { LoginUserDTO } from '@repo/dto';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form'
import { loginSchema } from '../schemas/login.schema'

import { useLoginMutation } from './useLoginMutation';

export const useLoginForm = () => {
    const loginMutation = useLoginMutation();

    const form = useForm<LoginUserDTO>({
        resolver: zodResolver(loginSchema),
    });


    const onSubmit = (data: LoginUserDTO) => {
        loginMutation.mutate(data)
    }

    return {
        form,
        onSubmit,
        isLoading: loginMutation.isPending,
        isError: loginMutation.isError,
    }
}