# Usage

Gitcord Release Changelogger, as an action, makes use of the following inputs:
- `discord-webhook`: URL for the Discord webhook.
- `release-name`: Pre-parsed name of the release, to allow for custom naming
conventions.
- `release-body`: Markdown from the release to parse.

These outputs are also provided:
- `discord-payload`: The JSON payload to be sent to Discord, returned so you may
perform any additional parsing before sending to Discord.
- `discord-api-result`: The `curl` log from Discord.

For more information, see the GitHub actions inputs [usage docs].

This assumes you follow the [Conventional Changelog] specification. This will
NOT work with other specifications, due to the internal bash-only nature of
how the markdown is morphed into output JSON. This may be changed in future,
although for now, note that no other specifications are claimed to be supported.

Also note that as for custom workflow runners, your runner MUST have at least
BaSH, `curl`, `echo`, and `sed`.

[usage docs]: https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith
[Conventional Changelog]: https://github.com/conventional-changelog/conventional-changelog

# Examples

Note that due to the modular nature of gitcord-release-changelogger, you may
supply an empty webhook address and just use the `discord-payload` output to
perform your own additional pre-parsing before you send the payload to a Discord
webhook.

The default recommended implementation is as follows (this is also available at
[sample-workflow.yml](.github/workflows/sample-workflow.yml):

```yaml
name: "CD: Crosspost Changelog"
on:
  release:
    types: [published]
jobs:
  release:
    runs-on: ubuntu-latest
    defaults:
      run:
        shell: bash
    steps:
    - name: "Parse release name"
      id: "get-release-name"
      run: "::set-output name=name::${RELEASE:-$TAG}"
      env:
        RELEASE: ${{ github.event.release.name }}
        TAG: ${{ github.event.release.tag_name }}
    - name: "Crosspost changelog to Discord"
      uses: kludge-cs/gitcord-release-changelogger@v2
      with:
        discord-webhook: ${{ secrets.RELEASE_WEBHOOK }}
        release-body: ${{ github.event.release.body }}
        release-name: ${{ steps.get-release-name.outputs.name }}
```

# In action

Using the above configuration, the following was performed upon
publishing this action's own release:

![RELEASE](https://cdn.discordapp.com/attachments/513492116219887617/799337196602916874/unknown.png)

Gets uploaded to Discord in the following format
(note that markdown and linking is preserved)

![DISCORD-OUTPUT](https://cdn.discordapp.com/attachments/513492116219887617/799336159519965214/unknown.png)
