import type { NextConfig } from "next";

// GitHub Pages serves this repo from https://<user>.github.io/Hooman-site/,
// a subpath, so the static export needs basePath/assetPrefix only for that
// target. Other hosts (Vercel, Netlify, local dev) run the full Next.js
// server and don't set DEPLOY_TARGET, so they keep the default config.
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";
const repoBasePath = "/Hooman-site";

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: "export",
    trailingSlash: true,
    basePath: repoBasePath,
    assetPrefix: repoBasePath,
  }),
};

export default nextConfig;
