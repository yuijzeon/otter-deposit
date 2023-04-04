import { defineStore } from 'pinia'
import { DepositRequest, PaymentChannel, PaymentMethod, PaymentOption } from "../deposit/models";

interface IDepositStore {
    depositRequest: DepositRequest,
    payments: PaymentMethod[],
    selectedMethod: PaymentMethod,
    selectedOption: PaymentOption,
    selectedChannel: PaymentChannel,
}

export const useDepositStore = defineStore('deposit', {
    state: (): IDepositStore => ({
        depositRequest: new DepositRequest(),
        payments: [],
        selectedMethod: new PaymentMethod(),
        selectedOption: new PaymentOption(),
        selectedChannel: new PaymentChannel(),
    }),
})
