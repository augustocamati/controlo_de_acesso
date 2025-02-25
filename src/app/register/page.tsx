"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [userType, setUserType] = useState("")

  const onSubmit = (data) => {
    console.log(data)
    // Here you would typically send the data to your API
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
        <h1 className="text-4xl font-bold mb-8">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name", { required: true })} />
            {errors.name && <span className="text-red-500">This field is required</span>}
          </div>
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
          <div className="mb-4">
            <Label htmlFor="userType">User Type</Label>
            <Select onValueChange={(value) => setUserType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="visitor">Visitor</SelectItem>
                <SelectItem value="cleaning">Cleaning Staff</SelectItem>
                <SelectItem value="security">Security Personnel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </main>
    </div>
  )
}

