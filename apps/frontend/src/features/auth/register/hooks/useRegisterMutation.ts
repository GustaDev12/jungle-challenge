import { useMutation } from "@tanstack/react-query";
import { RegisterUserDto } from '@repo/dto'
import { authServices } from "../../queries/authServices";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import Cookie from 'js-cookie'
import { useUserStore } from "../../../../store/user";

export const useRegisterMutation = () => {
    const navigate = useNavigate({ from: '/auth/register' })
    const { setUser } = useUserStore();
    return useMutation({
        mutationFn: (data: RegisterUserDto) => authServices.register(data),

        onSuccess: (data) => {
            const minutes = new Date(new Date().getTime() + 15 * 60 * 1000);

            toast.success(data.message)

            Cookie.set('accessToken', data.data.accessToken, { expires: minutes })
            setUser(data.user)
            navigate({ to: '/tasks', search: { page: 1, size: 10, priority: '', status: '', title: '' } })
        },

        onError: (errorResponse: any) => {
            const message = errorResponse.response.data.message || 'Não foi possível registar sua conta no momento.'
            toast.error(message)
        }
    })
}