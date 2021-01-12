#!/usr/bin/env bash
BODY=$(echo "$RELEASE_BODY" | sed -r \
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
     -d "{\"username\": \"GitHub Release\", \"embeds\": [{\"title\": \"$RELEASE_NAME\", \"fields\": [$BODY]}]}" \
	 "$WEBSOCKET")
