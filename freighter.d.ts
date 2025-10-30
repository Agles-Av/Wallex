    // freighter.d.ts (o la ubicación que uses)

    /**
     * Extiende la interfaz global Window para incluir la API de Freighter Wallet.
     */
    declare global {
    interface Window {
        // Es crucial que esta propiedad sea opcional, ya que puede ser 'undefined' antes de la inyección.
        freighterApi?: { 
        /**
         * Obtiene la clave pública del usuario.
         */
        getPublicKey: (params?: { network?: string }) => Promise<string>
        
        /**
         * Firma una transacción XDR con la clave privada del usuario.
         */
        signTransaction: (
            xdr: string, 
            params?: { network?: string; networkPassphrase?: string }
        ) => Promise<string>

        // Métodos adicionales si los necesitas
        isAllowed: () => Promise<boolean> 
        isConnected: () => Promise<boolean>
        }
    }
    }

    // Exportación vacía para asegurar que este archivo sea tratado como un módulo global.
    export {}
        