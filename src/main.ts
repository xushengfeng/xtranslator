/// <reference types="vite/client" />

const languagesInIntl = [
    "af",
    "ak",
    "am",
    "ar",
    "as",
    "ay",
    "az",
    "be",
    "ber-Latn",
    "bg",
    "bho",
    "bm",
    "bm-Nkoo",
    "bn",
    "br",
    "bs",
    "ca",
    "ceb",
    "ckb",
    "co",
    "cs",
    "cy",
    "da",
    "de",
    "doi",
    "dv",
    "ee",
    "el",
    "en",
    "en-Gb",
    "en-Us",
    "eo",
    "es",
    "et",
    "eu",
    "fa",
    "fa-Af",
    "fi",
    "fil",
    "fo",
    "fr",
    "fr-Ca",
    "fy",
    "ga",
    "gd",
    "gl",
    "gn",
    "gu",
    "ha",
    "haw",
    "he",
    "hi",
    "hmn",
    "hr",
    "ht",
    "hu",
    "hy",
    "id",
    "ig",
    "ilo",
    "is",
    "it",
    "iu",
    "iu-Latn",
    "iw",
    "ja",
    "jw",
    "ka",
    "kk",
    "km",
    "kmr",
    "kn",
    "ko",
    "ko-Kr",
    "kri",
    "ku",
    "ky",
    "la",
    "lb",
    "lg",
    "ln",
    "lo",
    "lt",
    "lus",
    "lv",
    "mai",
    "mg",
    "mi",
    "mk",
    "ml",
    "mn",
    "mn-Cyrl",
    "mn-Mong",
    "mni-Mtei",
    "mr",
    "ms",
    "ms-Arab",
    "mt",
    "my",
    "nb",
    "ndc-Zw",
    "ne",
    "nl",
    "no",
    "nso",
    "ny",
    "oc",
    "om",
    "or",
    "pa",
    "pa-Arab",
    "pl",
    "prs",
    "ps",
    "pt",
    "pt-Br",
    "pt-Pt",
    "qu",
    "ro",
    "ru",
    "rw",
    "sa",
    "sat-Latn",
    "sd",
    "si",
    "sk",
    "sl",
    "sm",
    "sn",
    "so",
    "sq",
    "sr",
    "sr-Cyrl",
    "sr-Latn",
    "st",
    "su",
    "sv",
    "sw",
    "ta",
    "te",
    "tg",
    "th",
    "ti",
    "tk",
    "tl",
    "tlh-Latn",
    "tlh-Piqd",
    "tn",
    "to",
    "tr",
    "ts",
    "tt",
    "tw",
    "ug",
    "uk",
    "ur",
    "uz",
    "vi",
    "wo",
    "xh",
    "yi",
    "yo",
    "yue",
    "zh",
    "zh-Hans",
    "zh-Hant",
    "zh-Hant-hk",
    "zh-Hant-tw",
    "zu",
] as const;

const languagesNotInIntl = [
    "aa",
    "ab",
    "ace",
    "ach",
    "alz",
    "av",
    "awa",
    "ba",
    "bal",
    "ban",
    "bbc",
    "bci",
    "bem",
    "ber",
    "bew",
    "bi",
    "bik",
    "bo",
    "bts",
    "btx",
    "bua",
    "ce",
    "cgg",
    "ch",
    "chk",
    "chm",
    "cnh",
    "crh",
    "crs",
    "cv",
    "din",
    "dov",
    "dyu",
    "dz",
    "ff",
    "fj",
    "fon",
    "fur",
    "gaa",
    "gom",
    "gv",
    "hil",
    "ho",
    "hrx",
    "hsb",
    "iba",
    "ikt",
    "jam",
    "kac",
    "kek",
    "kg",
    "kha",
    "ki",
    "kj",
    "kl",
    "kr",
    "ktu",
    "kv",
    "li",
    "lij",
    "lmo",
    "ltg",
    "lu",
    "luo",
    "lzh",
    "mad",
    "mak",
    "mam",
    "mfe",
    "mh",
    "min",
    "mwr",
    "mww",
    "nd",
    "new",
    "ng",
    "nhe",
    "nr",
    "nus",
    "os",
    "otq",
    "pag",
    "pam",
    "pap",
    "rn",
    "rom",
    "sah",
    "scn",
    "se",
    "sg",
    "shn",
    "ss",
    "sus",
    "szl",
    "tcy",
    "tet",
    "tiv",
    "tlh",
    "tpi",
    "trp",
    "tum",
    "ty",
    "tyv",
    "udm",
    "ve",
    "vec",
    "war",
    "yua",
    "zap",
] as const;

const languages = ["auto", ...languagesInIntl, ...languagesNotInIntl] as const;

type language = typeof languages;

type eF = (
    text: string[],
    from: string,
    to: string,
    keys: { [name: string]: unknown },
) => Promise<string[]>;

type lanOption = {
    text?: string;
    auto?: string;
    sort?: "src" | "text";
    firstLan?: string;
};

class Translator<
    t extends string | string[],
    k extends { [name: string]: unknown },
    l extends language[number],
> {
    private translate: eF;
    private keys: { [name: string]: unknown };
    private _lan: l[];
    private _targetLan: language[number][];
    private _lan2lan: { [lan in language[number]]?: string };
    constructor(op: {
        f: (
            text: string[],
            from: string,
            to: string,
            keys: k,
        ) => Promise<string[]>;
        lan: l[];
        lan2lan: { [lan in language[number]]?: string };
        targetLan?: language[number][];
    }) {
        this.translate = op.f;
        this._lan = op.lan;
        this._targetLan = op.targetLan ?? op.lan.filter((i) => i !== "auto");
        this._lan2lan = op.lan2lan ?? {};
    }
    setKeys(keys: k) {
        this.keys = structuredClone(keys);
        return keys;
    }
    async run<tt extends t, ll extends l>(
        text: tt,
        from: ll,
        to: language[number],
    ): Promise<tt> {
        const nfrom = this._lan2lan[from] ?? from;
        const nto = this._lan2lan[to] ?? to;
        if (typeof text === "string") {
            if (text.trim() === "") return "" as tt;
            return (
                (await this.translate([text], nfrom, nto, this.keys)) || []
            ).join("\n") as tt;
        }
        if (text.length === 0) return [] as tt;
        const list = (await this.translate(text, nfrom, nto, this.keys)) || [];
        const r: string[] = new Array(text.length).fill("");
        for (const i in r) {
            if (list[i]) r[i] = list[i];
        }
        return r as tt;
    }
    async test() {
        const from =
            this._lan.find((w) => w.slice(0, 2) === "en") || this._lan[0];
        const to =
            this._targetLan.find((w) => w.slice(0, 2) === "zh") ||
            this._targetLan[0];
        const t = "The test passed";
        const r = await this.run(t as t, from, to);
        return {
            from,
            to,
            testText: t,
            result: r,
        };
    }
    get lan() {
        return this._lan;
    }
    get targetLan() {
        return this._targetLan;
    }
    get lan2lan() {
        return this._lan2lan;
    }
    getLanT(op?: lanOption) {
        return sLan(this._lan, op);
    }
    getTargetLanT(op?: lanOption) {
        return sLan(this._targetLan, op);
    }
}

function sLan(lans: language[number][], op?: lanOption) {
    let lan = (l: string) => {
        if (l === "auto") return op?.auto || "*";
        return l;
    };
    if (op?.text) {
        const languageName = new Intl.DisplayNames(op.text, {
            type: "language",
        });
        lan = (l: string) => {
            if (l === "auto") return op?.auto || "*";
            return languageName.of(l);
        };
    }

    const lansMap: { lan: language[number]; text: string }[] = lans.map((i) => {
        return { lan: i, text: lan(i) };
    });
    if (op?.sort === "text")
        lansMap.sort((a, b) => a.text.localeCompare(b.text));
    else lansMap.sort((a, b) => a.lan.localeCompare(b.lan));

    function lanFirst(srcLanList: typeof lansMap, srcmainLan: string) {
        if (!srcmainLan) return srcLanList;
        const mainLan = srcmainLan.toLowerCase();
        let i = srcLanList.findIndex((l) => l.lan.toLowerCase() === mainLan);
        if (i < 0)
            i = srcLanList.findIndex(
                (l) =>
                    l.lan.toLowerCase().split("-")[0] === mainLan.split("-")[0],
            );
        if (i < 0) return srcLanList;
        const lanList = structuredClone(srcLanList);
        lanList.unshift(lanList.splice(Number(i), 1)[0]);
        return lanList;
    }

    return lanFirst(lanFirst(lansMap, "auto"), op?.firstLan || op?.text);
}

import MD5 from "blueimp-md5";
import fetchJSONP from "fetch-jsonp";
import sha256 from "crypto-js/sha256";
import enc from "crypto-js/enc-hex";

const youdao = (
    text: string[],
    from: string,
    to: string,
    keys: { appid: string; key: string },
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const appKey = keys.appid;
        const key = keys.key;
        const salt = String(new Date().getTime());
        const curtime = String(Math.round(new Date().getTime() / 1000));
        const str1 = appKey + truncate(text.join("")) + salt + curtime + key;
        const sign = sha256(str1).toString(enc);
        const data = {
            appKey: appKey,
            salt: salt,
            from: from,
            to: to,
            sign: sign,
            signType: "v3",
            curtime: curtime,
        };
        const params = new URLSearchParams(data);
        for (const t of text) {
            params.append("q", t);
        }
        fetchJSONP(`https://openapi.youdao.com/api?${params.toString()}`)
            .then((v) => v.json())
            .then((t) => {
                re(t.translateResults.map((i) => i.translation));
            })
            .catch(rj);

        function truncate(q: string) {
            const len = q.length;
            if (len <= 20) return q;
            return q.substring(0, 10) + len + q.substring(len - 10, len);
        }
    });
};

const baidu = (
    text: string[],
    from: string,
    to: string,
    keys: { appid: string; key: string },
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const appid = keys.appid;
        const key = keys.key;
        const salt = new Date().getTime();
        const str1 = appid + text + salt + key;
        const sign = MD5(str1);
        fetchJSONP(
            `https://api.fanyi.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(
                text.join("\n"),
            )}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`,
        )
            .then((v) => v.json())
            .then((t) => {
                const l = t.trans_result.map((v) => v.dst);
                re(l);
            })
            .catch(rj);
    });
};

const deepl = (
    text: string[],
    from: string,
    to: string,
    keys: { key: string },
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        fetch("https://api-free.deepl.com/v2/translate", {
            body: JSON.stringify({
                text: text,
                source_lang: from,
                target_lang: to,
            }),
            headers: {
                Authorization: `DeepL-Auth-Key ${keys.key}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        })
            .then((v) => v.json())
            .then((t) => {
                const l = t.translations.map((x) => x.text);
                re(l);
            })
            .catch(rj);
    });
};

const deeplx = (
    text: string[],
    from: string,
    to: string,
    keys: { url: string },
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        fetch(keys.url, {
            body: JSON.stringify({
                source_lang: from,
                target_lang: to,
                text: text,
            }),
            method: "POST",
        })
            .then((v) => v.json())
            .then((t) => {
                if (t.translations) {
                    re(t.translations.map((x) => x.text));
                } else re(t.data);
            })
            .catch(rj);
    });
};

const caiyun = (
    text: string[],
    from: string,
    to: string,
    keys: { token: string },
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const url = "https://api.interpreter.caiyunai.com/v1/translator";
        const token = keys.token;
        const payload = {
            source: text,
            trans_type: `${from}2${to}`,
            request_id: "demo",
            detect: true,
        };
        const headers = {
            "content-type": "application/json",
            "x-authorization": `token ${token}`,
        };
        fetch(url, { method: "POST", body: JSON.stringify(payload), headers })
            .then((v) => v.json())
            .then((t) => {
                console.log(t);
                re(t.target);
            })
            .catch(rj);
    });
};

const bing = (
    text: string[],
    from: string,
    to: string,
    keys: { key: string },
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        fetch(
            `https://api.cognitive.microsofttranslator.com/translate?${new URLSearchParams(
                {
                    "api-version": "3.0",
                    from: from,
                    to: to,
                },
            ).toString()}`,
            {
                method: "POST",
                headers: {
                    "Ocp-Apim-Subscription-Key": keys.key,
                    "Content-type": "application/json",
                    "X-ClientTraceId": crypto.randomUUID(),
                },
                body: JSON.stringify([
                    {
                        text: text,
                    },
                ]),
            },
        )
            .then((v) => v.json())
            .then((t) => {
                re(t[0].translations.map((i) => i.text));
            })
            .catch(rj);
    });
};

function parseJson(res: string) {
    let parse = res;
    if (res.includes("```")) {
        const l = res.split("\n");
        const start = l.findIndex((i) => i.includes("```"));
        const end = l.findLastIndex((i) => i.includes("```"));
        parse = l.slice(start + 1, end).join("\n");
    }
    try {
        const list = JSON.parse(parse) as string[] | { [k: string]: string[] };
        if (Array.isArray(list)) {
            return list;
        }
        return Object.values(list).flat();
    } catch (error) {
        return [parse];
    }
}

function buildPrompt(p: string, text: string[], from = "auto", to = "auto") {
    return p
        .replaceAll("${t}", JSON.stringify(text))
        .replaceAll("${from}", from)
        .replaceAll("${to}", to);
}

const chatgpt = (
    text: string[],
    from: string,
    to: string,
    keys: {
        key: string;
        url: string;
        config?: { model: string; [k: string]: unknown };
        sysPrompt?: string;
        userPrompt?: string;
    },
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const txt = text;
        const systemPrompt = buildPrompt(
            keys.sysPrompt ||
                "You are a translation engine that can only translate text to JSON format and cannot interpret it.",
            txt,
            from,
            to,
        );
        const userPrompt =
            keys.userPrompt ||
            '{"from": "${from}", "to": "${to}", "text": ${t}}';
        const inputPrompt = buildPrompt(userPrompt, txt, from, to);
        const example = buildPrompt(
            userPrompt,
            ["hello world", "goodbye"],
            "en",
            "zh-HANS",
        );
        const m = [
            { role: "system", content: systemPrompt },
            { role: "user", content: example },
            { role: "assistant", content: '["你好世界","再见"]' },
            { role: "user", content: inputPrompt },
        ];
        const config = {
            model: "gpt-4o-mini",
            temperature: 0.5,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 1,
            messages: m,
            stream: false,
        };
        let userConfig = keys.config;
        if (userConfig) {
            const c = userConfig;
            c.messages = m;
            c.stream = false;
            userConfig = c;
        } else {
            userConfig = config;
        }
        fetch(keys.url || "https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${keys.key}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(userConfig),
        })
            .then((v) => v.json())
            .then((t) => {
                const res = t.message?.content || t.choices[0].message.content;
                re(parseJson(res));
            })
            .catch(rj);
    });
};

const gemini = (
    text: string[],
    from: string,
    to: string,
    keys: { key: string; url: string; config?: string; userPrompt?: string },
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const userPrompt = buildPrompt(
            keys.userPrompt ||
                "翻译成${to}，无需做任何解释:\n\n${t}，并返回JSON格式string[]",
            text,
            from,
            to,
        );
        const m = {
            contents: [{ parts: [{ text: userPrompt }] }],
        };
        const userConfig = keys.config;
        if (userConfig) {
            const c = JSON.parse(userConfig);
            for (const i in c) {
                m[i] = c[i];
            }
        }
        const url = new URL(
            keys.url ||
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        );
        url.searchParams.append("key", keys.key);
        fetch(url.href, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(m),
        })
            .then((v) => v.json())
            .then((t) => {
                const res = t.candidates[0].content.parts[0].text;
                re(parseJson(res));
            })
            .catch(rj);
    });
};

const niu = (
    text: string[],
    from: string,
    to: string,
    keys: { key: string },
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const data = {
            from: from,
            to: to,
            apikey: keys.key,
            src_text: text.join("\n"),
        };

        fetch("https://api.niutrans.com/NiuTransServer/translation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                re(result.tgt_text.split("\n"));
            })
            .catch(rj);
    });
};

const volcengine = (
    text: string[],
    from: string,
    to: string,
    keys: Record<string, never>,
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const data = {
            source_language: from,
            target_language: to,
            text: text,
        };

        fetch("https://translate.volcengine.com/crx/translate/v1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                re(result.translation);
            })
            .catch(rj);
    });
};

const tencentTransmart = (
    text: string[],
    from: string,
    to: string,
    keys: Record<string, never>,
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const data = {
            header: {
                fn: "auto_translation",
                session: "",
                client_key: `browser-firefox-130.0.0-Linux-${crypto.randomUUID()}-${new Date().getTime().toString()}`,
                user: "",
            },
            type: "plain",
            model_category: "normal",
            text_domain: "",
            source: {
                lang: from,
                text_list: text,
            },
            target: {
                lang: to,
            },
        };

        fetch("https://yi.qq.com/api/imt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                re(result.auto_translation);
            })
            .catch(rj);
    });
};
const tencent = (
    text: string[],
    from: string,
    to: string,
    keys: Record<string, never>,
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const guid = crypto.randomUUID();

        fetch("https://fanyi.qq.com/api/reauth12f", {
            method: "POST",
            headers: { Cookie: `fy_guid=${guid}` },
        })
            .then((v) => v.json())
            .then((q) => {
                const qtv = q.qtv;
                const qtk = q.qtk;

                const data = {
                    source: from,
                    target: to,
                    sourceText: text.join("\n"),
                    qtk: qtk,
                    qtv: qtv,
                    sessionUuid: `translate_uuid${new Date().getTime()}`,
                };
                fetch("https://fanyi.qq.com/api/translate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams(data),
                })
                    .then((response) => response.json())
                    .then((result) => {
                        re(result.translate.records[0].targetText);
                    })
                    .catch(rj);
            });
    });
};

const google = (
    text: string[],
    from: string,
    to: string,
    keys: Record<string, never>,
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const url = new URL(
            "https://translate.google.com/translate_a/single?dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t",
        );
        url.searchParams.append("client", "gtx");
        url.searchParams.append("sl", from);
        url.searchParams.append("tl", to);
        url.searchParams.append("hl", to);
        url.searchParams.append("dt", "t");
        url.searchParams.append("ie", "UTF-8");
        url.searchParams.append("oe", "UTF-8");
        url.searchParams.append("otf", "1");
        url.searchParams.append("ssel", "0");
        url.searchParams.append("tsel", "0");
        url.searchParams.append("kc", "7");
        url.searchParams.append("q", text.join("\n"));

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                re(
                    result[0]
                        ?.map((i) => i[0])
                        .filter((i) => i !== null)
                        .map((i) => i.trim()),
                );
            })
            .catch(rj);
    });
};

const yandex = (
    text: string[],
    from: string,
    to: string,
    keys: Record<string, never>,
) => {
    return new Promise((re: (text: string[]) => void, rj) => {
        const url = new URL(
            "https://translate.yandex.net/api/v1/tr.json/translate",
        );
        url.searchParams.append("srv", "android");
        url.searchParams.append(
            "id",
            `${crypto.randomUUID().replaceAll("-", "")}-0-0`,
        );

        const data = new URLSearchParams();
        data.append("source_lang", from);
        data.append("target_lang", to);
        for (const i of text) {
            data.append("text", i);
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data,
        })
            .then((response) => response.json())
            .then((result) => {
                re(result.text);
            })
            .catch(rj);
    });
};

const engineConfig = {
    youdao: new Translator({
        lan: [
            "auto",
            "zh-Hans",
            "zh-Hant",
            "en",
            "ja",
            "ko-Kr",
            "fr",
            "es",
            "pt",
            "it",
            "ru",
            "vi",
            "de",
            "ar",
            "id",
            "af",
            "bs",
            "bg",
            "yue",
            "ca",
            "hr",
            "cs",
            "da",
            "nl",
            "et",
            "fj",
            "fi",
            "el",
            "ht",
            "he",
            "hi",
            "mww",
            "hu",
            "sw",
            "tlh",
            "lv",
            "lt",
            "ms",
            "mt",
            "no",
            "fa",
            "pl",
            "otq",
            "ro",
            "sr-Cyrl",
            "sr-Latn",
            "sk",
            "sl",
            "sv",
            "ty",
            "th",
            "to",
            "tr",
            "uk",
            "ur",
            "cy",
            "yua",
            "sq",
            "am",
            "hy",
            "az",
            "bn",
            "eu",
            "be",
            "ceb",
            "co",
            "eo",
            "tl",
            "fy",
            "gl",
            "ka",
            "gu",
            "ha",
            "haw",
            "is",
            "ig",
            "ga",
            "jw",
            "kn",
            "kk",
            "km",
            "ku",
            "ky",
            "lo",
            "la",
            "lb",
            "mk",
            "mg",
            "ml",
            "mi",
            "mr",
            "mn",
            "my",
            "ne",
            "ny",
            "ps",
            "pa",
            "sm",
            "gd",
            "st",
            "sn",
            "sd",
            "si",
            "so",
            "su",
            "tg",
            "ta",
            "te",
            "uz",
            "xh",
            "yi",
            "yo",
            "zu",
        ],
        lan2lan: {
            "zh-Hans": "zh-CHS",
            "zh-Hant": "zh-CHT",
            "ko-Kr": "ko",
        },
        f: youdao,
    }),
    baidu: new Translator({
        lan: [
            "auto",
            "zh-Hans",
            "zh-Hant",
            "en",
            "yue",
            "lzh",
            "ja",
            "ko-Kr",
            "fr",
            "es",
            "th",
            "ar",
            "ru",
            "pt",
            "de",
            "it",
            "el",
            "nl",
            "pl",
            "bg",
            "et",
            "da",
            "fi",
            "cs",
            "ro",
            "sl",
            "sv",
            "hu",
            "vi",
        ],
        lan2lan: {
            "zh-Hans": "zh",
            "zh-Hant": "cht",
            "ko-Kr": "kor",
            lzh: "wyw",
            fr: "fra",
            es: "spa",
            ar: "ara",
            bg: "bul",
            et: "est",
            da: "dan",
            fi: "fin",
            ro: "rom",
            sl: "slo",
            sv: "swe",
            vi: "vie",
        },
        f: baidu,
    }),
    deepl: new Translator({
        lan: [
            "auto",
            "bg",
            "cs",
            "da",
            "de",
            "el",
            "en",
            "es",
            "et",
            "fi",
            "fr",
            "hu",
            "id",
            "it",
            "ja",
            "lt",
            "lv",
            "nl",
            "pl",
            "pt",
            "ro",
            "ru",
            "sk",
            "sl",
            "sv",
            "tr",
            "uk",
            "zh",
        ],
        targetLan: [
            "bg",
            "cs",
            "da",
            "de",
            "el",
            "en",
            "en-Gb",
            "en-Us",
            "es",
            "et",
            "fi",
            "fr",
            "hu",
            "id",
            "it",
            "ja",
            "lt",
            "lv",
            "nl",
            "pl",
            "pt",
            "pt-Br",
            "pt-Pt",
            "ro",
            "ru",
            "sk",
            "sl",
            "sv",
            "tr",
            "uk",
            "zh",
        ],
        lan2lan: {
            auto: "",
            bg: "BG",
            cs: "CS",
            da: "DA",
            de: "DE",
            el: "EL",
            en: "EN",
            "en-Gb": "EN-GB",
            "en-Us": "EN-US",
            es: "ES",
            et: "ET",
            fi: "FI",
            fr: "FR",
            hu: "HU",
            id: "ID",
            it: "IT",
            ja: "JA",
            lt: "LT",
            lv: "LV",
            nl: "NL",
            pl: "PL",
            pt: "PT",
            "pt-Br": "PT-BR",
            "pt-Pt": "PT-PT",
            ro: "RO",
            ru: "RU",
            sk: "SK",
            sl: "SL",
            sv: "SV",
            tr: "TR",
            uk: "UK",
            zh: "ZH",
        },
        f: deepl,
    }),
    deeplx: new Translator({
        lan: [
            "auto",
            "bg",
            "cs",
            "da",
            "de",
            "el",
            "en",
            "es",
            "et",
            "fi",
            "fr",
            "hu",
            "id",
            "it",
            "ja",
            "lt",
            "lv",
            "nl",
            "pl",
            "pt",
            "ro",
            "ru",
            "sk",
            "sl",
            "sv",
            "tr",
            "uk",
            "zh",
        ],
        targetLan: [
            "bg",
            "cs",
            "da",
            "de",
            "el",
            "en",
            "en-Gb",
            "en-Us",
            "es",
            "et",
            "fi",
            "fr",
            "hu",
            "id",
            "it",
            "ja",
            "lt",
            "lv",
            "nl",
            "pl",
            "pt",
            "pt-Br",
            "pt-Pt",
            "ro",
            "ru",
            "sk",
            "sl",
            "sv",
            "tr",
            "uk",
            "zh",
        ],
        lan2lan: {
            auto: "",
            bg: "BG",
            cs: "CS",
            da: "DA",
            de: "DE",
            el: "EL",
            en: "EN",
            "en-Gb": "EN-GB",
            "en-Us": "EN-US",
            es: "ES",
            et: "ET",
            fi: "FI",
            fr: "FR",
            hu: "HU",
            id: "ID",
            it: "IT",
            ja: "JA",
            lt: "LT",
            lv: "LV",
            nl: "NL",
            pl: "PL",
            pt: "PT",
            "pt-Br": "PT-BR",
            "pt-Pt": "PT-PT",
            ro: "RO",
            ru: "RU",
            sk: "SK",
            sl: "SL",
            sv: "SV",
            tr: "TR",
            uk: "UK",
            zh: "ZH",
        },
        f: deeplx,
    }),
    caiyun: new Translator({
        lan: ["auto", "zh", "en", "ja"],
        lan2lan: {},
        f: caiyun,
    }),
    bing: new Translator({
        lan: [
            "af",
            "am",
            "ar",
            "as",
            "az",
            "ba",
            "bg",
            "bn",
            "bo",
            "bs",
            "ca",
            "cs",
            "cy",
            "da",
            "de",
            "dv",
            "el",
            "en",
            "es",
            "et",
            "eu",
            "fa",
            "fi",
            "fil",
            "fj",
            "fo",
            "fr",
            "fr-Ca",
            "ga",
            "gl",
            "gu",
            "he",
            "hi",
            "hr",
            "hsb",
            "ht",
            "hu",
            "hy",
            "id",
            "ikt",
            "is",
            "it",
            "iu",
            "iu-Latn",
            "ja",
            "ka",
            "kk",
            "km",
            "kmr",
            "kn",
            "ko",
            "ku",
            "ky",
            "lo",
            "lt",
            "lv",
            "lzh",
            "mg",
            "mi",
            "mk",
            "ml",
            "mn-Cyrl",
            "mn-Mong",
            "mr",
            "ms",
            "mt",
            "mww",
            "my",
            "nb",
            "ne",
            "nl",
            "or",
            "otq",
            "pa",
            "pl",
            "prs",
            "ps",
            "pt",
            "pt-Pt",
            "ro",
            "ru",
            "sk",
            "sl",
            "sm",
            "so",
            "sq",
            "sr-Cyrl",
            "sr-Latn",
            "sv",
            "sw",
            "ta",
            "te",
            "th",
            "ti",
            "tk",
            "tlh-Latn",
            "tlh-Piqd",
            "to",
            "tr",
            "tt",
            "ty",
            "ug",
            "uk",
            "ur",
            "uz",
            "vi",
            "yua",
            "yue",
            "zh-Hans",
            "zh-Hant",
            "zu",
        ],
        lan2lan: {},
        f: bing,
    }),
    chatgpt: new Translator({
        lan: ["auto"],
        lan2lan: {},
        targetLan: languages.filter((i) => i !== "auto"),
        f: chatgpt,
    }),
    gemini: new Translator({
        lan: ["auto"],
        lan2lan: {},
        targetLan: languages.filter((i) => i !== "auto"),
        f: gemini,
    }),
    niu: new Translator({
        lan: [
            "sq",
            "ar",
            "am",
            "az",
            "ga",
            "et",
            "or",
            "ba",
            "eu",
            "be",
            "mww",
            "bg",
            "is",
            "pl",
            "bs",
            "fa",
            "tt",
            "da",
            "de",
            "dv",
            "ru",
            "fr",
            "fo",
            "fil",
            "fj",
            "fi",
            "km",
            "fy",
            "gu",
            "ka",
            "kk",
            "ht",
            "ko",
            "ha",
            "nl",
            "ky",
            "gl",
            "ca",
            "cs",
            "kn",
            "co",
            "otq",
            "hr",
            "ku",
            "la",
            "lv",
            "lo",
            "lt",
            "lb",
            "ro",
            "mg",
            "mt",
            "mr",
            "ml",
            "ms",
            "mk",
            "mi",
            "mn",
            "my",
            "bn",
            "af",
            "xh",
            "zu",
            "ne",
            "no",
            "pa",
            "pt",
            "ps",
            "ny",
            "ja",
            "sv",
            "sm",
            "st",
            "si",
            "eo",
            "sk",
            "sl",
            "sw",
            "gd",
            "so",
            "tg",
            "ty",
            "te",
            "ta",
            "th",
            "to",
            "tr",
            "tk",
            "ur",
            "uk",
            "uz",
            "cy",
            "es",
            "he",
            "el",
            "haw",
            "sd",
            "hu",
            "sn",
            "ceb",
            "hy",
            "ig",
            "it",
            "yi",
            "hi",
            "su",
            "id",
            "en",
            "yua",
            "yo",
            "vi",
            "yue",
            "ti",
            "zh",
        ],
        lan2lan: {
            "zh-Hant": "cht",
            // ["acu","agr","ake","amu","ee","ojb","om","os","ifb","aym","knj","ify","acr","amk","bdu","adh","any","cpb","efi","ach","ish","bin","tpi","bsn","ber","bi","bem","pot","br","poh","bam","map","bba","bus","bqp","bnp","bch","bno","bqj","bdh","ptu","bfa","cbl","gbo","bas","bum","pag","bci","bhw","btx","pon","bzj","gug","cha","cv","tn","ts","che","ccp","cdf","tsc","tet","dik","dyu","tbz","mps","tih","duo","ada","dua","tdt","dhv","tiv","djk","enx","nzi","nij","nyn","ndc","ndo","cfm","gur","kea","quw","kg","jy","gub","gof","xsm","krs","guw","swc","gym","me","cnh","hui","hlb","her","quc","gbi","gil","kac","gaa","kik","kmb","cab","kab","cjp","cak","kek","cni","cop","kbh","ckb","ksd","quz","kpg","crh","xal","kbo","keo","cki","pss","kle","qxr","rar","kbp","kam","kqn","wes","rw","rn","ln","lg","dop","rmn","ngl","rug","lsi","ond","loz","lua","lub","lun","rnd","lue","gv","mhr","mam","mo","mni","meu","mah","mrw","mdy","mad","mos","muv","lus","mfe","umb","arn","nhg","azb","quh","lnd","fuv","nop","ntm","nyy","niu","nia","nba","nyu","nav","nyk","pcm","pap","pck","ata","pis","tw","chr","chq","cas","cjk","cce","chk","sr","crs","sg","mrj","jiv","swp","ssx","spy","huv","jmc","srm","sxn","seh","kwy","sop","tzo","tig","tmh","tpm","ctd","tyv","iou","tex","lcm","teo","tvl","tll","tgl","tum","toj","ttj","wal","war","ve","wol","udm","ppk","usp","wlx","prk","wsk","wrs","vun","wls","urh","mau","guc","shi","syc","hwc","hmo","lcp","sid","mbb","shp","ssd","gnw","kyu","hil","jac","ace","jv","ikk","izz","pil","jae","yon","zyb","byr","iso","iba","ilo","ibg","yap","cht","dz","ifa","czt","dtp","bcl","tzh","zne"]
        },
        f: niu,
    }),
    volcengine: new Translator({
        lan: [
            "auto",
            "zh",
            "zh-Hant",
            "zh-Hant-hk",
            "zh-Hant-tw",
            "tn",
            "vi",
            "iu",
            "it",
            "id",
            "hi",
            "en",
            "ho",
            "he",
            "es",
            "el",
            "uk",
            "ur",
            "tk",
            "tr",
            "ti",
            "ty",
            "tl",
            "to",
            "th",
            "ta",
            "te",
            "sl",
            "sk",
            "ss",
            "eo",
            "sm",
            "sg",
            "st",
            "sv",
            "ja",
            "tw",
            "qu",
            "pt",
            "pa",
            "no",
            "nb",
            "nr",
            "my",
            "bn",
            "mn",
            "mh",
            "mk",
            "ml",
            "mr",
            "ms",
            "lu",
            "ro",
            "lt",
            "lv",
            "lo",
            "kj",
            "hr",
            "kn",
            "ki",
            "cs",
            "ca",
            "nl",
            "ko",
            "ht",
            "gu",
            "ka",
            "kl",
            "km",
            "lg",
            "kg",
            "fi",
            "fj",
            "fr",
            "ru",
            "ng",
            "de",
            "tt",
            "da",
            "ts",
            "cv",
            "fa",
            "bs",
            "pl",
            "bi",
            "nd",
            "ba",
            "bg",
            "az",
            "ar",
            "af",
            "sq",
            "ab",
            "os",
            "ee",
            "et",
            "ay",
            "lzh",
            "am",
            "ckb",
            "cy",
            "gl",
            "ha",
            "hy",
            "ig",
            "kmr",
            "ln",
            "nso",
            "ny",
            "om",
            "sn",
            "so",
            "sr",
            "sw",
            "xh",
            "yo",
            "zu",
        ],
        lan2lan: {},
        f: volcengine,
    }),
    tencentTransmart: new Translator({
        lan: [
            "auto",
            "zh",
            "zh-Hant",
            "en",
            "ja",
            "ko",
            "fr",
            "es",
            "ru",
            "de",
            "it",
            "tr",
            "pt",
            "vi",
            "id",
            "th",
            "ms",
            "ar",
            "km",
        ],
        lan2lan: { "zh-Hant": "zh-TW" },
        f: tencentTransmart,
    }),
    tencent: new Translator({
        lan: [
            "auto",
            "zh",
            "zh-Hant",
            "en",
            "ja",
            "ko",
            "fr",
            "es",
            "ru",
            "de",
            "it",
            "tr",
            "pt",
            "vi",
            "id",
            "th",
            "ms",
            "ar",
            "km",
        ],
        lan2lan: { "zh-Hant": "zh-TW" },
        f: tencent,
    }),
    google: new Translator({
        lan: [
            "auto",
            "ab",
            "sq",
            "aa",
            "ar",
            "alz",
            "am",
            "ach",
            "as",
            "az",
            "awa",
            "av",
            "ee",
            "ay",
            "ga",
            "et",
            "oc",
            "or",
            "om",
            "os",
            "tpi",
            "bew",
            "ban",
            "ba",
            "eu",
            "btx",
            "bbc",
            "bts",
            "bci",
            "be",
            "bm",
            "pag",
            "pam",
            "bg",
            "nso",
            "bem",
            "bik",
            "bal",
            "is",
            "pl",
            "bs",
            "fa",
            "bho",
            "bua",
            "br",
            "bo",
            "chm",
            "ch",
            "ce",
            "chk",
            "cv",
            "tn",
            "ts",
            "fa-Af",
            "tt",
            "da",
            "shn",
            "tet",
            "de",
            "dv",
            "dyu",
            "tiv",
            "din",
            "doi",
            "ru",
            "ndc-Zw",
            "nr",
            "dov",
            "bm-Nkoo",
            "fo",
            "fr",
            "sa",
            "tl",
            "fj",
            "fi",
            "fon",
            "fy",
            "fur",
            "ff",
            "kg",
            "km",
            "kl",
            "ka",
            "gom",
            "gu",
            "gn",
            "cnh",
            "kk",
            "ht",
            "ko",
            "ha",
            "nl",
            "hrx",
            "ky",
            "ktu",
            "gl",
            "ca",
            "gaa",
            "cs",
            "kac",
            "kn",
            "kr",
            "kha",
            "kek",
            "kv",
            "xh",
            "co",
            "crh",
            "hr",
            "qu",
            "ku",
            "ckb",
            "trp",
            "la",
            "ltg",
            "lv",
            "lo",
            "lt",
            "lij",
            "li",
            "ln",
            "rn",
            "luo",
            "lg",
            "lb",
            "rw",
            "lmo",
            "ro",
            "rom",
            "mad",
            "gv",
            "mg",
            "mwr",
            "mt",
            "mr",
            "ml",
            "ms",
            "ms-Arab",
            "mk",
            "mh",
            "mam",
            "mai",
            "mfe",
            "mi",
            "mni-Mtei",
            "mn",
            "bn",
            "min",
            "lus",
            "my",
            "hmn",
            "nhe",
            "af",
            "st",
            "ne",
            "new",
            "nus",
            "no",
            "pap",
            "pa",
            "pa-Arab",
            "pt",
            "pt-Pt",
            "ps",
            "ny",
            "cgg",
            "ak",
            "ja",
            "sv",
            "zap",
            "se",
            "sm",
            "sr",
            "kri",
            "crs",
            "sg",
            "sat-Latn",
            "si",
            "eo",
            "sk",
            "sl",
            "ss",
            "sw",
            "gd",
            "sus",
            "ceb",
            "so",
            "tg",
            "ber",
            "ber-Latn",
            "ty",
            "te",
            "ta",
            "th",
            "to",
            "ti",
            "tcy",
            "tum",
            "tyv",
            "tr",
            "tk",
            "war",
            "mak",
            "cy",
            "vec",
            "ug",
            "ve",
            "wo",
            "udm",
            "ur",
            "uk",
            "uz",
            "es",
            "szl",
            "scn",
            "iw",
            "el",
            "hil",
            "haw",
            "sd",
            "hu",
            "sn",
            "su",
            "jam",
            "sah",
            "hy",
            "ace",
            "iba",
            "ig",
            "ilo",
            "it",
            "yi",
            "hi",
            "id",
            "en",
            "yua",
            "yo",
            "yue",
            "vi",
            "jw",
            "zh-Hans",
            "zh-Hant",
            "dz",
            "zu",
        ],
        lan2lan: {},
        f: google,
    }),
    yandex: new Translator({
        lan: [
            "auto",
            "zh",
            "en",
            "ja",
            "ko",
            "fr",
            "es",
            "ru",
            "de",
            "it",
            "tr",
            "pt",
            "vi",
            "id",
            "th",
            "ms",
            "ar",
            "hi",
            "no",
            "fa",
            "sv",
            "pl",
            "nl",
            "uk",
            "he",
        ],
        lan2lan: {
            auto: "",
        },
        f: yandex,
    }),
};

const eKey: {
    [k in keyof typeof engineConfig]: {
        name: keyof ReturnType<(typeof engineConfig)[k]["setKeys"]>;
    }[];
} = {
    // todo optional
    youdao: [{ name: "appid" }, { name: "key" }],
    baidu: [{ name: "appid" }, { name: "key" }],
    deepl: [{ name: "key" }],
    deeplx: [{ name: "url" }],
    caiyun: [{ name: "token" }],
    bing: [{ name: "key" }],
    chatgpt: [
        { name: "key" },
        { name: "url" },
        { name: "config" },
        { name: "sysPrompt" },
        { name: "userPrompt" },
    ],
    gemini: [
        { name: "key" },
        { name: "url" },
        { name: "config" },
        { name: "userPrompt" },
    ],
    niu: [{ name: "key" }],
    volcengine: [],
    tencentTransmart: [],
    tencent: [],
    google: [],
    yandex: [],
};

export default {
    Translator,
    e: engineConfig,
    eKey,
    languages: {
        normal: languages,
        inIntl: languagesInIntl,
        notInIntl: languagesNotInIntl,
    },
};
