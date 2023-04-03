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
