"use client"
import { useEffect } from "react"

export default function CameraPage() {
  useEffect(() => {
    // Abrir a URL da câmera em uma nova aba assim que a página for carregada
    window.open("http://192.168.43.80", "_blank") // Substitua pelo IP correto

    
  }, []) 
  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Acessando a câmera...</h2>
    </div>
  )
}
