import { describe, expect, test } from 'vitest'
import { mount } from "@vue/test-utils";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import DepositPage from "../../src/deposit/DepositPage.vue";
import { PaymentMethod, SuggestAmount } from "../../src/deposit/models";

installQuasarPlugin();

describe("DepositPage", async () => {
    test('find 4 button (Method + Channel*2 + suggestAmount*4 + Continue)', async () => {
        const wrapper = mount(DepositPage, createMountOption({
            depositApis: {
                getPayments: async () =>  [
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
                ] as PaymentMethod[]
            }
        }));

        // await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        expect(wrapper.findAll('button').length).toBe(8);
    });

    function createMountOption(provides: {}) {
        return {
            global: {
                provide: provides
            },
        };
    }
});

