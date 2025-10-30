  // components/donate-modal.tsx
  "use client"

  import { useState } from "react"
  // ¡IMPORTACIÓN CORREGIDA! StellarSdk es el Default Export (contiene Server)
  // y los demás son Named Exports que tu versión sí exporta (Networks, etc.).
  import StellarSdk, { Networks, TransactionBuilder, Operation, Asset, BASE_FEE } from "stellar-sdk" 
  import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { CheckCircle2 } from "lucide-react"
  import { useWallet } from "@/hooks/useWallet"

  interface DonateModalProps {
    isOpen: boolean
    onClose: () => void
    cause: {
      title: string
      description: string
      destination: string
    }
  }

  export function DonateModal({ isOpen, onClose, cause }: DonateModalProps) {
    const { publicKey, isAuthenticated } = useWallet()
    const [amount, setAmount] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [txHash, setTxHash] = useState("")
    const [loading, setLoading] = useState(false)

    const handleDonate = async () => {
      // 1. Verificación de Conexión
      if (!isAuthenticated || !publicKey) {
          alert("Por favor, conecta tu Wallet de Freighter primero.")
          return
      }

      // 2. Verificación de Freighter API (solo para doble check)
      if (!window.freighterApi) {
          alert("Freighter no está instalado o habilitado.")
          return
      }

      try {
        setLoading(true)

        const senderPublicKey = publicKey

        // Configuración de la red
        const HORIZON_URL = "https://horizon-testnet.stellar.org"
        const NETWORK = Networks.TESTNET
        
        // La clase Server se accede a través del Default Export (StellarSdk)
        const server = new StellarSdk.Server(HORIZON_URL) 

        // Carga la cuenta emisora
        const sourceAccount = await server.loadAccount(senderPublicKey)

        // Usa las exportaciones nombradas (TransactionBuilder, BASE_FEE, Networks)
        const transaction = new TransactionBuilder(sourceAccount, {
          fee: BASE_FEE,
          networkPassphrase: NETWORK,
        })
          // Usa las exportaciones nombradas (Operation, Asset)
          .addOperation(
            Operation.payment({
              destination: cause.destination,
              asset: Asset.native(), // XLM
              amount: amount,
            })
          )
          .setTimeout(30)
          .build()

        // Firma la transacción con Freighter (usa window.freighterApi)
        const signedXDR = await window.freighterApi.signTransaction(transaction.toXDR(), {
          network: "TESTNET",
        })

        // Envía la transacción a la red (usa exportaciones nombradas)
        const signedTx = TransactionBuilder.fromXDR(signedXDR, NETWORK)
        const txResult = await server.submitTransaction(signedTx)

        setTxHash(txResult.hash)
        setIsSuccess(true)
      } catch (error) {
        console.error("❌ Error realizando donación:", error)
        alert("Ocurrió un error procesando la donación. Ver consola.")
      } finally {
        setLoading(false)

        setTimeout(() => {
          setIsSuccess(false)
          setAmount("")
          setTxHash("")
          onClose()
        }, 4000)
      }
    }

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          {!isSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Realizar Donación</DialogTitle>
                <DialogDescription className="text-base">{cause.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">{cause.description}</p>

                {!isAuthenticated && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded" role="alert">
                      <p className="font-bold">¡Necesitas conectarte!</p>
                      <p>Por favor, conecta tu wallet antes de donar.</p>
                    </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount">Monto (XLM)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    disabled={!isAuthenticated}
                  />
                </div>

                <Button
                  onClick={handleDonate}
                  className="w-full"
                  disabled={!amount || Number.parseFloat(amount) <= 0 || loading || !isAuthenticated} 
                >
                  {loading ? "Procesando..." : "Confirmar Donación"}
                </Button>
              </div>
            </>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">¡Donación Exitosa!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tu donación ha sido procesada correctamente
                </p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Hash de transacción:</p>
                  <a
                    href={`https://testnet.steexp.com/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono break-all text-primary hover:underline"
                  >
                    {txHash}
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  } 