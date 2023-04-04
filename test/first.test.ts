// @vitest-environment jsdom
import { test, expect } from 'vitest'
import { mount } from "@vue/test-utils";
import CurrencyInput from "../src/components/CurrencyInput.vue";

test('BRL, VND should see diff decimal sign', async () => {
    const propsData: { modelValue: number, currency: String } = {
        modelValue: 1000,
        currency: 'VND'
    };

    const wrapper = mount(CurrencyInput, { propsData });
    const input = wrapper.find('input');

    expect(input.element.value).toBe('1.000');

    input.element.value = '9999';
    await input.trigger('input');

    expect(input.element.value).toBe('9.999');

    input.element.value = '9,999';
    await input.trigger('input');

    expect(input.element.value).toBe('10');
});

test('USDT should see default decimal sign', () => {
    const propsData: { modelValue: number, currency: String } = {
        modelValue: 1000,
        currency: 'USDT'
    };

    const wrapper = mount(CurrencyInput, { propsData });

    expect(wrapper.find('input').element.value).toBe('1,000');
});
