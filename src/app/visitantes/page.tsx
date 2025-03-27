"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  User,
  FileText,
  Users,
  Clock,
  Plus,
  Search,
  Download,
  Trash2,
  Edit,
  Loader2,
  CreditCard,
} from "lucide-react"

export default function RegistroVisitantes() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const [visitantes, setVisitantes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados da API
    setTimeout(() => {
      // Dados simulados para desenvolvimento
      const dadosSimulados = [
        {
          id: 1,
          nome: "Carlos Mendes",
          bi: "12345678-9",
          motivo_visita: "Visita familiar",
          paciente_id: "Maria Silva",
          created_at: "2023-06-20T14:30:00Z",
          rfid: "RFID-VIS-1234",
        },
        {
          id: 2,
          nome: "Fernanda Costa",
          bi: "98765432-1",
          motivo_visita: "Entrega de documentos",
          paciente_id: "João Santos",
          created_at: "2023-06-20T15:45:00Z",
          rfid: "RFID-VIS-5678",
        },
        {
          id: 3,
          nome: "Ricardo Almeida",
          bi: "45678912-3",
          motivo_visita: "Visita familiar",
          paciente_id: "Ana Oliveira",
          created_at: "2023-06-20T16:20:00Z",
          rfid: "RFID-VIS-9012",
        },
      ]

      setVisitantes(dadosSimulados)
      setIsLoading(false)
    }, 1000)
  }, [])

  const onSubmit = async (data) => {
    try {
      // Verificar se o RFID foi informado
      if (!data.rfid) {
        toast.error("Por favor, informe o código RFID do cartão temporário")
        return
      }

      // Simular envio para API
      const novoVisitante = {
        id: Date.now(),
        ...data,
        created_at: new Date().toISOString(),
      }

      setVisitantes([...visitantes, novoVisitante])
      reset()
      toast.success("Visitante registrado com sucesso!")
    } catch (error) {
      console.error("Erro ao registrar visitante:", error)
      toast.error("Erro ao registrar visitante")
    }
  }

  const filteredVisitantes = visitantes.filter(
    (visitante) =>
      visitante.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitante.paciente_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitante.rfid?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Registro de Visitantes
        </h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar visitantes..."
              className="pl-9 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="shadow-md">
            <CardHeader className="bg-blue-50 border-b pb-3">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <Plus className="mr-2 h-5 w-5" />
                Novo Visitante
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium">
                    Nome
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="nome"
                      className="pl-9"
                      placeholder="Nome completo"
                      {...register("nome", { required: true })}
                    />
                  </div>
                  {errors.nome && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bi" className="text-sm font-medium">
                    BI
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="bi"
                      className="pl-9"
                      placeholder="00.000.000-0"
                      {...register("bi", { required: true })}
                    />
                  </div>
                  {errors.bi && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="motivo_visita"
                    className="text-sm font-medium"
                  >
                    Motivo da Visita
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="motivo_visita"
                      className="pl-9"
                      placeholder="Ex: Visita familiar"
                      {...register("motivo_visita", { required: true })}
                    />
                  </div>
                  {errors.motivo_visita && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paciente_id" className="text-sm font-medium">
                    Paciente Visitado
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="paciente_id"
                      className="pl-9"
                      placeholder="Nome do paciente"
                      {...register("paciente_id", { required: true })}
                    />
                  </div>
                  {errors.paciente_id && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rfid" className="text-sm font-medium">
                    Cartão RFID Temporário
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="rfid"
                      className="pl-9"
                      placeholder="Código RFID do cartão temporário"
                      {...register("rfid", { required: true })}
                    />
                  </div>
                  {errors.rfid && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
                  <p className="text-xs text-gray-500">
                    Informe o código RFID do cartão temporário do visitante.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    "Registrar Visitante"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-md">
            <CardHeader className="bg-blue-50 border-b pb-3">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <User className="mr-2 h-5 w-5" />
                Visitantes Registrados
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-lg text-gray-600">
                    Carregando visitantes...
                  </span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-medium">Nome</TableHead>
                        <TableHead className="font-medium">BI</TableHead>
                        <TableHead className="font-medium">Motivo</TableHead>
                        <TableHead className="font-medium">Paciente</TableHead>
                        <TableHead className="font-medium">RFID</TableHead>
                        <TableHead className="font-medium">Entrada</TableHead>
                        <TableHead className="font-medium text-right">
                          Ações
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVisitantes.length > 0 ? (
                        filteredVisitantes.map((visitante) => (
                          <TableRow
                            key={visitante.id}
                            className="hover:bg-gray-50"
                          >
                            <TableCell className="font-medium">
                              {visitante.nome}
                            </TableCell>
                            <TableCell>{visitante.bi}</TableCell>
                            <TableCell>{visitante.motivo_visita}</TableCell>
                            <TableCell>{visitante.paciente_id}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                                {visitante.rfid}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 text-gray-400 mr-1" />
                                <span className="text-sm">
                                  {new Date(
                                    visitante.created_at
                                  ).toLocaleString()}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-blue-600"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-8 text-gray-500"
                          >
                            {searchTerm
                              ? "Nenhum visitante encontrado com os critérios de busca."
                              : "Nenhum visitante registrado. Adicione um novo visitante usando o formulário."}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </Layout>
  )
}
