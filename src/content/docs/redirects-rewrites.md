---
title: 'Redirects and Rewrites'
description: ''
---

The terms "redirect" and "rewrite" refer to different ways of handling HTTP requests, and they serve distinct purposes in web development:

## Redirect

A redirect is an HTTP response that instructs the client's browser to make a new request to a different URL. This involves a round-trip to the server.

*HTTP Status Codes*: Commonly uses status codes like <code>301 (Moved Permanently)</code> or <code>302 (Found/Temporary Redirect)</code>.

*Client-Side Action*: The browser updates the URL in the address bar to the new location specified in the Location header of the response.

Use Cases:
- Moving content to a new URL to avoid a broken link when the address of a page changes.
- To avoid a broken link when a user makes a predictable typo in an address.

SEO Impact: 
A 301 redirect passes most of the SEO value from the old URL to the new one, while a 302 redirect does not.

## Rewrite

A rewrite (also called a 200 Redirect) modifies the URL path internally on the server without changing the URL in the client's browser. The client is unaware of the rewrite.

*No HTTP Status Code*: Since the rewrite is internal, it doesn't involve sending a new HTTP status code to the client. 

*Server-Side Action*: The server processes the request as if it was made to the rewritten URL.

Use Cases:
- Serving a single-page application (SPA) by rewriting all paths to index.html.
- Handling legacy URLs without changing the visible URL structure.

SEO Impact: Since the URL in the browser doesn't change, rewrites don't directly impact SEO.

## Pattern

Using static paths:

| **Source**                 | **Destination**          |
|----------------------------|--------------------------|
| <code>/home</code>         | <code>/</code>           |

Using wildcards:

| **Source**                       | **Destination**               | **Example Effect**                           |
|----------------------------------|-------------------------------|----------------------------------------------|
| <code>/guide/*</code>            | <code>/blog/*</code>          | <code>/guide/path1</code> → <code>/blog/path1</code>     |
| <code>/cms/*</code>              | <code>/*</code>               | <code>/cms/path1</code> → <code>/path1</code>            |

Using placeholders:

| **Source**                 | **Destination**          | **Example Effect**                        |
|----------------------------|--------------------------|-------------------------------------------|
| <code>/docs/:any</code>    | <code>/:any</code>       | <code>/docs/introduction</code> → <code>/introduction</code>    |
| <code>/blog/posts/:postid</code> | <code>/blog/:postid</code> | <code>/blog/posts/123</code> → <code>/blog/123</code> |
| <code>/updates/:year/:month</code> | <code>/changelog/:year/:month</code> | <code>/updates/2023/10</code> → <code>/changelog/2023/10</code> |
