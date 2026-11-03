# Private preview hosting

Published successfully on 3 November 2026:

- URL: https://mostafa-electronics-preview.meliodasin14.chatgpt.site
- Audience: owner only; ChatGPT sign-in may be required.
- Sites project ID: `appgprj_6ae9c06110f08191a6d72cab87fcd900`
- Initial published version: `appgprj_6ae9c06110f08191a6d72cab87fcd900~appgver_43a6953650fc8191b7a73a2fe02aabc4`
- Initial deployment: `appgdep_6ae9c8417ae4819192fcbe7ee5289c11`
- Application source: GitHub commit `b3b425a34e52cfb481982dc770ba2bc2bb4d0ddd` on `codex/premium-hebrew-storefront`.
- Sites source commit, including its hosting manifest: `55a2cea9e72d17c68f5fca0974a535080bb027f6`.

GitHub Pages activation returned HTTP 422: "Your current plan does not support GitHub Pages for this repository." The GitHub repository remains private and its default branch was not changed.

## Updating the preview

The 3 November 2026 light-palette update keeps this same Site and private audience. The original graphite/gold design has a permanent Git tag and source/graphics archive; see [Design reference](DESIGN.md).

The GitHub repository is the application source of truth. The Sites checkout is a separate deployment copy at `../sites/electronics-store-preview` in the local workspace. Its `.openai/hosting.json` retains the project ID above. GitHub pushes do not automatically publish to Sites.

1. Make and validate application changes in the GitHub checkout, then push the feature branch.
2. Use the Sites skill and existing project ID to open/refresh the deployment checkout with a newly issued source credential. Do not create another Site or replace its Git history.
3. Synchronize tracked application files from the intended GitHub revision into the deployment checkout, including intended removals. Preserve its `.git` and `.openai/hosting.json`; exclude dependencies, secrets, test output and generated builds.
4. Preserve the hosting configuration below. Build with `VITE_BASE_PATH=/` and `VITE_SITE_URL=https://mostafa-electronics-preview.meliodasin14.chatgpt.site`.
5. Use the supported Sites source helper to build, commit/push and package the deployment copy. Save and deploy that exact source/archive pair with the owner-private operation after confirming the existing audience.
6. Confirm deployment success and report the same preview URL. Keep the preview private unless the owner requests a different audience.

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
