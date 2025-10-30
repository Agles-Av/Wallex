import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Heart } from "lucide-react"

interface StateCardProps {
  state: {
    id: string
    name: string
    transactions: number
    causes: number
    image: string
  }
}

export function StateCard({ state }: StateCardProps) {
  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
      <div className="relative h-48 overflow-hidden">
        <img
          src={state.image || "/placeholder.svg"}
          alt={state.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>
      <CardContent className="pt-4">
        <h3 className="text-xl font-bold mb-3">{state.name}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>{state.transactions} transacciones</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-secondary" />
            <span>{state.causes} causas</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/states/${state.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors bg-transparent"
          >
            Ver más detalles
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
