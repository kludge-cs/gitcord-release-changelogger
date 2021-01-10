# Usage

Gitcord Release Changelogger, as an action, makes use of the following inputs:
- `discord-webhook`: URL for the Discord webhook. 

This assumes you follow the [Conventional Changelog] specification. This will
NOT work with other specifications, due to the internal bash-only nature of
how the markdown is morphed into output JSON. This may be changed in future,
although for now, note that no other specifications are claimed to be supported.

Also note that as for custom workflow runners, your runner MUST have at least
BaSH, `curl`, `echo`, and GNU's `sed` (not yet compatible with BSD 
`sed` - coming soon).

For more information, see the GitHub actions inputs [usage docs].

[usage docs]: https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith
[Conventional Changelog]: https://github.com/conventional-changelog/conventional-changelog

# Examples

The default recommended implementation is as follows:

```yaml
- TO BE COMPLETE
```
