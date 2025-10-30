import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { ForumCard } from "@/components/forum-card"
import { ArrowLeft } from "lucide-react"

// Mock data for forum incidents
const incidents = [
  {
    id: "1",
    title: "Apoyo a Familias Afectadas por Sequía",
    description: "Solicitud de apoyo para familias campesinas afectadas por la sequía prolongada en la región norte.",
    image: "/drought-affected-families.jpg",
    votes: 342,
    amountRequested: 40000,
    state: "Chihuahua",
  },
  {
    id: "2",
    title: "Rehabilitación de Parque Comunitario",
    description:
      "Proyecto para rehabilitar un parque comunitario abandonado y convertirlo en espacio recreativo seguro.",
    image: "/community-park-mexico.jpg",
    votes: 287,
    amountRequested: 25000,
    state: "Querétaro",
  },
  {
    id: "3",
    title: "Equipamiento para Bomberos Voluntarios",
    description: "Adquisición de equipo de protección y herramientas para el cuerpo de bomberos voluntarios local.",
    image: "/firefighters-equipment.jpg",
    votes: 256,
    amountRequested: 35000,
    state: "Morelos",
  },
  {
    id: "4",
    title: "Biblioteca Digital Comunitaria",
    description:
      "Creación de una biblioteca digital con computadoras y acceso a internet para estudiantes de zonas rurales.",
    image: "/digital-library-students.jpg",
    votes: 198,
    amountRequested: 20000,
    state: "Oaxaca",
  },
]

export default function ForumPage() {
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
            <Link href="/states" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Estados
            </Link>
            <Link href="/forum" className="text-sm text-foreground font-medium">
              Foro
            </Link>
          </nav>
          <WalletConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Foro de Incidencias</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Vota por las causas que consideres importantes para que sean aprobadas y reciban donaciones
          </p>
        </div>

        {/* Filter Options */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Button variant="outline">Ordenar por votos</Button>
          <Button variant="outline">Ordenar por monto</Button>
          <Button variant="outline">Filtrar por estado</Button>
        </div>

        {/* Incidents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {incidents.map((incident) => (
            <ForumCard key={incident.id} incident={incident} />
          ))}
        </div>
      </div>
    </div>
  )
}
