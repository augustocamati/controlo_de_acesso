"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, User, Mail, Lock, Building } from "lucide-react"
import Link from "next/link"

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [userType, setUserType] = useState("")

  const onSubmit = (data) => {
    console.log(data)
    // Here you would typically send the data to your API
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
            <UserPlus className="mr-2 h-5 w-5" />
            Cadastro
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nome Completo
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input id="name" className="pl-10" placeholder="João Silva" {...register("name", { required: true })} />
              </div>
              {errors.name && <span className="text-red-500 text-sm">Este campo é obrigatório</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
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

            <div className="space-y-2">
              <Label htmlFor="userType" className="text-sm font-medium">
                Tipo de Usuário
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <Select onValueChange={(value) => setUserType(value)}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Paciente</SelectItem>
                    <SelectItem value="doctor">Médico</SelectItem>
                    <SelectItem value="nurse">Enfermeiro</SelectItem>
                    <SelectItem value="visitor">Visitante</SelectItem>
                    <SelectItem value="cleaning">Equipe de Limpeza</SelectItem>
                    <SelectItem value="security">Segurança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Cadastrar
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Faça login
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

