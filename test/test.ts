import x from "../src/main";

x.e.chatgpt.setKeys({
    key: "",
    url: "https://api.chatanywhere.tech/v1/chat/completions",
    config: { model: "gpt-4o-mini" },
});
x.e.chatgpt.run(["hello world"], "en", "zh-Hans").then((r) => {
    console.log(r);
});

// x.e.youdao.setKeys({
//     appid: "59c1dfcd8f2d0be7",
//     key: "aod5s0GS3qPR3HJ9afJOOxnKcOGsb6XZ",
// });
// x.e.youdao.run(["hello youdao"], "en", "zh-Hans").then((r) => {
//     console.log(r);
// });


// 小语种翻译 日语 
x.e.youdao.setKeys({
    appid: "59c1dfcd8f2d0be7",
    key: "aod5s0GS3qPR3HJ9afJOOxnKcOGsb6XZ",
});
x.e.youdao.run(["没关系"], "zh-Hans", "ja").then((r) => {
    console.log(r);
});