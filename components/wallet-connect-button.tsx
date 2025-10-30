"use client"

import { useWallet } from "@/hooks/useWallet" // Ajusta el path si es necesario
import { Button } from "@/components/ui/button"
import { Plug, LogOut, Download } from "lucide-react" // Importamos Download

export function WalletConnectButton() {
  const { 
    publicKey, 
    isAuthenticated, 
    isLoading, 
    isFreighterInstalled, 
    connectWallet, 
    disconnectWallet 
  } = useWallet()

  // 1. Mostrar estado de carga si aún no sabemos si está instalado
  if (isFreighterInstalled === null) {
      return (
        <Button disabled>
          Verificando Wallet...
        </Button>
      )
  }




  // 3. Muestra el botón de Conectar (solo si está instalado pero no autenticado)
  if (!isAuthenticated) {
    return (
      <Button 
        onClick={connectWallet} 
        disabled={isLoading}
        className="gap-2"
      >
        {isLoading ? "Conectando..." : "Conectar Wallet"}
        <Plug className="w-4 h-4" />
      </Button>
    )
  }

  // 4. Muestra la clave pública y el botón de Desconectar
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-mono p-2 bg-secondary rounded-lg">
        {publicKey!.substring(0, 4)}...{publicKey!.substring(publicKey!.length - 4)}
      </span>
      <Button 
        onClick={disconnectWallet} 
        variant="outline" 
        size="icon"
        title="Desconectar Wallet"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  )
}
