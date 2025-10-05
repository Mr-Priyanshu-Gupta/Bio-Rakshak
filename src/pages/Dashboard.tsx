import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ClipboardCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const statsData = [
  { title: 'Total Farms', value: '24', icon: Building2, trend: '+2 this month', color: 'text-primary' },
  { title: 'Active Checklists', value: '156', icon: ClipboardCheck, trend: '18 pending', color: 'text-accent' },
  { title: 'Alerts', value: '3', icon: AlertTriangle, trend: 'Requires attention', color: 'text-destructive' },
  { title: 'Compliance Rate', value: '94%', icon: CheckCircle2, trend: '+3% from last month', color: 'text-success' },
];

const capacityData = [
  { name: 'Farm A', capacity: 500, occupancy: 450 },
  { name: 'Farm B', capacity: 800, occupancy: 720 },
  { name: 'Farm C', capacity: 600, occupancy: 580 },
  { name: 'Farm D', capacity: 400, occupancy: 380 },
  { name: 'Farm E', capacity: 700, occupancy: 650 },
];

const complianceData = [
  { month: 'Jan', rate: 88 },
  { month: 'Feb', rate: 90 },
  { month: 'Mar', rate: 87 },
  { month: 'Apr', rate: 92 },
  { month: 'May', rate: 91 },
  { month: 'Jun', rate: 94 },
];

const speciesDistribution = [
  { name: 'Pigs', value: 14, color: 'hsl(var(--chart-1))' },
  { name: 'Poultry', value: 10, color: 'hsl(var(--chart-2))' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to your farm management portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Capacity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Farm Capacity vs Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={capacityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="capacity" fill="hsl(var(--primary))" name="Capacity" />
                <Bar dataKey="occupancy" fill="hsl(var(--accent))" name="Occupancy" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Trend (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Compliance %" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Species Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Farm Distribution by Species</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={speciesDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {speciesDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
