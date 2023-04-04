// @vitest-environment jsdom
import { ToRefs, toRefs } from "vue";
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import { test, expect, describe, beforeEach } from 'vitest'
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { createPinia, setActivePinia, Store } from "pinia";
import { IDepositStore, useDepositStore } from "../src/depositWithPinia/depositStore";
import { PaymentChannel } from "../src/deposit/models";
import AmountArea from "../src/depositWithPinia/AmountArea.vue";

installQuasarPlugin();

describe("PaymentMethodAreaWithPinia", () => {
    let wrapper: VueWrapper;
    let store: ToRefs<Store<"deposit", IDepositStore>>;
    let input: DOMWrapper<HTMLInputElement>;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = toRefs(useDepositStore());
        wrapper = mount(AmountArea);
        input = wrapper.find('input');
    });

    test('out/in of deposit range', async () => {
        store.selectedChannel.value = {
            min: 60,
            max: 1000000,
        } as PaymentChannel;

        await wrapper.vm.$nextTick();

        expect(store.depositRequest.value.amount).toBe(null);

        input.element.value = '100';
        await input.trigger('input');

        expect(store.depositRequest.value.amount).toBe(100);

        input.element.value = '9999999';
        await input.trigger('input');

        expect(store.depositRequest.value.amount).toBe(null);
    });
});
