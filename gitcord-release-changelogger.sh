BODY=$(echo "$RELEASE_BODY" | sed -r \
	-e ':a' \
	-e 'N' \
	-e '$!ba' \
	-e 's/\n/\t\t/g' \
	-e 's/\r//g' \
	-e 's/\t\t\t\t/\t\t/g' \
	-e 's/- +//g' \
	-e 's/"/\"/g' \
	-e 's/#{1,3} ([^\t]+)\t\t/"}, {"name": "\1", "value": "/g' \
	-e 's/^"}, //g' \
	-e 's/$/"}/g' \
	-e 's/\t\t/\\n/g' \
	-e 's/\{"name": "(.+)", "value": "\\n"\}/\{"name": "Meta", "value": "\1"\}/' \
	-e 's/\{"name": ".+", "value": "\\n"\}, //g')
PAYLOAD="{\"username\": \"GitHub Release\", \"avatar_url\": \"https://github.com/kludge-cs/gitcord-release-changelogger/raw/master/GitHub-Mark-120px-plus.png\", \"embeds\": [{\"title\": \"$RELEASE_NAME\", \"fields\": [$BODY]}]}"
echo ::set-output name=payload::$PAYLOAD
echo ::set-output name=response::$(curl -X POST \
     -H "Content-Type: application/json" \
	 -d "$PAYLOAD" \
	 "$WEBSOCKET")
