---
layout: home

hero:
  name: AWS Simplified
  text: for Front-end Engineers.
  tagline: Thunder is the lightning-fast deployment platform designed specifically for developers and web application teams.
  actions:
    - theme: brand
      text: Sign up using Github
      link: https://console.thunder.so/login
    # - theme: alt
    #   text: Documentation
    #   link: /docs/

features:
- icon: 🔥
# - icon:
#     dark: /dark-feature-icon.svg
#     light: /light-feature-icon.svg
  title: "Static Site Generators (SSG)"
  details: Deploy landing pages and documentation sites quickly using Github, AWS S3 and CloudFront.
- icon: ⚙️
  title: "Single Page Applications (SPA)"
  details: Deploy full stack applications using AWS Lambda or Elastic Compute Service (ECS) for Server-Side Rendering (SSR).
- icon: ⚡
  title: "Preview and Ship"
  details: Trigger preview deployments with a git push. Streamlined workflows designed specifically for web developers.
---

<section class="segment">
<div class="container">
  <div class="focus">
    <section class="intro text-center mb-10">
      <h2>
        <span class="text-4xl font-light block mb-2">Deploy your next project on AWS</span>
        <span class="text-2xl font-light">without the pain of configuration</span>
      </h2>
      <!-- We know the AWS Console is an intimidating behemoth which requires week-long courses to even scratch the surface. -->
      <p>We built Thunder so you can focus on building and shipping your application without ever juggling infrastructure-as-code. Let us handle the underlying complexity.</p>
    </section>
  </div>
  <section class="features grid grid-cols-2 grid-rows-1 gap-4">
    <article class="feature">
      <h3>Get setup in minutes</h3>
      <p>Connect your AWS account using your credentials seamlessly. No training required.</p>
    </article>
    <article class="feature">
      <h3>Automagic build and deploy</h3>
      <p>Pick a project or pick a template to deploy instantly. Seamless CI/CD between your Github code and your AWS account.</p>
    </article>
  </section>
  <section class="features grid grid-cols-3 grid-rows-1 gap-4 mt-4">
    <article class="feature">
      <h3>Zero-config installation</h3>
      <p>Thunder will install all dependent infrastructure on your account, such as S3 bucket, CloudFront distribution, Lambdas, neccessary IAM roles, CodeBuild project, ECR, CodePipeline.</p>
    </article>
    <article class="feature">
      <h3>Choose your compute</h3>
      <p>From a simple API endpoint with Lambda, or a full-stack application using Elastic Compute Service (ECS) - Deploy on a compute platform appropriate for your app.</p>
    </article>
    <article class="feature">
      <h3>Own everything</h3>
      <p>You own the code. You own the infrastructure. Unlike other platforms, we do not inject scripts or track your product in any way. Your sites will keep working if you disconnect Thunder.</p>
    </article>
  </section>
</div>
</section>

<Frameworks />

<!--
  <section class=" section section-alt" id="founder">
    "Open source web application frameworks should be easier to run on the public cloud."

    I arrived at that statement after attempting to install a well-known open source framework (it was React) on AWS.

    Having spent 40+ hours with Amplify, S3, CloudFront, CloudFormation templates, AWS CDK, etc, I failed. 
    
    Picked up the project again a few months later and spent another 40+ hours to crack it.

    Looked into companies that offers this as a service. Just wanted the usability of Heroku/Vercel wrapped around AWS. Found nothing.

    Why not build it, then?
    
    Hence, we spent six months working 12 hour days and produced something that might be valuable to the world. We can now deploy our favourite JavaScript framework on our own AWS account with ease.

    If you find value in this product, consider becoming an early adopter. 

    Saddam Azad<br />
    <a href="https://twitter.com/_saddamazad" target="_blank">twitter.com/_saddamazad</a>
  </section>

  <section>
    <h2>Deploy an App on AWS in Minutes</h2>
    <p></p>

    <button>Sign up with Github</button>
  </section>

</div>

<section class="" id="footer">
  <div class="row">
      <div class="col-md-4">
      </div>
      <div class="col-md-4">
      </div>
      <div class="col-md-4 credits">
        <p>Thunder.so is a property of
          <br />CloudBits, Inc.
          <br />651 N Broad St STE 206, 
          <br />Middletown, DE 19709
          <br /><a href="mailto:support@thunder.so">support@thunder.so</a>
        </p>
        <ul>
          <li><a href="https://www.thunder.so/legal/tos.html">Terms of service</a></li>
          <li><a href="https://www.thunder.so/legal/privacy.html">Privacy policy</a></li>
        </ul>
      </div>
  </div>
</section>
-->