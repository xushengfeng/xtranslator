import x from "../src/main";

x.e.chatgpt.setKeys({
    key: "",
    url: "https://api.chatanywhere.tech/v1/chat/completions",
    config: { model: "gpt-4o-mini" },
});
x.e.chatgpt.run(["hello world"], "en", "zh-Hans").then((r) => {
    console.log(r);
});
