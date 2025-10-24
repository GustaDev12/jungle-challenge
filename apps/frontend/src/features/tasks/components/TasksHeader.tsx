import DialogRegisterTask from "./DialogRegisterTask";
import { useUserStore } from "../../../store/user";
export function TaskHeader() {
    const { user } = useUserStore();

    return (
        <header className="mb-8 w-full flex items-center justify-between">
            <div>
                <h1 className="text-xl md:text-3xl font-bold">Olá, {user?.username}</h1>
                <p className="text-sm md:text-lg text-muted-foreground">
                    Organize e acompanhe suas tarefas com filtros inteligentes
                </p>
            </div>
            <DialogRegisterTask />
        </header>
    )
}