# Usage

Gitcord Release Changelogger, as an action, makes use of the following inputs:
| Name           | Required           | Description | Default |
|:--------------:|:------------------:|:-----------:|:-------:|
| `avatar-url`   | :x:                | Avatar URL to use for the Discord message sent to the webhook. | [GitHub icon] |
| `release-body` | :heavy_check_mark: | Markdown body of the GitHub release. | N/A |
| `release-name` | :heavy_check_mark: | Name to use when sending the release to Discord. | N/A |
| `username`     | :x:                | Username to use for the Discord message sent to the webhook. | "GitHub Release" |
| `webhook-url`  | :x:                | URL for the Discord webhook. Should be passed via secrets. If this isn't set, the action will not mutate the payload output so you can use it yourself. | N/A |

These outputs are also provided:
- `fields`: Array of parsed embed fields, extracted from the rest of the
payload.
- `payload`: JSON payload to be sent to Discord, returned in case you wish to
parse it further for other platforms.
- `api-result`: JSON response body from Discord (IF `webhook-url` was supplied).

For more information, see the GitHub actions inputs [usage docs].

[usage docs]: https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith

# Examples

Note that due to the modular nature of gitcord-release-changelogger, you may
choose to pass no webhook address and just use the `discord-payload` output to 
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
      id: get-release-name
      run: "echo ::set-output name=name::${RELEASE:-$TAG}"
      env:
        RELEASE: ${{ github.event.release.name }}
        TAG: ${{ github.event.release.tag_name }}
    - name: "Crosspost changelog to Discord"
      uses: kludge-cs/gitcord-release-changelogger@v3
      with:
        release-body: ${{ github.event.release.body }}
        release-name: ${{ steps.get-release-name.outputs.name }}
        webhook-url: ${{ secrets.RELEASE_WEBHOOK }}
```

# In action

Using the above configuration, the following was performed upon
publishing this action's own release:

![RELEASE](https://cdn.discordapp.com/attachments/513492116219887617/799337196602916874/unknown.png)

Gets uploaded to Discord in the following format
(note that markdown and linking is preserved)

![DISCORD-OUTPUT](https://cdn.discordapp.com/attachments/513492116219887617/799336159519965214/unknown.png)
