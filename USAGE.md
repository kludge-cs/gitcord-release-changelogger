# Usage

Gitcord Release Changelogger, as an action, makes use of the following inputs:
- `discord-webhook`: URL for the Discord webhook.
- `release-name`: Pre-parsed name of the release, to allow for custom naming conventions.
- `release-body`: Markdown from the release to parse.

This assumes you follow the [Conventional Changelog] specification. This will
NOT work with other specifications, due to the internal bash-only nature of
how the markdown is morphed into output JSON. This may be changed in future,
although for now, note that no other specifications are claimed to be supported.

Also note that as for custom workflow runners, your runner MUST have at least
BaSH, `curl`, `echo`, and `sed`.

For more information, see the GitHub actions inputs [usage docs].

[usage docs]: https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith
[Conventional Changelog]: https://github.com/conventional-changelog/conventional-changelog

# Examples

The default recommended implementation is as follows (this is also available at
[sample-workflow.yml](.github/workflows/sample-workflow.yml):

```yaml
name: "CD: Changelog -> Discord"
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
      run: "export RELEASE=$(echo \"${{ github.event.release.name }}\") && \
            echo \"NAME=${RELEASE:-\\\"${{ github.event.release.tag_name }}\\\"}\" >> $GITHUB_ENV"
    - name: "Run gitcord-release-changelogger"
      uses: kludge-cs/gitcord-release-changelogger@v1
      with:
        discord-websocket: ${{ secrets.RELEASE_WEBHOOK }}
        release-body: ${{ github.event.release.body }}
        release-name: ${{ env.NAME }}
```

# In action

Using the above configuration, the following was performed using a sample from 
[Sapphire]'s changelogs:

![RELEASE](https://cdn.discordapp.com/attachments/513492116219887617/798945893566119957/image.png)

Gets uploaded to Discord in the following format
(note that markdown and linking is preserved)

![DISCORD-OUTPUT](https://cdn.discordapp.com/attachments/513492116219887617/798947641709822032/Screenshot_20210113-160443_Discord.jpg)

[Sapphire]: https://github.com/sapphire-project
