"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const transactionData = [
  { state: "CDMX", transactions: 245 },
  { state: "Jalisco", transactions: 189 },
  { state: "N. León", transactions: 167 },
  { state: "Puebla", transactions: 143 },
  { state: "Guanajuato", transactions: 128 },
]

const distributionData = [
  { name: "Educación", value: 35, color: "#8b5cf6" },
  { name: "Salud", value: 28, color: "#a78bfa" },
  { name: "Infraestructura", value: 22, color: "#c4b5fd" },
  { name: "Medio Ambiente", value: 15, color: "#ddd6fe" },
]

const stats = [
  { label: "Total Donaciones", value: "1,247", unit: "XLM" },
  { label: "Causas Activas", value: "156" },
  { label: "Usuarios Activos", value: "3,421" },
]

export function ChartsDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stat.value}
                {stat.unit && <span className="text-lg text-muted-foreground ml-2">{stat.unit}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="bg-card/50 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle>Transacciones por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionData}>
                <XAxis dataKey="state" stroke="#a1a1b8" fontSize={12} />
                <YAxis stroke="#a1a1b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a26",
                    border: "1px solid #2d2d42",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="transactions" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-card/50 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle>Distribución de Fondos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a26",
                    border: "1px solid #2d2d42",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
