// @vitest-environment jsdom
import { ToRefs, toRefs } from "vue";
import { mount, VueWrapper } from "@vue/test-utils";
import { test, expect, describe, beforeEach } from 'vitest'
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { createPinia, setActivePinia, Store } from "pinia";
import { IDepositStore, useDepositStore } from "../src/depositWithPinia/depositStore";
import { PaymentOption } from "../src/deposit/models";
import PaymentMethodArea from "../src/depositWithPinia/PaymentMethodArea.vue";

installQuasarPlugin();

describe("PaymentMethodAreaWithPinia", () => {
    let wrapper: VueWrapper;
    let store: ToRefs<Store<"deposit", IDepositStore>>;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = toRefs(useDepositStore());
        wrapper = mount(PaymentMethodArea);
    });

    test('choose first active method', async () => {
        store.payments.value = [
            { key: 'bank_transfer', name: 'Bank Transfer', status: 'Inactive', options: [] },
            { key: 'line_pay', name: 'LinePay', status: 'Active', options: [new PaymentOption()] },
        ];

        await wrapper.vm.$nextTick();

        expect(wrapper.findAll('button')[0].element.disabled).toBe(true);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(false);
        expect(store.depositRequest.value.paymentMethod).toEqual('line_pay');
    });

    test('all payment inactive', async () => {
        store.payments.value = [
            { key: 'bank_transfer', name: 'Bank Transfer', status: 'Inactive', options: [] },
            { key: 'line_pay', name: 'LinePay', status: 'Inactive', options: [] },
        ];

        await wrapper.vm.$nextTick();

        expect(wrapper.findAll('button')[0].element.disabled).toBe(true);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(true);
        expect(store.depositRequest.value.paymentMethod).toEqual('');
    });

    test('choose first method', async () => {
        store.payments.value = [
            { key: 'bank_transfer', name: 'Bank Transfer', status: 'Active', options: [new PaymentOption()] },
            { key: 'line_pay', name: 'LinePay', status: 'Active', options: [new PaymentOption()] },
        ];

        await wrapper.vm.$nextTick();

        expect(wrapper.findAll('button')[0].element.disabled).toBe(false);
        expect(wrapper.findAll('button')[1].element.disabled).toBe(false);
        expect(store.depositRequest.value.paymentMethod).toEqual('bank_transfer');
    });
});
