import { test, expect, describe, beforeEach } from 'vitest'
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import CurrencyInput from "../../src/components/CurrencyInput.vue";

describe("CurrencyInput", () => {
    let wrapper: VueWrapper;
    let input: DOMWrapper<HTMLInputElement>;

    beforeEach(() => {
        wrapper = mount(CurrencyInput);
        input = wrapper.find('input');
    });

    test('format number', async () => {
        await wrapper.setProps({ modelValue: 1000, currency: 'THB' });

        expect(input.element.value).toBe('1,000');
        depositAmountShouldBe(1000);

        await triggerInput('8888');

        expect(input.element.value).toBe('8,888');
        depositAmountShouldBe(8888);

        await triggerInput('9,999');

        expect(input.element.value).toBe('9,999');
        depositAmountShouldBe(9999);

        await triggerInput('9.999');

        expect(input.element.value).toBe('10');
        depositAmountShouldBe(10);
    });

    test('BRL, VND should see different decimal sign', async () => {
        await wrapper.setProps({ modelValue: 1000, currency: 'VND' });

        expect(input.element.value).toBe('1.000');
        depositAmountShouldBe(1000);
    });

    test('USDT should see default decimal sign', async () => {
        await wrapper.setProps({ modelValue: 1000, currency: 'USDT' });

        expect(input.element.value).toBe('1,000');
        depositAmountShouldBe(1000);
    });

    function depositAmountShouldBe(modelValue: Number) {
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([modelValue]);
    }

    async function triggerInput(value: string) {
        input.element.value = value;
        await input.trigger('input');
    }
});
