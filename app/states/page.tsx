import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { StateCard } from "@/components/state-card"
import { Search, ArrowLeft } from "lucide-react"

// Mock data for Mexican states
const states = [
  { id: "cdmx", name: "Ciudad de México", transactions: 245, causes: 32, image: "/mexico-city-skyline.png" },
  { id: "jalisco", name: "Jalisco", transactions: 189, causes: 28, image: "/guadalajara-mexico.jpg" },
  { id: "nuevo-leon", name: "Nuevo León", transactions: 167, causes: 24, image: "/monterrey-mexico.jpg" },
  { id: "puebla", name: "Puebla", transactions: 143, causes: 21, image: "/puebla-mexico-cathedral.jpg" },
  { id: "guanajuato", name: "Guanajuato", transactions: 128, causes: 19, image: "/guanajuato-mexico-colorful.jpg" },
  { id: "veracruz", name: "Veracruz", transactions: 112, causes: 17, image: "/veracruz-mexico-port.jpg" },
  { id: "yucatan", name: "Yucatán", transactions: 98, causes: 15, image: "/merida-yucatan-mexico.jpg" },
  { id: "chiapas", name: "Chiapas", transactions: 87, causes: 14, image: "/chiapas-mexico-nature.jpg" },
  { id: "oaxaca", name: "Oaxaca", transactions: 76, causes: 12, image: "/oaxaca-mexico-culture.jpg" },
]

export default function StatesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="font-bold text-xl text-foreground">WALLEX</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </Link>
            <Link href="/states" className="text-sm text-foreground font-medium">
              Estados
            </Link>
            <Link href="/forum" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Foro
            </Link>
          </nav>
          <WalletConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Wallex de Estados</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Explora las contribuciones y causas por estado de la República Mexicana
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Buscar estado..." className="pl-10" />
          </div>
          <Button variant="outline">Ordenar por transacciones</Button>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {states.map((state) => (
            <StateCard key={state.id} state={state} />
          ))}
        </div>
      </div>
    </div>
  )
}
