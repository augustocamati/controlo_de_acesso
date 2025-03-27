"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  User,
  Mail,
  Briefcase,
  Building,
  Plus,
  Search,
  Download,
  Trash2,
  Edit,
  Loader2,
  CreditCard,
} from "lucide-react"

export default function RegistroFuncionarios() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const [funcionarios, setFuncionarios] = useState([])
  const [cargo, setCargo] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados da API
    setTimeout(() => {
      // Dados simulados para desenvolvimento
      const dadosSimulados = [
        {
          id: 1,
          nome: "Dr. Roberto Silva",
          email: "roberto.silva@hospital.med",
          cargo: "medico",
          departamento: "Cardiologia",
          rfid: "RFID-MED-1234",
        },
        {
          id: 2,
          nome: "Enf. Ana Oliveira",
          email: "ana.oliveira@hospital.med",
          cargo: "enfermeiro",
          departamento: "Emergência",
          rfid: "RFID-ENF-5678",
        },
        {
          id: 3,
          nome: "José Santos",
          email: "jose.santos@hospital.med",
          cargo: "seguranca",
          departamento: "Segurança",
          rfid: "RFID-SEG-9012",
        },
      ]

      setFuncionarios(dadosSimulados)
      setIsLoading(false)
    }, 1000)
  }, [])

  const onSubmit = async (data) => {
    try {
      // Verificar se o RFID foi informado
      if (!data.rfid) {
        toast.error("Por favor, informe o código RFID do cartão")
        return
      }

      // Simular envio para API
      const novoFuncionario = {
        id: Date.now(),
        ...data,
        cargo,
      }

      setFuncionarios([...funcionarios, novoFuncionario])
      reset()
      setCargo("")
      toast.success("Funcionário registrado com sucesso!")
    } catch (error) {
      console.error("Erro ao registrar funcionário:", error)
      toast.error("Erro ao registrar funcionário")
    }
  }

  const filteredFuncionarios = funcionarios.filter(
    (funcionario) =>
      funcionario.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.cargo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.departamento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.rfid?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const cargoLabel = (cargo) => {
    const labels = {
      medico: "Médico",
      enfermeiro: "Enfermeiro",
      limpeza: "Limpeza",
      seguranca: "Segurança",
    }
    return labels[cargo] || cargo
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Registro de Funcionários</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar funcionários..."
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
                Novo Funcionário
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
                  {errors.nome && <span className="text-red-500 text-xs">Este campo é obrigatório</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      className="pl-9"
                      placeholder="email@hospital.com"
                      {...register("email", { required: true })}
                    />
                  </div>
                  {errors.email && <span className="text-red-500 text-xs">Este campo é obrigatório</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo" className="text-sm font-medium">
                    Cargo
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                    </div>
                    <Select onValueChange={setCargo} value={cargo}>
                      <SelectTrigger className="pl-9">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="departamento" className="text-sm font-medium">
                    Departamento
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="departamento"
                      className="pl-9"
                      placeholder="Ex: Cardiologia"
                      {...register("departamento", { required: true })}
                    />
                  </div>
                  {errors.departamento && <span className="text-red-500 text-xs">Este campo é obrigatório</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rfid" className="text-sm font-medium">
                    Cartão RFID
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="rfid"
                      className="pl-9"
                      placeholder="Código RFID do cartão"
                      {...register("rfid", { required: true })}
                    />
                  </div>
                  {errors.rfid && <span className="text-red-500 text-xs">Este campo é obrigatório</span>}
                  <p className="text-xs text-gray-500">Informe o código RFID do cartão do funcionário.</p>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    "Registrar Funcionário"
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
                Funcionários Registrados
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-lg text-gray-600">Carregando funcionários...</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-medium">Nome</TableHead>
                        <TableHead className="font-medium">Email</TableHead>
                        <TableHead className="font-medium">Cargo</TableHead>
                        <TableHead className="font-medium">Departamento</TableHead>
                        <TableHead className="font-medium">RFID</TableHead>
                        <TableHead className="font-medium text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFuncionarios.length > 0 ? (
                        filteredFuncionarios.map((funcionario) => (
                          <TableRow key={funcionario.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{funcionario.nome}</TableCell>
                            <TableCell>{funcionario.email}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  funcionario.cargo === "medico"
                                    ? "bg-green-100 text-green-800"
                                    : funcionario.cargo === "enfermeiro"
                                      ? "bg-blue-100 text-blue-800"
                                      : funcionario.cargo === "limpeza"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {cargoLabel(funcionario.cargo)}
                              </span>
                            </TableCell>
                            <TableCell>{funcionario.departamento}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {funcionario.rfid}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            {searchTerm
                              ? "Nenhum funcionário encontrado com os critérios de busca."
                              : "Nenhum funcionário registrado. Adicione um novo funcionário usando o formulário."}
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

