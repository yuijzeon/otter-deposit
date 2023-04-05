import {PaymentMethod} from "./models";

export const getPaymentOptions: () => Promise<PaymentMethod[]> = async () => {
    const paymentMethods: PaymentMethod[] = [
        {
            key: 'bank_transfer',
            name: 'Bank Transfer',
            status: 'Active',
            options: [
                {
                    key: 'esun',
                    name: 'E.SUN Bank',
                    status: 'Inactive',
                    channels: [
                        {
                            key: 'neweb_pay',
                            name: 'NewebPay',
                            status: 'Active',
                            hasFee: true,
                            min: 200,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 1000
                                },
                                {
                                    rank: 'mid',
                                    amount: 1500
                                },
                                {
                                    rank: 'high',
                                    amount: 2000
                                },
                            ]
                        },
                        {
                            key: 'ec_pay',
                            name: 'ECPay',
                            status: 'Active',
                            hasFee: true,
                            min: 200,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 1000
                                },
                                {
                                    rank: 'mid',
                                    amount: 1500
                                },
                                {
                                    rank: 'high',
                                    amount: 2000
                                },
                            ]
                        },
                        {
                            key: 'otter_pay',
                            name: 'OtterPayment',
                            status: 'Active',
                            hasFee: false,
                            min: 60,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 200
                                },
                                {
                                    rank: 'mid',
                                    amount: 300
                                },
                                {
                                    rank: 'high',
                                    amount: 500
                                },
                            ]
                        }
                    ],
                },
                {
                    key: 'tsib',
                    name: 'Taihsin Bank',
                    status: 'Active',
                    channels: [
                        {
                            key: 'neweb_pay',
                            name: 'NewebPay',
                            status: 'Active',
                            hasFee: true,
                            min: 200,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 1000
                                },
                                {
                                    rank: 'mid',
                                    amount: 1500
                                },
                                {
                                    rank: 'high',
                                    amount: 2000
                                },
                            ]
                        },
                        {
                            key: 'ec_pay',
                            name: 'ECPay',
                            status: 'Active',
                            hasFee: true,
                            min: 200,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 1000
                                },
                                {
                                    rank: 'mid',
                                    amount: 1500
                                },
                                {
                                    rank: 'high',
                                    amount: 2000
                                },
                            ]
                        },
                        {
                            key: 'otter_pay',
                            name: 'OtterPayment',
                            status: 'Active',
                            hasFee: false,
                            min: 60,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 200
                                },
                                {
                                    rank: 'mid',
                                    amount: 300
                                },
                                {
                                    rank: 'high',
                                    amount: 500
                                },
                            ]
                        }
                    ],
                },
                {
                    key: 'uwcb',
                    name: 'Cathay United Bank',
                    status: 'Active',
                    channels: [
                        {
                            key: 'neweb_pay',
                            name: 'NewebPay',
                            status: 'Active',
                            hasFee: true,
                            min: 200,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 1000
                                },
                                {
                                    rank: 'mid',
                                    amount: 1500
                                },
                                {
                                    rank: 'high',
                                    amount: 2000
                                },
                            ]
                        },
                        {
                            key: 'ec_pay',
                            name: 'ECPay',
                            status: 'Active',
                            hasFee: true,
                            min: 200,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 1000
                                },
                                {
                                    rank: 'mid',
                                    amount: 1500
                                },
                                {
                                    rank: 'high',
                                    amount: 2000
                                },
                            ]
                        },
                        {
                            key: 'otter_pay',
                            name: 'OtterPayment',
                            status: 'Active',
                            hasFee: false,
                            min: 60,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 200
                                },
                                {
                                    rank: 'mid',
                                    amount: 300
                                },
                                {
                                    rank: 'high',
                                    amount: 500
                                },
                            ]
                        }
                    ],
                },
                {
                    key: 'ctcb',
                    name: 'ChinaTrust Commercial Bank',
                    status: 'Active',
                    channels: [
                        {
                            key: 'neweb_pay',
                            name: 'NewebPay',
                            status: 'Active',
                            hasFee: true,
                            min: 200,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 1000
                                },
                                {
                                    rank: 'mid',
                                    amount: 1500
                                },
                                {
                                    rank: 'high',
                                    amount: 2000
                                },
                            ]
                        },
                        {
                            key: 'ec_pay',
                            name: 'ECPay',
                            status: 'Active',
                            hasFee: true,
                            min: 200,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 1000
                                },
                                {
                                    rank: 'mid',
                                    amount: 1500
                                },
                                {
                                    rank: 'high',
                                    amount: 2000
                                },
                            ]
                        },
                        {
                            key: 'otter_pay',
                            name: 'OtterPayment',
                            status: 'Active',
                            hasFee: false,
                            min: 60,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 200
                                },
                                {
                                    rank: 'mid',
                                    amount: 300
                                },
                                {
                                    rank: 'high',
                                    amount: 500
                                },
                            ]
                        }
                    ],
                },
            ],
        },
        {
            key: 'credit_card',
            name: 'Credit Card',
            status: 'Inactive',
            options: [],
        },
        {
            key: 'line_pay',
            name: 'LinePay',
            status: 'Active',
            options: [
                {
                    key: null,
                    name: null,
                    status: 'Active',
                    channels: [
                        {
                            key: 'neweb_pay',
                            name: 'NewebPay',
                            status: 'Active',
                            hasFee: false,
                            min: 60,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 100
                                },
                                {
                                    rank: 'mid',
                                    amount: 150
                                },
                                {
                                    rank: 'high',
                                    amount: 200
                                },
                            ]
                        },
                        {
                            key: 'ec_pay',
                            name: 'ECPay',
                            status: 'Active',
                            hasFee: false,
                            min: 200,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 1000
                                },
                                {
                                    rank: 'mid',
                                    amount: 1500
                                },
                                {
                                    rank: 'high',
                                    amount: 2000
                                },
                            ]
                        },
                    ]
                }
            ]
        },
        {
            key: 'usdt_trc20',
            name: 'USDT-TRC20',
            status: 'Active',
            options: [
                {
                    key: null,
                    name: null,
                    status: 'Active',
                    channels: [
                        {
                            key: 'orbital',
                            name: 'Orbital',
                            status: 'Active',
                            hasFee: false,
                            min: 100,
                            max: 1000000,
                            currency: 'TWD',
                            suggestAmounts: [
                                {
                                    rank: 'low',
                                    amount: 150
                                },
                                {
                                    rank: 'mid',
                                    amount: 200
                                },
                                {
                                    rank: 'high',
                                    amount: 300
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ];
    // console.log(paymentMethods);
    await new Promise(resolve => setTimeout(resolve, 500));
    return paymentMethods;
}
