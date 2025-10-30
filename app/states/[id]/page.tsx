import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { CauseCard } from "@/components/cause-card"
import { ArrowLeft } from "lucide-react"

// Mock data for causes
const causes = [
  // ... (causes data remains the same)
  {
    id: "1",
    title: "Reconstrucción de Escuela Primaria",
    description: "Apoyo para reconstruir la infraestructura de una escuela primaria afectada por inundaciones.",
    image: "/school-reconstruction-mexico.jpg",
    votes: 234,
    amountRequired: 50000,
    amountRaised: 32000,
  },
  {
    id: "2",
    title: "Centro de Salud Comunitario",
    description: "Construcción de un centro de salud para comunidades rurales sin acceso a servicios médicos.",
    image: "/community-health-center.jpg",
    votes: 189,
    amountRequired: 75000,
    amountRaised: 45000,
  },
  {
    id: "3",
    title: "Programa de Becas Estudiantiles",
    description: "Becas para estudiantes de bajos recursos que desean continuar sus estudios universitarios.",
    image: "/students-studying-mexico.jpg",
    votes: 156,
    amountRequired: 30000,
    amountRaised: 28000,
  },
]

// **CHANGE THIS LINE to make the component async**
export default async function StateDetailPage({ params }: { params: { id: string } }) {
  
  // SOLUCIÓN: Usar encadenamiento opcional (?) y proporcionar un valor por defecto ('')
  // para evitar llamar a .split() en un valor undefined.
  const stateName = (params?.id || "") // Asegura que es una cadena o vacía
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "Estado Desconocido"

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/states">
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

      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={`/.jpg?height=400&width=1200&query=${stateName}+mexico+landscape`}
          alt={stateName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">{stateName}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Causas Activas</h2>
          <p className="text-muted-foreground">
            Estas causas han sido aprobadas por la comunidad y están recibiendo donaciones
          </p>
        </div>

        {/* Causes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {causes.map((cause) => (
            <CauseCard key={cause.id} cause={cause} />
          ))}
        </div>
      </div>
    </div>
  )
}