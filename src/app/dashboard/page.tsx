"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)
type ChartData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    tension: number
  }[]
}

type RoomAccess = {
  room: string
  status: string
  lastAccess: string
}
export default function Dashboard() {

  const [roomAccess, setRoomAccess] = useState<RoomAccess[]>([])
  const [accessData, setAccessData] = useState<ChartData>({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    // Simular dados do ESP32
    const simulateESPData = () => {
      const rooms = ["101", "102", "103", "104", "105"]
      const newAccess = rooms.map((room) => ({
        room,
        status: Math.random() > 0.7 ? "Ocupado" : "Livre",
        lastAccess: new Date().toLocaleTimeString(),
      }))
      setRoomAccess(newAccess)

      // Atualizar dados para o gráfico
      setAccessData((prev) => ({
        labels: [...prev.labels, new Date().toLocaleTimeString()].slice(-10),
        datasets: [
          {
            label: "Acessos por minuto",
            data: [...prev.datasets[0].data, Math.floor(Math.random() * 10)].slice(-10),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }))
    }

    simulateESPData()
    const interval = setInterval(simulateESPData, 5000)
    return () => clearInterval(interval)
  }, [])

  const accessCountData = {
    labels: ["Pacientes", "Médicos", "Enfermeiros", "Visitantes"],
    datasets: [
      {
        label: "Acessos hoje",
        data: [65, 59, 80, 81],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Acessos por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={accessCountData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acessos por Minuto</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={accessData} />
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Status dos Quartos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {roomAccess.map((room) => (
          <Card key={room.room}>
            <CardHeader>
              <CardTitle>Quarto {room.room}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={room.status === "Ocupado" ? "text-red-500" : "text-green-500"}>{room.status}</p>
              <p className="text-sm text-gray-500">Último acesso: {room.lastAccess}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

