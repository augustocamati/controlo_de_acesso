"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function RegistroFuncionarios() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [funcionarios, setFuncionarios] = useState([])
  const [cargo, setCargo] = useState("")

  const onSubmit = (data) => {
    setFuncionarios([...funcionarios, { ...data, cargo, id: Date.now() }])
    reset()
    setCargo("")
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Registro de Funcionários</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" {...register("nome", { required: true })} />
            {errors.nome && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email", { required: true })} />
            {errors.email && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="cargo">Cargo</Label>
            <Select onValueChange={setCargo} value={cargo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medico">Médico</SelectItem>
                <SelectItem value="enfermeiro">Enfermeiro</SelectItem>
                <SelectItem value="limpeza">Equipe de Limpeza</SelectItem>
                <SelectItem value="seguranca">Segurança</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="departamento">Departamento</Label>
            <Input id="departamento" {...register("departamento", { required: true })} />
            {errors.departamento && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Registrar Funcionário
        </Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Departamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {funcionarios.map((funcionario) => (
            <TableRow key={funcionario.id}>
              <TableCell>{funcionario.nome}</TableCell>
              <TableCell>{funcionario.email}</TableCell>
              <TableCell>{funcionario.cargo}</TableCell>
              <TableCell>{funcionario.departamento}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}

