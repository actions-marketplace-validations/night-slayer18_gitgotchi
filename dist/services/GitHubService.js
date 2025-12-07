"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubService = void 0;
const github = __importStar(require("@actions/github"));
const core = __importStar(require("@actions/core"));
class GitHubService {
    constructor(token) {
        this.octokit = github.getOctokit(token);
    }
    async getContributionStats(username, fromDate) {
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
            const { user } = await this.octokit.graphql(query, {
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
        }
        catch (error) {
            core.error(`Error fetching contribution stats: ${error}`);
            return { commits: 0, prsMerged: 0, issuesClosed: 0 };
        }
    }
}
exports.GitHubService = GitHubService;
