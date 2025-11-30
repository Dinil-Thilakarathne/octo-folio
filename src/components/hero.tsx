"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import FadeInComp from "./fade-in";

export default function Hero() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username}`);
    }
  };
  return (
    <section>
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <FadeInComp
            className="overflow-visible"
            animationProps={{ filter: "blur(8px)" }}
          >
            <div className="inline-flex items-center justify-center px-4 py-2 bg-muted rounded-full mb-4">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium">
                Generate your portfolio in seconds
              </span>
            </div>
          </FadeInComp>
          <FadeInComp
            className="overflow-visible"
            animationProps={{ filter: "blur(8px)", yPercent: 50, delay: 0.2 }}
          >
            <h1 className="text-6xl font-bold lg:text-9xl font-helvetica-neue">
              OctoFolio
            </h1>
          </FadeInComp>
          <FadeInComp
            className="overflow-visible"
            animationProps={{ filter: "blur(8px)", yPercent: 50, delay: 0.4 }}
          >
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Turn your GitHub profile into a stunning developer portfolio.
              Showcase your repositories, contributions, and skills with a
              single click.
            </p>
          </FadeInComp>
        </div>

        <div className="w-full mx-auto ">
          <div className="flex w-full items-center justify-center">
            <FadeInComp
              className="overflow-visible"
              animationProps={{ filter: "blur(8px)", yPercent: 50, delay: 0.6 }}
            >
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 justify-center flex-col md:flex-row"
              >
                <Input
                  type="text"
                  name="github-username"
                  placeholder="@username"
                  className=" min-h-12 text-lg rounded-full placeholder:text-lg py-4 min-w-[24ch] md:min-w-[40ch] px-4"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="on"
                />
                <Button
                  type="submit"
                  className="w-fit h-12 text-lg group rounded-full px-8 hover:cursor-pointer font-normal"
                  disabled={!username}
                >
                  Generate Portfolio
                  <ArrowRight className=" h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </FadeInComp>
          </div>
        </div>
      </div>
    </section>
  );
}
