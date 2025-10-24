import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from '../../components/ui/card'
import { LoginForm } from '../../features/auth/login/components/form'

export const Route = createFileRoute('/auth/login')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <Card className='w-full max-w-[500px]'>
                <CardHeader className='space-y-2'>
                    <div>
                        <CardTitle className='text-xl'>
                            Login
                        </CardTitle>
                        <CardTitle className='text-sm'>
                            Ainda não possui uma conta? <Link className='text-blue-500 cursor-pointer hover:underline' to="/auth/register">Crie sua conta agora mesmo</Link>
                        </CardTitle>
                    </div>
                    <CardDescription className='text-md'>
                        Preencha suas informações abaixo para efetuar seu login.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div >
    )   
}
