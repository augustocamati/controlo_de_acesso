"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function RegistroPacientes() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [pacientes, setPacientes] = useState([])

  const onSubmit = (data) => {
    setPacientes([...pacientes, { ...data, id: Date.now() }])
    reset()
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Registro de Pacientes</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" {...register("nome", { required: true })} />
            {errors.nome && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
            <Input id="dataNascimento" type="date" {...register("dataNascimento", { required: true })} />
            {errors.dataNascimento && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="numeroQuarto">Número do Quarto</Label>
            <Input id="numeroQuarto" {...register("numeroQuarto", { required: true })} />
            {errors.numeroQuarto && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="dataAdmissao">Data de Admissão</Label>
            <Input id="dataAdmissao" type="date" {...register("dataAdmissao", { required: true })} />
            {errors.dataAdmissao && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Registrar Paciente
        </Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Data de Nascimento</TableHead>
            <TableHead>Número do Quarto</TableHead>
            <TableHead>Data de Admissão</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pacientes.map((paciente) => (
            <TableRow key={paciente.id}>
              <TableCell>{paciente.nome}</TableCell>
              <TableCell>{paciente.dataNascimento}</TableCell>
              <TableCell>{paciente.numeroQuarto}</TableCell>
              <TableCell>{paciente.dataAdmissao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}

