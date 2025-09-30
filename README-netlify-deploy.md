# Deploying this folder to Netlify

This workspace contains static HTML, SVG, Markdown, Mermaid and JSX demo files. The repository root is configured to publish directly as a static site on Netlify.

Steps to deploy and link your domain (hodenmocow.com):

1. Create a new site on Netlify and connect it to this repository (or drag & drop this folder into Netlify's "Sites" area).

2. Netlify will publish the site at a default netlify.app subdomain. To add your custom domain:
   - In Netlify site dashboard > Domain settings > Add custom domain: enter `hodenmocow.com`.
   - Netlify will prompt for DNS configuration. It usually suggests one of these options:
     - Create an A record for the root domain pointing to Netlify's load balancer IPs (see Netlify docs), and a CNAME for `www` to the Netlify subdomain; OR
     - Use Netlify DNS (if you want Netlify to manage DNS).

3. Example DNS records you may need to add at your domain registrar (this is a common setup):

   - A record for `@` pointing to Netlify IP addresses (check the Netlify dashboard for current IPs).
   - CNAME for `www` -> <your-site>.netlify.app

4. Once DNS is added, Netlify will provision TLS automatically. Wait up to 30 minutes for DNS propagation.

Notes on the `.jsx` files
- The `.jsx` demos are wrapped in `.html` pages that load React and Babel from CDNs and inline the demo source. This is convenient and requires no build step, but it's development-only and not optimized for production.
- If you want production-ready bundles, I can scaffold a small Node + Vite build and replace the client-side Babel approach.

If you'd like, I can also connect the site to Netlify directly using your Netlify account token (you'd need to provide one), or guide you through adding the DNS records at your registrar.
