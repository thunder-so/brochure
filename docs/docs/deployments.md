# Deployments

Deployments are an important part of Thunder Cloud, and understanding how they work can help you make the most out of the platform's capabilities.

## Triggers

Triggers are an important part of the deployment process. When you create an application, you select a branch of the repository that will be tied to the "preview" environment by default. Any changes to that branch will trigger a build and deployment to the "preview" environment.

However, you can customize this behavior by adding, editing, or deleting triggers that point a branch to a specific environment. For example, you could set your "testing" branch to go to the "preview" environment while the "main" branch goes to the "production" environment.

## Build and Deploy

Under the hood, Thunder uses AWS CloudBuild, ECR, and CloudDeploy to build and deploy your applications. It's worth noting that as the application is running on your AWS account, you will be billed for the build and compute time.

When you trigger a deployment, Thunder will:

- Clone your repository from GitHub.
- Build your application using CloudBuild.
- Push the Docker image to your ECR repository.
- Deploy the image to the appropriate enviroment using CloudDeploy.

Thunder provides you with an easy-to-use interface for managing deployments, including the ability to view deployment logs and rollbacks. You can also trigger deployments manually or set up automatic deployments based on various triggers, such as a commit to a specific branch.