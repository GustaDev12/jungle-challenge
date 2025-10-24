import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "../../../components/ui/form";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "../../../components/ui/select"

import { Textarea } from "../../../components/ui/textarea";
import { Input } from "../../../components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import { useFormRegisterTask } from "../hooks/useFormRegisterTask";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
import { PriorityEnum, StatusEnum } from "@repo/dto";

export const FormRegisterTask = () => {
    const { form, onSubmit } = useFormRegisterTask();
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titulo da tarefa</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Digite o titulo da tarefa"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição da tarefa</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Digite a descrição da tarefa"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="prazo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Selecione o Prazo</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
                                    >
                                        {field.value ? format(field.value, 'PPP') : <span>Selecione a data</span>}
                                        <CalendarIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                                    <Calendar
                                        mode="multiple"
                                        onSelect={(date: Date[] | undefined) => { date && field.onChange(date[0]) }}
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prioridade</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione uma prioridade para a tarefa"></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(PriorityEnum).map((item) => (
                                            <SelectItem value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um status para a tarefa"></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(StatusEnum).map((item) => (
                                            <SelectItem value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className="flex justify-end">
                    <Button>
                        Cadastrar
                    </Button>
                </footer>
            </form>
        </Form>
    )
}