import { test, expect, describe, beforeEach } from 'vitest'
import { mount, VueWrapper } from "@vue/test-utils";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { PaymentOption } from "../../src/deposit/models";
import DepositPageAreaPaymentMethod from "../../src/deposit/DepositPageAreaPaymentMethod.vue";

installQuasarPlugin();

describe("DepositPageAreaPaymentMethod", () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(DepositPageAreaPaymentMethod, {
            propsData: { modelValue: 'initial', paymentMethods: [] }
        });
    });

    test('choose first active method', async () => {
        await wrapper.setProps({
            paymentMethods: [
                { key: 'bank_transfer', status: 'Inactive' },
                { key: 'line_pay', status: 'Active' },
            ] as PaymentOption[],
        });

        expect(wrapper.findAll('button')[0].element.disabled).toBe(true);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(false);
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['line_pay']);
    });

    test('all payment inactive', async () => {
        await wrapper.setProps({
            paymentMethods: [
                { key: 'bank_transfer', status: 'Inactive' },
                { key: 'line_pay', status: 'Inactive' },
            ] as PaymentOption[],
        });

        expect(wrapper.findAll('button')[0].element.disabled).toBe(true);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(true);
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['']);
    });

    test('choose first method', async () => {
        await wrapper.setProps({
            paymentMethods: [
                { key: 'bank_transfer', status: 'Active' },
                { key: 'line_pay', status: 'Active' },
            ] as PaymentOption[],
        });

        expect(wrapper.findAll('button')[0].element.disabled).toBe(false);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(false);
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['bank_transfer']);
    });
});
