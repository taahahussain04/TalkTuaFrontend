"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useRouter } from "next/navigation"



export default function SettingsPage() {
  const [patientId, setPatientId] = useState(localStorage.getItem("patientId") || "")
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData") || "{}"))
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const fetchUserData = async () => {
    setLoading(true)
    try {
      const docRef = doc(db, "patients", patientId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        setUserData(data)
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

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (patientId) {
      localStorage.setItem("patientId", patientId)
      fetchUserData()
    }
  }

  const handleSignOut = () => {
    setPatientId("")
    localStorage.removeItem("patientId")
    localStorage.removeItem("userData")
    router.push("/")
  }

  return (
    <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full bg-secondary backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Patient Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(userData).length === 0 ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="Enter your patient ID"
                  className="border-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Name</h3>
                <p className="text-lg font-medium">{userData.firstName} {userData.lastName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Patient ID</h3>
                <p className="text-lg font-medium">{userData.patientId}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Phone Number</h3>
                <p className="text-lg font-medium">{userData.phoneNumber}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Date of Birth</h3>
                <p className="text-lg font-medium">{userData.dateOfBirth}</p>
              </div>
              <Button 
                onClick={handleSignOut} 
                variant="outline" 
                className="w-full hover:border-primary transition-colors"
              >
                Sign Out
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

