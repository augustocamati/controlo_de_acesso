"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PatientRegistration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [patients, setPatients] = useState([])

  const onSubmit = (data) => {
    setPatients([...patients, { ...data, id: Date.now() }])
    reset()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Patient Registration</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name", { required: true })} />
            {errors.name && <span className="text-red-500">This field is required</span>}
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" {...register("dob", { required: true })} />
            {errors.dob && <span className="text-red-500">This field is required</span>}
          </div>
          <div>
            <Label htmlFor="roomNumber">Room Number</Label>
            <Input id="roomNumber" {...register("roomNumber", { required: true })} />
            {errors.roomNumber && <span className="text-red-500">This field is required</span>}
          </div>
          <div>
            <Label htmlFor="admissionDate">Admission Date</Label>
            <Input id="admissionDate" type="date" {...register("admissionDate", { required: true })} />
            {errors.admissionDate && <span className="text-red-500">This field is required</span>}
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Register Patient
        </Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Room Number</TableHead>
            <TableHead>Admission Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.dob}</TableCell>
              <TableCell>{patient.roomNumber}</TableCell>
              <TableCell>{patient.admissionDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

