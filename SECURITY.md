# Security Policy

## Supported Versions

Only current versions of the site are being updated, if you are using an older version of the site, consider upgrading to the latest version.

| Version | Supported |
| ------- | --------- |
| V5.2.x  | ✔️        |
| V5.1.x  | :x:       |
| V5.0.x  | :x:       |
| V4.x.x  | :x:       |
| < V4.0  | :x:       |

## Security Best Practices

### Environment Variables & Configuration

- **Never commit credentials** to the repository. Use environment variables instead.
- Copy `.env.example` to `.env` and configure with your actual values:
  ```bash
  cp .env.example .env
  ```
- Set `AUTH_ENABLED=true` and provide `AUTH_USERS` as JSON in `.env` if you need authentication
- Configure `CORS_ORIGIN` to your specific domain (e.g., `https://example.com`)

### Required Dependencies

The security fixes require `helmet.js` for HTTP security headers. Install dependencies:
```bash
pnpm install
```

### Deployment Considerations

- Always run the application with `HTTPS` in production
- Regularly update dependencies: `pnpm update`
- Monitor dependency vulnerabilities: `npm audit`
- Never expose debug logs containing sensitive information
- Use strong passwords if enabling authentication

## Reporting a Vulnerability

You can privately report a vulnerability [here](https://github.com/InterstellarNetwork/Interstellar/security/advisories/new).

Alternatively, you can join our [Discord server](https://discord.gg/Interstellar), and open a ticket and let us know what the vulnerability is.

### Upgrading to the Latest Version

If you are using an older version of the site, we strongly recommend upgrading to the latest version to ensure that you benefit from the latest security updates and enhancements. Only the current versions of the site receive regular updates and support.

### How to Update

If you have a fork of the repository:
Then [sync your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

If you have interstellar installed locally:
Run `git pull`, and `npm i`.

By keeping your site up to date, you not only enjoy the latest features but also enhance the security of your experience.

If you encounter any challenges while updating, feel free to reach out to our [support team](https://discord.gg/interstellar) for assistance.

Thank you for prioritizing the security and performance of your experience with our site.
