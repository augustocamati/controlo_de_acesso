"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  Shield,
  Search,
  Download,
  Plus,
  Loader2,
  Lock,
  CreditCard,
} from "lucide-react"
 interface Permissao {
   id: number
   usuario: string
   cargo: string
   salas: string[]
   quartos: string[]
   rfid: string
   status: string
 }
export default function Permissoes() {
  const [permissoes, setPermissoes] = useState([])
  const [salas, setSalas] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [quartos, setQuartos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  interface NovaPermissao {
    usuario: string;
    cargo: string;
    salas: string[];
    quartos: string[];
    rfid: string;
    status: string;
  }

  const [novaPermissao, setNovaPermissao] = useState<NovaPermissao>({
    usuario: "",
    cargo: "",
    salas: [],
    quartos: [],
    rfid: "",
    status: "ativo",
  });

  useEffect(() => {
    // Carregar dados da API
    fetch("https://controlo-de-acesso-backend.vercel.app/api/permissoes")
      .then((res) => res.json())
      .then((data: NovaPermissao) => {
       

        setPermissoes(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Erro ao carregar permissoes:", error)
        toast.error("Erro ao carregar dados dos permissoes")
        setIsLoading(false)
      })
  }, [])

  // Dados simulados para salas do hospital
  const salasHospital = [
    { id: 1, nome: "Recepção", nivel: "Público" },
    { id: 8, nome: "Refeitório", nivel: "Público" },
    { id: 2, nome: "Enfermaria", nivel: "Restrito" },
    { id: 3, nome: "UTI", nivel: "Restrito" },
    { id: 4, nome: "Centro Cirúrgico", nivel: "Restrito" },
    { id: 5, nome: "Farmácia", nivel: "Restrito" },
    { id: 6, nome: "Laboratório", nivel: "Restrito" },
    { id: 7, nome: "Administração", nivel: "Restrito" },
  ]

  // Dados simulados para quartos do hospital
  const quartosHospital = [
    { id: 1, numero: "101", andar: "1" },
    { id: 2, numero: "102", andar: "1" },
    { id: 3, numero: "103", andar: "1" },
    { id: 4, numero: "201", andar: "2" },
    { id: 5, numero: "202", andar: "2" },
    { id: 6, numero: "203", andar: "2" },
    { id: 7, numero: "301", andar: "3" },
    { id: 8, numero: "302", andar: "3" },
  ]

  // Dados simulados para usuários
  // const usuarios = [
  //   {
  //     id: 1,
  //     nome: "Dr. Roberto Silva",
  //     cargo: "Médico",
  //     rfid: "RFID-MED-1234",
  //   },
  //   {
  //     id: 2,
  //     nome: "Enf. Ana Oliveira",
  //     cargo: "Enfermeiro",
  //     rfid: "RFID-ENF-5678",
  //   },
  //   { id: 3, nome: "José Santos", cargo: "Segurança", rfid: "RFID-SEG-9012" },
  //   { id: 4, nome: "Maria Souza", cargo: "Limpeza", rfid: "RFID-LIM-3456" },
  //   { id: 5, nome: "Carlos Mendes", cargo: "Visitante", rfid: "RFID-VIS-7890" },
  // ]

  // Dados simulados para permissões
  const permissoesSimuladas = [
    {
      id: 1,
      usuario: "Dr. Roberto Silva",
      cargo: "Médico",
      salas: ["UTI", "Centro Cirúrgico", "Enfermaria"],
      quartos: ["101", "102"],
      rfid: "RFID-MED-1234",
      status: "ativo",
    },
    {
      id: 2,
      usuario: "Enf. Ana Oliveira",
      cargo: "Enfermeiro",
      salas: ["Enfermaria", "Farmácia"],
      quartos: ["101", "102"],
      rfid: "RFID-ENF-5678",
      status: "ativo",
    },
    {
      id: 3,
      usuario: "José Santos",
      cargo: "Segurança",
      salas: ["Recepção", "Refeitório", "Administração"],
      quartos: ["101", "102"],
      rfid: "RFID-SEG-9012",
      status: "ativo",
    },
    {
      id: 4,
      usuario: "Maria Souza",
      cargo: "Limpeza",
      salas: ["Centro Cirúrgico", "Enfermaria", "Laboratório"],
      quartos: ["101", "102"],
      rfid: "RFID-LIM-3456",
      status: "inativo",
    },
    {
      id: 5,
      usuario: "Carlos Mendes",
      cargo: "Visitante",
      salas: ["Enfermaria", "Refeitório"],
      quartos: ["101", "102"],
      rfid: "RFID-VIS-7890",
      status: "ativo",
    },
  ]

  // useEffect(() => {
  //   // Simulando carregamento de dados da API
  //   setTimeout(() => {
  //     // setPermissoes(permissoesSimuladas)
  //     setSalas(salasHospital)
  //     // setQuartos(quartosHospital)
  //     setIsLoading(false)
  //   }, 1000)
  // }, [])

  useEffect(() => {
    // Carregar dados da API
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/quartos`)
      .then((res) => res.json())
      .then((data) => {
        setQuartos(data)
        setSalas(salasHospital)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Erro ao carregar quartos:", error)
        toast.error("Erro ao carregar dados dos quartos")
        setIsLoading(false)
      })
  }, [])

  const handleInputChange = (field, value) => {
    setNovaPermissao({
      ...novaPermissao,
      [field]: value,
    })
  }

  // Função para lidar com a seleção de múltiplos quartos
  const handleQuartosChange = (quarto) => {
    const quartosAtuais = [...novaPermissao.quartos]

    if (quartosAtuais.includes(quarto)) {
      // Remover quarto se já estiver selecionado
      const novosQuartos = quartosAtuais.filter((q) => q !== quarto)
      handleInputChange("quartos", novosQuartos)
    } else {
      // Adicionar quarto se não estiver selecionado
      handleInputChange("quartos", [...quartosAtuais, quarto])
    }
  }

  const handleSalasChange = (sala) => {
    const salasAtuais = [...novaPermissao.salas]

    if (salasAtuais.includes(sala)) {
      // Remover sala se já estiver selecionada
      const novasSalas = salasAtuais.filter((s) => s !== sala)
      handleInputChange("salas", novasSalas)
    } else {
      // Adicionar sala se não estiver selecionada
      handleInputChange("salas", [...salasAtuais, sala])
    }
  }

  

  const handleUsuarioChange = (nomeUsuario) => {
    const usuarioSelecionado = usuarios.find((u) => u.nome === nomeUsuario)

    if (usuarioSelecionado) {
      setNovaPermissao({
        ...novaPermissao,
        usuario: nomeUsuario,
        cargo: usuarioSelecionado.cargo,
        rfid: usuarioSelecionado.rfid,
      })
    } else {
      setNovaPermissao({
        ...novaPermissao,
        usuario: nomeUsuario,
        cargo: "",
        rfid: "",
      })
    }
  }

   const adicionarPermissao = async () => {
     // Validar campos obrigatórios
     if (
       !novaPermissao.usuario ||
       novaPermissao.salas.length === 0 ||
       novaPermissao.quartos.length === 0 ||
       !novaPermissao.rfid
     ) {
       toast.error("Preencha todos os campos obrigatórios")
       return
     }

     // Buscar informações do usuário selecionado
     const usuarioSelecionado = usuarios.find(
       (u) => u.nome === novaPermissao.usuario
     )

     if (!usuarioSelecionado) {
       toast.error("Usuário não encontrado")
       return
     }

     // Criar nova permissão
     const novaPermissaoCompleta = {
   
       usuario: novaPermissao.usuario,
       cargo: usuarioSelecionado.cargo,
       salas: novaPermissao.salas,
       quartos: novaPermissao.quartos, // Agora é um array
       rfid: novaPermissao.rfid,
       status: novaPermissao.status,
     }

     
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/permissoes`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(novaPermissaoCompleta),
            }
          )

          if (!response.ok) {
            console.log("response erro", JSON.stringify(response))
            console.log("response erro", response)
            throw new Error("Erro ao registrar permissão")
          }

          const novaPermissao =  await response.json()
          console.log("NOva Permissoes", novaPermissao)
          setPermissoes([...permissoes,{ ...novaPermissaoCompleta, id: novaPermissao.id }])
          // Resetar formulário
          setNovaPermissao({
            usuario: "",
            cargo: "",
            salas: [],
            quartos: [], // Resetar para array vazio
            rfid: "",
            status: "ativo",
          })
          toast.success("Permissão adicionada com sucesso!")
        } catch (error) {
          console.error("Erro ao registrar permissão:", error)
          toast.error("Erro ao registrar permissão")
        }
     //

    

    

    
   }

  const alterarStatusPermissao = (id, novoStatus) => {
    const permissoesAtualizadas = permissoes.map((permissao) => {
      if (permissao.id === id) {
        return { ...permissao, status: novoStatus }
      }
      return permissao
    })

    setPermissoes(permissoesAtualizadas)
    toast.success(
      `Permissão ${
        novoStatus === "ativo" ? "ativada" : "desativada"
      } com sucesso!`
    )
  }

  useEffect(() => {
    const fetchData = async () => {
  
      try {
        const [funcionariosRes, visitantesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/funcionarios`).then((res) =>
            res.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitantes`).then((res) =>
            res.json()
          ),
          // fetch(`${process.env.NEXT_PUBLIC_API_URL}/quartos`).then((res) =>
          //   res.json()
          // ),
        ])
        const usuariosFormatados = [
          ...funcionariosRes.map((f) => ({
            id: `func_${f.id}`,
            nome: f.nome,
            cargo: f.cargo,
            tipo: "Funcionário",
            // rfid: f.rfid,
          })),
          ...visitantesRes.map((v) => ({
            id: `visit_${v.id}`,
            nome: v.nome,
            cargo: "Visitante",
            tipo: "Visitante",
            // rfid: v.rfid,
          })),
        ]

        setUsuarios(usuariosFormatados)
        

        // setQuartos(quartosRes)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      }
    }

    fetchData()
  }, []) // Executa apenas uma vez ao montar o componente

  async function handleDelete(id: any): Promise<void> {
    if (!window.confirm("Tem certeza que deseja excluir essa permissão?")) {
      return
    }

    try {
      const response = await fetch(
        `https://controlo-de-acesso-backend.vercel.app/api/permissoes/${id}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) {
        throw new Error("Erro ao excluir permissão")
      }

      setPermissoes(permissoes.filter((permissoe) => permissoe.id !== id))
      toast.success("permissão excluído com sucesso!")
    } catch (error) {
      console.error("Erro ao excluir permissão:", error)
      toast.error("Erro ao excluir permissão")
    }
  }

  const filteredPermissoes = permissoes.filter(
    (permissao) =>
      permissao.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permissao.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permissao.salas.some((sala) =>
        sala.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      permissao.quarto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permissao.rfid.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gerenciamento de Permissões
        </h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar permissões..."
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
                <Shield className="mr-2 h-5 w-5" />
                Nova Permissão de Acesso
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="usuario" className="text-sm font-medium">
                    Usuário
                  </Label>
                  <Select
                    value={novaPermissao.usuario}
                    onValueChange={handleUsuarioChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      {usuarios.map((usuario) => (
                        <SelectItem key={usuario.id} value={usuario.nome}>
                          {usuario.nome} ({usuario.cargo})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rfid" className="text-sm font-medium">
                    RFID
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="rfid"
                      className="pl-9"
                      placeholder="Código RFID"
                      value={novaPermissao.rfid}
                      onChange={(e) =>
                        handleInputChange("rfid", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quartos" className="text-sm font-medium">
                    Quartos com Acesso Permitido
                  </Label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
                    <div className="col-span-2 mb-1">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="todos-quartos"
                          checked={
                            novaPermissao.quartos.length === quartos.length
                          } // Verifica se todos estão selecionados
                          onChange={() => {
                            if (
                              novaPermissao.quartos.length === quartos.length
                            ) {
                              // Se todos já estiverem selecionados, desmarcar tudo
                              handleInputChange("quartos", [])
                            } else {
                              // Seleciona todos os quartos
                              handleInputChange(
                                "quartos",
                                quartos.map((q) => q.numero)
                              )
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />

                        <label
                          htmlFor="todos-quartos"
                          className="ml-2 block text-sm font-medium text-gray-700"
                        >
                          Todos os quartos
                        </label>
                      </div>
                    </div>
                    {novaPermissao.quartos.includes("Todos")
                      ? null
                      : quartos.map((quarto) => (
                          <div key={quarto.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`quarto-${quarto.id}`}
                              checked={novaPermissao.quartos.includes(
                                quarto.numero
                              )}
                              onChange={() =>
                                handleQuartosChange(quarto.numero)
                              }
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`quarto-${quarto.id}`}
                              className="ml-2 block text-sm text-gray-700"
                            >
                              Quarto {quarto.numero} ({quarto.status}) (
                              {quarto.andar})
                            </label>
                          </div>
                        ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Salas com Acesso Permitido
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {salas.map((sala) => (
                      <div key={sala.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`sala-${sala.id}`}
                          checked={novaPermissao.salas.includes(sala.nome)}
                          onChange={() => handleSalasChange(sala.nome)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`sala-${sala.id}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {sala.nome}({sala.nivel})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="space-y-2">
                  <Label
                    htmlFor="status"
                    className="text-sm font-medium flex items-center justify-between"
                  >
                    <span>Status da Permissão</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Inativo</span>
                      <Switch
                        id="status"
                        checked={novaPermissao.status === "ativo"}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            "status",
                            checked ? "ativo" : "inativo"
                          )
                        }
                      />
                      <span className="text-xs text-gray-500">Ativo</span>
                    </div>
                  </Label>
                </div> */}

                <Button
                  onClick={adicionarPermissao}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Permissão
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-md">
            <CardHeader className="bg-blue-50 border-b pb-3">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <Lock className="mr-2 h-5 w-5" />
                Permissões de Acesso
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-lg text-gray-600">
                    Carregando permissões...
                  </span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usuário
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cargo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Salas
                        </th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th> */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredPermissoes.length > 0 ? (
                        filteredPermissoes.map((permissao, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">
                                {permissao.usuario}
                              </div>
                              <div className="text-xs text-gray-500">
                                {permissao.rfid}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">{permissao.cargo}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {permissao.salas.map((sala, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {sala}
                                  </span>
                                ))}
                                {permissao.quartos.map((quarto, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                  >
                                    Quarto {quarto}
                                  </span>
                                ))}
                              </div>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Switch
                                  checked={permissao.status === "ativo"}
                                  onCheckedChange={(checked) =>
                                    alterarStatusPermissao(
                                      permissao.id,
                                      checked ? "ativo" : "inativo"
                                    )
                                  }
                                  className="mr-2"
                                />
                                <span
                                  className={`text-xs ${
                                    permissao.status === "ativo"
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {permissao.status === "ativo"
                                    ? "Ativo"
                                    : "Inativo"}
                                </span>
                              </div>
                            </td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                                onClick={() => handleDelete(permissao.id)}
                              >
                                Excluir
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center py-8 text-gray-500"
                          >
                            {searchTerm
                              ? "Nenhuma permissão encontrada com os critérios de busca."
                              : "Nenhuma permissão cadastrada. Adicione uma nova permissão usando o formulário."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
