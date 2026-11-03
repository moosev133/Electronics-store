# Preview hosting

## Primary review preview: GitHub Pages

- URL: https://moosev133.github.io/Electronics-store/
- Repository: https://github.com/moosev133/Electronics-store
- The user explicitly requested a public repository and a free `github.io` preview on 3 November 2026.
- Release branch: `main`. The existing `.github/workflows/deploy.yml` validates, builds and publishes pushes to `main` using GitHub Actions.
- Build with `VITE_BASE_PATH=/Electronics-store/` and `VITE_SITE_URL=https://moosev133.github.io`.
- The generated `404.html` redirects direct product/category links back through `index.html`, preserving the route and query string.
- No login or shared password is intended for reviewers. Confirm the deployment succeeds and the public URL works after updates.
- Keep hosting free. Do not purchase domains, upgrades, paid add-ons or automatic credit top-ups.
- This is a frontend review demo without orders or payments. Production commerce requires a commerce-compatible host, verified inventory, an admin backend and payment integration. GitHub Pages must not become the operational e-commerce host.

## Previous preview: Sites

Published successfully on 3 November 2026; retained as a separate previous preview:

- URL: https://mostafa-electronics-preview.meliodasin14.chatgpt.site
- Current audience: public preview, explicitly requested on 3 November 2026 so the store owner can open the link without signing in. The Site originally launched owner-only.
- Sites project ID: `appgprj_6ae9c06110f08191a6d72cab87fcd900`
- Initial published version: `appgprj_6ae9c06110f08191a6d72cab87fcd900~appgver_43a6953650fc8191b7a73a2fe02aabc4`
- Initial deployment: `appgdep_6ae9c8417ae4819192fcbe7ee5289c11`
- Application source: GitHub commit `b3b425a34e52cfb481982dc770ba2bc2bb4d0ddd` on `codex/premium-hebrew-storefront`.
- Sites source commit, including its hosting manifest: `55a2cea9e72d17c68f5fca0974a535080bb027f6`.

The first GitHub Pages activation attempt returned HTTP 422 while the repository was private. The user later explicitly authorized public repository visibility so the preview could use free GitHub Pages instead.

## Updating the previous Sites preview

The 3 November 2026 light-palette update kept this same Site; its audience was subsequently made public at the user's request. The original graphite/gold design has a permanent Git tag and source/graphics archive; see [Design reference](DESIGN.md).

The GitHub repository is the application source of truth. The Sites checkout is a separate deployment copy at `../sites/electronics-store-preview` in the local workspace. Its `.openai/hosting.json` retains the project ID above. GitHub pushes do not automatically publish to Sites.

1. Make and validate application changes in the GitHub checkout, then push the feature branch.
2. Use the Sites skill and existing project ID to open/refresh the deployment checkout with a newly issued source credential. Do not create another Site or replace its Git history.
3. Synchronize tracked application files from the intended GitHub revision into the deployment checkout, including intended removals. Preserve its `.git` and `.openai/hosting.json`; exclude dependencies, secrets, test output and generated builds.
4. Preserve the hosting configuration below. Build with `VITE_BASE_PATH=/` and `VITE_SITE_URL=https://mostafa-electronics-preview.meliodasin14.chatgpt.site`.
5. Use the supported Sites source helper to build, commit/push and package the deployment copy. Save and deploy that exact source/archive pair using the publishing flow for the audience returned by `get_site`.
6. Confirm deployment success and report the same preview URL. Preserve the current audience from `get_site`; the owner has now explicitly requested public access for review.

The image-clarity release was prepared and deployed under the original owner-private audience, then the user-authorized public access change was applied. For subsequent Sites updates use the current public audience publishing flow (`save_site_version` then `deploy_site_version`); do not call the owner-private deployment operation while the Site is public.

```json
{
  "project_id": "appgprj_6ae9c06110f08191a6d72cab87fcd900",
  "static": {
    "directory": "dist",
    "not_found_handling": "single-page-application"
  }
}
```

The single-page fallback supports directly opening category and product URLs. The initial hosted build passed TypeScript compilation and the Vite production build; the matching application revision also passed the existing GitHub quality-check workflow. Hosting success was confirmed by Sites. This is a demonstration frontend: real inventory, business information, the admin backend and payments remain separate work.
