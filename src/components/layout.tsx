"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  UserPlus,
  Clock,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const menuItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/pacientes", icon: Users, label: "Pacientes" },
  { href: "/funcionarios", icon: UserPlus, label: "Funcionários" },
  { href: "/visitantes", icon: Clock, label: "Visitantes" },
  { href: "/relatorios", icon: FileText, label: "Relatórios" },
  { href: "/configuracoes", icon: Settings, label: "Configurações" },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Fechar o menu móvel quando a rota muda
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [])

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
                  3
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
        {/* Sidebar para desktop */}
        <aside className="hidden md:block w-64 bg-white shadow-md p-4">
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Menu móvel */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 md:hidden fixed top-4 left-4 z-50"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-white">
            <Button
              variant="ghost"
              className="absolute right-4 top-4 text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-blue-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
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
                HospitalAccess
              </h2>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
