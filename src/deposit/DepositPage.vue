<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { PaymentMethod, PaymentOption, PaymentChannel, DepositRequest } from "./models";
import PaymentMethodArea from "./PaymentMethodArea.vue";
import PaymentOptionArea from "./PaymentOptionArea.vue";
import PaymentChannelArea from "./PaymentChannelArea.vue";
import AmountArea from "./AmountArea.vue";
import { DepositApis as api } from "./apis";

const depositForm: DepositRequest = reactive(new DepositRequest());
const paymentMethods: PaymentMethod[] = reactive([]);
const selected: {
  method: PaymentMethod | undefined,
  option: PaymentOption | undefined,
  channel: PaymentChannel | undefined,
} = reactive({
  method: computed(() => paymentMethods
      .find(pm => pm.key === depositForm.paymentMethod || (!pm.key && !depositForm.paymentMethod))),
  option: computed(() => selected.method?.options
      .find(po => po.key === depositForm.bankCode || (!po.key && !depositForm.bankCode))),
  channel: computed(() => selected.option?.channels
      .find(pc => pc.key === depositForm.provider || (!pc.key && !depositForm.provider))),
});

onMounted(async () => {
  paymentMethods.splice(0, paymentMethods.length, ...await api.getPayments());
});

async function doDeposit() {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log({ ...depositForm });
}
</script>

<template>
  <PaymentMethodArea
      v-model="depositForm.paymentMethod"
      :paymentMethods="paymentMethods"
  ></PaymentMethodArea>

  <PaymentOptionArea
      v-model="depositForm.bankCode"
      :paymentOptions="selected.method?.options"
  ></PaymentOptionArea>

  <PaymentChannelArea
      v-model="depositForm.provider"
      :paymentChannels="selected.option?.channels"
  ></PaymentChannelArea>

  <AmountArea
      v-model="depositForm.amount"
      :channel="selected.channel"
  ></AmountArea>

  <br>
  <q-btn no-caps
         label="Deposit"
         color="primary"
         :disable="depositForm.continuable"
         @click="doDeposit()"
  />
</template>

<style scoped>
</style>
