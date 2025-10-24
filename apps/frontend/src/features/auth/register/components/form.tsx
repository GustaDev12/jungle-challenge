import { useRegisterForm } from "../hooks/useRegisterForm";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

export const FormRegister = () => {
    const { form, onSubmit } = useRegisterForm();

    return (
        <Form {...form}>
            <form
                className="space-y-3"
                onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Nome de usuário
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Digite seu nome de usuário"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className="w-full flex justify-end space-x-3 items-center">
                    <Button variant={"default"}>
                        Registrar
                    </Button>
                </footer>
            </form>
        </Form >
    )
}