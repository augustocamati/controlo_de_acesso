"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  Home,
  Building,
  Bed,
  Plus,
  Search,
  Download,
  Trash2,
  Edit,
  Loader2,
  Users,
} from "lucide-react"

export default function GerenciamentoQuartos() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
type Quarto = {
  numero: string
  andar: string
  tipo: TipoQuarto
  capacidade: string
  status: StatusQuarto
}

type TipoQuarto = "individual" | "duplo" | "suite" |  "isolamento" 

type StatusQuarto =
  | "disponivel"
  | "ocupado"
  | "parcial"
  | "manutenção"
  | "reservado"

const [quartos, setQuartos] = useState<Quarto[]>([
  {
    numero: "",
    andar: "",
    tipo: "individual", // valor inicial válido conforme TipoQuarto
    capacidade: "",
    status: "disponivel", // valor inicial válido conforme StatusQuarto
  },
])

const [tipoQuarto, setTipoQuarto] = useState<TipoQuarto>("individual")

const [statusQuarto, setStatusQuarto] = useState<StatusQuarto>("disponivel")

  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [currentQuarto, setCurrentQuarto] = useState<Quarto | null>(null)



    useEffect(() => {
      // Carregar dados da API
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/quartos`)
        .then((res) => res.json())
        .then((data) => {
          setQuartos(data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Erro ao carregar quartos:", error)
          toast.error("Erro ao carregar dados dos quartos")
          setIsLoading(false)
        })
    }, [])


  const onSubmit = async (data) => {
     const novaData= { ...data, tipo: tipoQuarto, status: statusQuarto }
    console.log("novaData", novaData)
      
    try {
      if (editMode && currentQuarto) {
         try {
           const response = await fetch(
           `${process.env.NEXT_PUBLIC_API_URL}/quartos/${currentQuarto.id}`,
             {
               method: "PUT",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify(novaData),
             }
           )

           if (!response.ok) {
             console.log("response erro", JSON.stringify(response))
             throw new Error("Erro ao atualizar o quarto")
           }

           const quartoAtualizado = await response.json()
console.log("quartoAtualizado", quartoAtualizado)
           setQuartos((quartos) =>
             quartos.map((quarto) =>
               quarto.id === currentQuarto.id ? quartoAtualizado : quarto
             )
           )

           toast.success("Quarto atualizado com sucesso!")
           setEditMode(false)
           setCurrentQuarto(null)
         } catch (error) {
           console.error("Erro ao atualizar quarto:", error)
           toast.error("Erro ao atualizar o quarto")
         }
      } else {
          console.log("response erro", JSON.stringify(novaData))
        try {
        
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/quartos`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(novaData),
            }
          )

          if (!response.ok) {
              console.log("response erro", JSON.stringify(response))
              console.log("response erro", response)
            throw new Error("Erro ao registrar quarto")
          }

          const novoquarto = await response.json()
          setQuartos([...quartos, novoquarto])
          reset()
          toast.success("quarto registrado com sucesso!")
        } catch (error) {
          console.error("Erro ao registrar quarto:", error)
          toast.error("Erro ao registrar quarto")
        }
      }

      // Limpar formulário
      reset()
      setTipoQuarto("individual")
      setStatusQuarto("disponivel")
    } catch (error) {
      console.error("Erro ao processar quarto:", error)
      toast.error("Erro ao processar quarto")
    }
  }

  const handleEdit = (quarto:Quarto) => {
    setCurrentQuarto(quarto)
    setEditMode(true)
    setTipoQuarto(quarto.tipo)
    setStatusQuarto(quarto.status)

    // Preencher o formulário com os dados do quarto
    reset({
      numero: quarto.numero,
      andar: quarto.andar,
      capacidade: quarto.capacidade,
    })
  }
async function handleDelete(id: string): Promise<void> {
  if (!window.confirm("Tem certeza que deseja excluir este Quarto?")) {
    return
  }

  try {
    const response = await fetch(
      `https://controlo-de-acesso-backend.vercel.app/api/quartos/${id}`,
      {
        method: "DELETE",
      }
    )

    if (!response.ok) {
      throw new Error("Erro ao excluir Quarto")
    }

    setQuartos(quartos.filter((quarto) => quarto.id !== id))
    toast.success("Quarto excluído com sucesso!")
  } catch (error) {
    console.error("Erro ao excluir Quarto:", error)
    toast.error("Erro ao excluir Quarto")
  }
}

  const cancelEdit = () => {
    setEditMode(false)
    setCurrentQuarto(null)
    reset()
  
  }

  const filteredQuartos = quartos.filter(
    (quarto) =>
      quarto.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quarto.andar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quarto.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quarto.status.toLowerCase().includes(searchTerm.toLowerCase()) 
  )

const tipoQuartoLabel = (tipo: TipoQuarto): string => {
  const labels: Record<TipoQuarto, string> = {
    individual: "Individual",
    duplo: "Duplo",
    suite: "Suíte",
    isolamento: "Isolamento",
  }

  return labels[tipo] || tipo
}


  const statusQuartoLabel = (status: StatusQuarto): string => {
    const labels: Record<StatusQuarto, string> = {
      disponivel: "Disponível",
      ocupado: "Ocupado",
      parcial: "Parcialmente Ocupado",
      manutenção: "Em Manutenção",
      reservado: "Reservado",
    }
    return labels[status] || status
  }

  const statusQuartoClass = (status: StatusQuarto): string => {
    const classes: Record<StatusQuarto, string> = {
      disponivel: "bg-green-100 text-green-800",
      ocupado: "bg-red-100 text-red-800",
      parcial: "bg-yellow-100 text-yellow-800",
      manutenção: "bg-gray-100 text-gray-800",
      reservado: "bg-blue-100 text-blue-800",
    }
    return classes[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gerenciamento de Quartos
        </h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar quartos..."
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
                {editMode ? "Editar Quarto" : "Novo Quarto"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="numero" className="text-sm font-medium">
                    Número do Quarto
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="numero"
                      className="pl-9"
                      placeholder="Ex: 101"
                      {...register("numero", { required: true })}
                    />
                  </div>
                  {errors.numero && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="andar" className="text-sm font-medium">
                    Andar
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="andar"
                      className="pl-9"
                      placeholder="Ex: 1"
                      {...register("andar", { required: true })}
                    />
                  </div>
                  {errors.andar && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo" className="text-sm font-medium">
                    Tipo de Quarto
                  </Label>
                  <Select value={tipoQuarto} onValueChange={setTipoQuarto}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de quarto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="duplo">Duplo</SelectItem>
                      <SelectItem value="suite">Suíte</SelectItem>
                      <SelectItem value="uti">UTI</SelectItem>
                      <SelectItem value="isolamento">Isolamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacidade" className="text-sm font-medium">
                    Capacidade
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="capacidade"
                      type="number"
                      min="1"
                      className="pl-9"
                      placeholder="Ex: 1"
                      {...register("capacidade", { required: true })}
                    />
                  </div>
                  {errors.capacidade && (
                    <span className="text-red-500 text-xs">
                      Este campo é obrigatório
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status
                  </Label>
                  <Select value={statusQuarto} onValueChange={setStatusQuarto}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponivel">Disponível</SelectItem>
                      <SelectItem value="ocupado">Ocupado</SelectItem>
                      <SelectItem value="parcial">
                        Parcialmente Ocupado
                      </SelectItem>
                      <SelectItem value="manutenção">Em Manutenção</SelectItem>
                      <SelectItem value="reservado">Reservado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {editMode ? "Atualizando..." : "Adicionando..."}
                      </>
                    ) : editMode ? (
                      "Atualizar Quarto"
                    ) : (
                      "Adicionar Quarto"
                    )}
                  </Button>

                  {editMode && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={cancelEdit}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-md">
            <CardHeader className="bg-blue-50 border-b pb-3">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <Bed className="mr-2 h-5 w-5" />
                Quartos Registrados
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-lg text-gray-600">
                    Carregando quartos...
                  </span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-medium">Número</TableHead>
                        <TableHead className="font-medium">Andar</TableHead>
                        <TableHead className="font-medium">Tipo</TableHead>
                        <TableHead className="font-medium">
                          Capacidade
                        </TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        {/* <TableHead className="font-medium">Paciente</TableHead> */}
                        <TableHead className="font-medium text-right">
                          Ações
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuartos.length > 0 ? (
                        filteredQuartos.map((quarto) => (
                          <TableRow
                            key={quarto.id}
                            className="hover:bg-gray-50"
                          >
                            <TableCell className="font-medium">
                              {quarto.numero}
                            </TableCell>
                            <TableCell>{quarto.andar}</TableCell>
                            <TableCell>
                              {tipoQuartoLabel(quarto.tipo)}
                            </TableCell>
                            <TableCell>{quarto.capacidade}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${statusQuartoClass(
                                  quarto.status
                                )}`}
                              >
                                {statusQuartoLabel(quarto.status)}
                              </span>
                            </TableCell>
                            {/* <TableCell>
                              {quarto.pacienteAtual ? (
                                <span className="text-sm">
                                  {quarto.pacienteAtual}
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </TableCell> */}
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-blue-600"
                                  onClick={() => handleEdit(quarto)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600"
                                  onClick={() => handleDelete(quarto.id)}
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
                              ? "Nenhum quarto encontrado com os critérios de busca."
                              : "Nenhum quarto registrado. Adicione um novo quarto usando o formulário."}
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
