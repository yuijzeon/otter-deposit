import { beforeEach, describe, expect, test } from 'vitest'
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { PaymentChannel } from "../../src/deposit/models";
import AmountArea from "../../src/deposit/DepositPageAreaAmount.vue";

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

        depositAmountShouldBe(null);

        await triggerInput('200');
        depositAmountShouldBe(200);

        await triggerInput('9999999');
        depositAmountShouldBe(null);
    });

    function depositAmountShouldBe(modelValue: Number | null) {
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([modelValue]);
    }

    async function triggerInput(value: string) {
        input.element.value = value;
        await input.trigger('input');
    }
});
