"use client"

import { useState } from "react"
import { Home, Calendar, Settings, MessageSquare, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Sidebar() {
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <h1 className="text-2xl font-bold mb-6 text-primary">Patient Dashboard</h1>
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <MessageSquare className="mr-2 h-4 w-4" />
          Conversations
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Calendar className="mr-2 h-4 w-4" />
          Appointments
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
    </>
  )

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex w-64 bg-secondary h-full p-4 flex-col border-r border-border">
        <SidebarContent />
      </div>
    </>
  )
}

