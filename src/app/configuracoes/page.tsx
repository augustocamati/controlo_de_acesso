"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Configuracoes() {
  const [tempoMaximoVisita, setTempoMaximoVisita] = useState(60)
  const [alertasAtivados, setAlertasAtivados] = useState(true)
  const [intervaloAtualizacao, setIntervaloAtualizacao] = useState(5)

  const salvarConfiguracoes = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    console.log("Configurações salvas:", { tempoMaximoVisita, alertasAtivados, intervaloAtualizacao })
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Configurações</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <Label htmlFor="tempoMaximoVisita">Tempo Máximo de Visita (minutos)</Label>
          <Input
            id="tempoMaximoVisita"
            type="number"
            value={tempoMaximoVisita}
            onChange={(e) => setTempoMaximoVisita(Number(e.target.value))}
          />
        </div>

        <div className="mb-4 flex items-center">
          <Label htmlFor="alertasAtivados" className="mr-2">
            Alertas Ativados
          </Label>
          <Switch id="alertasAtivados" checked={alertasAtivados} onCheckedChange={setAlertasAtivados} />
        </div>

        <div className="mb-4">
          <Label htmlFor="intervaloAtualizacao">Intervalo de Atualização (segundos)</Label>
          <Input
            id="intervaloAtualizacao"
            type="number"
            value={intervaloAtualizacao}
            onChange={(e) => setIntervaloAtualizacao(Number(e.target.value))}
          />
        </div>

        <Button onClick={salvarConfiguracoes}>Salvar Configurações</Button>
      </div>
    </Layout>
  )
}

