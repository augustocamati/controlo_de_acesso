"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function VisitorRegistration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [visitors, setVisitors] = useState([])

  const onSubmit = (data) => {
    const entryTime = new Date().toLocaleString()
    setVisitors([...visitors, { ...data, entryTime, id: Date.now() }])
    reset()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Visitor Registration</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name", { required: true })} />
            {errors.name && <span className="text-red-500">This field is required</span>}
          </div>
          <div>
            <Label htmlFor="idNumber">ID Number</Label>
            <Input id="idNumber" {...register("idNumber", { required: true })} />
            {errors.idNumber && <span className="text-red-500">This field is required</span>}
          </div>
          <div>
            <Label htmlFor="visitPurpose">Visit Purpose</Label>
            <Input id="visitPurpose" {...register("visitPurpose", { required: true })} />
            {errors.visitPurpose && <span className="text-red-500">This field is required</span>}
          </div>
          <div>
            <Label htmlFor="visitingPatient">Visiting Patient</Label>
            <Input id="visitingPatient" {...register("visitingPatient", { required: true })} />
            {errors.visitingPatient && <span className="text-red-500">This field is required</span>}
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Register Visitor
        </Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ID Number</TableHead>
            <TableHead>Visit Purpose</TableHead>
            <TableHead>Visiting Patient</TableHead>
            <TableHead>Entry Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell>{visitor.name}</TableCell>
              <TableCell>{visitor.idNumber}</TableCell>
              <TableCell>{visitor.visitPurpose}</TableCell>
              <TableCell>{visitor.visitingPatient}</TableCell>
              <TableCell>{visitor.entryTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

