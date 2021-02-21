# [3.0.0-source.1](https://github.com/kludge-cs/gitcord-release-changelogger/compare/v2.0.0...v3.0.0-source.1) (2021-02-21)


### Bug Fixes

* **main:** use webhook waiting to get proper api response ([dfb163d](https://github.com/kludge-cs/gitcord-release-changelogger/commit/dfb163d6ff1958a9388ad8bd9695a5fc0afda36b))
* **post-parse:** exclude whitespace as valid content ([c13d724](https://github.com/kludge-cs/gitcord-release-changelogger/commit/c13d724464802f5b9e689fd24cddfbece11a6237))
* **pre-parse:** preserve markdown formatting for scopes ([866c8ce](https://github.com/kludge-cs/gitcord-release-changelogger/commit/866c8ce0cfe11c02c6c4824baadf2a315c2d1514))
* change to node12 ([#4](https://github.com/kludge-cs/gitcord-release-changelogger/issues/4)) ([edccaab](https://github.com/kludge-cs/gitcord-release-changelogger/commit/edccaab573d89d149fb375af658cb449d80a2e9e))
* support windows style line endings ([#5](https://github.com/kludge-cs/gitcord-release-changelogger/issues/5)) ([5c18a28](https://github.com/kludge-cs/gitcord-release-changelogger/commit/5c18a28bb8595ad6a0ed1eb19e15f28941ad15f4))


### Code Refactoring

* rewrite to typescript ([#3](https://github.com/kludge-cs/gitcord-release-changelogger/issues/3)) ([1562208](https://github.com/kludge-cs/gitcord-release-changelogger/commit/15622089b6810cff78be11b2a8f80b79a08bb051))


### BREAKING CHANGES

* all inputs and outputs have changed.

* ci: add test coverage script

* ci: upload workflows

* ci(lint-test): fix pipeline failure

* chore: update dependencies

* ci: integrate release

* ci: fix git pushing for pull requests

* chore: clean up redundant script
