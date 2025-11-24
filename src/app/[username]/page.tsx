import {
  getGithubProfile,
  getGithubRepos,
  type GithubProfile,
  type GithubRepo,
} from "@/lib/github";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Star,
  GitFork,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function PortfolioPage({ params }: PageProps) {
  const { username } = await params;
  let profile: GithubProfile | null = null;
  let repos: GithubRepo[] = [];
  let error = null;

  try {
    [profile, repos] = await Promise.all([
      getGithubProfile(username),
      getGithubRepos(username),
    ]);
  } catch (e) {
    error = e;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <p className="text-muted-foreground mb-8">
          Could not fetch data for username: {username}
        </p>
        <Button asChild>
          <Link href="/">Go Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
          <Avatar className="w-32 h-32 md:w-48 md:h-48 border-4 border-background shadow-xl">
            <AvatarImage
              src={profile.avatar_url}
              alt={profile.name || profile.login}
            />
            <AvatarFallback>
              {profile.login.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left space-y-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">
                {profile.name || profile.login}
              </h1>
              <p className="text-xl text-muted-foreground">@{profile.login}</p>
            </div>
            {profile.bio && <p className="text-lg max-w-2xl">{profile.bio}</p>}

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </div>
              )}
              {profile.blog && (
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <a
                    href={
                      profile.blog.startsWith("http")
                        ? profile.blog
                        : `https://${profile.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Website
                  </a>
                </div>
              )}
              {profile.twitter_username && (
                <div className="flex items-center gap-1">
                  <Twitter className="w-4 h-4" />
                  <a
                    href={`https://twitter.com/${profile.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @{profile.twitter_username}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Github className="w-4 h-4" />
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub Profile
                </a>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Badge variant="secondary">
                {profile.public_repos} Repositories
              </Badge>
              <Badge variant="secondary">{profile.followers} Followers</Badge>
              <Badge variant="secondary">{profile.following} Following</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Repositories Section */}
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Latest Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo: GithubRepo) => (
            <Card
              key={repo.id}
              className="flex flex-col h-full hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg font-semibold truncate">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {repo.name}
                    </a>
                  </CardTitle>
                  {repo.stargazers_count > 0 && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 shrink-0"
                    >
                      <Star className="w-3 h-3 fill-current" />
                      {repo.stargazers_count}
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2 min-h-10">
                  {repo.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-primary" />
                        {repo.language}
                      </div>
                    )}
                    {repo.forks_count > 0 && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks_count}
                      </div>
                    )}
                  </div>
                  <span className="text-xs">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
