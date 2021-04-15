//xigoxo2589@684hh.com
//12345678
const puppeteer = require("puppeteer");

let browser;
let page;
let code;
let language;

puppeteer
    .launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        slowMo: 30,
    })
    .then(function (b) {
        browser = b;
        return browser.pages();
    })
    .then(function (pages) {
        page = pages[0];
        return page.goto(
            "https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login"
        );
    })
    .then(function () {
        return page.type("#input-1", "xigoxo2589@684hh.com");
    })
    .then(function () {
        return page.type("#input-2", "12345678");
    })
    .then(function () {
        return Promise.all([
            page.waitForNavigation(),
            page.click(
                ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
            ),
        ]);
    })
    .then(function () {
        return clickbtn("[title='Interview Preparation Kit']");
    })
    .then(function () {
        return clickbtn("[data-attr1='warmup']");
    })
    .then(function () {
        return clickbtn(
            ".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled"
        );
    })
    .then(function () {
        return clickbtn("[data-attr2='Editorial']");
    })
    .then(function () {
        return handleLockBtn();
    })
    .then(function () {
        return page.waitForSelector(
            ".challenge-editorial-block.editorial-setter-code pre"
        );
    })
    .then(function () {
        return page.evaluate(function () {
            return document.querySelector(
                ".challenge-editorial-block.editorial-setter-code pre"
            ).innerText;
        });
    })
    .then(function (data) {
        code = data;
        return code;
    })
    .then(function () {
        return page.waitForSelector(".editorial-code-box h3");
    })
    .then(function () {
        return page.evaluate(function () {
            return document.querySelector(".editorial-code-box h3").innerText;
        });
    }).then(function(title){
        language = title;
        console.log(language);
        return clickbtn("[data-attr2='Problem']");
    }).then(function(){
        return page.waitForSelector(".css-1hwfws3");
    }).
    then(function(){
        return page.click(".css-1hwfws3");
    }).then(function(){
        return page.type(".css-1hwfws3",language);
    }).then(function(){
        return page.keyboard.press("Enter");
    })
    .then(function () {
        return page.waitForSelector("[type='checkbox']");
    })
    .then(function () {
        return page.click("[type='checkbox']");
    })
    .then(function () {
        return page.waitForSelector("#input-1");
    })
    .then(function () {
        return page.type("#input-1", code);
    })
    .then(function () {
        return pasteCode();
    })
    .then(function () {
        return clickbtn(".hr-monaco-submit");
    })
    .catch(function (err) {
        console.log(err);
    });

function handleLockBtn() {
    return new Promise(function (resolve, reject) {
        page.waitForSelector(
            ".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled",
            { visible: true }
        )
            .then(function () {
                console.log(1);
                return page.click(
                    ".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled"
                );
            })
            .then(function () {
                console.log(2);
                resolve();
            })
            .catch(function (err) {
                console.log(err);
                resolve();
            });
    });
}

function clickbtn(Sel) {
    return new Promise(function (resolve, reject) {
        page.waitForSelector(Sel)
            .then(function () {
                return Promise.all([page.waitForNavigation(), page.click(Sel)]);
            })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

function controlbtn(btn) {
    return new Promise(function (resolve, reject) {
        page.keyboard
            .down("Control")
            .then(function () {
                return page.keyboard.press(btn);
            })
            .then(function () {
                return page.keyboard.up("Control");
            })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                reject();
            });
    });
}

function pasteCode() {
    return new Promise(function (resolve, reject) {
        controlbtn("A")
            .then(function () {
                return controlbtn("C");
            })
            .then(function () {
                return page.click(
                    ".monaco-scrollable-element.editor-scrollable.vs"
                );
            })
            .then(function () {
                return controlbtn("A");
            })
            .then(function () {
                return controlbtn("V");
            })
            .then(function () {
                resolve();
            })
            .catch(function () {
                reject();
            });
    });
}
