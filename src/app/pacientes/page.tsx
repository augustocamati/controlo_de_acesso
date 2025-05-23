"use client"

import { useState, useEffect } from "react"
import { set, useForm } from "react-hook-form"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { User, Calendar, Home, Clock, Plus, Search, Download, Trash2, Edit, Loader2 } from "lucide-react"
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select"

export default function RegistroPacientes() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const [pacientes, setPacientes] = useState([])
  const [quartos, setQuartos] = useState([])
  const [selectedQuarto, setSelectedQuarto] = useState()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      // Carregar dados da API
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/quartos`)
        .then((res) => res.json())
        .then((data) => {
          setQuartos(data)
        console.log('data', data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Erro ao carregar quartos:", error)
          toast.error("Erro ao carregar dados dos quartos")
          setIsLoading(false)
        })
    }, [])


  useEffect(() => {
    // Carregar dados da API
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pacientes`)
      .then((res) => res.json())
      .then((data) => {
        setPacientes(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Erro ao carregar pacientes:", error)
        toast.error("Erro ao carregar dados dos pacientes")
        setIsLoading(false)
      })
  }, [])

  const onSubmit = async (data) => {
    const pacienteData = {
      ...data,
      dataNascimento:`${data.dataNascimento}T14:00:00z`,
      numeroQuarto: selectedQuarto ,
      quartoId: quartos.find((quarto) => quarto.numero === selectedQuarto)?.id,
    }
    console.log("data", JSON.stringify(pacienteData))

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pacientes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pacienteData),
        }
      )

      if (!response.ok) {
        console.log('response', response)
        throw new Error("Erro ao registrar paciente")
      }

      const novoPaciente = await response.json()
      setPacientes([...pacientes, novoPaciente])
      reset()
      toast.success("Paciente registrado com sucesso!")
    } catch (error) {
      console.error("Erro ao registrar paciente:", error)
      toast.error("Erro ao registrar paciente")
    }
  }

  const filteredPacientes = pacientes.filter(
    (paciente) =>
      paciente.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.numero_quarto?.toLowerCase().includes(searchTerm.toLowerCase()),
  )



  async function handleDelete(id: any): Promise<void> {
    if (!window.confirm("Tem certeza que deseja excluir este paciente?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pacientes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir paciente");
      }

      setPacientes(pacientes.filter((paciente) => paciente.id !== id));
      toast.success("Paciente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
      toast.error("Erro ao excluir paciente");
    }
  }

  function handleChangeQuartos(value: string): void {
    const selectedQuarto = quartos.find((quarto) => quarto.numero === value);
    if (selectedQuarto) {
      console.log("Quarto selecionado:", selectedQuarto);
      setSelectedQuarto(selectedQuarto.numero);
    } else {
      console.warn("Quarto não encontrado para o valor:", value);
    }
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Registro de Pacientes
        </h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar pacientes..."
              className="pl-9 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="shadow-md">
            <CardHeader className="bg-blue-50 border-b pb-3">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <Plus className="mr-2 h-5 w-5" />
                Novo Paciente
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
                  <Label
                    htmlFor="dataNascimento"
                    className="text-sm font-medium"
                  >
                    Data de Nascimento
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="dataNascimento"
                      type="date"
                      className="pl-9"
                      {...register("dataNascimento", { required: true })}
                    />
                  </div>
                  {errors.dataNascimento && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="numeroQuarto" className="text-sm font-medium">
                    Número do Quarto
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="numeroQuarto"
                      className="pl-9"
                      placeholder="Ex: 101"
                      {...register("numeroQuarto", { required: true })}
                    />
                  </div>
                  {errors.numeroQuarto && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
                </div> */}
                <div className="space-y-2">
                  <Label htmlFor="usuario" className="text-sm font-medium">
                    Quarto
                  </Label>
                  <Select  onValueChange={handleChangeQuartos}
                 >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um Quarto" />
                    </SelectTrigger>
                    <SelectContent>
                      {quartos.map((quarto) => (
                        <SelectItem key={quarto.id} value={quarto.numero}>
                       {   quarto.numero} {quarto.tipo} ({quarto.capacidade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observacoes" className="text-sm font-medium">
                    Observações
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="observacoes"
                      className="pl-9"
                      placeholder="Ex: paciente sob observação"
                      {...register("observacoes", { required: true })}
                    />
                  </div>
                  {errors.observacoes && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
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
                    "Registrar Paciente"
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
                Pacientes Registrados
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-lg text-gray-600">
                    Carregando pacientes...
                  </span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-medium">Nome</TableHead>
                        <TableHead className="font-medium">
                          Data de Nascimento
                        </TableHead>
                        <TableHead className="font-medium">Quarto</TableHead>
                        {/* <TableHead className="font-medium">
                          Contacto de Emergencia
                        </TableHead> */}
                        <TableHead className="font-medium">
                          Observações
                        </TableHead>
                        <TableHead className="font-medium text-right">
                          Ações
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPacientes.length > 0 ? (
                        filteredPacientes.map((paciente) => (
                          <TableRow
                            key={paciente.id}
                            className="hover:bg-gray-50"
                          >
                            <TableCell className="font-medium">
                              {paciente.nome}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                paciente.dataNascimento
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{paciente.numeroQuarto}</TableCell>
                            {/* <TableCell>{paciente.numeroQuarto}</TableCell> */}
                            <TableCell>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {paciente.observacoes}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                {/* <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-blue-600"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button> */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600"
                                  onClick={() => handleDelete(paciente.id)}
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
                            colSpan={6}
                            className="text-center py-8 text-gray-500"
                          >
                            {searchTerm
                              ? "Nenhum paciente encontrado com os critérios de busca."
                              : "Nenhum paciente registrado. Adicione um novo paciente usando o formulário."}
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

