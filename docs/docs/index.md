# What is Thunder?

Thunder is a platform-as-a-service (PaaS) designed to simplify and accelerate the deployment process for your web applications. Specifically engineered for modern developers, Thunder seamlessly integrates with AWS and GitHub, making it an indispensable tool for software development and deployment.

The way we see it, purpose of a PaaS:
1. Make it easy to whip up a new project 
2. Allow adding new features easily, as the project grows
3. Help keep costs as low as possible 

AWS Console provides an impressive and overwhelming array of products and configurations. Hence, starting a new project requires understanding of underlying constructs. 

Amazon have adressed this problem themselves with products such as [Amplify](https://docs.amplify.aws/), [CodeCatalyst](https://codecatalyst.aws/) and [Serverless Application Model (SAM)](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html). These products are abstractions of CDK and CloudFormation but with much improved DX. However, they feel far short of the integrated DX provided by black-box PaaS products such as [Vercel](https://vercel.com/), [Netlify](http://netlify.com/), [Render](https://render.com/), etc.

Thunder is differenciated from the black-box PaaS who are in the business of upselling compute. It is also distinct because it neither stores or handles the user's code, nor is the user required to learn/integrate a new SDK apart from the ones provided by AWS. 

Thunder aims to provide the developer experience of a modern PaaS for your own AWS account.


## Prerequisites

Before you begin, make sure you have the following:

  - A Github account
  - An AWS account (root or IAM access)


