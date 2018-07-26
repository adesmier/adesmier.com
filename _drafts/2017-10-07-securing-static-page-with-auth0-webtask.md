---
layout: blogpost
title: Securing a Static Web Page with Auth0 and Webtask
category: tutorials
scripts: |
  <script type="text/javascript" src="/assets/scripts/bundles/tutorials.js"></script>
image: assets/images/posts/tutorials/secure-static-page/header.jpg
thumbnail: assets/images/posts/tutorials/secure-static-page/thumbnail.jpg
demo: https://www.throughthestack.com/demos/auth0-webtask-app
github: https://github.com/adesmier/auth0-webtask-app
time: 20 min
comments: true
heading: Static site generators are a great way to quickly and easily develop a site that doesn't require a server backend. But sooner or later you'll want to start adding some features that require interaction with a server. A common feature is to provide a login, or password protect a page of the site. Trying to achieve this using a static site generator alone is not possible, but with the help of an identity management and function-as-a-service solution, you can easily secure sections or even your whole site.
tags: [jekyll, auth0, webtask, static site, authentication]
sections:
    Intro: |
        During the design phase of a website it's important to define what services it will be providing to your readers. This will go towards identifing what sofware to use in order to build, deploy and host it. If you're creating a simple blog site, your main service is just delivering flat files (your blog posts) to your readers. In this case you can utilise something like Jekyll and a static hosting site like Netlify.<br /><br />

        If the services you're providing are more complicated, like a booking system or payment processing, then your hosting would require a server to deal with multiple requests. This is where solutions like Wordpress and Shopify can come into play.<br /><br />

        But over the last few years there has been a big push in the idea of a ['serverless'](https://en.wikipedia.org/wiki/Serverless_computing) architecture when it comes to websites. What if you wanted to host a fairly simple website using Jekyll, but wanted to add a client-server type feature? You don't really want to use Wordpress because it's overkill for what you want and you don't really want to be tied to a Wordpress environment.<br /><br />

        The [JAM Stack](https://jamstack.org/) has been a driving force in finding a solution for this. Pioneered by the good folks at Netlify, it revolves around the idea that JavaScript is used to handle any dynamic processing on the client, API's are used to call third party databases or libraries and Markup for your pages is built by a static site generator.<br /><br />

        So to get our static site secure, we can use a third party API to perform the authentication for us. There are so many great services out there that provide an API for these kind of client-server type features; Contentful being one for a CMS and Auth0 is one for authentication and identity management.<br /><br />

        We can use [Auth0](https://auth0.com/) in our case to produce an authtication token for us. It's only when we have this token that we are allowed to access certain parts of the site. But how do we hide these certain parts behind our token? This is where our second API comes in: [Webtask](https://webtask.io/).<br /><br />
        
        Webtask is an alternative to AWS Lamda created by Auth0. It's a function-as-a-service solution that can integrate easily with Auth0 so you can get it to call a data endpoint and have it return that data to the client, only if it has a vaild auth token.<br /><br />

        Auth0 and Webtask both provide a free-tier option which includes more than enough for a blog-style site. So lets see how we can integrate authentication into a static site.

    Sample Static Site: |
    Setting Up Our Webtask: |
    Creating Our Auth0 Application: |
    The Auth0 Lock App: |
    Saving the Auth Token: |
    Putting it all Together: |
---
