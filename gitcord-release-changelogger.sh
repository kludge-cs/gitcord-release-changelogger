#!/usr/bin/env bash
if [ $# -ne 3 ]; then
	echo "Usage: gitcord-release-changelogger.sh <URL> <BODY> <NAME>"
	exit 1
fi
BODY=$(echo "$2" | sed -r \
	-e ':a' \
	-e 'N' \
	-e '$!ba' \
	-e 's/\n/\t\t/g' \
	-e 's/\t\t\t\t/\t\t/g' \
	-e 's/- +//g' \
	-e 's/### ([^\t]+)\t\t/"}, {"name": "\1", "value": "/g' \
	-e 's/^"}, //' \
	-e 's/$/"}/g' \
	-e 's/\t\t/\\n/g')
echo ::set-output name=response::$(curl -X POST \
     -H "Content-Type: application/json" \
     -d "{\"username\": \"GitHub Release\", \"embeds\": [{\"title\": \"$3\", \"fields\": [$BODY]}]}" \
	 $1)
