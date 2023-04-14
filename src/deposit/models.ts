export class DepositRequest {
    paymentMethod: string | null = null;
    provider: string | null = null;
    bankCode: string | null = null;
    amount: number | null = null;

    get continuable() {
        return this.paymentMethod !== null
          && this.provider !== null
          && this.amount !== null;
    }
}

export class SuggestAmount {
    rank: string = '';
    amount: number = 0;
}

export class PaymentChannel {
    name: string | null = null;
    key: string | null = null;
    status: 'Unknown' | 'Active' | 'Inactive' = 'Unknown';
    hasFee: boolean = false;
    min: number = 0;
    max: number = 0;
    currency: string = '';
    suggestAmounts: SuggestAmount[] = [];
}

export class PaymentOption {
    name: string | null = null;
    key: string | null = null;
    status: 'Unknown' | 'Active' | 'Inactive' = 'Unknown';
    channels: PaymentChannel[] = [];
}

export class PaymentMethod {
    name: string | null = null;
    key: string | null = null;
    status: 'Unknown' | 'Active' | 'Inactive' = 'Unknown';
    options: PaymentOption[] = [];
}
