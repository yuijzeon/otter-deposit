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

describe("AmountAreaWithPinia", () => {
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

        depositAmountShouldBe(null);

        await triggerInput('200');
        depositAmountShouldBe(200);

        await triggerInput('9999999');
        depositAmountShouldBe(null);
    });

    function depositAmountShouldBe(storeValue: Number | null) {
        expect(store.depositRequest.value.amount).toBe(storeValue);
    }

    async function triggerInput(value: string) {
        input.element.value = value;
        await input.trigger('input');
    }
});
