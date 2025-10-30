"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MapPin } from "lucide-react"

interface ForumCardProps {
  incident: {
    id: string
    title: string
    description: string
    image: string
    votes: number
    amountRequested: number
    state: string
  }
}

export function ForumCard({ incident }: ForumCardProps) {
  const [votes, setVotes] = useState(incident.votes)
  const [hasVoted, setHasVoted] = useState(false)

  const handleVote = () => {
    if (!hasVoted) {
      setVotes(votes + 1)
      setHasVoted(true)
    }
  }

  return (
    <Card className="overflow-hidden bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all">
      <div className="relative h-48 overflow-hidden">
        <img src={incident.image || "/placeholder.svg"} alt={incident.title} className="w-full h-full object-cover" />
        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur">
          <MapPin className="w-3 h-3 mr-1" />
          {incident.state}
        </Badge>
      </div>
      <CardContent className="pt-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 text-balance">{incident.title}</h3>
          <p className="text-sm text-muted-foreground text-pretty">{incident.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-primary" />
            <span className="font-medium">{votes} votos</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {incident.amountRequested.toLocaleString()} XLM solicitados
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleVote}
          variant={hasVoted ? "secondary" : "default"}
          className="w-full gap-2"
          disabled={hasVoted}
        >
          <ThumbsUp className="w-4 h-4" />
          {hasVoted ? "Votado" : "Votar por esta causa"}
        </Button>
      </CardFooter>
    </Card>
  )
}
