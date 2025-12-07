import * as github from '@actions/github';
import * as core from '@actions/core';

export interface ContributionStats {
  commits: number;
  prsMerged: number;
  issuesClosed: number;
}

export class GitHubService {
  private octokit;

  constructor(token: string) {
    this.octokit = github.getOctokit(token);
  }

  async getContributionStats(username: string, fromDate?: Date): Promise<ContributionStats> {
    const now = new Date();
    // Default to 24h ago if no date provided
    const since = fromDate || new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sinceIso = since.toISOString();

    try {
      // 1. Get Commits (using GraphQL for accuracy on default branch or general activity)
      // contributionsCollection is good for commits
      // We assume simple commit count
      const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              totalCommitContributions
            }
          }
        }
      `;

      const { user } = await this.octokit.graphql<{ user: any }>(query, {
        username,
        from: sinceIso,
        to: now.toISOString(),
      });

      const commits = user.contributionsCollection.totalCommitContributions;

      // 2. Get Merged PRs
      // Search API: is:pr is:merged author:USERNAME merged:>=DATE
      const prQuery = `is:pr is:merged author:${username} merged:>=${sinceIso}`;
      const prs = await this.octokit.rest.search.issuesAndPullRequests({
        q: prQuery,
      });

      // 3. Get Closed Issues
      // Search API: is:issue is:closed author:USERNAME closed:>=DATE
      // Note: "closed by user" is hard to distinguish from "closed by maintainer" via search easily, 
      // but "author:USERNAME is:closed" implies user's issues that were closed.
      // The spec says "+1 per Issue Closed". It could mean "Issues YOU closed" (triaging) or "Issues YOU created that got closed" (solved).
      // Given "author:USERNAME", it interprets as "Your created issues that were closed". 
      // To track issues *closed by* the user (triaging), we'd need events API.
      // Let's stick to "Issues you created that were closed" (assuming completing tasks) OR try to find "closed_by" via events.
      // Spec: "The Fuel: Git Commits, Pull Requests, and Issues." -> "Recovery Action: +1 per Issue Closed".
      // Let's assume issues created by the user that were completed.
      const issueQuery = `is:issue is:closed author:${username} closed:>=${sinceIso}`;
      const issues = await this.octokit.rest.search.issuesAndPullRequests({
        q: issueQuery,
      });

      core.info(`Fetched stats for ${username} since ${sinceIso}: Commits=${commits}, PRs=${prs.data.total_count}, Issues=${issues.data.total_count}`);

      return {
        commits: commits,
        prsMerged: prs.data.total_count,
        issuesClosed: issues.data.total_count,
      };

    } catch (error) {
      core.error(`Error fetching contribution stats: ${error}`);
      return { commits: 0, prsMerged: 0, issuesClosed: 0 };
    }
  }
}
