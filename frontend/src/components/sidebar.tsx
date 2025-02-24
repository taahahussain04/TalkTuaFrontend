"use client"

import { useState } from "react"
import { Home, Calendar, Settings, MessageSquare, Menu, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter, usePathname } from "next/navigation";

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const router = useRouter();
  const pathname = usePathname();

  const SidebarContent = () => (
    <>
      <h1 className="text-2xl font-bold mb-6 text-primary">DocAI</h1>
      <nav className="space-y-2">
        <Button 
          variant="ghost"
          className={`w-full justify-start hover:bg-gray-200 hover:text-gray-900 ${pathname === '/' ? 'bg-gray-200 text-gray-900' : ''}`}
          onClick={() => router.push('/')}
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        {/* <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/upload')}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Medical Records
        </Button> */}
        <Button 
          variant="ghost"
          className={`w-full justify-start hover:bg-gray-200 hover:text-gray-900 ${pathname === '/appointments' ? 'bg-gray-200 text-gray-900' : ''}`}
          onClick={() => router.push('/appointments')}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Appointments
        </Button>
        <Button 
          variant="ghost"
          className={`w-full justify-start hover:bg-gray-200 hover:text-gray-900 ${pathname === '/settings' ? 'bg-gray-200 text-gray-900' : ''}`}
          onClick={() => router.push('/settings')}
        >
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

