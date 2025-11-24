# DevFolio

**DevFolio** is a modern, minimalist developer portfolio generator built with Next.js 15, Tailwind CSS, and TypeScript. It automatically fetches your GitHub profile and repositories to create a stunning, professional portfolio in seconds.

## Features

- 🚀 **Instant Portfolio**: Generate a portfolio just by entering your GitHub username.
- 🎨 **Modern Design**: Clean, minimalist UI with dark mode support.
- ⚡ **Fast & SEO Friendly**: Built on Next.js 15 with Server Components.
- 📱 **Responsive**: Looks great on mobile, tablet, and desktop.
- 🔄 **Auto-Updating**: Fetches the latest data from your GitHub.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

To increase the GitHub API rate limit, create a `.env.local` file in the root directory and add your GitHub Personal Access Token:

```env
GITHUB_ACCESS_TOKEN=your_token_here
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
