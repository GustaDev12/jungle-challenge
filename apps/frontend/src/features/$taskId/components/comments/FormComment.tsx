import { useFormComment } from "../../hooks/useFormComment";
import {
    Form, FormControl, FormField, FormItem, FormMessage
} from "../../../../components/ui/form";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";

export default function FormComment() {
    const { form, onSubmit } = useFormComment();
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea {...field} placeholder="Digite seu comentário"></Textarea>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className="py-2 w-full flex justify-end">
                    <Button type="submit">Comentar</Button>
                </footer>
            </form>
        </Form>
    )
}