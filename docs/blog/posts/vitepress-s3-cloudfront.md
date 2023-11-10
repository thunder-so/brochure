---
date: 2023-10-19
title: How to Deploy Vitepress on AWS using S3 and CloudFront
category: Tutorial
tags: vue

---

VitePress is Vite & Vue Powered Static Site Generator. This tutorial shows how to deploy Vitepress on AWS S3 and CloudFront

---

<PostDetail>

## Introduction
- Purpose of the Guide
- Prerequisites
  - GitHub Account
  - AWS Account
  - Locally Configured AWS CLI

## Setting Up the Project
- Create a new GitHub Repository
- Create a new Vitepress project

## Create and Configure AWS Resources

### Creating an S3 Bucket

Run the following command:
```shell
aws s3api create-bucket 
  --bucket thunder-vitepress-demo 
  --region us-west-2 
  --create-bucket-configuration LocationConstraint=us-west-2 
```

Outputs:
```json
{
  "Location": "http://thunder-vitepress-demo.s3.amazonaws.com/"
}
```

Remove the `Block Public Access` setting with the following command

```shell
aws s3api put-public-access-block 
  --bucket thunder-vitepress-demo 
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

Returns nothing on success.


Create a local file `s3-bucket-policy.json`

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::thunder-vitepress-demo/*"
        }
    ]
}
```

Attach the bucket policy with the following command:

```sh
aws s3api put-bucket-policy 
  --bucket thunder-vitepress-demo 
  --policy file://s3-bucket-policy.json
```


- Configuring Static Website Hosting

Create a local file `s3-website-config.json`
```json
{
    "IndexDocument": {
        "Suffix": "index.html"
    },
    "ErrorDocument": {
        "Key": "error.html"
    }
}
```

Upload sample `index.html` and `error.html` 

Run the following command:
```sh
aws s3api put-bucket-website 
  --bucket thunder-vitepress-demo 
  --website-configuration file://s3-website-config.json 
```

Does not return anything on success.

Under S3 Bucket Properties > Static website hosting, you will find Enabled and the bucket website endpoint like this:

```
http://thunder-vitepress-demo.s3-website-us-west-2.amazonaws.com/

```

Works.


### Configuring Codebuild

1. Create IAM Policy for CodeBuild

file://codebuild-role.json
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Run the following command:
```sh
aws iam create-role 
  --role-name codebuild-vitepress-role 
  --assume-role-policy-document file://codebuild-role.json 
  --description "IAM role for CodeBuild to build Vitepress application"
```

Outputs:
```json
{
    "Role": {
        "Path": "/",
        "RoleName": "codebuild-vitepress-role",
        "RoleId": "AROAZVYBSGX6YZO7VPMMK",
        "Arn": "arn:aws:iam::665186350589:role/codebuild-vitepress-role",
        "CreateDate": "2023-07-28T06:38:32+00:00",
        "AssumeRolePolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "codebuild.amazonaws.com"
                    },
                    "Action": "sts:AssumeRole"
                }
            ]
        }
    }
}
```

We want to collect Role.Arn

Attach policies to the IAM service role:
To give the CodeBuild project permissions to access other AWS services like S3 and CloudFront, you'll need to attach relevant policies to the IAM role. For this project, you'll need to attach the following policies:

- AmazonS3FullAccess: To access and upload artifacts to S3.
- AmazonCloudFrontFullAccess: To interact with CloudFront distributions.

You can attach these policies to the IAM role using the AWS CLI:

```sh
aws iam attach-role-policy --role-name codebuild-vitepress-role --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

aws iam attach-role-policy --role-name codebuild-vitepress-role --policy-arn arn:aws:iam::aws:policy/CloudFrontFullAccess

aws iam attach-role-policy --role-name codebuild-vitepress-role --policy-arn arn:aws:iam::aws:policy/CloudWatchFullAccess
```


2. Setting Up CodeBuild Project

file://buildspec.yml
```yaml
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - npm install

  build:
    commands:
      - npm run docs:build

artifacts:
  files:
    - '**/*'
  base-directory: 'docs/.vitepress/dist'
```

Without inline buildspec. Success, but expects the repo to contain buildspec.yml in root directory.
```sh
aws codebuild create-project 
  --name codebuild-vitepress 
  --source "type=GITHUB,gitCloneDepth=1,location=https://github.com/saddam-azad/vitepress.git" 
  --artifacts "type=S3,location=thunder-vitepress-demo,encryptionDisabled=true" 
  --environment "type=LINUX_CONTAINER,image=aws/codebuild/standard:5.0,privilegedMode=true,computeType=BUILD_GENERAL1_SMALL" 
  --service-role codebuild-vitepress-role 
```

```json
{                                                                                     
    "project": {                                                                      
        "name": "codebuild-vitepress",                                                
        "arn": "arn:aws:codebuild:us-east-2:665186350589:project/codebuild-vitepress",
        "source": {                                                                   
            "type": "GITHUB",                                                         
            "location": "https://github.com/saddam-azad/vitepress.git",               
            "gitCloneDepth": 1,                                                       
            "reportBuildStatus": false,                                               
            "insecureSsl": false                                                      
        },                                                                            
        "artifacts": {                                                                
            "type": "S3",                                                             
            "location": "thunder-vitepress-demo",                                     
            "namespaceType": "NONE",                                                  
            "name": "codebuild-vitepress",                                            
            "packaging": "ZIP",                                                       
            "encryptionDisabled": true
        },                                                                            
        "cache": {                                                                    
            "type": "NO_CACHE"                                                        
        },                                                                            
        "environment": {                                                              
            "type": "LINUX_CONTAINER",                                                
            "image": "aws/codebuild/standard:5.0",                                    
            "computeType": "BUILD_GENERAL1_SMALL",                                    
            "environmentVariables": [],                                               
            "privilegedMode": true,                                                   
            "imagePullCredentialsType": "CODEBUILD"                                   
        },                                                                            
        "serviceRole": "arn:aws:iam::665186350589:role/codebuild-vitepress-role",     
        "timeoutInMinutes": 60,                                                       
        "queuedTimeoutInMinutes": 480,                                                
        "created": "2023-07-28T21:29:57.196000+06:00",                                
        "lastModified": "2023-07-28T21:29:57.196000+06:00",                           
        "badge": {                                                                    
            "badgeEnabled": false                                                     
        },                                                                            
        "projectVisibility": "PRIVATE"                                                
    }                                                                                 
}
```

### Configuring CodePipeline

file://codepipeline-role.json
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

```sh
aws iam create-role 
  --role-name codepipeline-vitepress-role 
  --assume-role-policy-document file://codepipeline-role.json
  --description "IAM role for CodePipeline for Vitepress application"
```

```sh
aws iam attach-role-policy --role-name codepipeline-vitepress-role --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

aws iam attach-role-policy --role-name codepipeline-vitepress-role --policy-arn arn:aws:iam::aws:policy/CloudWatchFullAccess

aws iam attach-role-policy --role-name codepipeline-vitepress-role --policy-arn arn:aws:iam::aws:policy/AWSCodeBuildAdminAccess
```


file://codepipeline-config.json
```json
{
  "pipeline": {
      "name": "vitepress-pipeline",
      "roleArn": "arn:aws:iam::665186350589:role/codepipeline-vitepress-role",
      "artifactStore": {
        "type": "S3",
        "location": "thunder-vitepress-demo"
      },
      "stages": [
        {
          "name": "Source",
          "actions": [
            {
              "name": "SourceAction",
              "actionTypeId": {
                "category": "Source",
                "owner": "ThirdParty",
                "provider": "GitHub",
                "version": "1"
              },
              "configuration": {
                "Owner": "saddam-azad",
                "Repo": "vitepress",
                "Branch": "main",
                "OAuthToken": "github_pat_11AADBOWY08Cb6r31F5M9w_9im019lHooXXz4EM8PA6lJb4MklKzNPr9fzgCMs1nC72WVDVI7BTXCR34I"
              },
              "outputArtifacts": [
                {
                  "name": "SourceOutput"
                }
              ],
              "runOrder": 1
            }
          ]
        },
        {
          "name": "Build",
          "actions": [
            {
              "name": "BuildAction",
              "actionTypeId": {
                "category": "Build",
                "owner": "AWS",
                "provider": "CodeBuild",
                "version": "1"
              },
              "configuration": {
                "ProjectName": "codebuild-vitepress"
              },
              "inputArtifacts": [
                {
                  "name": "SourceOutput"
                }
              ],
              "runOrder": 1
            }
          ]
        }
      ]
  }
}
```

```sh
aws codepipeline create-pipeline 
  --cli-input-json file://codepipeline-config.json
```


### Configuring CloudFront Distribution

```sh
aws cloudfront create-distribution 
  --origin-domain-name thunder-vitepress-demo.s3-website-us-west-2.amazonaws.com 
  --default-root-object index.html 
  --origin-path /codebuild-vitepress
```

Outputs:
```json
{
    "Location": "https://cloudfront.amazonaws.com/2020-05-31/distribution/E2XT0GYI54CKZ2",
    "ETag": "E3S8PC0JG3HEUU",
    "Distribution": {
        "Id": "E2XT0GYI54CKZ2",
        "ARN": "arn:aws:cloudfront::665186350589:distribution/E2XT0GYI54CKZ2",
        "Status": "InProgress",
        "LastModifiedTime": "2023-07-27T10:01:42.411000+00:00",
        "InProgressInvalidationBatches": 0,
        "DomainName": "d1vys1kxm33ala.cloudfront.net",
    }
}
```

Check 
```sh
aws cloudfront wait distribution-deployed --id E2XT0GYI54CKZ2
```

Outputs a URL such as `1vys1kxm33ala.cloudfront.net`

Works.

TODO:

  - Setting Cache Policy
  - Configuring Custom Error Pages

## Testing the Deployment
- Verifying the Website on CloudFront
- Testing with Sample Content

## Automating the CI/CD Process
- Committing Changes to GitHub
- Observing the Automated Deployment

## Conclusion
- Troubleshooting
- Additional Resources

</PostDetail>