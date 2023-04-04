// @vitest-environment jsdom
import { test, expect, describe, beforeEach } from 'vitest'
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import CurrencyInput from "../src/components/CurrencyInput.vue";

describe("PaymentMethodArea", () => {
    let wrapper: VueWrapper;
    let input: DOMWrapper<HTMLInputElement>;

    beforeEach(() => {
        wrapper = mount(CurrencyInput);
        input = wrapper.find('input');
    });

    test('format number', async () => {
        await wrapper.setProps({ modelValue: 1000, currency: 'THB' });

        expect(input.element.value).toBe('1,000');
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([1000]);

        input.element.value = '8888';
        await input.trigger('input');

        expect(input.element.value).toBe('8,888');
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([8888]);

        input.element.value = '9,999';
        await input.trigger('input');

        expect(input.element.value).toBe('9,999');
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([9999]);

        input.element.value = '9.999';
        await input.trigger('input');

        expect(input.element.value).toBe('10');
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([10]);
    });

    test('BRL, VND should see different decimal sign', async () => {
        await wrapper.setProps({ modelValue: 1000, currency: 'VND' });

        expect(input.element.value).toBe('1.000');
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([1000]);
    });

    test('USDT should see default decimal sign', async () => {
        await wrapper.setProps({ modelValue: 1000, currency: 'USDT' });

        expect(wrapper.find('input').element.value).toBe('1,000');
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([1000]);
    });

});
