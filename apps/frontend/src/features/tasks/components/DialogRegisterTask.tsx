import { CirclePlus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { FormRegisterTask } from "./FormRegisterTask"

export default function DialogRegisterTask() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    <CirclePlus />
                    Nova Tarefa
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cadastrar uma nova tarefa</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para cadastrar uma nova tarefa.
                    </DialogDescription>
                </DialogHeader>
                <FormRegisterTask />
            </DialogContent>
        </Dialog>
    )
}