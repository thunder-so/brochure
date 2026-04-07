---
title: "The Serverless Fullstack Pattern: SSR Without a Server"
description: "How Thunder deploys full-stack meta-frameworks like Nuxt, Astro, SvelteKit, and TanStack Start to AWS Lambda + S3 + CloudFront — and why this architecture is the sweet spot between static hosting and always-on containers."
pubDate: 2026-04-08
heroImage: "/opengraph.jpg"
---

When you build a full-stack app with a modern meta-framework — Nuxt, Astro, SvelteKit, TanStack Start, Solid Start, or AnalogJS — you get server-side rendering, API routes, and static asset optimization all in one project. The question is: where does it run?

You have three options. You can pre-render everything at build time and host it as a static site. You can run a persistent Node.js server in a container. Or you can do something in between: deploy the server as a Lambda function that only runs when a request arrives, and serve static assets from S3 through CloudFront.

That third option is what Thunder calls the **Serverless Fullstack** pattern. It's the architecture we've optimized for, and this post explains how it works and when to use it.

## The Architecture

The pattern uses three AWS services working together:

**[AWS Lambda](https://aws.amazon.com/lambda/)** runs your SSR server. When a user requests a page, Lambda executes your framework's server handler, renders the HTML, and returns it. Lambda scales automatically — from zero requests to thousands per second — and you pay only for the compute time used.

**[Amazon S3](https://aws.amazon.com/s3/)** stores your static assets: JavaScript bundles, CSS files, images, fonts. These files are uploaded once at deploy time and served directly from S3 through CloudFront's edge cache. They never touch Lambda.

**[Amazon CloudFront](https://aws.amazon.com/cloudfront/)** sits in front of everything. It's the single entry point for all traffic. CloudFront routes requests based on a simple rule: if the URL looks like a file (`*.js`, `*.css`, `*.png`), serve it from S3. Everything else goes to Lambda via API Gateway for SSR.

```
User request
    ↓
CloudFront (edge)
    ├── *.js, *.css, *.png → S3 (cached, free)
    └── /*, /api/* → Lambda (SSR, pay-per-request)
```

The result is a single domain that serves both your rendered pages and your static assets, with no CORS issues and a unified caching strategy.

## Why Not Just Use a Container?

Containers on Fargate are great for Next.js or any app that needs persistent connections, WebSockets, or long-running background work. But for most SSR apps, they're overkill.

A Fargate task runs 24/7. Even at minimum size (0.25 vCPU, 512 MB), you're paying roughly $33/month just to keep the container alive — before any traffic arrives. Add an Application Load Balancer and you're at ~$55/month as a floor.

Lambda has no floor. If your app gets 10,000 page views a month, you pay for 10,000 Lambda invocations. At typical SSR workloads, that's often under $5/month. At zero traffic, it's $0.

The tradeoff is cold starts. Lambda functions that haven't been invoked recently take a few hundred milliseconds to initialize. Thunder addresses this with `keepWarm: true`, which schedules an EventBridge ping every 5 minutes to keep the function warm. For most apps, this eliminates cold starts in practice.

## Framework Support

Each major meta-framework has a dedicated Thunder construct that knows exactly where the build output lives and how to configure Lambda and S3:

| Framework | Construct | Server output | Static output |
| --- | --- | --- | --- |
| Nuxt | `Nuxt` | `.output/server/` | `.output/public/` |
| Astro | `Astro` | `dist/lambda/` | `dist/client/` |
| SvelteKit | `SvelteKit` | `build/` | `build/client/` |
| TanStack Start | `TanStackStart` | `.output/server/` | `.output/public/` |
| Solid Start | `SolidStart` | `.output/server/` | `.output/public/` |
| AnalogJS | `AnalogJS` | `dist/analog/server/` | `dist/analog/public/` |

Each framework needs to be configured to output a Lambda-compatible handler. For Nitro-based frameworks (Nuxt, TanStack Start, Solid Start, AnalogJS), this means setting `preset: 'aws-lambda'`. For Astro, it means installing `@astro-aws/adapter`. For SvelteKit, it means using `@foladayo/sveltekit-adapter-lambda`.

Once configured, the stack file is minimal:

```ts
import { Cdk, Nuxt, type NuxtProps } from '@thunder-so/thunder';

const config: NuxtProps = {
  env: { account: 'YOUR_ACCOUNT_ID', region: 'us-east-1' },
  application: 'myapp',
  service: 'web',
  environment: 'prod',
  rootDir: '.',
  serverProps: {
    runtime: Cdk.aws_lambda.Runtime.NODEJS_22_X,
    architecture: Cdk.aws_lambda.Architecture.ARM_64,
    memorySize: 1792,
    timeout: 10,
    keepWarm: true,
  },
};

new Nuxt(new Cdk.App(), `${config.application}-${config.service}-${config.environment}-stack`, config);
```

Thunder handles the rest: creating the Lambda function, the API Gateway HTTP API, the S3 bucket with Origin Access Control, and the CloudFront distribution with the correct routing behaviors.

## Container Mode for Large Apps

Lambda Zip deployments have a 250 MB unzipped size limit. Most SSR apps fit comfortably within this. But if your app has heavy native dependencies — database drivers, image processing libraries, or large ML models — you can switch to container mode by adding a `dockerFile` to `serverProps`.

Thunder builds the Docker image, pushes it to Amazon ECR, and deploys it as a container Lambda. Container Lambdas support up to 10 GB and have the same scaling behavior as Zip deployments. The Dockerfile is always the same regardless of framework:

```dockerfile
FROM public.ecr.aws/lambda/nodejs:22

# Copy all lambda files
COPY . ./

CMD ["index.handler"]
```

The construct handles pointing Docker at the correct server output directory.

## Custom Domains

The Serverless Fullstack pattern requires two ACM certificates — one for CloudFront (must be in `us-east-1`) and one for API Gateway (same region as your Lambda function):

```ts
const config: NuxtProps = {
  // ...
  domain: 'app.example.com',
  hostedZoneId: 'Z1D633PJN98FT9',
  globalCertificateArn: 'arn:aws:acm:us-east-1:...',      // CloudFront
  regionalCertificateArn: 'arn:aws:acm:us-east-1:...',    // API Gateway
};
```

Thunder creates the Route53 A and AAAA records automatically.

## When to Use This Pattern

The Serverless Fullstack pattern is the right choice when:

- You're using a Nitro-based framework (Nuxt, TanStack Start, Solid Start, AnalogJS) or Astro/SvelteKit with a Lambda adapter
- Your traffic is variable or unpredictable — you don't want to pay for idle capacity
- You want the simplest possible deployment with no containers to manage
- Your app doesn't require persistent connections or WebSockets (use Fargate for those)

If you need SSR but your app is Next.js, note that Next.js doesn't have a Lambda adapter — use the [Fargate pattern](/docs/frameworks/nextjs) instead.

## Getting Started

See the [Serverless Fullstack pattern docs](/docs/patterns/serverless) for the full configuration reference, or jump straight to your framework's guide:

- [Nuxt on AWS](/docs/frameworks/nuxt)
- [Astro on AWS](/docs/frameworks/astro)
- [SvelteKit on AWS](/docs/frameworks/sveltekit)
- [TanStack Start on AWS](/docs/frameworks/tanstack)
- [Solid Start on AWS](/docs/frameworks/solidjs)
- [AnalogJS on AWS](/docs/frameworks/analog)
