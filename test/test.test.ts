import { expect, test } from "vitest";
import x from "../src/main";
import keyJSON from "./key.json?raw";

const keyData = JSON.parse(keyJSON);

const mainResult = ["what can i say", "see you again"];
const fromLang = "en";
const toLang = "zh";

test("engine.baidu", async () => {
    const e = x.es.baidu();
    e.setKeys({ appid: keyData.baidu.appid, key: keyData.baidu.key });
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

// unknown
test("engine.bing", async () => {
    const e = x.es.bing();
    e.setKeys({ key: keyData.bing.key });
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

test("engine.caiyun", async () => {
    const e = x.es.caiyun();
    e.setKeys({ token: keyData.caiyun.token });
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

test("engine.chatgpt", async () => {
    const e = x.es.chatgpt();
    e.setKeys({ key: keyData.chatgpt.key, url: keyData.chatgpt.url });
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

// unknown
test("engine.deepl", async () => {
    const e = x.es.deepl();
    e.setKeys({ key: keyData.deepl.key });
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

// unknown
test("engine.deeplx", async () => {
    const e = x.es.deeplx();
    e.setKeys({ url: keyData.deeplx.url });
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

// unknown
test("engine.gemini", async () => {
    const e = x.es.gemini();
    e.setKeys({ key: keyData.gemini.key });
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

test("engine.google", async () => {
    const e = x.es.google();
    e.setKeys({});
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

// unknown
test("engine.niu", async () => {
    const e = x.es.niu();
    e.setKeys({ key: keyData.niu.key });
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

// unknown
test("engine.tencent", async () => {
    const e = x.es.tencent();
    e.setKeys({});
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

test("engine.tencentTransmart", { timeout: 10000 }, async () => {
    const e = x.es.tencentTransmart();
    e.setKeys({});
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

// unknown
test("engine.volcengine", async () => {
    const e = x.es.volcengine();
    e.setKeys({});
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

test("engine.yandex", async () => {
    const e = x.es.yandex();
    e.setKeys({});
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});

test("engine.youdao", async () => {
    const e = x.es.youdao();
    e.setKeys({ key: keyData.youdao.key, appid: keyData.youdao.appid });
    const r = await e.run(mainResult, fromLang, toLang);
    console.log(r);
    expect(r).toHaveLength(mainResult.length);
});
