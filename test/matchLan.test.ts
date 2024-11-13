import { expect, test } from "vitest";
import xtranslators from "../src/main";

const matchFitLan = xtranslators.matchFitLan;

const lans = ["zh", "zh-Hans", "en"];

test("大小写", () => {
    expect(matchFitLan("zh-hans", lans)).toBe("zh-Hans");
});

test("大小写1", () => {
    expect(matchFitLan("ZH-HANS", lans)).toBe("zh-Hans");
});

test("模糊", () => {
    expect(matchFitLan("zh-unknown", lans)).toBe("zh");
});

test("模糊1", () => {
    expect(matchFitLan("zh-unknown", ["zh-hans", "zh-hant", "en"])).toBe(
        "zh-hans",
    );
});

test("地区", () => {
    expect(matchFitLan("zh-CN", lans)).toBe("zh-Hans");
});

test("不匹配地区", () => {
    expect(matchFitLan("zh-CN", lans, { transferRegion: false })).toBe("zh");
});

test("不存在", () => {
    expect(matchFitLan("unknown", lans)).toBe(undefined);
});

test("严格", () => {
    expect(matchFitLan("zh-unknown", lans, { strict: true })).toBe(undefined);
});
