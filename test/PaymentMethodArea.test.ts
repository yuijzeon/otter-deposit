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
describe("Search", () => {
    test('choose first active method', async () => {
        await wrapper.setProps({
            paymentMethods: [
                { key: 'neweb_pay', name: 'NewebPay', status: 'Inactive', options: [] },
                { key: 'ec_pay', name: 'ECPay', status: 'Active', options: [new PaymentOption()] },
            ]
        });

        expect(wrapper.findAll('button')[0].element.disabled).toBe(true);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(false);
        expect(wrapper.emitted('update:modelValue')).toEqual([['ec_pay']]);
    });

    test('all payment inactive', async () => {
        await wrapper.setProps({
            paymentMethods: [
                { key: 'neweb_pay', name: 'NewebPay', status: 'Inactive', options: [] },
                { key: 'ec_pay', name: 'ECPay', status: 'Inactive', options: [] },
            ]
        });

        expect(wrapper.findAll('button')[0].element.disabled).toBe(true);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(true);
        expect(wrapper.emitted('update:modelValue')).toEqual([['']]);
    });

    test('choose first method', async () => {
        await wrapper.setProps({
            paymentMethods: [
                { key: 'neweb_pay', name: 'NewebPay', status: 'Active', options: [new PaymentOption()] },
                { key: 'ec_pay', name: 'ECPay', status: 'Active', options: [new PaymentOption()] },
            ]
        });

        expect(wrapper.findAll('button')[0].element.disabled).toBe(false);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(false);
        expect(wrapper.emitted('update:modelValue')).toEqual([['neweb_pay']]);
    });
});
