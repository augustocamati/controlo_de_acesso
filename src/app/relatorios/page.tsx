"use client"

import { useState, useEffect, useRef } from "react"
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js"
import {
  Calendar,
  FileText,
  Download,
  BarChart2,
  Loader2,
  AlertTriangle,
  Activity,
  Radio,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Switch } from "@/components/ui/switch"
import { set } from "react-hook-form"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

// Definição do tipo de dados para os logs de acesso
type LogAcesso = {
  id: number
  rfid: string
  tipoAcesso: string
  dataHora: Date
  status: string
  createdAt: Date
  usuarioId?: number
  pacienteId?: number
  visitanteId?: number
  quartoId?: number
  // Campos adicionais para exibição
  usuarioNome?: string
  pacienteNome?: string
  visitanteNome?: string
  quartoNumero?: string
  tipoUsuario?: string
  // Campo para animação
  isNew?: boolean
}

export default function Relatorios() {
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [logsAcesso, setLogsAcesso] = useState<LogAcesso[]>([])
  const [logsTempoReal, setLogsTempoReal] = useState<LogAcesso[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [relatorioGerado, setRelatorioGerado] = useState(false)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [monitoramentoAtivo, setMonitoramentoAtivo] = useState(true)
  const [notificacoesSonoras, setNotificacoesSonoras] = useState(true)
  const itensPorPagina = 10
  const audioRef = useRef<HTMLAudioElement>(null)

  // Função para gerar dados simulados de logs de acesso
  const gerarDadosSimulados = () => {
    const tiposAcesso = ["entrada", "saída"]
    const statusAcesso = ["autorizado", "negado"]
    const tiposUsuario = [
      "médico",
      "enfermeiro",
      "segurança",
      "equipe de limpeza",
      "visitante",
    ]
    const quartos = ["101", "102", "201", "202", "301", "302"]

    // Gerar data aleatória entre dataInicio e dataFim
    const gerarDataAleatoria = () => {
      const inicio = dataInicio
        ? new Date(dataInicio)
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const fim = dataFim ? new Date(dataFim) : new Date()
      return new Date(
        inicio.getTime() + Math.random() * (fim.getTime() - inicio.getTime())
      )
    }

    // Gerar 100 registros aleatórios
    const logs: LogAcesso[] = []
    for (let i = 1; i <= 100; i++) {
      const tipoUsuario =
        tiposUsuario[Math.floor(Math.random() * tiposUsuario.length)]
      const dataHora = gerarDataAleatoria()

      const log: LogAcesso = {
        id: i,
        rfid: `RFID-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        tipoAcesso: tiposAcesso[Math.floor(Math.random() * tiposAcesso.length)],
        dataHora: dataHora,
        status: statusAcesso[Math.floor(Math.random() * statusAcesso.length)],
        createdAt: dataHora,
        tipoUsuario: tipoUsuario,
        quartoNumero: quartos[Math.floor(Math.random() * quartos.length)],
      }

      // Adicionar IDs e nomes com base no tipo de usuário
      if (tipoUsuario === "médico") {
        log.usuarioId = Math.floor(Math.random() * 100) + 1
        log.usuarioNome = `Dr. ${
          ["Silva", "Santos", "Oliveira", "Souza", "Pereira"][
            Math.floor(Math.random() * 5)
          ]
        }`
      } else if (tipoUsuario === "enfermeiro") {
        log.pacienteId = Math.floor(Math.random() * 100) + 1
        log.pacienteNome = `Enf. ${
          ["Ana", "Carlos", "Mariana", "João", "Fernanda"][
            Math.floor(Math.random() * 5)
          ]
        }`
      } else if (tipoUsuario === "segurança") {
        log.visitanteId = Math.floor(Math.random() * 100) + 1
        log.visitanteNome = `Seg. ${
          ["Rodrigues", "Almeida", "Costa", "Lima", "Ferreira"][
            Math.floor(Math.random() * 5)
          ]
        }`
      } else if (tipoUsuario === "equipe de limpeza") {
        log.visitanteId = Math.floor(Math.random() * 100) + 1
        log.visitanteNome = `Limp. ${
          ["Carvalho", "Ribeiro", "Martins", "Gomes", "Dias"][
            Math.floor(Math.random() * 5)
          ]
        }`
      } else if (tipoUsuario === "visitante") {
        log.visitanteId = Math.floor(Math.random() * 100) + 1
        log.visitanteNome = `Vis. ${
          ["Barbosa", "Nascimento", "Moreira", "Nunes", "Cardoso"][
            Math.floor(Math.random() * 5)
          ]
        }`
      }

      // Adicionar ID do quarto
      log.quartoId = Math.floor(Math.random() * 10) + 1

      logs.push(log)
    }
   
    // Ordenar por data (mais recente primeiro)
    return logs.sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime())
  }

  /////////////////////////////////////////////////////////
  async function fetchAllLogs() {
    try {
      const response = await fetch("http://localhost:3003/api/log-acesso/logs")
      const data= await response.json()
      console.log("Todos os logs:", data)
      return data.data
    } catch (error) {
      console.error("Erro ao buscar todos os logs:", error)
    }
  }

  /////////////////////////////////////////////

  // Função para gerar um novo log em tempo real
  const gerarNovoLogTempoReal = () => {
    const tiposAcesso = ["entrada", "saída"]
    const statusAcesso = ["autorizado", "negado"]
    const tiposUsuario = [
      "médico",
      "enfermeiro",
      "segurança",
      "equipe de limpeza",
      "visitante",
    ]
    const quartos = ["101", "102", "201", "202", "301", "302"]

    const tipoUsuario =
      tiposUsuario[Math.floor(Math.random() * tiposUsuario.length)]
    const status = Math.random() < 0.8 ? "autorizado" : "negado" // 80% de chance de ser autorizado
    const dataHora = new Date()

    const log: LogAcesso = {
      id: Date.now(),
      rfid: `RFID-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      tipoAcesso: tiposAcesso[Math.floor(Math.random() * tiposAcesso.length)],
      dataHora: dataHora,
      status: status,
      createdAt: dataHora,
      tipoUsuario: tipoUsuario,
      quartoNumero: quartos[Math.floor(Math.random() * quartos.length)],
      isNew: true, // Marcar como novo para animação
    }

    // Adicionar nomes com base no tipo de usuário
    if (tipoUsuario === "médico") {
      log.usuarioNome = `Dr. ${
        ["Silva", "Santos", "Oliveira", "Souza", "Pereira"][
          Math.floor(Math.random() * 5)
        ]
      }`
    } else if (tipoUsuario === "enfermeiro") {
      log.pacienteNome = `Enf. ${
        ["Ana", "Carlos", "Mariana", "João", "Fernanda"][
          Math.floor(Math.random() * 5)
        ]
      }`
    } else if (tipoUsuario === "segurança") {
      log.visitanteNome = `Seg. ${
        ["Rodrigues", "Almeida", "Costa", "Lima", "Ferreira"][
          Math.floor(Math.random() * 5)
        ]
      }`
    } else if (tipoUsuario === "equipe de limpeza") {
      log.visitanteNome = `Limp. ${
        ["Carvalho", "Ribeiro", "Martins", "Gomes", "Dias"][
          Math.floor(Math.random() * 5)
        ]
      }`
    } else if (tipoUsuario === "visitante") {
      log.visitanteNome = `Vis. ${
        ["Barbosa", "Nascimento", "Moreira", "Nunes", "Cardoso"][
          Math.floor(Math.random() * 5)
        ]
      }`
    }

    return log
  }
  // Efeito para simular logs em tempo real
  useEffect(() => {
    if (!monitoramentoAtivo) return 
    setRelatorioGerado(true)
       

    const interval = setInterval(() => {
      fetchAllLogs().then(logs=>{
   setLogsAcesso(logs)

      })
  

    }, 1000) // Novo log a cada 5 segundos

    return () => clearInterval(interval)
  }, [monitoramentoAtivo])

//   // Efeito para simular logs em tempo real
//   useEffect(() => {
//     if (!monitoramentoAtivo) return

//     const interval = setInterval(async () => {
//       // const lg = fetchAllLogs()
//       // console.log("lg", lg)
//       console.log("acesso", logsTempoReal)
//       // const lg = await fetchAllLogs() // gerarNovoLogTempoReal()
//  const novoLog= logsAcesso[0] //lg[0]
//       console.log("nlogs", novoLog)

//       // Tocar som de alerta para acessos negados
//       if (
//         novoLog.status === "negado" &&
//         notificacoesSonoras &&
//         audioRef.current
//       ) {
//         audioRef.current
//           .play()
//           .catch((e) => console.error("Erro ao tocar áudio:", e))

//         // Mostrar notificação toast para acessos negados
//         toast.error(
//           `Acesso negado: ${obterNomeUsuario(
//             novoLog
//           )} tentou acessar o quarto ${novoLog.quartoNumero}`,
//           {
//             // position: "top-right",
//             autoClose: 5000,
//           }
//         )
//       }

//       setLogsTempoReal((prev) => {
//         // Manter apenas os 20 logs mais recentes
//         const newLogs = [novoLog, ...prev.slice(0, 19)]

//         // Remover a flag isNew após 3 segundos
//         setTimeout(() => {
//           setLogsTempoReal((current) =>
//             current.map((log) =>
//               log.id === novoLog.id ? { ...log, isNew: false } : log
//             )
//           )
//         }, 3000)

//         return newLogs
//       })
//     }, 5000) // Novo log a cada 5 segundos

//     return () => clearInterval(interval)
//   }, [monitoramentoAtivo, notificacoesSonoras])

  const gerarRelatorio = () => {
    setIsLoading(true)

    // Simular chamada à API
    setTimeout(async () => {
      // const logs = gerarDadosSimulados()
      const logsAPI = await fetchAllLogs()
      console.log("logs API", logsAPI)
      if (logsAPI) {
        setLogsAcesso(logsAPI)
      } else {
        console.error("logsAPI is undefined")
      }
      setRelatorioGerado(true)
      setIsLoading(false)
      setPaginaAtual(1)
      toast.success("Relatório gerado com sucesso!")
    }, 1500)
  }

  // Preparar dados para o gráfico por tipo de usuário
  const prepararDadosGraficoPorUsuario = () => {
    // Contagem por tipo de usuário
    const dadosPorUsuario = {
      médico: { autorizado: 0, negado: 0 },
      enfermeiro: { autorizado: 0, negado: 0 },
      segurança: { autorizado: 0, negado: 0 },
      "equipe de limpeza": { autorizado: 0, negado: 0 },
      visitante: { autorizado: 0, negado: 0 },
    }

    logsAcesso.forEach((log) => {
         console.log("first", log.tipoUsuario)
      if (log.tipoUsuario) {
        const tipoUsuarioKey = log.tipoUsuario.toLowerCase() === "medico" ? "médico" : log.tipoUsuario;
        if (dadosPorUsuario[tipoUsuarioKey]) {
          dadosPorUsuario[tipoUsuarioKey][log.status]++;
        }
      }
    })

    return {
      labels: [
        "Médico",
        "Enfermeiro",
        "Segurança",
        "Equipe de Limpeza",
        "Visitante",
      ],
      datasets: [
        {
          label: "Autorizado",
          data: [
            dadosPorUsuario["médico"].autorizado,
            dadosPorUsuario["enfermeiro"].autorizado,
            dadosPorUsuario["segurança"].autorizado,
            dadosPorUsuario["equipe de limpeza"].autorizado,
            dadosPorUsuario["visitante"].autorizado,
          ],
          backgroundColor: "rgba(59, 130, 246, 0.6)",
        },
        {
          label: "Negado",
          data: [
            dadosPorUsuario["médico"].negado,
            dadosPorUsuario["enfermeiro"].negado,
            dadosPorUsuario["segurança"].negado,
            dadosPorUsuario["equipe de limpeza"].negado,
            dadosPorUsuario["visitante"].negado,
          ],
          backgroundColor: "rgba(239, 68, 68, 0.6)",
        },
      ],
    }
  }

  // Preparar dados para o gráfico de tendência temporal
  const prepararDadosGraficoTemporal = () => {
    // Agrupar logs por dia
    const logsPorDia = {}

    logsAcesso.forEach((log) => {
      const data = new Date(log.dataHora).toISOString().split("T")[0]

      if (!logsPorDia[data]) {
        logsPorDia[data] = { autorizado: 0, negado: 0 }
      }

      logsPorDia[data][log.status]++
    })

    // Ordenar as datas
    const datas = Object.keys(logsPorDia).sort()

    return {
      labels: datas,
      datasets: [
        {
          label: "Acessos Autorizados",
          data: datas.map((data) => logsPorDia[data].autorizado),
          borderColor: "rgba(59, 130, 246, 1)",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Acessos Negados",
          data: datas.map((data) => logsPorDia[data].negado),
          borderColor: "rgba(239, 68, 68, 1)",
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    }
  }

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    if (!logsAcesso.length) return null

    const totalAcessos = logsAcesso.length
    const acessosAutorizados = logsAcesso.filter(
      (log) => log.status === "autorizado"
    ).length

    
    const acessosNegados = totalAcessos - acessosAutorizados
    const taxaAutorizacao = (acessosAutorizados / totalAcessos) * 100

    const acessosPorTipo = {
      médico: logsAcesso.filter((log) => log.tipoUsuario === "medico").length,
     
      enfermeiro: logsAcesso.filter((log) => log.tipoUsuario === "enfermeiro")
        .length,
      segurança: logsAcesso.filter((log) => log.tipoUsuario === "segurança")
        .length,
      "equipe de limpeza": logsAcesso.filter(
        (log) => log.tipoUsuario === "equipe de limpeza"
      ).length,
      visitante: logsAcesso.filter((log) => log.tipoUsuario === "visitante")
        .length,
    }

    return {
      totalAcessos,
      acessosAutorizados,
      acessosNegados,
      taxaAutorizacao,
      acessosPorTipo,
    }
  }

  const dadosGrafico = relatorioGerado
    ? prepararDadosGraficoPorUsuario()
    : { labels: [], datasets: [] }
  const dadosGraficoTemporal = relatorioGerado
    ? prepararDadosGraficoTemporal()
    : { labels: [], datasets: [] }
  const estatisticas = relatorioGerado ? calcularEstatisticas() : null

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Acessos por Tipo de Usuário",
      },
    },
  }

  const optionsTemporal = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Tendência de Acessos ao Longo do Tempo",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Data",
        },
      },
      y: {
        title: {
          display: true,
          text: "Número de Acessos",
        },
        beginAtZero: true,
      },
    },
  }

  // Função para formatar a data
  const formatarData = (data: Date) => {
    return new Date(data).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Função para formatar a hora
  const formatarHora = (data: Date) => {
    return new Date(data).toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Função para obter o nome do usuário com base no tipo
  const obterNomeUsuario = (log: LogAcesso) => {
    if (log.usuarioNome) return log.usuarioNome
    if (log.pacienteNome) return log.pacienteNome
    if (log.visitanteNome) return log.visitanteNome
    return "Desconhecido"
  }



  // Paginação
  const totalPaginas = Math.ceil(logsAcesso.length / itensPorPagina)
  const logsPaginados = logsAcesso.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  )

  return (
    <Layout>
      {/* Elemento de áudio para alertas sonoros */}
      <audio ref={audioRef} src="/alert.mp3" preload="auto" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Relatórios de Acesso
        </h1>
      </div>

      {/* Log em Tempo Real - Apenas o mais recente */}
      <Card className="shadow-md mb-6">
        <CardHeader className="bg-green-50 border-b pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center text-green-700">
              <Radio className="mr-2 h-5 w-5" />
              Monitoramento em Tempo Real
            </CardTitle>
            <div className="flex items-center space-x-4">
              {/* <div className="flex items-center space-x-3">
                <Button
                  onClick={gerarRelatorio}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando Relatório...
                    </>
                  ) : (
                    "Gerar Relatório"
                  )}
                </Button>
              </div> */}
              {/* <div className="flex items-center space-x-2">
                <Label htmlFor="monitoramento" className="text-sm">
                  Monitoramento
                </Label>
                <Switch
                  id="monitoramento"
                  checked={monitoramentoAtivo}
                  onCheckedChange={setMonitoramentoAtivo}
                />
              </div> */}
            </div>
          </div>
          <CardDescription>
            Visualize o evento de acesso mais recente em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {logsAcesso.length > 0 ? (
            <div
              className={`p-6 rounded-lg border ${
                logsAcesso[0].isNew ? "animate-pulse" : ""
              } ${
                logsAcesso[0].status === "autorizado"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {logsAcesso[0].status === "autorizado" ? (
                    <div className="p-3 bg-green-100 rounded-full mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  ) : (
                    <div className="p-3 bg-red-100 rounded-full mr-4">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {logsAcesso[0].status === "autorizado"
                        ? "Acesso Autorizado"
                        : "Acesso Negado"}
                    </h3>
                    <p className="text-lg mb-1">
                      <span className="font-medium">
                        {obterNomeUsuario(logsAcesso[0])}
                      </span>{" "}
                      ({logsAcesso[0].tipoUsuario})
                    </p>
                    <p className="text-base">
                      {logsAcesso[0].tipoAcesso === "entrada"
                        ? "Entrou no"
                        : "Saiu do"}{" "}
                      quarto {logsAcesso[0].quartoNumero}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">
                    {formatarHora(logsAcesso[0].dataHora)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {logsAcesso[0].rfid}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
              {monitoramentoAtivo ? (
                <>
                  <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-lg">Aguardando eventos de acesso...</p>
                </>
              ) : (
                <>
                  <Radio className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg">
                    Monitoramento em tempo real está desativado.
                  </p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <Card className="shadow-md lg:col-span-1">
          <CardHeader className="bg-blue-50 border-b pb-3">
            <CardTitle className="text-lg flex items-center text-blue-700">
              <FileText className="mr-2 h-5 w-5" />
              Filtros do Relatório
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataInicio" className="text-sm font-medium">
                  Data de Início
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="dataInicio"
                    type="date"
                    className="pl-9"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataFim" className="text-sm font-medium">
                  Data de Fim
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="dataFim"
                    type="date"
                    className="pl-9"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
                </div>
              </div>

              <Button
                onClick={gerarRelatorio}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando Relatório...
                  </>
                ) : (
                  "Gerar Relatório"
                )}
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {relatorioGerado && estatisticas && (
          <Card className="shadow-md lg:col-span-3">
            <CardHeader className="bg-blue-50 border-b pb-3">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <Activity className="mr-2 h-5 w-5" />
                Resumo Estatístico
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total de Acessos</p>
                  <p className="text-2xl font-bold">
                    {estatisticas.totalAcessos}
                  </p>
                  
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Acessos Autorizados</p>
                  <p className="text-2xl font-bold">
                    {estatisticas.acessosAutorizados}
                  </p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-green-600">
                      {estatisticas.taxaAutorizacao.toFixed(1)}% do total
                    </span>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Acessos Negados</p>
                  <p className="text-2xl font-bold">
                    {estatisticas.acessosNegados}
                  </p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-red-600">
                      {(100 - estatisticas.taxaAutorizacao).toFixed(1)}% do
                      total
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">
                  Distribuição por Tipo de Usuário
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(estatisticas.acessosPorTipo).map(
                    ([tipo, quantidade]) => (
                      <div
                        key={tipo}
                        className="bg-gray-50 p-2 rounded text-center"
                      >
                        <p className="text-xs text-gray-500 capitalize">
                          {tipo}
                        </p>
                        <p className="font-bold">{quantidade}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {relatorioGerado && (
          <>
            <Card className="shadow-md lg:col-span-3">
              <CardHeader className="bg-blue-50 border-b pb-3">
                <CardTitle className="text-lg flex items-center text-blue-700">
                  <BarChart2 className="mr-2 h-5 w-5" />
                  Análise Gráfica
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-80">
                    <Bar data={dadosGrafico} options={options} />
                  </div>
                  <div className="h-80">
                    <Line
                      data={dadosGraficoTemporal}
                      options={optionsTemporal}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md lg:col-span-3">
              <CardHeader className="bg-blue-50 border-b pb-3">
                <CardTitle className="text-lg flex items-center text-blue-700">
                  <FileText className="mr-2 h-5 w-5" />
                  Registros de Acesso
                </CardTitle>
                <CardDescription>
                  Mostrando{" "}
                  {Math.min(
                    (paginaAtual - 1) * itensPorPagina + 1,
                    logsAcesso.length
                  )}{" "}
                  a {Math.min(paginaAtual * itensPorPagina, logsAcesso.length)}{" "}
                  de {logsAcesso.length} registros
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-medium">ID</TableHead>
                        <TableHead className="font-medium">RFID</TableHead>
                        {/* <TableHead className="font-medium">Tipo</TableHead> */}
                        <TableHead className="font-medium">Data/Hora</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium">Usuário</TableHead>
                        <TableHead className="font-medium">Quarto</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logsAcesso?.length > 0 ? (
                        logsPaginados.map((log) => (
                          <TableRow key={log.id} className="hover:bg-gray-50">
                            <TableCell>{log.id}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {log.rfid}
                              </span>
                            </TableCell>
                            {/* <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  log.tipoAcesso === "entrada"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {log.tipoAcesso === "entrada"
                                  ? "Entrada"
                                  : "Saída"}
                              </span>
                            </TableCell> */}
                            <TableCell>{formatarData(log.dataHora)}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  log.status === "autorizado"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {log.status === "autorizado"
                                  ? "Autorizado"
                                  : "Negado"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div>
                                <span className="font-medium">
                                  {obterNomeUsuario(log)}
                                </span>
                                {log.tipoUsuario && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {log.tipoUsuario.charAt(0).toUpperCase() +
                                      log.tipoUsuario.slice(1)}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {log.quartoNumero ? (
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                                  {log.quartoNumero}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-8 text-gray-500"
                          >
                            Nenhum registro encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {totalPaginas > 1 && (
                  <div className="flex justify-between items-center p-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setPaginaAtual((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={paginaAtual === 1}
                    >
                      Anterior
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(totalPaginas, 5) },
                        (_, i) => {
                          const pageNum = i + 1
                          return (
                            <Button
                              key={pageNum}
                              variant={
                                pageNum === paginaAtual ? "default" : "outline"
                              }
                              className="w-8 h-8 p-0"
                              onClick={() => setPaginaAtual(pageNum)}
                            >
                              {pageNum}
                            </Button>
                          )
                        }
                      )}
                      {totalPaginas > 5 && <span className="mx-1">...</span>}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setPaginaAtual((prev) =>
                          Math.min(prev + 1, totalPaginas)
                        )
                      }
                      disabled={paginaAtual === totalPaginas}
                    >
                      Próxima
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md lg:col-span-3">
              <CardHeader className="bg-red-50 border-b pb-3">
                <CardTitle className="text-lg flex items-center text-red-700">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Alertas de Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {logsAcesso
                    .filter((log) => log.status === "negado")
                    .slice(0, 5)
                    .map((log, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 bg-red-50 rounded-lg"
                      >
                        <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Acesso negado: {obterNomeUsuario(log)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Tentativa de acesso ao quarto {log.quartoNumero} em{" "}
                            {formatarData(log.dataHora)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Tipo de usuário: {log.tipoUsuario} | RFID:{" "}
                            {log.rfid}
                          </p>
                        </div>
                      </div>
                    ))}

                  {logsAcesso.filter((log) => log.status === "negado")
                    .length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Nenhum alerta de acesso negado no período selecionado.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <ToastContainer position="bottom-right" />
    </Layout>
  )
}
