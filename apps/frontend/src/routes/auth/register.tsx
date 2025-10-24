import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '../../components/ui/card'
import { FormRegister } from '../../features/auth/register/components/form'
export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <Card className='w-full max-w-[500px]'>
        <CardHeader className='space-y-1'>
          <div>
            <CardTitle className='text-xl'>
              Criação de conta
            </CardTitle>
            <CardTitle className='text-sm'>
              Já possui uma conta? <Link className='text-blue-500 cursor-pointer hover:underline' to="/auth/login">Faça login agora mesmo</Link>
            </CardTitle>
          </div>
          <CardDescription className='text-md'>
            Preencha suas informações abaixo para registar uma nova contas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormRegister />
        </CardContent>
      </Card>
    </div>
  )
}
