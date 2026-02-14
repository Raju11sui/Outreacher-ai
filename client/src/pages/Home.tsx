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
            <div className="mt-16 relative flex justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-full max-w-md glass p-6 rounded-2xl border border-white/10 shadow-2xl relative bg-black/40 backdrop-blur-xl">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 -z-10" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-[2px]">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full rounded-full bg-black" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-white">You</p>
                      <p className="text-xs text-foreground/50">Just now</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-1 h-1 rounded-full bg-foreground/30" />
                    <span className="w-1 h-1 rounded-full bg-foreground/30" />
                    <span className="w-1 h-1 rounded-full bg-foreground/30" />
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    <span className="font-semibold text-white">Hey John</span>, I came across your profile and was impressed!
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    I noticed that you help <span className="bg-blue-500/20 text-blue-200 px-1 rounded">DTC brands</span> boost their sales, driving conversions.
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    I specialize in supercharging Instagram visibility for brands like yours and can rapidly grow highly-targeted followers.
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Up for a brief call to explore how i can help you achieve similar impact?
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-foreground/40">
                  <span>AI-Generated • High Conversion Score</span>
                  <Zap className="w-4 h-4 text-blue-400 fill-current" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-center gap-8 items-center flex-wrap opacity-50 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm uppercase tracking-widest">Trusted by 120+ Agencies</p>
            {/* Simple text logos for now as placeholders for the brand logos in image */}
            <span className="font-bold text-xl">HubSpot</span>
            <span className="font-bold text-xl">upwork</span>
            <span className="font-bold text-xl italic">webflow</span>
          </div>

        </div>
      </section>

      {/* See It In Action Section */}
      <section className="relative z-10 py-10 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">See It In Action</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "Deep Personalization", desc: "AI analyzes bio context, tone, and positioning." },
              { icon: Zap, title: "Psychological Hooks", desc: "Built-in persuasion patterns that increase reply rates." },
              { icon: MessageSquare, title: "Follow-up Engine", desc: "Auto-generate optimized follow-up sequences." },
            ].map((item, i) => (
              <div key={i} className="glass p-8 border border-white/10 hover:border-blue-500/50 transition-all group">
                <item.icon className="w-10 h-10 mx-auto mb-4 text-foreground/80 group-hover:text-blue-400 transition-colors" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Converts Better Section */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Why It Converts Better</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="text-5xl md:text-6xl font-bold text-blue-500 mb-2">3.2x</div>
              <p className="text-lg text-foreground/80">Higher Reply Rate</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-5xl md:text-6xl font-bold text-blue-500 mb-2">48%</div>
              <p className="text-lg text-foreground/80">Avg Open Rate</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-5xl md:text-6xl font-bold text-blue-500 mb-2">2.4x</div>
              <p className="text-lg text-foreground/80">More Booked Calls</p>
            </div>
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
                className={`rounded-lg transition-all duration-300 ${plan.highlighted
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
                  className={`w-full mb-6 ${plan.highlighted
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
