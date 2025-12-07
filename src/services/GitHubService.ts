import * as github from '@actions/github';
import * as core from '@actions/core';

export interface ContributionStats {
  commits: number;
  prsMerged: number;
  issuesClosed: number;
  streak: number;
}

export class GitHubService {
  private octokit;

  constructor(token: string) {
    this.octokit = github.getOctokit(token);
  }

  async getContributionStats(username: string, fromDate?: Date): Promise<ContributionStats> {
    const now = new Date();
    // Streak window: 365 days
    const streakFrom = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
    
    // Stats window: Since last fed (or 24h default)
    const statsFromDate = fromDate || new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const statsFrom = statsFromDate.toISOString();

    try {
      const query = `
        query($username: String!, $streakFrom: DateTime!, $statsFrom: DateTime!, $to: DateTime!) {
          user(login: $username) {
            # Streak Context (1 Year)
            streakCollection: contributionsCollection(from: $streakFrom, to: $to) {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
            # Stats Context (Since Last Run)
            statsCollection: contributionsCollection(from: $statsFrom, to: $to) {
               totalCommitContributions
            }
          }
        }
      `;

      const { user } = await this.octokit.graphql<{ user: any }>(query, {
        username,
        streakFrom,
        statsFrom,
        to: now.toISOString(),
      });

      const commits = user.statsCollection.totalCommitContributions;
      const calendar = user.streakCollection.contributionCalendar;

      // Calculate Streak (Same logic as before)
      let streak = 0;
      const days = calendar.weeks
        .flatMap((w: any) => w.contributionDays)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

      const todayStr = now.toISOString().split('T')[0];
      
      let streakBroken = false;
      for (const day of days) {
        if (day.date > todayStr) continue;
        if (day.date === todayStr && day.contributionCount === 0) continue;

        if (day.contributionCount > 0) {
            streak++;
        } else {
            streakBroken = true;
            break;
        }
      }

      // Rest Search for PRs/Issues since statsFrom
      const prQuery = `is:pr is:merged author:${username} merged:>=${statsFrom}`;
      const prs = await this.octokit.rest.search.issuesAndPullRequests({ q: prQuery });

      const issueQuery = `is:issue is:closed author:${username} closed:>=${statsFrom}`;
      const issues = await this.octokit.rest.search.issuesAndPullRequests({ q: issueQuery });

      core.info(`Fetched stats since ${statsFrom}: Commits=${commits}, PRs=${prs.data.total_count}, Issues=${issues.data.total_count}. Streak=${streak}`);

      return {
        commits: commits,
        prsMerged: prs.data.total_count,
        issuesClosed: issues.data.total_count,
        streak: streak
      };

    } catch (error) {
      core.error(`Error fetching stats: ${error}`);
      return { commits: 0, prsMerged: 0, issuesClosed: 0, streak: 0 };
    }
  }
}
