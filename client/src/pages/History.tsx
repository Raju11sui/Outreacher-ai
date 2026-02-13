import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Eye } from "lucide-react";

const mockHistory = [
  {
    id: 1,
    prospectName: "Sarah Johnson",
    service: "Social Media Management",
    goal: "book_call",
    tone: "friendly",
    date: "Feb 13, 2026",
    messages: 4,
  },
  {
    id: 2,
    prospectName: "Mike Chen",
    service: "E-commerce Optimization",
    goal: "close_sale",
    tone: "authority",
    date: "Feb 12, 2026",
    messages: 4,
  },
  {
    id: 3,
    prospectName: "Emma Rodriguez",
    service: "Brand Strategy",
    goal: "partnership",
    tone: "premium",
    date: "Feb 11, 2026",
    messages: 4,
  },
];

export default function History() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Generation History</h1>
            <p className="text-foreground/60">View and manage all your past DM generations</p>
          </div>

          {mockHistory.length > 0 ? (
            <div className="space-y-4">
              {mockHistory.map((item) => (
                <Card key={item.id} className="glass p-6 border-white/10 hover:bg-white/8 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold">{item.prospectName}</h3>
                      </div>
                      <p className="text-foreground/70 text-sm mb-3">{item.service}</p>
                      <div className="flex items-center gap-4 text-xs text-foreground/60">
                        <span className="bg-white/5 px-3 py-1 rounded-full">
                          Goal: {item.goal.replace("_", " ").toUpperCase()}
                        </span>
                        <span className="bg-white/5 px-3 py-1 rounded-full">
                          Tone: {item.tone.charAt(0).toUpperCase() + item.tone.slice(1)}
                        </span>
                        <span>{item.messages} messages</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 hover:bg-white/10"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 hover:bg-red-500/10 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass p-12 border-white/10 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-semibold mb-2">No generations yet</h3>
              <p className="text-foreground/60 mb-6">Start by creating your first DM to see it here</p>
              <Button className="bg-blue-600 hover:bg-blue-700">Generate Your First DM</Button>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
