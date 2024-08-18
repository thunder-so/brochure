#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { SPAStack, type SPAProps } from "@thunderso/cdk-spa";

const appStackProps: SPAProps = {
  env: {
    account: '665186350589',
    region: 'us-east-1'
  },
  application: 'thunder',
  service: 'brochure',
  environment: 'prod',

  sourceProps: {
    owner: 'thunder-so',
    repo: 'brochure',
    branchOrRef: 'main',
    rootdir: ''
  },

  githubAccessTokenArn: 'arn:aws:secretsmanager:us-east-1:665186350589:secret:githubpat-0abFlT',

  buildProps: {
    runtime: 18, // nodejs version
    installcmd: "npx pnpm i --store=node_modules/.pnpm-store",
    buildcmd: "npx pnpm run build",
    outputdir: "docs/.vitepress/dist/"
  }
};

new SPAStack(new App(), `${appStackProps.application}-${appStackProps.service}-${appStackProps.environment}-stack`, appStackProps);