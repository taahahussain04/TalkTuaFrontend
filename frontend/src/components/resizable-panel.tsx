"use client"

import type React from "react"
import { useState } from "react"
import { Resizable } from "react-resizable"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import "react-resizable/css/styles.css"

interface ResizablePanelProps {
  children: React.ReactNode
  minWidth?: number
  maxWidth?: number
}

export function ResizablePanel({ children, minWidth = 300, maxWidth = 600 }: ResizablePanelProps) {
  const [width, setWidth] = useState(400)
  const [isMinimized, setIsMinimized] = useState(false)

  const onResize = (event: React.SyntheticEvent, { size }: { size: { width: number; height: number } }) => {
    setWidth(size.width)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <Collapsible open={!isMinimized} onOpenChange={toggleMinimize} className="h-full flex">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-full rounded-none">
          {isMinimized ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
      <CollapsibleContent className="h-full" forceMount>
        <Resizable
          width={width}
          height={Number.POSITIVE_INFINITY}
          minConstraints={[minWidth, Number.POSITIVE_INFINITY]}
          maxConstraints={[maxWidth, Number.POSITIVE_INFINITY]}
          onResize={onResize}
          resizeHandles={["w"]}
          handle={<div className="w-2 h-full cursor-ew-resize bg-border hover:bg-primary" />}
        >
          <div style={{ width: `${width}px` }} className="h-full overflow-auto transition-all duration-300">
            {children}
          </div>
        </Resizable>
      </CollapsibleContent>
    </Collapsible>
  )
}

