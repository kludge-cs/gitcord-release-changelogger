import { processMeta } from "../../src/lib/helpers";

describe("processMeta (POST-PARSE)", () => {
	test("GIVEN no meta SHOULD not change", () => {
		const data = [{name: "Test heading", value: "Test item"}];
		const result = processMeta(data);
		expect(result).toStrictEqual(data);
	});

	test("GIVEN meta field SHOULD parse", () => {
		const result = processMeta([
			{
				name: "Test heading",
				value: ""
			},
			{
				name: "Test heading 2",
				value: "Test item 2"
			}
		]);
		expect(result).toStrictEqual([
			{
				name: "Meta",
				value: "Test heading"
			},
			{
				name: "Test heading 2",
				value: "Test item 2"
			}
		]);
	});

	test("GIVEN empty fields SHOULD prune", () => {
		const result = processMeta([
			{
				name: "Test heading",
				value: ""
			},
			{
				name: "To be pruned",
				value: ""
			}
		]);
		expect(result).toStrictEqual([
			{
				name: "Meta",
				value: "Test heading"
			}
		]);
	});
});
