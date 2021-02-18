import type { EmbedField } from "../types/index";

export function cleanBody(body: string): string {
	return body
		.replace(/\n\n/g, "\n")
		.replace(/- +([*a-zA-Z0-9])/g, "$1");
}

export function parseBody(body: string): EmbedField[] {
	const fields: EmbedField[] = [];
	const headingRegex = /^#{1,6} (.+)/;
	for (const line of body.split("\n")) {
		const heading = headingRegex.exec(line);
		if (heading) fields.push({name: heading[1], value: ""} as EmbedField);
		else fields[fields.length - 1].value += `\n${line}`;
	}
	return fields;
}

export function processMeta(fields: EmbedField[]): EmbedField[] {
	let processed: boolean;
	const working: EmbedField[] = [];
	fields.forEach((field) => {
		if (field.value !== "") working.push(field);
		if (!processed) {
			processed = true;
			working.push({
				name: "Meta",
				value: field.name
			});
		}
	});
	return working;
}
