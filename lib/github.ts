export type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  archived: boolean;
  pushedAt: string | null;
};

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string;
};

const GITHUB_USER = process.env.NEXT_PUBLIC_GITHUB_USER ?? "Ne-k";

/**
 * Repositories to keep off the site regardless of how recently they were pushed.
 * Add a repo name here (lowercase) to hide it without touching GitHub.
 */
const HIDDEN_REPOS = new Set<string>(["nebulix"]);

/**
 * Repos worth showing that the user does not own, so they never come back from
 * the /users/:user/repos listing. Pinned to the front of the grid in this order.
 */
const FEATURED_REPOS = ["2BDetermined-7034/2024-Crescendo"];

/**
 * Projects with no public repository behind them, listed by hand and pinned
 * ahead of everything else. Ids are negative so they can never collide with
 * GitHub's, and pushedAt is null because there are no commits to date them by.
 */
const MANUAL_PROJECTS: Project[] = [
  // {
  //   id: -1,
  //   name: "Rasmai",
  //   description:
  //     "Discord bot for maimai DX. It reads your DX NET scores, works out where your skill actually sits, and ranks the charts where a realistic push gains the most rating. Rendered score images in Discord, plus a dashboard on the web.",
  //   url: "https://raszmai.nguyen.ink",
  //   homepage: "https://rasmai.nguyen.ink",
  //   language: "TypeScript",
  //   stars: 0,
  //   forks: 0,
  //   topics: ["Discord bot", "maimai DX", "Next.js"],
  //   archived: false,
  //   pushedAt: null,
  // },
];

/**
 * Fetches the user's most recently pushed public repositories.
 *
 * Runs at build time / during ISR revalidation rather than in the browser, so
 * the page ships with projects already in the HTML and visitors never spend a
 * round trip (or a rate-limit failure) on api.github.com.
 */
function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "nguyen.ink-portfolio",
  };

  // Optional: lifts the rate limit from 60/hr to 5000/hr on build machines.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function toProject(repo: GitHubRepo): Project {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description ?? "No description available.",
    url: repo.html_url,
    homepage: repo.homepage?.trim() ? repo.homepage : null,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: (repo.topics ?? []).slice(0, 3),
    archived: repo.archived,
    pushedAt: repo.pushed_at,
  };
}

async function getFeatured(
  headers: Record<string, string>,
): Promise<Project[]> {
  const results = await Promise.all(
    FEATURED_REPOS.map(async (fullName) => {
      const response = await fetch(`https://api.github.com/repos/${fullName}`, {
        headers,
      });

      if (!response.ok) {
        // One missing pin should not take the whole section down.
        console.error(
          `Featured repo ${fullName} responded with ${response.status}`,
        );
        return null;
      }

      return toProject((await response.json()) as GitHubRepo);
    }),
  );

  return results.filter((project): project is Project => project !== null);
}

async function getOwned(headers: Record<string, string>): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&type=owner`,
      { headers },
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repos = (await response.json()) as GitHubRepo[];

    return repos
      .filter(
        (repo) =>
          !repo.fork &&
          !repo.private &&
          !HIDDEN_REPOS.has(repo.name.toLowerCase()),
      )
      .sort(
        (left, right) =>
          Date.parse(right.pushed_at) - Date.parse(left.pushed_at),
      )
      .map(toProject);
  } catch (error) {
    // An outage should thin the list out, not empty it of the manual entries.
    console.error("Failed to load GitHub repositories:", error);

    return [];
  }
}

export async function getProjects(limit = 9): Promise<Project[]> {
  const headers = buildHeaders();

  const [featured, owned] = await Promise.all([
    getFeatured(headers),
    getOwned(headers),
  ]);

  const pinnedIds = new Set(featured.map((project) => project.id));

  return [
    ...MANUAL_PROJECTS,
    ...featured,
    ...owned.filter((project) => !pinnedIds.has(project.id)),
  ].slice(0, limit);
}
