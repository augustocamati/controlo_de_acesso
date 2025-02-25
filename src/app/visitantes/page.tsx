"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function RegistroVisitantes() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [visitantes, setVisitantes] = useState([])

  const onSubmit = (data) => {
    const horaEntrada = new Date().toLocaleString()
    setVisitantes([...visitantes, { ...data, horaEntrada, id: Date.now() }])
    reset()
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Registro de Visitantes</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" {...register("nome", { required: true })} />
            {errors.nome && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="rg">BI</Label>
            <Input id="rg" {...register("rg", { required: true })} />
            {errors.rg && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="motivoVisita">Motivo da Visita</Label>
            <Input id="motivoVisita" {...register("motivoVisita", { required: true })} />
            {errors.motivoVisita && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="pacienteVisitado">Paciente Visitado</Label>
            <Input id="pacienteVisitado" {...register("pacienteVisitado", { required: true })} />
            {errors.pacienteVisitado && <span className="text-red-500">Este campo é obrigatório</span>}
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Registrar Visitante
        </Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>BI</TableHead>
            <TableHead>Motivo da Visita</TableHead>
            <TableHead>Paciente Visitado</TableHead>
            <TableHead>Hora de Entrada</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitantes.map((visitante) => (
            <TableRow key={visitante.id}>
              <TableCell>{visitante.nome}</TableCell>
              <TableCell>{visitante.bi}</TableCell>
              <TableCell>{visitante.motivoVisita}</TableCell>
              <TableCell>{visitante.pacienteVisitado}</TableCell>
              <TableCell>{visitante.horaEntrada}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}

