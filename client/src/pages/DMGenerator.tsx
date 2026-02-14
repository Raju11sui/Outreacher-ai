import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Copy, Check, Zap, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface DMOutput {
  hook: string;
  main: string;
  followUp1: string;
  followUp2: string;
  psychology: {
    painPoint: string;
    authority: string;
    curiosity: string;
    cta: string;
  };
}

export default function DMGenerator() {
  const [prospectName, setProspectName] = useState("");
  const [prospectBio, setProspectBio] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [outreachGoal, setOutreachGoal] = useState("book_call");
  const [tone, setTone] = useState("friendly");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [output, setOutput] = useState<DMOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prospectBio.trim() || !serviceDescription.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setOutput(null);

    const prompt = `
      Prospect Name: ${prospectName || "Name"}
      Prospect Info/Bio:
      ${prospectBio}

      My Service Description:
      ${serviceDescription}

      Outreach Goal: ${outreachGoal}
      Tone: ${tone}

      Generate a personalized DM sequence based on this information.
    `;

    try {
      console.log("Starting generation...");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Standard chat structure that backend expects
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage;

        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          errorMessage = errorData.error;
        } else {
          errorMessage = await response.text();
        }

        throw new Error(errorMessage || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Generation success:", data);
      setOutput(data);
      toast.success("DM generated successfully!");

    } catch (err: any) {
      console.error("Generation failed:", err);
      toast.error("Generation failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const fillExample = () => {
    setProspectName("Sarah Jenkins");
    setProspectBio("CEO at TechFlow | Helping SaaS startups scale to $10M ARR | Angel Investor | Marathon Runner 🏃‍♀️");
    setServiceDescription("We provide AI-powered customer support automation that reduces ticket resolution time by 80% while maintaining human-like quality.");
    setOutreachGoal("book_call");
    setTone("direct");
    toast.success("Example data loaded!");
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Generate High-Converting DMs
            </h1>
            <p className="text-foreground/60 text-lg">This AI Bot was made by Rahul Raj M</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Input Form */}
            <div className="space-y-6">
              <Card className="glass p-6 md:p-8 border-white/10 shadow-2xl backdrop-blur-xl bg-black/40">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
                    <Zap className="w-5 h-5" />
                    Prospect Information
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fillExample}
                    className="text-xs border-white/20 hover:bg-white/10"
                  >
                    Auto-Fill Example
                  </Button>
                </div>

                <div className="space-y-5">
                  <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    <Label className="text-sm font-medium mb-2 block">Prospect Name (Optional)</Label>
                    <Input
                      placeholder="e.g., John Smith"
                      value={prospectName}
                      onChange={(e) => setProspectName(e.target.value)}
                      className="glass-sm border-white/10 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    <Label className="text-sm font-medium mb-2 block">Prospect Bio / Profile *</Label>
                    <Textarea
                      placeholder="Paste their Instagram bio, LinkedIn headline, or any relevant info about them..."
                      value={prospectBio}
                      onChange={(e) => setProspectBio(e.target.value)}
                      className="glass-sm border-white/10 min-h-[120px] focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <Label className="text-sm font-medium mb-2 block">Your Service Description *</Label>
                    <Textarea
                      placeholder="What do you offer? What problems do you solve? Be specific..."
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      className="glass-sm border-white/10 min-h-[120px] focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Outreach Goal</Label>
                      <Select value={outreachGoal} onValueChange={setOutreachGoal}>
                        <SelectTrigger className="glass-sm border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-white/10">
                          <SelectItem value="book_call">Book a Call</SelectItem>
                          <SelectItem value="close_sale">Close Sale</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">Message Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger className="glass-sm border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-white/10">
                          <SelectItem value="direct">Direct & Professional</SelectItem>
                          <SelectItem value="friendly">Friendly & Casual</SelectItem>
                          <SelectItem value="authority">Authority & Expert</SelectItem>
                          <SelectItem value="premium">Premium & Exclusive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all mt-4 animate-pulse-slow"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Magic...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2 fill-current" />
                        Generate DMs
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              <div className="text-xs text-foreground/40 text-center space-y-2">
                <p>Powered by Google Gemini Pro</p>
                <a href="https://github.com/Raju11sui" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:underline">
                  GitHub: Raju11sui
                </a>
              </div>
            </div>

            {/* Output Display */}
            {output ? (
              <div className="space-y-6 animate-fade-in-up">
                <Card className="glass p-6 border-white/10 relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Generated DM Sequence</h2>
                      <p className="text-xs text-foreground/50">Ready to send</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        const fullText = `${output.hook}\n\n${output.main}\n\n-- Follow Up --\n${output.followUp1}`;
                        copyToClipboard(fullText, 99);
                      }} title="Copy Everything" className="border-white/20 hover:bg-white/10">
                        {copiedIndex === 99 ? <Check className="w-4 h-4 text-green-400 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        Copy All
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleGenerate} title="Regenerate">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Hook Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-blue-300 uppercase tracking-wider">The Hook</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(output.hook, 0)}
                        className="h-6 text-xs hover:bg-white/10 text-foreground/70 hover:text-white"
                      >
                        {copiedIndex === 0 ? <span className="text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> Copied</span> : <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy Hook</span>}
                      </Button>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 shadow-inner text-foreground/90">
                      "{output.hook}"
                    </div>
                  </div>

                  {/* Main Message Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-purple-300 uppercase tracking-wider">Main Message</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(output.main, 1)}
                        className="h-6 text-xs hover:bg-white/10 text-foreground/70 hover:text-white"
                      >
                        {copiedIndex === 1 ? <span className="text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> Copied</span> : <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy Body</span>}
                      </Button>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 shadow-inner text-foreground/90 whitespace-pre-wrap">
                      {output.main}
                    </div>
                  </div>

                  {/* Follow Ups Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-indigo-300 uppercase">Day 2 Follow-Up</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(output.followUp1, 2)}
                          className="h-6 w-6 text-foreground/50 hover:text-white"
                          title="Copy Follow Up"
                        >
                          {copiedIndex === 2 ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                      <p className="text-sm text-foreground/80">{output.followUp1}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-indigo-300 uppercase">Day 5 Break-up</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(output.followUp2, 3)}
                          className="h-6 w-6 text-foreground/50 hover:text-white"
                          title="Copy Break Up"
                        >
                          {copiedIndex === 3 ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                      <p className="text-sm text-foreground/80">{output.followUp2}</p>
                    </div>
                  </div>
                </Card>

                <Card className="glass p-6 border-white/10 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Psychology Breakdown
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-4">
                      <div>
                        <p className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1">Pain Point</p>
                        <p className="text-foreground/90 font-medium">{output.psychology.painPoint}</p>
                      </div>
                      <div>
                        <p className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1">Authority Angle</p>
                        <p className="text-foreground/90 font-medium">{output.psychology.authority}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1">Curiosity Trigger</p>
                        <p className="text-foreground/90 font-medium">{output.psychology.curiosity}</p>
                      </div>
                      <div>
                        <p className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1">Call to Action</p>
                        <p className="text-foreground/90 font-medium">{output.psychology.cta}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed border-white/10 rounded-2xl bg-white/5 animate-pulse-slow">
                {loading ? (
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto" />
                    <p className="text-xl font-medium text-blue-300">Analyzing prospect profile...</p>
                    <p className="text-sm text-foreground/50">Applying psychological triggers...</p>
                  </div>
                ) : (
                  <div className="text-center text-foreground/40 max-w-sm">
                    <Zap className="w-20 h-20 mx-auto mb-6 opacity-20" />
                    <h3 className="text-2xl font-bold mb-2">Ready to Generate</h3>
                    <p className="text-lg">Fill in the details on the left to create your personalized outreach campaign.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
