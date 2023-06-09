import { beforeEach, describe, expect, test, vi } from 'vitest'
import { flushPromises, mount } from "@vue/test-utils";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import DepositPage from "../../src/deposit/DepositPage.vue";
import { PaymentMethod, SuggestAmount } from "../../src/deposit/models";
import { DepositApis } from "../../src/deposit/apis";

installQuasarPlugin();
vi.mock("../../src/deposit/apis");

describe("DepositPage", async () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    test('find 4 button (Method + Channel*2 + suggestAmount*4 + Continue)', async () => {
        vi.mocked(DepositApis.getPayments).mockResolvedValue([
            {
                status: 'Active',
                options: [
                    {
                        status: 'Active',
                        channels: [
                            {
                                status: 'Active',
                                suggestAmounts: [
                                    new SuggestAmount(),
                                    new SuggestAmount(),
                                    new SuggestAmount(),
                                    new SuggestAmount(),
                                ]
                            }
                        ]
                    }
                ]
            }
        ] as PaymentMethod[]);

        const wrapper = mount(DepositPage);
        await flushPromises();

        expect(wrapper.findAll('button').length).toBe(8);
    });

    test('find 15 button', async () => {
        const wrapper = mount(DepositPage);
        await new Promise(resolve => setTimeout(resolve, 500));
        await flushPromises();

        expect(wrapper.findAll('button').length).toBe(15);
    });
});

