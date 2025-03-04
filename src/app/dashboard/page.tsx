"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Home,
  Users,
  UserPlus,
  Clock,
  FileText,
  Settings,
  Search,
  ChevronDown,
  LogOut,
  User,
  Bell,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

export default function DashboardV5() {
  const [roomAccess, setRoomAccess] = useState([])
  const [accessLogs, setAccessLogs] = useState([])
  const [alerts, setAlerts] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    // Simular dados do ESP32
    const simulateESPData = () => {
      const rooms = ["101", "102", "103", "104", "105"]
      const newAccess = rooms.map((room) => ({
        room,
        status: Math.random() > 0.7 ? "Ocupado" : "Livre",
        lastAccess: new Date().toLocaleTimeString(),
        user: Math.random() > 0.5 ? "Dr. Roberto" : "Enfermeira Ana",
      }))
      setRoomAccess(newAccess)

      // Simular logs de acesso
      const newLog = {
        id: Date.now(),
        name: `Pessoa ${Math.floor(Math.random() * 100)}`,
        type: ["Paciente", "Médico", "Enfermeiro", "Visitante"][Math.floor(Math.random() * 4)],
        action: ["Entrada", "Saída"][Math.floor(Math.random() * 2)],
        location: `Área ${Math.floor(Math.random() * 10)}`,
        timestamp: new Date().toLocaleString(),
      }
      setAccessLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 9)])

      // Simular alertas
      if (Math.random() < 0.1) {
        setAlerts((prevAlerts) => [
          {
            id: Date.now(),
            message: `Tentativa de acesso não autorizado em ${newLog.location}`,
            timestamp: new Date().toLocaleString(),
          },
          ...prevAlerts.slice(0, 4),
        ])
      }
    }

    simulateESPData()
    const interval = setInterval(simulateESPData, 5000)
    return () => clearInterval(interval)
  }, [])

  // Dados simulados para funcionários
  const employees = [
    {
      id: 1,
      name: "Dr. Roberto Silva",
      email: "roberto.silva@hospital.med",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Médico Cardiologista",
      rooms: "101, 102, 103, 205",
      accessLevel: "Completo",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Enf. Ana Oliveira",
      email: "ana.oliveira@hospital.med",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      role: "Enfermeira Chefe",
      rooms: "201, 202, 203, 204",
      accessLevel: "Parcial",
      status: "Ativo",
    },
    {
      id: 3,
      name: "José Santos",
      email: "jose.santos@hospital.med",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
      role: "Segurança",
      rooms: "Áreas comuns",
      accessLevel: "Básico",
      status: "Inativo",
    },
  ]

  return (
    <div className="w-full bg-gray-100 min-h-screen font-sans">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <Link className="flex items-center space-x-2" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <h1 className="text-2xl font-bold">HospitalAccess</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                className="cursor-pointer"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {alerts.length > 0 ? alerts.length : 3}
                </span>
              </div>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-2">
                  <div className="p-2 border-b hover:bg-gray-50 transition-colors rounded-t-md">
                    <p className="font-semibold">Acesso negado - Sala 302</p>
                    <p className="text-sm text-gray-600">Há 5 minutos</p>
                  </div>
                  <div className="p-2 border-b hover:bg-gray-50 transition-colors">
                    <p className="font-semibold">Manutenção programada</p>
                    <p className="text-sm text-gray-600">Hoje, 15:00</p>
                  </div>
                  <div className="p-2 hover:bg-gray-50 transition-colors rounded-b-md">
                    <p className="font-semibold">Novo usuário registrado</p>
                    <p className="text-sm text-gray-600">Ontem, 14:25</p>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="User"
                  className="h-8 w-8 rounded-full border-2 border-white"
                />
                <span className="font-medium">Dra. Carla Silva</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    href="#profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-t-md transition-colors"
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Perfil
                  </Link>
                  <Link
                    href="/configuracoes"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition-colors"
                  >
                    <Settings className="w-4 h-4 inline mr-2" />
                    Configurações
                  </Link>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-b-md transition-colors"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Sair
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-72px)]">
        <aside className="w-64 bg-white shadow-md p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg transition-colors hover:bg-blue-200"
                >
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pacientes"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg transition-colors hover:bg-gray-100"
                >
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Pacientes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/funcionarios"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg transition-colors hover:bg-gray-100"
                >
                  <UserPlus className="h-5 w-5" />
                  <span className="font-medium">Funcionários</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/visitantes"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg transition-colors hover:bg-gray-100"
                >
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Visitantes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/relatorios"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg transition-colors hover:bg-gray-100"
                >
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Relatórios</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/configuracoes"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg transition-colors hover:bg-gray-100"
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Configurações</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 transition-all hover:shadow"
              />
              <Search className="h-5 w-5 absolute left-3 top-2.5 text-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total de Salas</p>
                  <h3 className="text-2xl font-bold">48</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Home className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUp className="h-4 w-4" />
                  +3
                </span>
                <span className="ml-2 text-gray-500">desde o último mês</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Acessos Hoje</p>
                  <h3 className="text-2xl font-bold">215</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <UserPlus className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUp className="h-4 w-4" />
                  +12%
                </span>
                <span className="ml-2 text-gray-500">desde ontem</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Usuários Ativos</p>
                  <h3 className="text-2xl font-bold">189</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Users className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-500 flex items-center">
                  <ArrowDown className="h-4 w-4" />
                  -3
                </span>
                <span className="ml-2 text-gray-500">
                  desde a semana passada
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Acessos Negados</p>
                  <h3 className="text-2xl font-bold">17</h3>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <Bell className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowDown className="h-4 w-4" />
                  -5%
                </span>
                <span className="ml-2 text-gray-500">desde ontem</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Atividade Recente</h3>
                <select className="rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Hoje</option>
                  <option>Esta semana</option>
                  <option>Este mês</option>
                </select>
              </div>
              <div className="space-y-4">
                {accessLogs.slice(0, 4).map((log, index) => (
                  <div
                    key={log.id || index}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        log.action === "Entrada"
                          ? "bg-green-100"
                          : "bg-blue-100"
                      } mr-4`}
                    >
                      {log.action === "Entrada" ? (
                        <UserPlus className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {log.name} - {log.action} em {log.location}
                      </p>
                      <p className="text-sm text-gray-500">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/relatorios"
                className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
              >
                Ver todos os registros
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Status das Salas</h3>
                <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors flex items-center">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Atualizar
                </button>
              </div>

              <div className="space-y-4">
                {roomAccess.slice(0, 4).map((room, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-lg ${
                          room.status === "Ocupado"
                            ? "bg-green-100"
                            : "bg-gray-100"
                        } flex justify-center items-center mr-4`}
                      >
                        <Home
                          className={`h-5 w-5 ${
                            room.status === "Ocupado"
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Quarto {room.room}</h4>
                        <p className="text-sm text-gray-500">
                          {room.status === "Ocupado"
                            ? `${room.status} - ${room.user}`
                            : "Disponível"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        room.status === "Ocupado"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">
                Gerenciar Permissões de Acesso
              </h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Nova Permissão
              </button>
            </div>

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nível de Acesso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={employee.image || "/placeholder.svg"}
                            alt=""
                          />
                          <div className="ml-4">
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-gray-500">
                              {employee.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{employee.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{employee.rooms}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            employee.accessLevel === "Completo"
                              ? "bg-green-100 text-green-800"
                              : employee.accessLevel === "Parcial"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {employee.accessLevel}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            employee.status === "Ativo"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {employee.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </button>
                          <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-700">
                Mostrando 1-3 de 25 resultados
              </div>
              <div className="flex">
                <button className="px-3 py-1 rounded-md bg-gray-100 mr-2 hover:bg-gray-200 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button className="px-3 py-1 rounded-md bg-blue-600 text-white mr-2 hover:bg-blue-700 transition-colors">
                  1
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-100 mr-2 hover:bg-gray-200 transition-colors">
                  2
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-100 mr-2 hover:bg-gray-200 transition-colors">
                  3
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

