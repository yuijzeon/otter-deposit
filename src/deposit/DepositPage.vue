<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { PaymentMethod, PaymentOption, PaymentChannel, DepositRequest } from "./models";
import AreaPaymentMethod from "./DepositPageAreaPaymentMethod.vue";
import AreaPaymentOption from "./DepositPageAreaPaymentOption.vue";
import AreaPaymentChannel from "./DepositPageAreaPaymentChannel.vue";
import AreaAmount from "./DepositPageAreaAmount.vue";
import { DepositApis as api } from "./apis";

// Reactive way
const depositForm: DepositRequest = reactive(new DepositRequest());
const paymentMethods: PaymentMethod[] = reactive([]);
const selected: {
  method: PaymentMethod | undefined,
  option: PaymentOption | undefined,
  channel: PaymentChannel | undefined,
} = reactive({
  method: computed(() => paymentMethods
      .find(pm => pm.key === depositForm.paymentMethod)),
  option: computed(() => selected.method?.options
      .find(po => po.key === depositForm.bankCode)),
  channel: computed(() => selected.option?.channels
      .find(pc => pc.key === depositForm.provider)),
});

onMounted(async () => {
  paymentMethods.splice(0, paymentMethods.length, ...await api.getPayments());
});

// Ref way
// const depositForm: Ref<DepositRequest> = ref(new DepositRequest());
// const paymentMethods: Ref<PaymentMethod[]> = ref([]);
// const selected: Ref<{
//   method: PaymentMethod | undefined,
//   option: PaymentOption | undefined,
//   channel: PaymentChannel | undefined,
// }> = ref({
//   method: computed(() => paymentMethods.value
//       .find(pm => pm.key === depositForm.value.paymentMethod)),
//   option: computed(() => selected.value.method?.options
//       .find(po => po.key === depositForm.value.bankCode)),
//   channel: computed(() => selected.value.option?.channels
//       .find(pc => pc.key === depositForm.value.provider)),
// });
//
// onMounted(async () => {
//   paymentMethods.value = await api.getPayments();
//   // paymentMethods.value.splice(0, paymentMethods.value.length, ...await api.getPayments());
// });

async function doDeposit() {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log({ ...depositForm });
}
</script>

<template>
  <AreaPaymentMethod
      v-model="depositForm.paymentMethod"
      :payment-methods="paymentMethods"
  />
  <AreaPaymentOption
      v-model="depositForm.bankCode"
      :payment-options="selected.method?.options"
  />
  <AreaPaymentChannel
      v-model="depositForm.provider"
      :payment-channels="selected.option?.channels"
  />
  <AreaAmount
      v-model="depositForm.amount"
      :channel="selected.channel"
  />
  <br>
  <q-btn
      no-caps
      label="Deposit"
      color="primary"
      :disable="!depositForm.continuable"
      @click="doDeposit()"
  />
</template>

<style scoped>
</style>
