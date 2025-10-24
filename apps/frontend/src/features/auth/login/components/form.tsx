import { Button } from "../../../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { useLoginForm } from "../hooks/useLoginForm";
import { Spinner } from "../../../../components/ui/spinner"

export function LoginForm() {
    const { form, onSubmit, isLoading } = useLoginForm();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
            >
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel />
                            <FormControl>
                                <Input
                                    placeholder="Digite seu e-mail"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel />
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
                <footer className="flex items-end justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {!isLoading ? 'Logar' : <Spinner />}
                    </Button>
                </footer>
            </form>
        </Form>
    )
}