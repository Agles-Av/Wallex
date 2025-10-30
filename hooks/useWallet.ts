"use client"

import { useState, useCallback, useEffect } from "react"

export function useWallet() {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  // Inicializamos a 'null'. true/false solo se asignarán del lado del cliente.
  const [isFreighterInstalled, setIsFreighterInstalled] = useState<boolean | null>(null)

  // Función de verificación de la extensión
  const checkFreighter = useCallback(() => {
    // ⚠️ CRÍTICO: SOLO EJECUTAR ESTO SI ESTAMOS EN EL NAVEGADOR
    if (typeof window !== 'undefined' && window.freighterApi) {
      setIsFreighterInstalled(true)
    } else if (typeof window !== 'undefined') {
      // Si estamos en el navegador, pero la API no existe
      setIsFreighterInstalled(false)
    }
    // Si no estamos en el navegador, se mantiene 'null'
  }, [])

  // Verificación inicial al montar el componente (lado del cliente)
useEffect(() => {
  if (typeof window === 'undefined') return; // 🔥 seguridad total

  const verify = async () => {
    // Espera un poco más para que Freighter se inyecte
    await new Promise(r => setTimeout(r, 1000));

    if (window.freighterApi) {
      setIsFreighterInstalled(true);
      try {
        const key = await window.freighterApi.getPublicKey();
        if (key) setPublicKey(key);
      } catch (e) {
        console.log("Wallet detectada pero no conectada todavía.");
      }
    } else {
      setIsFreighterInstalled(false);
    }
  };

  verify();
}, []);



  // Función para conectar la Wallet
  const connectWallet = useCallback(async () => {
    console.log("Freighter API detectada:", !!window.freighterApi);

    if (!window.freighterApi) {
      // No usamos alert() por buenas prácticas, pero manteniendo tu lógica
      console.error("Freighter no instalado")
      return
    }

    try {
      setIsLoading(true)
      const userPublicKey = await window.freighterApi.getPublicKey() 
      setPublicKey(userPublicKey)
      
    } catch (error) {
      console.error("Error al conectar con Freighter:", error)
      // En un modal real, esto debe ser una notificación/toast, no un alert.
      alert("Error al conectar la wallet. ¿Permitiste la conexión en Freighter?")
      setPublicKey(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const isAuthenticated = !!publicKey

  return {
    publicKey,
    isAuthenticated,
    isLoading,
    isFreighterInstalled: isFreighterInstalled ?? false, // Garantiza un booleano para los componentes
    connectWallet,
    disconnectWallet: () => setPublicKey(null),
  }
}
