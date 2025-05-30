import { App, Aws, Duration } from "aws-cdk-lib";
// import { SPAStack, type NuxtProps } from "@thunderso/cdk-nuxt";
import { NuxtStack, type NuxtProps } from "../../../LIBRARIES/cdk-nuxt";

const stack: NuxtProps = {
  debug: false,

  env: {
    account: '665186350589',
    region: 'ap-southeast-1'
  },
  application: 'examples',
  service: 'brochure',
  environment: 'test',

  rootDir: '',

  // domain: 'nuxt.thunder.so',
  // globalCertificateArn: 'arn:aws:acm:us-east-1:665186350589:certificate/d7c10cb1-d3fb-4547-b6ba-1717f20a25cf',
  // regionalCertificateArn: 'arn:aws:acm:ap-southeast-1:665186350589:certificate/080a1a6c-dab7-4fb8-af7a-97c25b95021e',
  // hostedZoneId: 'Z04172542KY36VFH88DJJ', // thunder.so

  buildProps: {
    outputDir: 'dist/client',
  },

  serverProps: {
    codeDir: 'dist/lambda',
    handler: 'entry.handler',
    // include: ['node_modules'],

    dockerFile: 'Dockerfile',

    environment: [{
      SUPABASE_URL: "https://arjvdjwyetmbrvualaey.supabase.co",
      SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyanZkand5ZXRtYnJ2dWFsYWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMwNzU5MjksImV4cCI6MTk2ODY1MTkyOX0.oofzUebapnxqhQVOYgDv7WEBWKE7f7neqUi60MivDjA",
    }],
  },

  // ... other props
};

new NuxtStack(new App(), `${stack.application}-${stack.service}-${stack.environment}-stack`, stack);