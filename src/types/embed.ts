/* eslint-disable camelcase */
// ^ JSON payload does not use camelcase

export interface EmbedField {
	name: string,
	value: string
}

export interface Embed {
	title: string,
	fields: EmbedField[]
}

export interface Payload {
	username: string,
	avatar_url: string,
	embeds: Embed[]
}
