"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Github, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-muted rounded-full mb-4">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">
              Generate your portfolio in seconds
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            OctoFolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your GitHub profile into a stunning developer portfolio.
            Showcase your repositories, contributions, and skills with a single
            click.
          </p>
        </div>

        <Card className="w-full max-w-md mx-auto border-muted-foreground/20 shadow-2xl backdrop-blur-sm bg-background/50">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Enter your GitHub username to generate your site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Github className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="github-username"
                  className="pl-10 h-12 text-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-lg font-medium group"
                disabled={!username}
              >
                Generate Portfolio
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12">
          {[
            {
              title: "Instant Setup",
              desc: "No coding required. Just enter your username.",
            },
            {
              title: "Always Updated",
              desc: "Fetches the latest data from your GitHub.",
            },
            {
              title: "Shareable",
              desc: "Get a unique link to share with recruiters.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-background/40 border border-border/50 backdrop-blur-sm"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
