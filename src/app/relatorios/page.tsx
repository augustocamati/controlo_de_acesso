"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Calendar, FileText, Download, BarChart2 } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Relatorios() {
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [relatorios, setRelatorios] = useState([])

  const gerarRelatorio = () => {
    // Simular geração de relatório
    const novoRelatorio = [
      { tipo: "Paciente", entradas: Math.floor(Math.random() * 100), saidas: Math.floor(Math.random() * 100) },
      { tipo: "Médico", entradas: Math.floor(Math.random() * 50), saidas: Math.floor(Math.random() * 50) },
      { tipo: "Enfermeiro", entradas: Math.floor(Math.random() * 80), saidas: Math.floor(Math.random() * 80) },
      { tipo: "Visitante", entradas: Math.floor(Math.random() * 200), saidas: Math.floor(Math.random() * 200) },
    ]
    setRelatorios(novoRelatorio)
  }

  const dadosGrafico = {
    labels: relatorios.map((r) => r.tipo),
    datasets: [
      {
        label: "Entradas",
        data: relatorios.map((r) => r.entradas),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
      {
        label: "Saídas",
        data: relatorios.map((r) => r.saidas),
        backgroundColor: "rgba(239, 68, 68, 0.6)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Entradas e Saídas por Tipo de Usuário",
      },
    },
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
        {relatorios.length > 0 && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-md lg:col-span-1">
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
                disabled={!dataInicio || !dataFim}
              >
                Gerar Relatório
              </Button>
            </div>
          </CardContent>
        </Card>

        {relatorios.length > 0 && (
          <>
            <Card className="shadow-md lg:col-span-2">
              <CardHeader className="bg-blue-50 border-b pb-3">
                <CardTitle className="text-lg flex items-center text-blue-700">
                  <BarChart2 className="mr-2 h-5 w-5" />
                  Gráfico de Entradas e Saídas
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80">
                  <Bar data={dadosGrafico} options={options} />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md lg:col-span-3">
              <CardHeader className="bg-blue-50 border-b pb-3">
                <CardTitle className="text-lg flex items-center text-blue-700">
                  <FileText className="mr-2 h-5 w-5" />
                  Dados do Relatório
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-medium">Tipo de Usuário</TableHead>
                        <TableHead className="font-medium text-center">Entradas</TableHead>
                        <TableHead className="font-medium text-center">Saídas</TableHead>
                        <TableHead className="font-medium text-center">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {relatorios.map((relatorio, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{relatorio.tipo}</TableCell>
                          <TableCell className="text-center">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {relatorio.entradas}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full">{relatorio.saidas}</span>
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {relatorio.entradas + relatorio.saidas}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-gray-50 font-medium">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-center">
                          {relatorios.reduce((sum, item) => sum + item.entradas, 0)}
                        </TableCell>
                        <TableCell className="text-center">
                          {relatorios.reduce((sum, item) => sum + item.saidas, 0)}
                        </TableCell>
                        <TableCell className="text-center">
                          {relatorios.reduce((sum, item) => sum + item.entradas + item.saidas, 0)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  )
}

