"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DonateModal } from "@/components/donate-modal"
import { Heart, Users } from "lucide-react"

interface CauseCardProps {
  cause: {
    id: string
    title: string
    description: string
    image: string
    votes: number
    amountRequired: number
    amountRaised: number
  }
}

export function CauseCard({ cause }: CauseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const progress = (cause.amountRaised / cause.amountRequired) * 100

  return (
    <>
      <Card className="overflow-hidden bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all">
        <div className="relative h-48 overflow-hidden">
          <img src={cause.image || "/placeholder.svg"} alt={cause.title} className="w-full h-full object-cover" />
        </div>
        <CardContent className="pt-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2 text-balance">{cause.title}</h3>
            <p className="text-sm text-muted-foreground text-pretty">{cause.description}</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{cause.votes} votos</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-medium">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{cause.amountRaised.toLocaleString()} XLM</span>
              <span className="text-muted-foreground">de {cause.amountRequired.toLocaleString()} XLM</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsModalOpen(true)} className="w-full gap-2">
            <Heart className="w-4 h-4" />
            Donar
          </Button>
        </CardFooter>
      </Card>

      <DonateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} cause={cause} />
    </>
  )
}
