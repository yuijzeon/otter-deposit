# Vite - Vitest - Pinia Workshop




## 環境
這篇文章的 node 環境是 16.17.0
```PowerShell
nvm list
16.17.0
npm -v
8.15.0
```
[>](https://vitejs.dev/guide/) 先在一個你喜歡的位置創建一個名叫 my-vue-app 的 VITE 專案 (名字可以自己取)
```PowerShell
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
```
[>](https://vitest.dev/guide/) 安裝 vitest 包
```PowerShell
npm i -D vitest
```
可以試跑看看 看到大大的 Vite + Vue logo 就是完成了
```PowerShell
npm run dev
```

## 第一個測試
建立一個 first.test.ts 檔案
跟 C# 的 UnitTest 很像, 可以開始寫單純的程式邏輯了
```TypeScript
import { describe, test, expect, beforeEach } from "vitest";

describe("my tests", () => {
  beforeEach(() => {
    console.log("before each");
  });

  test("first", () => {
    expect(1).toBe(1);
  });
});
```
[更多 API](https://vitest.dev/api/)

## 第一個前端畫面的測試
[>](https://vitest.dev/guide/environment.html) 如果想要為前端畫面測試還需要模擬測試環境的包 安裝一下囉
```PowerShell
npm i -D @vue/test-utils
npm i -D jsdom
```
需要聲明測試運行環境 (第一行的 `// @vitest-environment`)
把想測試的組件 import 進來 mount 得到 wrapper
可以 console 印出來看看我們的組件現在到底長怎樣
就可以針對最終的畫面來寫測試了
假如我想測該組件僅包含一個 button 元素
```TypeScript
// @vitest-environment jsdom
import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../src/App.vue";

test("show one button", () => {
  const wrapper = mount(App);
  console.log(wrapper.html());
  expect(wrapper.findAll("button").length).toBe(1);
});
```
也可以模擬用戶操作 (await 記得要加!)
```TypeScript
test("click 3 times", async () => {
  const wrapper = mount(App);

  await wrapper.find("button").trigger("click");
  await wrapper.find("button").trigger("click");
  await wrapper.find("button").trigger("click");

  expect(wrapper.html()).contain('count is 3');
});
```

## 配置 vitest.config.ts
[>](https://vitest.dev/guide/environment.html) Vitest 預設會拿 Vite 的 config 但假如想自訂專屬 vitest 的設定
可以建立 vitest.config.ts 檔案
如下 environmentMatchGlobs 設定
在 tests/dom/ 資料夾下的測試都將以 jsdom 的環境運行
這樣就不用每個測試檔案都加 `// @vitest-environment jsdom` 來指定運行環境
```TypeScript
import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        environmentMatchGlobs: [
            ['tests/dom/**', 'jsdom'],
            ['**\/*.edge.tests.ts', 'edge-runtime'],
        ]
    },
}))
```

## 測試 emit/v-model 值
我們先修改原本的組件 使之以 v-model 傳值
App.vue
```HTML
<!--<script setup lang="ts">-->
    import { ref } from "vue";
<!--import HelloWorld from './components/HelloWorld.vue'-->
    const msg = ref('Vite + Vue');
<!--</script>-->

<!--<template>-->
<!--  <div>-->
<!--    <a href="https://vitejs.dev" target="_blank">-->
<!--      <img src="/vite.svg" class="logo" alt="Vite logo" />-->
<!--    </a>-->
<!--    <a href="https://vuejs.org/" target="_blank">-->
<!--      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />-->
<!--    </a>-->
<!--  </div>-->
      <h1>{{ msg }}</h1>
      <HelloWorld v-model="msg" />
<!--</template>-->
```
HelloWorld.vue
```HTML
<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
    defineProps<{ modelValue: string }>();
    const emit = defineEmits(['update:modelValue']);
<!--const count = ref(0)-->
<!--</script>-->

<!--<template>-->
<!--  <div class="card">-->
        <button type="button" @click="() => {
          count++;
          emit('update:modelValue', `count is ${ count }`);
        }">click me!</button>
<!--    <p>-->
<!--      Edit-->
<!--      <code>components/HelloWorld.vue</code> to test HMR-->
<!--    </p>-->
<!--  </div>-->
<!--...-->
```
之後就可以來寫測試了 可以打開註解來觀察 wrapper.emitted() 回傳值得變化
at(-1) 是取最後一次 emit 的值
```TypeScript
test("hello world", async () => {
  const wrapper = mount(HelloWorld, { props: { modelValue: "hello world" } });
  // console.log(wrapper.emitted('update:modelValue'));
  await wrapper.find("button").trigger("click");
  // console.log(wrapper.emitted('update:modelValue'));
  await wrapper.find("button").trigger("click");
  // console.log(wrapper.emitted('update:modelValue'));
  await wrapper.find("button").trigger("click");
  // console.log(wrapper.emitted('update:modelValue'));
  expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['count is 3']);
});
```
其他 emit 也是差不多方法測


## 依賴注入
https://vuejs.org/guide/components/provide-inject.html


## 後記
遇到的一些雷:

### 只要有 Quasar 組件跑測試就報錯
> 有用到 UI Framework 測試可能需要安裝額外 NPM 包
> 如 Quasar 需要額外安裝 `@quasar/quasar-app-extension-testing-unit-vitest`

### 已經 await nextTick() 了 expect 仍然是舊的值
> 一次 nextTick 有時候會不夠, 需要兩次甚至是三次才能得到我預期的結果
> 觸發到幾次 await 就要多 await nextTick() 幾次

https://github.com/yuijzeon/otter-deposit
