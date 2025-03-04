"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, User, Lock } from "lucide-react"
import Link from "next/link"

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [error, setError] = useState("")
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      // Here you would typically send the data to your API for authentication
      // For demonstration, we'll use mock data
      if (data.email === "admin@hospital.com" && data.password === "admin") {
        router.push("/dashboard")
      } else if (data.email === "security@hospital.com" && data.password === "security") {
        router.push("/dashboard")
      } else {
        setError("Credenciais inválidas")
      }
    } catch (error) {
      setError("Ocorreu um erro. Por favor, tente novamente.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="flex items-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-blue-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <h1 className="text-3xl font-bold text-blue-600 ml-2">HospitalAccess</h1>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-xl flex items-center">
            <LogIn className="mr-2 h-5 w-5" />
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  placeholder="seu@email.com"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && <span className="text-red-500 text-sm">Este campo é obrigatório</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && <span className="text-red-500 text-sm">Este campo é obrigatório</span>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar-me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Entrar
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Credenciais de demonstração:</p>
        <p>Email: admin@hospital.com | Senha: admin</p>
      </div>
    </div>
  )
}

