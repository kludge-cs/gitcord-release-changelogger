# Gitcord Release Changelogger v1.0.0

Gitcord Release Changelogger is a GitHub action designed for piping release
events to a Discord channel, for convenience. This solution was designed
initially for the [Sapphire Project], however is made open source for general
use, courtesy of Kludge Cyber Systems.

[Sapphire Project]: https://github.com/sapphire-project

## Usage

Gitcord Release Changelogger, as an action, makes use of the following secrets:
- `${{ secrets.RELEASE_WEBHOOK }}`: the Discord webhook URL to pipe output to

For more information, see the [GitHub Secrets docs].

[GitHub Secrets docs]: https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets

## Licensing

Gitcord Release Changelogger is dedicated to the public domain. However, if your
country's copyright laws do not acknowledge the public domain for whatever
reason, it is also made available under the terms of the [MIT License].

Our only hope in releasing this project is it serves useful to whomever may find
it. Feel free to open an issue if you notice a bug, have any questions, or
require additional features.

[MIT License]: LICENSE
