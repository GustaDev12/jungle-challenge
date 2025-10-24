import type { IUserHttpResponse } from "@repo/interfaces/users";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IUserPropsStore {
    user: IUserHttpResponse | null,
    setUser: (user: IUserHttpResponse | null) => void;
}

export const useUserStore = create(
    persist<IUserPropsStore>(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user })
        }),
        {
            name: 'user-store'
        }
    )
)
