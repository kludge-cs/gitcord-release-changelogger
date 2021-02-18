import * as gh from "@actions/core";
import type { Embed, Payload, WorkingContext } from "./types/index";
import {
	cleanBody,
	parseBody,
	processMeta
} from "./lib/index";
import consts from "./constants";
import request from "@helperdiscord/centra";

async function main() {
	const working: WorkingContext = {
		avatar: gh.getInput("avatar-url"),
		body: cleanBody(gh.getInput("release-body") || consts.BODY_MISSING),
		name: gh.getInput("release-name"),
		username: gh.getInput("username"),
		webhook: gh.getInput("webhook-url")
	};

	const fields = processMeta(parseBody(working.body));
	gh.setOutput("fields", JSON.stringify(fields));

	const embed: Embed = {
		title: working.name,
		fields: fields
	};
	const payload: Payload = {
		username: working.username,
		avatar_url: working.avatar, // eslint-disable-line camelcase
		embeds: [embed]
	};
	gh.setOutput("payload", JSON.stringify(payload));

	if (working.webhook) {
		const response = await request(working.webhook, "POST")
			.header({"Content-Type": "application/json"})
			.body(payload)
			.send();
		gh.setOutput("api-result", response.body.toString());
		if (response.statusCode !== 200) gh.setFailed(response.body.toString());
	}
}

main().catch((err) => gh.setFailed(err));
