"use client"
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for charts
const barData = [
  { name: "Jan", health: 10, vehicle: 8, wealth: 45 },
  { name: "Feb", health: 15, vehicle: 10, wealth: 50 },
  { name: "Mar", health: 12, vehicle: 15, wealth: 48 },
  { name: "Apr", health: 18, vehicle: 12, wealth: 52 },
  { name: "May", health: 20, vehicle: 18, wealth: 55 },
  { name: "Jun", health: 25, vehicle: 20, wealth: 60 },
]

const lineData = [
  { name: "Jan", health: 40, vehicle: 24, wealth: 60 },
  { name: "Feb", health: 30, vehicle: 13, wealth: 70 },
  { name: "Mar", health: 20, vehicle: 98, wealth: 80 },
  { name: "Apr", health: 27, vehicle: 39, wealth: 90 },
  { name: "May", health: 18, vehicle: 48, wealth: 100 },
  { name: "Jun", health: 23, vehicle: 38, wealth: 110 },
]

const pieData = [
  { name: "Health", value: 30, color: "#fcd34d" },
  { name: "Vehicle", value: 40, color: "#a78bfa" },
  { name: "Wealth", value: 30, color: "#6ee7b7" },
]

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={barData}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#999" />
        <YAxis stroke="#999" />
        <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} itemStyle={{ color: "#fff" }} />
        <Legend />
        <Bar dataKey="health" fill="#fcd34d" />
        <Bar dataKey="vehicle" fill="#a78bfa" />
        <Bar dataKey="wealth" fill="#6ee7b7" />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function LineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={lineData}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#999" />
        <YAxis stroke="#999" />
        <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} itemStyle={{ color: "#fff" }} />
        <Legend />
        <Line type="monotone" dataKey="health" stroke="#fcd34d" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="vehicle" stroke="#a78bfa" />
        <Line type="monotone" dataKey="wealth" stroke="#6ee7b7" />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function PieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} itemStyle={{ color: "#fff" }} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
