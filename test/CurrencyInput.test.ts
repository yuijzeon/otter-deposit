// @vitest-environment jsdom
import { test, expect } from 'vitest'
import { mount } from "@vue/test-utils";
import CurrencyInput from "../src/components/CurrencyInput.vue";

test('format number', async () => {
    const propsData: { modelValue: Number, currency: String } = {
        modelValue: 1000,
        currency: 'THB'
    };

    const wrapper = mount(CurrencyInput, { propsData });
    const input = wrapper.find('input');

    expect(input.element.value).toBe('1,000');

    input.element.value = '8888';
    await input.trigger('input');

    expect(input.element.value).toBe('8,888');

    input.element.value = '9,999';
    await input.trigger('input');

    expect(input.element.value).toBe('9,999');

    input.element.value = '9.999';
    await input.trigger('input');

    expect(input.element.value).toBe('10');
});

test('BRL, VND should see different decimal sign', async () => {
    const propsData: { modelValue: Number, currency: String } = {
        modelValue: 1000,
        currency: 'VND'
    };

    const wrapper = mount(CurrencyInput, { propsData });
    const input = wrapper.find('input');

    expect(input.element.value).toBe('1.000');
});

test('USDT should see default decimal sign', async () => {
    const propsData: { modelValue: Number, currency: String } = {
        modelValue: 1000,
        currency: 'USDT'
    };

    const wrapper = mount(CurrencyInput, { propsData });

    expect(wrapper.find('input').element.value).toBe('1,000');
});
