import { test, expect, describe, beforeEach } from 'vitest'
import { mount, VueWrapper } from "@vue/test-utils";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { PaymentChannel, PaymentOption } from "../models";
import DepositPageAreaPaymentOption from "../DepositPageAreaPaymentOption.vue";

installQuasarPlugin();

describe("DepositPageAreaPaymentOption", () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(DepositPageAreaPaymentOption, {
            propsData: { modelValue: 'initial', paymentOptions: [] }
        });
    });

    test('hide only one option', async () => {
        const paymentOptions: PaymentOption[] = [
            { key: null, name: null, status: 'Active', channels: [new PaymentChannel()] },
        ];

        await wrapper.setProps({ paymentOptions });

        expect(wrapper.find('div').element.style.display).toBe('none');
        expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['']);
    });
});
