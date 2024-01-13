# xTranslator

## 简介（introduction）

聚合翻译 api

## 安装（installation）

```bash
npm i xtranslator
```

```js
import * as xtranslator from xtranslator
xtranslator.e.chatgpt.setKeys(["key"]);
console.log(xtranslator.e.chatgpt.run('hi', 'auto', 'zh'));
```

```html
<script src="./dist/xtranslator.umd.js"></script>
<script></script>
```

引擎支持：

-   [x] 百度
-   [x] 有道
-   [x] 必应
-   [x] 彩云
-   [x] deepl
-   [x] deeplx
-   [x] chatgpt
-   [x] gemini
-   [x] 小牛
-   [x] 腾讯交互式
-   [x] 腾讯
-   [x] 火山
-   [ ] 谷歌
-   [ ] Yandex
