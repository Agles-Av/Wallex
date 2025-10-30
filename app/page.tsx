import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { ChartsDashboard } from "@/components/charts-dashboard"
import { ArrowRight, Map } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="font-bold text-xl text-foreground">WALLEX</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </Link>
            <Link href="/states" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
            Stellar x La Cartera de México
            <span className="block text-primary mt-2">WALLEX</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Transparencia comunitaria y donaciones descentralizadas
          </p>

          {/* Main CTA Card */}
          <Card className="max-w-md mx-auto mt-12 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Map className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Wallex de Estados</CardTitle>
              <CardDescription className="text-base">Ver mapa de contribuciones por estado</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/states">
                <Button className="w-full" size="lg">
                  Explorar Estados
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics Dashboard */}
      <section className="container mx-auto px-4 py-16">
        <ChartsDashboard />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Powered by Stellar Testnet • Wallex x Stellar 2025</p>
        </div>
      </footer>
    </div>
  )
}
