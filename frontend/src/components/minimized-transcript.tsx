import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"

interface MinimizedTranscriptProps {
  onMaximize: () => void
}

export function MinimizedTranscript({ onMaximize }: MinimizedTranscriptProps) {
  return (
    <div className="fixed bottom-4 right-4">
      <Button variant="secondary" size="icon" className="rounded-full shadow-lg" onClick={onMaximize}>
        <Maximize2 className="h-5 w-5" />
      </Button>
    </div>
  )
}

