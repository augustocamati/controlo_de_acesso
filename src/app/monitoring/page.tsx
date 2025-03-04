"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RealTimeMonitoring() {
  const [accessLogs, setAccessLogs] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Simulating real-time data
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        name: `Person ${Math.floor(Math.random() * 100)}`,
        type: ["Patient", "Doctor", "Nurse", "Visitor"][Math.floor(Math.random() * 4)],
        action: ["Entry", "Exit"][Math.floor(Math.random() * 2)],
        location: `Area ${Math.floor(Math.random() * 10)}`,
        timestamp: new Date().toLocaleString(),
      }
      setAccessLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 9)])

      if (Math.random() < 0.1) {
        setAlerts((prevAlerts) => [
          {
            id: Date.now(),
            message: `Unauthorized access attempt at ${newLog.location}`,
            timestamp: new Date().toLocaleString(),
          },
          ...prevAlerts.slice(0, 4),
        ])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Real-time Monitoring</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Access Logs</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.name}</TableCell>
                  <TableCell>{log.type}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
          {alerts.map((alert) => (
            <Alert key={alert.id} variant="destructive" className="mb-4">
              <AlertTitle>Alert</AlertTitle>
              <AlertDescription>
                {alert.message} - {alert.timestamp}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  )
}

