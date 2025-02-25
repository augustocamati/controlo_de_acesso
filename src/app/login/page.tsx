"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [error, setError] = useState("")
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      // Here you would typically send the data to your API for authentication
      // For demonstration, we'll use mock data
      if (data.email === "admin@hospital.com" && data.password === "admin") {
        router.push("/dashboard")
      } else if (data.email === "security@hospital.com" && data.password === "security") {
        router.push("/monitoring")
      } else {
        setError("Invalid credentials")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email", { required: true })} />
            {errors.email && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password", { required: true })} />
            {errors.password && <span className="text-red-500">This field is required</span>}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </main>
    </div>
  )
}

