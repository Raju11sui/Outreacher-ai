import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, MessageSquare, Target, Zap } from "lucide-react";

const messageData = [
  { month: "Jan", generated: 12, sent: 10 },
  { month: "Feb", generated: 28, sent: 24 },
  { month: "Mar", generated: 35, sent: 31 },
];

const replyData = [
  { name: "Replied", value: 45 },
  { name: "No Reply", value: 55 },
];

const COLORS = ["#3b82f6", "#1e293b"];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Analytics & Performance</h1>
            <p className="text-foreground/60">Track your outreach metrics and success rates</p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="glass p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Total Generated</p>
                  <p className="text-3xl font-bold">75</p>
                </div>
                <Zap className="w-10 h-10 text-blue-400 opacity-20" />
              </div>
            </Card>

            <Card className="glass p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Messages Sent</p>
                  <p className="text-3xl font-bold">65</p>
                </div>
                <MessageSquare className="w-10 h-10 text-blue-400 opacity-20" />
              </div>
            </Card>

            <Card className="glass p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Reply Rate</p>
                  <p className="text-3xl font-bold">45%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-400 opacity-20" />
              </div>
            </Card>

            <Card className="glass p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Calls Booked</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <Target className="w-10 h-10 text-purple-400 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card className="glass p-6 border-white/10">
              <h3 className="text-lg font-semibold mb-6">Messages Generated vs Sent</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={messageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(10, 15, 40, 0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="generated" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="sent" fill="#60a5fa" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="glass p-6 border-white/10">
              <h3 className="text-lg font-semibold mb-6">Reply Rate Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={replyData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                    {replyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(10, 15, 40, 0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Trends */}
          <Card className="glass p-6 border-white/10">
            <h3 className="text-lg font-semibold mb-6">Reply Rate Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={messageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10, 15, 40, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="generated" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
