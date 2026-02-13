import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹499",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "3 generations/month",
      "Basic analytics",
      "Email support",
      "Standard templates",
    ],
    current: true,
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    description: "For growing teams",
    features: [
      "300 generations/month",
      "Advanced analytics",
      "Priority support",
      "Custom templates",
      "API access",
    ],
    current: false,
  },
  {
    name: "Agency",
    price: "₹2,499",
    period: "/month",
    description: "For agencies & enterprises",
    features: [
      "Unlimited generations",
      "White-label option",
      "Dedicated account manager",
      "Custom integrations",
      "Team collaboration",
    ],
    current: false,
  },
];

export default function Billing() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Billing & Plans</h1>
            <p className="text-foreground/60">Manage your subscription and upgrade anytime</p>
          </div>

          {/* Current Plan */}
          <Card className="glass p-8 border-white/10 mb-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Current Plan</p>
                <h2 className="text-2xl font-bold">Starter Plan</h2>
                <p className="text-foreground/60 mt-2">3 generations remaining this month</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Upgrade Plan</Button>
            </div>
          </Card>

          {/* Pricing Plans */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">All Plans</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`glass p-8 border-white/10 transition-all duration-300 ${
                    plan.current ? "ring-2 ring-blue-500 bg-white/5" : "hover:bg-white/5"
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-foreground/60 text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-4xl font-bold">
                      {plan.price}
                      <span className="text-lg text-foreground/60">{plan.period}</span>
                    </p>
                  </div>

                  <Button
                    className={`w-full mb-6 ${
                      plan.current
                        ? "bg-white/10 hover:bg-white/20 text-foreground"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {plan.current ? "Current Plan" : "Upgrade"}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Billing History */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Billing History</h3>
            <Card className="glass border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm">Feb 13, 2026</td>
                      <td className="px-6 py-4 text-sm">Starter Plan - Monthly</td>
                      <td className="px-6 py-4 text-sm">₹499</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm">Jan 13, 2026</td>
                      <td className="px-6 py-4 text-sm">Starter Plan - Monthly</td>
                      <td className="px-6 py-4 text-sm">₹499</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                          Paid
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
