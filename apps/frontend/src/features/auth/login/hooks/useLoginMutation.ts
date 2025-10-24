import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authServices } from "../../queries/authServices";
import { useUserStore } from "../../../../store/user";
import type { LoginUserDTO } from "@repo/dto";
import { toast } from "sonner"
import Cookie from 'js-cookie'

export const useLoginMutation = () => {
    const { setUser } = useUserStore();
    const navigate = useNavigate({ from: '/auth/login' })

    return useMutation({
        mutationFn: (data: LoginUserDTO) => authServices.login(data),

        onSuccess: (data) => {
            const minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
           
            Cookie.set('accessToken', data.data.accessToken, { expires: minutes })
            setUser(data.user)

            toast.success(data.message)
            navigate({ to: '/tasks', search: { page: 1, size: 10, priority: '', status: '', title: '' } })
        },

        onError: (errorData: any) => {
            const message = errorData.response.data.message || "Não foi possível efetuar o login no momento. Tente novamente mais tarde!"
            toast.error(message)
        },
    })
}