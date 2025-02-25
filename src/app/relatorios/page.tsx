"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar } from "react-chartjs-2"

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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Saídas",
        data: relatorios.map((r) => r.saidas),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Relatórios</h1>

      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="dataInicio">Data de Início</Label>
            <Input id="dataInicio" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="dataFim">Data de Fim</Label>
            <Input id="dataFim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
          </div>
          <div className="flex items-end">
            <Button onClick={gerarRelatorio}>Gerar Relatório</Button>
          </div>
        </div>

        {relatorios.length > 0 && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Entradas</TableHead>
                  <TableHead>Saídas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relatorios.map((relatorio, index) => (
                  <TableRow key={index}>
                    <TableCell>{relatorio.tipo}</TableCell>
                    <TableCell>{relatorio.entradas}</TableCell>
                    <TableCell>{relatorio.saidas}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Gráfico de Entradas e Saídas</h2>
              <Bar data={dadosGrafico} />
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

