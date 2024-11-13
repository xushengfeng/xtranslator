# xTranslator

## 简介（introduction）

聚合翻译 api

## 安装（installation）

```bash
npm i xtranslator
```

## 使用

建立新翻译器

```js
import xtranslator from "xtranslator";

const chatgpt = xtranslator.es.chatgpt();

chatgpt.setKeys({
    key: "sk-***",
});
console.log(await chatgpt.run("hi", "auto", "zh")); // 你好
console.log(await chatgpt.run(["what can i say", "see you again"], "auto", "zh")); // ["我能说什么","再次见到你"]
```

```html
<script src="./dist/xtranslator.umd.js"></script>
<script></script>
```

## 引擎

引擎支持：

-   [x] 百度
-   [x] 有道
-   [x] 必应
-   [x] 彩云
-   [x] deepl
-   [x] deeplx
-   [x] chatgpt（ollama） 可自定义提示词
-   [x] gemini 可自定义提示词
-   [x] 小牛
-   [x] 腾讯交互式
-   [x] 腾讯
-   [x] 火山
-   [x] 谷歌（免费）
-   [x] Yandex（免费）

## 语言代码

使用 ISO 639 标准，语言优先，比如简体中文使用`zh-hans`而不是`zh-cn`

可以使用`lan` `targetLan`属性获取引擎支持的语言代码

使用`Intl.DisplayNames`获取代码的自然语言名称，导出的`language.languagesNotInIntl`是不支持转换的代码，需要自己处理国际化

使用时可以不用考虑语言代码大小写，提供了自动匹配：区域转文字（`zh-cn`->`zh-hans`）、模糊匹配（`zh-unknown`->`zh`如果支持`zh`或`zh-unknown`->`zh-hans`）
