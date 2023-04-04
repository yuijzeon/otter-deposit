// @vitest-environment jsdom
import { test, expect, describe, beforeEach } from 'vitest'
import { mount, VueWrapper } from "@vue/test-utils";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { PaymentOption } from "../src/deposit/models";
import PaymentMethodArea from "../src/deposit/PaymentMethodArea.vue";

installQuasarPlugin();

let wrapper: VueWrapper;
beforeEach(() => {
    wrapper = mount(PaymentMethodArea, {
        propsData: { modelValue: 'initial', paymentMethods: [] }
    });
});

describe("PaymentMethodArea", () => {
    test('choose first active method', async () => {
        await wrapper.setProps({
            paymentMethods: [
                { key: 'bank_transfer', name: 'Bank Transfer', status: 'Inactive', options: [] },
                { key: 'line_pay', name: 'LinePay', status: 'Active', options: [new PaymentOption()] },
            ]
        });

        expect(wrapper.findAll('button')[0].element.disabled).toBe(true);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(false);
        expect(wrapper.emitted('update:modelValue')).toEqual([['line_pay']]);
    });

    test('all payment inactive', async () => {
        await wrapper.setProps({
            paymentMethods: [
                { key: 'bank_transfer', name: 'Bank Transfer', status: 'Inactive', options: [] },
                { key: 'line_pay', name: 'LinePay', status: 'Inactive', options: [] },
            ]
        });

        expect(wrapper.findAll('button')[0].element.disabled).toBe(true);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(true);
        expect(wrapper.emitted('update:modelValue')).toEqual([['']]);
    });

    test('choose first method', async () => {
        await wrapper.setProps({
            paymentMethods: [
                { key: 'bank_transfer', name: 'Bank Transfer', status: 'Active', options: [new PaymentOption()] },
                { key: 'line_pay', name: 'LinePay', status: 'Active', options: [new PaymentOption()] },
            ]
        });

        expect(wrapper.findAll('button')[0].element.disabled).toBe(false);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(false);
        expect(wrapper.emitted('update:modelValue')).toEqual([['bank_transfer']]);
    });
});
