// @vitest-environment jsdom
import { ToRefs, toRefs } from "vue";
import { mount, VueWrapper } from "@vue/test-utils";
import { test, expect, describe, beforeEach } from 'vitest'
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { createPinia, setActivePinia, Store } from "pinia";
import { IDepositStore, useDepositStore } from "../src/depositWithPinia/depositStore";
import { PaymentChannel } from "../src/deposit/models";
import PaymentOptionArea from "../src/depositWithPinia/PaymentOptionArea.vue";

installQuasarPlugin();

describe("PaymentOptionAreaWithPinia", () => {
    let wrapper: VueWrapper;
    let store: ToRefs<Store<"deposit", IDepositStore>>;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = toRefs(useDepositStore());
        wrapper = mount(PaymentOptionArea);
    });

    test('hide only one option', async () => {
        store.selectedMethod.value.options = [
            { key: null, name: null, status: 'Active', channels: [new PaymentChannel()] },
        ];

        await wrapper.vm.$nextTick();

        expect(wrapper.find('div').element.style.display).toBe('none');
        expect(store.depositRequest.value.bankCode).toEqual('');
    });
});
