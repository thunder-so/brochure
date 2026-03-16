---
title: "Introducing the Unified Thunder Library"
description: "We're consolidating our CDK libraries into a single, powerful package to simplify how you deploy modern web apps to AWS."
pubDate: 2026-03-16
heroImage: "/public/opengraph.jpg"
---

Today, we're excited to announce a major milestone for Thunder: the launch of our unified CDK library, [`@thunder-so/thunder`](https://github.com/thunder-so/thunder).

Until now, we provided separate libraries for different deployment patterns—`cdk-spa`, `cdk-functions`, and `cdk-webservice`. While effective, managing multiple packages created unnecessary friction. By consolidating these into a single package, we’re delivering a more cohesive developer experience and a simpler upgrade path for your infrastructure.

## Why Unified?

The goal of Thunder has always been to provide the best possible developer experience (DX) for AWS. By moving to a single library, we can:

- **Simplify Installation**: Just one package to add to your `devDependencies`.
- **Ensure Consistency**: Share common types and utilities across all patterns.
- **Ease Transitions**: Move from a static site to a full-stack containerized service without changing your primary dependency.

## The Three Patterns

The unified library continues to support the three core patterns that make Thunder the go-to PaaS for AWS, now accessible through a streamlined API.

### 1. Static
Formerly known as the SPA pattern, **Static** is designed for client-side applications and static site generators like Astro, Next.js (static export), and Vite. It leverages AWS S3 for storage and CloudFront for global delivery.

```ts
import { Cdk, Static, type StaticProps } from "@thunder-so/thunder";

new Static(new Cdk.App(), "my-static-site", {
  application: "my-app",
  service: "web",
  environment: "prod",
  outputDir: "dist",
});
```

### 2. Lambda
Perfect for serverless APIs and backend functions, the **Lambda** pattern deploys your code using AWS Lambda and API Gateway. It supports modern frameworks like Hono, NestJS, and Fastify with pay-per-request pricing.

```ts
import { Cdk, Lambda, type LambdaProps } from "@thunder-so/thunder";

new Lambda(new Cdk.App(), "my-api", {
  application: "my-app",
  service: "api",
  environment: "prod",
  functionProps: {
    codeDir: "dist",
    handler: "index.handler",
  },
});
```

### 3. Fargate
For full-stack applications requiring persistent state or long-running processes (like SSR Next.js, Nuxt, or Remix), the **Fargate** pattern deploys containerized services using AWS Fargate and Application Load Balancer.

```ts
import { Cdk, Fargate, type FargateProps } from "@thunder-so/thunder";

new Fargate(new Cdk.App(), "my-service", {
  application: "my-app",
  service: "ssr",
  environment: "prod",
  rootDir: ".",
});
```

## Zero Lock-in, Full Control

Despite the new unified package, our core promise remains unchanged. Thunder is open source and deploys directly to *your* AWS account. If you ever decide to stop using the Thunder Console, your infrastructure—built on standard AWS CDK constructs—will continue to work perfectly.

## Getting Started

You can start using the new library today. If you're currently using our deprecated `cdk-*` packages, we recommend migrating to `@thunder-so/thunder` for the latest features and security updates.

Check out our updated [Patterns Documentation](/docs/patterns) for more details.

Happy deploying!
