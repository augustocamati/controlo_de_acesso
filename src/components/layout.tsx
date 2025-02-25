"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, UserPlus, Clock, FileText, Settings } from "lucide-react"

const menuItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/monitoring", icon: FileText, label: "Monitoramento" },
  { href: "/pacientes", icon: Users, label: "Pacientes" },
  { href: "/funcionarios", icon: UserPlus, label: "Funcionários" },
  { href: "/visitantes", icon: Clock, label: "Visitantes" },
  { href: "/relatorios", icon: FileText, label: "Relatórios" },
  { href: "/configuracoes", icon: Settings, label: "Configurações" },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-blue-600 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Controle de Acesso</h1>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 mt-2 text-gray-100 ${
                pathname === item.href ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

