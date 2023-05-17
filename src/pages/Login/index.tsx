import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginData, schema } from "./validator"
import { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"



export const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(schema)
  })

  const { signIn } = useContext(AuthContext);

  return (
    <main>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(signIn)}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register('email')} />

        <label htmlFor="password">Senha</label>
        <input type="text" id="password" {...register('password')} />

        <button type="submit">Entrar</button>
      </form>
    </main>
  )
}