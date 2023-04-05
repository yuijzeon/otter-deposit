// @vitest-environment jsdom
import { beforeEach, describe, test, vi } from 'vitest'
import { mount } from "@vue/test-utils";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import * as api from "../src/deposit/apis";
import DepositPage from "../src/deposit/DepositPage.vue";

installQuasarPlugin();
vi.mock('../src/deposit/apis');

describe("DepositPage", async () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    test('test mock 4', async () => {
        vi.mocked(await api.getPaymentOptions).mockReturnValue(Promise.resolve([]));
        const mount1 = mount(DepositPage);
        await api.getPaymentOptions(); // comment this line mock will not work
        console.log(mount1.findAll('button').length);

        vi.mocked(await api.getPaymentOptions).mockRestore();
        const mount2 = mount(DepositPage);
        await api.getPaymentOptions(); // comment this line mock will not work
        console.log(mount2.findAll('button').length); // 15 代表有去 api.ts 中拿資料, 1 代表被 14 行 mock 的值影響
    });

    test('test mock 5', async () => {
        const wrapper = mount(DepositPage);
        await api.getPaymentOptions(); // comment this line mock will not work
        console.log(wrapper.findAll('button').length); // 15 代表有去 api.ts 中拿資料, 1 代表被 14 行 mock 的值影響
    });
});

