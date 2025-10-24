import { Navigate } from '@tanstack/react-router';
import axios from 'axios'
import Cookie from 'js-cookie'

let controller = false;

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 6000,
    withCredentials: true,
});


instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${Cookie.get('accessToken')}`
    return config;
})

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.data.statusCode === 401 && !controller) {
            controller = true;
            try {
                const res = await instance.get('/auth/refresh');
                if (res.status === 200) {
                    const minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
                    Cookie.set('accessToken', res.data.data.accessToken, { expires: minutes })
                    originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
                    return instance(originalRequest);
                }
            } catch (err) {
                console.error('Erro ao renovar token:', err);
                Cookie.remove('accessToken');
                Navigate({ to: '/auth/login' })
            }
            controller = false
        }
        return Promise.reject(error);
    }
);
export default instance;