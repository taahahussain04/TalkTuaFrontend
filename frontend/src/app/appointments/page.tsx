"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, FileTextIcon } from "lucide-react"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toast } from "sonner"


interface Appointment {
  id: string
  date: string
  time: string
  reason: string
  notes: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patientId, setPatientId] = useState(localStorage.getItem("patientId") || "")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Function to load appointments from localStorage
    const loadAppointments = async () => {
      setLoading(true)
      try {
        const docRef = doc(db, "patients", patientId)
        const docSnap = await getDoc(docRef)
  
        if (docSnap.exists()) {
          const data = docSnap.data()
          setAppointments(data.appointments || [])
          localStorage.setItem("userData", JSON.stringify(data))
        } else {
          toast.error("No user data found for this patient ID.")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast.error("Failed to fetch user data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    // Load appointments initially
    loadAppointments()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-primary">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Appointments</h1>
      {appointments.length === 0 ? (
        <p className="text-white">No appointments found.</p>
      ) : (
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-hide">
          {appointments.map((appointment) => (
            <Card 
              key={`${appointment.id}-${appointment.date}-${appointment.time}`} 
              className="w-full hover:shadow-lg transition-shadow bg-secondary"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span>{appointment.reason}</span>
                  <span className="text-sm text-gray-300">
                    {new Date(appointment.date).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-white">
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ClockIcon className="mr-2 h-4 w-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <FileTextIcon className="mr-2 h-4 w-4 mt-1" />
                    <p className="flex-1">{appointment.notes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

