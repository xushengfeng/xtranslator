import { expect, test } from "vitest";
import { parseJson } from "../src/main";

const mainResult = ["hello", "world"];
test("list", () => {
    expect(parseJson('["hello", "world"]')).to.deep.equal(mainResult);
});

test("list with md", () => {
    expect(parseJson('```json\n["hello", "world"]\n```')).to.deep.equal(
        mainResult,
    );
});

test("list with md2", () => {
    expect(
        parseJson('以下是输出：\n```json\n["hello", "world"]\n```'),
    ).to.deep.equal(mainResult);
});

test("object", () => {
    expect(parseJson('{"你好": "hello", "世界": "world"}')).to.deep.equal(
        mainResult,
    );
});

test("object with md", () => {
    expect(
        parseJson('```json\n{"你好": "hello", "世界": "world"}\n```'),
    ).to.deep.equal(mainResult);
});

test("object with md2", () => {
    expect(
        parseJson(
            '以下是输出：\n```json\n{"你好": "hello", "世界": "world"}\n```',
        ),
    ).to.deep.equal(mainResult);
});

test("mark in string", () => {
    expect(
        parseJson(JSON.stringify(["\n```\nhello\n```", "```world```"])),
    ).to.deep.equal(["\n```\nhello\n```", "```world```"]);
});

test("mark in string2", () => {
    expect(
        parseJson(
            `以下是输出：\n\`\`\`json\n${JSON.stringify(["\n```\nhello\n```", "```world```"])}`,
        ),
    ).to.deep.equal(["\n```\nhello\n```", "```world```"]);
});

test("nested obj", () => {
    expect(
        parseJson(
            `以下是输出：\n\`\`\`json\n${JSON.stringify({ res: { 你好: "hello", 世界: "world" } })}`,
        ),
    ).to.deep.equal(mainResult);
});

test("nested obj", () => {
    expect(
        parseJson(
            `以下是输出：\n\`\`\`json\n${JSON.stringify([{ 你好: "hello", 世界: "world" }])}`,
        ),
    ).to.deep.equal(mainResult);
});
