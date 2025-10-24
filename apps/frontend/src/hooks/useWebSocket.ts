import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUserStore } from '../store/user';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import Cookie from 'js-cookie';


export const useWebSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const { user } = useUserStore();
    const navigate = useNavigate();

    const connect = useCallback(() => {
        if (!user || socketRef.current?.connected) return;
        const token = Cookie.get('accessToken');

        if (!token) return;

        socketRef.current = io(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/notifications`, {
            auth: {
                token: token,
            },
            transports: ['websocket'],
        });

        socketRef.current.on('connected', (data) => {
            console.log('WebSocket conectado:', data);
        });

        socketRef.current.on('task:assigned', (data) => {
            toast.success('Nova tarefa atribuída', {
                description: data.message,
                action: {
                    label: 'Ver tarefa',
                    onClick: () => navigate({ to: `/tasks/${data.taskId}` })
                }
            });
        });

        socketRef.current.on('comment:new', (data) => {
            toast.info('Novo comentário', {
                description: data.message,
                action: {
                    label: 'Ver comentários',
                    onClick: () => navigate({ to: `/tasks/${data.taskId}` })
                }
            });
        });

        socketRef.current.on('disconnect', () => {
            console.log('WebSocket desconectado');
        });

        socketRef.current.on('connect_error', (error) => {
            console.error('Erro na conexão WebSocket:', error);
        });

    }, [user, navigate]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }, []);

    const joinTaskRoom = useCallback((taskId: string) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit('join-task-room', { taskId });
        }
    }, []);

    const leaveTaskRoom = useCallback((taskId: string) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit('leave-task-room', { taskId });
        }
    }, []);

    useEffect(() => {
        if (user) {
            connect();
        } else {
            disconnect();
        }

        return () => {
            disconnect();
        };
    }, [user, connect, disconnect]);

    return {
        socket: socketRef.current,
        joinTaskRoom,
        leaveTaskRoom,
        isConnected: socketRef.current?.connected || false,
    };
};