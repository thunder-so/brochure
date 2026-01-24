---
title: 'GitHub Integration'
description: 'Connect and configure GitHub accounts with Thunder for CI/CD deployment to AWS'
---

Thunder integrates with GitHub to enable seamless CI/CD pipeline deployment to your AWS account. The platform handles GitHub integration through three core workflows.

## Thunder GitHub App

The first step is to install the Thunder GitHub App on your GitHub account or organization.

Click the "Import Repositories" button in Thunder. This will redirect you to the GitHub App installation flow where you can authorize Thunder to access your repositories.

<img src="/screens/import-repository-prompt.png" alt="Import Repositories" class="mx-auto w-auto h-auto">

Follow the on-screen instructions to complete the installation. After successful installation, you will be automatically redirected back to Thunder and can begin importing repositories.

**Related:** [GitHub App documentation](https://docs.github.com/en/apps/using-github-apps/about-apps) | [Thunder GitHub App](https://github.com/apps/thunder-so/)

## Permissions

Thunder supports installing the app on both personal and organization GitHub accounts, with granular control over which repositories the app can access.

<img src="/screens/github-installation.png" alt="Github app installation" class="mx-auto w-auto h-auto">

### Account Types
- **Personal Account:** Install on your personal GitHub account to manage repositories you own.
- **Organization Account:** Install on an organization account to manage repositories shared across your team.

### Configuring Repository Access
When installing the app, you can choose to grant access to:
- All repositories (current and future)
- Selected repositories only

You can update these permissions at any time through your GitHub account settings.

**Related:** [Managing GitHub App installations](https://docs.github.com/en/apps/using-github-apps/managing-the-installation-of-your-github-app) | [Organization app permissions](https://docs.github.com/en/organizations/managing-access-to-your-organizations-repositories/managing-organization-installed-github-apps)

## User Access Token

Thunder uses GitHub's OAuth flow to generate a personal access token for CI/CD pipeline configuration on your AWS account.

During the OAuth flow, GitHub returns an authorization code. Thunder exchanges this code with GitHub's API to generate a secure access token. This token is then used to configure your CI/CD pipelines, enabling Thunder to automatically deploy your application to AWS when you push code changes.

### The OAuth Flow
1. You are prompted to authorize Thunder with your GitHub account
2. GitHub generates an authorization code
3. Thunder exchanges this code for a personal access token
4. The token is securely stored and used to configure AWS CI/CD pipelines

**Related:** [GitHub OAuth documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps) | [AWS CodePipeline integration](https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-webhooks.html)