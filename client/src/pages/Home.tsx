import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, Zap, Target, MessageSquare, Brain, TrendingUp, Users } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/generate");
    } else {
      window.location.href = getLoginUrl();
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-purple-900/20 animate-gradient" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">OutreachIQ</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Pricing</a>
            {isAuthenticated ? (
              <Button onClick={() => navigate("/dashboard")} className="bg-blue-600 hover:bg-blue-700">
                Dashboard
              </Button>
            ) : (
              <Button onClick={() => window.location.href = getLoginUrl()} className="bg-blue-600 hover:bg-blue-700">
                Sign in
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Turn Cold DMs Into <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Booked Calls</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8">
              AI-powered personalized outreach built for agencies that care about conversion. Generate psychologically optimized messages that actually get replies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleGetStarted} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Generate My First DM <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/5 px-8">
                See Demo
              </Button>
            </div>

            {/* Floating cards preview */}
            <div className="mt-16 relative h-64 md:h-80">
              <div className="absolute left-0 top-0 glass p-4 rounded-lg w-48 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="text-xs text-foreground/60 mb-2">Hook Line</div>
                <p className="text-sm text-foreground">I noticed your focus on [specific detail]...</p>
              </div>
              <div className="absolute right-0 top-8 glass p-4 rounded-lg w-48 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="text-xs text-foreground/60 mb-2">Main Message</div>
                <p className="text-sm text-foreground">Here's how we help similar brands...</p>
              </div>
              <div className="absolute left-1/4 bottom-0 glass p-4 rounded-lg w-48 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <div className="text-xs text-foreground/60 mb-2">Reply Rate</div>
                <p className="text-sm font-semibold text-blue-400">↑ 47% Higher</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Most Cold DMs Fail</h2>
              <div className="space-y-4">
                <div className="glass p-6 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Generic copy-paste messages
                  </h3>
                  <p className="text-sm text-foreground/60">No personalization = instant delete</p>
                </div>
                <div className="glass p-6 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    No psychological strategy
                  </h3>
                  <p className="text-sm text-foreground/60">Missing pain points and authority angles</p>
                </div>
                <div className="glass p-6 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    No structured follow-ups
                  </h3>
                  <p className="text-sm text-foreground/60">One message then silence = missed opportunities</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">How OutreachIQ Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Paste Prospect Info", desc: "Instagram/LinkedIn profile link + bio" },
              { step: 2, title: "Describe Your Service", desc: "What you offer and your unique angle" },
              { step: 3, title: "Generate High-Converting DM", desc: "AI creates personalized, psychology-backed message" },
            ].map((item, idx) => (
              <div key={idx} className="glass p-8 rounded-lg hover:bg-white/15 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/40 transition-colors">
                  <span className="text-lg font-bold text-blue-400">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "AI Hook Generator", desc: "Attention-grabbing opening lines" },
              { icon: MessageSquare, title: "Personalized DM Engine", desc: "Context-aware, psychology-driven messages" },
              { icon: Target, title: "Follow-Up Sequences", desc: "Automated 2-day and 5-day follow-ups" },
              { icon: Brain, title: "Psychology Breakdown", desc: "See the strategy behind each message" },
              { icon: TrendingUp, title: "Reply Optimizer (Pro)", desc: "AI-powered response suggestions" },
              { icon: Users, title: "Agency Mode", desc: "Multi-user access and team management" },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="glass p-6 rounded-lg hover:bg-white/15 transition-all duration-300 group cursor-pointer">
                  <Icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground/60">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-20 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Simple, Transparent Pricing</h2>
          <p className="text-center text-foreground/60 mb-16">Start free. Upgrade when you're ready.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "₹499",
                period: "/month",
                desc: "Perfect for getting started",
                features: ["50 generations/month", "Basic personalization", "Email support"],
                cta: "Get Started",
              },
              {
                name: "Pro",
                price: "₹999",
                period: "/month",
                desc: "For growing agencies",
                features: ["300 generations/month", "Follow-up sequences", "Reply optimizer", "Priority support"],
                cta: "Get Started",
                highlighted: true,
              },
              {
                name: "Agency",
                price: "₹2499",
                period: "/month",
                desc: "For scale and teams",
                features: ["Unlimited generations", "Multi-user access", "Advanced analytics", "Dedicated support"],
                cta: "Get Started",
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-lg transition-all duration-300 ${
                  plan.highlighted
                    ? "glass-lg p-8 border-blue-500/50 scale-105"
                    : "glass p-8"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/60 text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-foreground/60">{plan.period}</span>
                </div>
                <Button
                  onClick={handleGetStarted}
                  className={`w-full mb-6 ${
                    plan.highlighted
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-white/10 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {plan.cta}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Outreach?</h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
            Get 3 free DM generations to see the difference. No credit card required.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            Generate My First DM <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-foreground/60 text-sm">
          <p>&copy; 2026 OutreachIQ. All rights reserved. Revenue-focused outreach, not generic AI.</p>
        </div>
      </footer>
    </div>
  );
}
