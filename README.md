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
其他 emit 也是相同的方法測

## 當 Vitest 遇上 Pinia
[>](https://pinia.vuejs.org/getting-started.html) 安裝一下 npm 包
```PowerShell
npm i pinia
```
打開 main.ts 加上這幾行
```TypeScript
//  import { createApp } from 'vue'
    import { createPinia } from 'pinia'
//  import './style.css'
//  import App from './App.vue'

    const myApp = createApp(App);
    myApp.use(createPinia());
    myApp.mount('#app');
```
創建 store.ts
```TypeScript
import { defineStore } from "pinia";

export interface IMyStore {
  message: string;
}

export const useMyStore = defineStore("myStore", {
  state: (): IMyStore => ({
    message: "Hello World",
  }),
});
```
App.vue 加上這些
```HTML
<script setup lang="ts">
...
import { useMyStore } from './store'
const store = useMyStore();
...
</script>

<template>
...
  <input id="storeInput" v-model="store.message">
...
</template>
```
HelloWorld.vue 加上這些
```HTML
<script setup lang="ts">
...
import { useMyStore } from '../store'
const store = useMyStore();
...
</script>

<template>
...
  <div class="store-msg">{{ store.message }}</div>
...
</template>
```
可以 run 一下看看是否正常 接下來就可以寫測試了
```TypeScript
import { toRefs, ToRefs } from "vue";
import { describe, test, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia, Store } from "pinia";
import { IMyStore, useMyStore } from "../src/store";
import App from "../src/App.vue";

describe("pinia", () => {
  let store: ToRefs<Store<"myStore", IMyStore>>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = toRefs(useMyStore());
  });

  test("cross component", async () => {
    const wrapper = mount(App);

    await wrapper.find("#storeInput").setValue("lipovitan");

    expect(store.message.value).toBe("lipovitan");
    expect(wrapper.find("div.store-msg").text()).toBe("lipovitan");
  });

  test("only hello world", async () => {
    const wrapper = mount(HelloWorld, { props: { modelValue: "" } });
    
    store.message.value = "aromabrew";
    await wrapper.vm.$nextTick();

    expect(wrapper.find("div.store-msg").text()).toBe("aromabrew");
  });
});
```
要從 store 裡拿值也很簡單

beforEach 裡 setActivePinia(createPinia()) 可以避免測試的值被汙染

如果是直接改 store 裡的值 需要額外等待 DOM 更新 (`await wrapper.vm.$nextTick()`)

## 造假元件內部的 function
App.vue 加上這些
```HTML
<script setup lang="ts">
...
function setMsgByFn() {
  return 'This message is from function';
}
</script>

<template>
  <input type="button" id="setMsgByFn" value="setMsgByFn" @click="() => { msg = setMsgByFn()}"/>
...
</template>
```
測試可以用 `vi.spyOn()` 造假此方法
```TypeScript
test("mock function", async () => {
  const wrapper = mount(App);
  const mockFn = vi.spyOn(wrapper.vm, 'setMsgByFn');
  mockFn.mockImplementation(() => 'mocked message');
  await wrapper.find('#setMsgByFn').trigger('click');
    
  expect(wrapper.find("h1").text()).toBe("mocked message");

  mockFn.mockRestore();    
  await wrapper.find('#setMsgByFn').trigger('click');
    
  expect(wrapper.find("h1").text()).toBe("This message is from function");
});
```

## 造假元件外部(引入)的 function
新建 api.ts
```TypeScript
export interface IMyApi {
    getApiMsg: () => string;
}

export const MyApi: IMyApi = {
    getApiMsg: () => 'This msg from api',
};

```
App.vue 加上這些
```HTML
<script setup lang="ts">
...
import { MyApi as api } from './api'
</script>

<template>
  <input type="button" id="setMsgByApi" value="setMsgByApi" @click="() => { msg = api.getApiMsg(); }"/>
...
</template>
```
測試可以用 `vi.mocked()` combo `vi.spyOn()` 造假此方法
```TypeScript
test("mock api", async () => {
  const wrapper = mount(App);
  await wrapper.find('#setMsgByApi').trigger('click');

  expect(wrapper.find('h1').text()).toBe('This msg from api');

  const mockFn = vi.spyOn(vi.mocked(api), 'getApiMsg');
  mockFn.mockImplementation(() => 'mocked message');
  await wrapper.find('#setMsgByApi').trigger('click');
  await wrapper.vm.$nextTick();

  expect(wrapper.find('h1').text()).toBe('mocked message');

  mockFn.mockRestore();
  await wrapper.find('#setMsgByApi').trigger('click');

  expect(wrapper.find('h1').text()).toBe('This msg from api');
});
```

## 依賴注入
有空再說
https://vuejs.org/guide/components/provide-inject.html


## 後記

### Store 傳值 vs Props 傳值

Store 傳值
* 程式的可讀性變差，因為它會讓程式的流程變得複雜，且不易理解。
* 程式的可維護性變差，因為它會讓程式的錯誤更難以追蹤和修正。
* 程式的可重用性變差，因為它會讓程式的模組化和組件化變得更加困難。

以上是一些常見的壞處，但是在某些情況下，也是有其優點的。例如，在需要共享資料的情況下，可以避免資料重複定義和浪費記憶體等問題。但是，需要注意其壞處，並根據具體情況進行選擇。 --By ChatGPT

除了避免浪費記憶體，另外一個使用 pinia 顯而易見的好處是存取方便，不需在組件定義 Props，只需引入對應的 store 即可使用，在組件裡的程式碼較少，看起來比較乾淨

在兩個或多個組件同時需要修改同一個 store 變數時容易造成變數汙染

為了讓邏輯正常運作開始陷入增加 event 或 watch 的循環

當兩個的時候或許還能看得懂

在更多組件的情況下將難以追蹤究竟是誰修改了變數

隨著時間過去，新功能越來越多，變數也無可避免的越來越多，該頁面的 pinia store 有可能會也會越來越長，最後變成要在一堆變數裡找尋需要的東西，我相信這個體驗不會太好的

### 只要有 Quasar 組件跑測試就報錯
> 有用到 UI Framework 測試可能需要安裝額外 NPM 包
> 如 Quasar 需要額外安裝 `@quasar/quasar-app-extension-testing-unit-vitest`

### 已經 await nextTick() 了 expect 仍然是舊的值
> 如果 mock 是用 setTimeout() 的話 test 的時候也要用 setTimeout() 等 不然 DOM 也不會刷新
> 
> 不是 timeout 問題的話 可以嘗試多 await nextTick() 幾次 通常代表有多筆 DOM 更新事件被觸發
https://github.com/yuijzeon/otter-deposit
