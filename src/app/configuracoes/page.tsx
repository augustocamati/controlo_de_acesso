"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Settings, Bell, Clock, Shield, Save, User, Building } from "lucide-react"

export default function Configuracoes() {
  const [tempoMaximoVisita, setTempoMaximoVisita] = useState(60)
  const [alertasAtivados, setAlertasAtivados] = useState(true)
  const [intervaloAtualizacao, setIntervaloAtualizacao] = useState(5)
  const [acessoEmergencia, setAcessoEmergencia] = useState(true)
  const [logAutomatico, setLogAutomatico] = useState(true)
  const [backupDiario, setBackupDiario] = useState(false)

  const salvarConfiguracoes = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    console.log("Configurações salvas:", {
      tempoMaximoVisita,
      alertasAtivados,
      intervaloAtualizacao,
      acessoEmergencia,
      logAutomatico,
      backupDiario,
    })
    toast.success("Configurações salvas com sucesso!")
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={salvarConfiguracoes}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="geral" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Usuários
          </TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader className="bg-blue-50 border-b pb-3">
                <CardTitle className="text-lg flex items-center text-blue-700">
                  <Clock className="mr-2 h-5 w-5" />
                  Configurações de Tempo
                </CardTitle>
                <CardDescription>Defina os parâmetros de tempo para o sistema</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tempoMaximoVisita" className="text-sm font-medium">
                    Tempo Máximo de Visita (minutos)
                  </Label>
                  <Input
                    id="tempoMaximoVisita"
                    type="number"
                    value={tempoMaximoVisita}
                    onChange={(e) => setTempoMaximoVisita(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">Tempo máximo que um visitante pode permanecer no hospital</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="intervaloAtualizacao" className="text-sm font-medium">
                    Intervalo de Atualização (segundos)
                  </Label>
                  <Input
                    id="intervaloAtualizacao"
                    type="number"
                    value={intervaloAtualizacao}
                    onChange={(e) => setIntervaloAtualizacao(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">Frequência com que os dados são atualizados no dashboard</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="bg-blue-50 border-b pb-3">
                <CardTitle className="text-lg flex items-center text-blue-700">
                  <Building className="mr-2 h-5 w-5" />
                  Configurações do Sistema
                </CardTitle>
                <CardDescription>Configurações gerais do sistema de controle de acesso</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="logAutomatico" className="text-sm font-medium">
                      Log Automático de Eventos
                    </Label>
                    <p className="text-xs text-gray-500">Registrar automaticamente todos os eventos de acesso</p>
                  </div>
                  <Switch id="logAutomatico" checked={logAutomatico} onCheckedChange={setLogAutomatico} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="backupDiario" className="text-sm font-medium">
                      Backup Diário
                    </Label>
                    <p className="text-xs text-gray-500">Realizar backup automático dos dados diariamente</p>
                  </div>
                  <Switch id="backupDiario" checked={backupDiario} onCheckedChange={setBackupDiario} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card className="shadow-md">
            <CardHeader className="bg-blue-50 border-b pb-3">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <Bell className="mr-2 h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
              <CardDescription>Gerencie como e quando você recebe notificações</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="alertasAtivados" className="text-sm font-medium">
                    Alertas de Acesso Não Autorizado
                  </Label>
                  <p className="text-xs text-gray-500">
                    Receber alertas quando houver tentativas de acesso não autorizado
                  </p>
                </div>
                <Switch id="alertasAtivados" checked={alertasAtivados} onCheckedChange={setAlertasAtivados} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="alertasEmail" className="text-sm font-medium">
                    Alertas por Email
                  </Label>
                  <p className="text-xs text-gray-500">Receber alertas importantes por email</p>
                </div>
                <Switch id="alertasEmail" checked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="alertasSMS" className="text-sm font-medium">
                    Alertas por SMS
                  </Label>
                  <p className="text-xs text-gray-500">Receber alertas críticos por SMS</p>
                </div>
                <Switch id="alertasSMS" checked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card className="shadow-md">
            <CardHeader className="bg-blue-50 border-b pb-3">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <Shield className="mr-2 h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
              <CardDescription>Configure as políticas de segurança do sistema</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="acessoEmergencia" className="text-sm font-medium">
                    Acesso de Emergência
                  </Label>
                  <p className="text-xs text-gray-500">Permitir acesso de emergência para equipes médicas</p>
                </div>
                <Switch id="acessoEmergencia" checked={acessoEmergencia} onCheckedChange={setAcessoEmergencia} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="politicaSenha" className="text-sm font-medium">
                  Política de Senha
                </Label>
                <Select defaultValue="forte">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a política de senha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simples">Simples (mínimo 6 caracteres)</SelectItem>
                    <SelectItem value="media">Média (letras e números, mínimo 8 caracteres)</SelectItem>
                    <SelectItem value="forte">Forte (letras, números e símbolos, mínimo 10 caracteres)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Define a complexidade mínima para senhas de usuários</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempoSessao" className="text-sm font-medium">
                  Tempo de Sessão (minutos)
                </Label>
                <Input id="tempoSessao" type="number" defaultValue={30} className="w-full" />
                <p className="text-xs text-gray-500">Tempo de inatividade até o logout automático</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios">
          <Card className="shadow-md">
            <CardHeader className="bg-blue-50 border-b pb-3">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <User className="mr-2 h-5 w-5" />
                Configurações de Usuários
              </CardTitle>
              <CardDescription>Gerencie as configurações relacionadas aos usuários do sistema</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="registroAutomatico" className="text-sm font-medium">
                    Registro Automático de Funcionários
                  </Label>
                  <p className="text-xs text-gray-500">Permitir que novos funcionários se registrem automaticamente</p>
                </div>
                <Switch id="registroAutomatico" checked={false} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="verificacaoDupla" className="text-sm font-medium">
                    Verificação em Duas Etapas
                  </Label>
                  <p className="text-xs text-gray-500">Exigir verificação em duas etapas para login</p>
                </div>
                <Switch id="verificacaoDupla" checked={true} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nivelPermissao" className="text-sm font-medium">
                  Nível de Permissão Padrão
                </Label>
                <Select defaultValue="basico">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível de permissão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basico">Básico (apenas visualização)</SelectItem>
                    <SelectItem value="intermediario">Intermediário (visualização e edição)</SelectItem>
                    <SelectItem value="avancado">Avançado (visualização, edição e exclusão)</SelectItem>
                    <SelectItem value="admin">Administrador (acesso completo)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Nível de permissão padrão para novos usuários</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ToastContainer position="bottom-right" />
    </Layout>
  )
}

