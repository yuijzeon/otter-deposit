// @vitest-environment jsdom
import { beforeEach, describe, expect, test } from 'vitest'
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { PaymentChannel } from "../src/deposit/models";
import AmountArea from "../src/deposit/AmountArea.vue";

installQuasarPlugin();

describe("AmountArea", () => {
    let wrapper: VueWrapper;
    let input: DOMWrapper<HTMLInputElement>;

    beforeEach(() => {
        wrapper = mount(AmountArea, {
            props: { modelValue: 0, channel: undefined }
        });
        input = wrapper.find('input');
    });

    test('out/in of deposit range', async () => {
        await wrapper.setProps({
            channel: {
                min: 60,
                max: 1000000,
            } as PaymentChannel,
        });

        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([null]);

        input.element.value = '100';
        await input.trigger('input');

        input.element.value = '200';
        await input.trigger('input');

        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([200]);

        input.element.value = '9999999';
        await input.trigger('input');

        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([null]);
    });
});
