<script setup lang="ts">
import { computed, inject, onMounted, reactive } from 'vue'
import { PaymentMethod, PaymentOption, PaymentChannel, DepositRequest } from "./models";
import PaymentMethodArea from "./PaymentMethodArea.vue";
import PaymentOptionArea from "./PaymentOptionArea.vue";
import PaymentChannelArea from "./PaymentChannelArea.vue";
import AmountArea from "./AmountArea.vue";
import { DepositApis as api } from "./apis";

const selected = reactive<DepositRequest>(new DepositRequest());
const paymentMethods = reactive<PaymentMethod[]>([]);
const selectedMethod = computed<PaymentMethod | undefined>(() => paymentMethods.find(pm => pm.key === selected.paymentMethod || (!pm.key && !selected.paymentMethod)));
const selectedOption = computed<PaymentOption | undefined>(() => selectedMethod.value?.options.find(po => po.key === selected.bankCode || (!po.key && !selected.bankCode)));
const selectedChannel = computed<PaymentChannel | undefined>(() => selectedOption.value?.channels.find(pc => pc.key === selected.provider || (!pc.key && !selected.provider)));

onMounted(async () => {
  // await api.getPayments();
  paymentMethods.push(...(await api.getPayments()));
});

async function doDeposit() {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log({ ...selected });
}
</script>

<template>
  <PaymentMethodArea
      v-model="selected.paymentMethod"
      :paymentMethods="paymentMethods"
  ></PaymentMethodArea>

  <PaymentOptionArea
      v-model="selected.bankCode"
      :paymentOptions="selectedMethod?.options"
  ></PaymentOptionArea>

  <PaymentChannelArea
      v-model="selected.provider"
      :paymentChannels="selectedOption?.channels"
  ></PaymentChannelArea>

  <AmountArea
      v-model="selected.amount"
      :channel="selectedChannel"
  ></AmountArea>

  <br>
  <q-btn no-caps
         label="Deposit"
         color="primary"
         :disable="selected.continuable"
         @click="doDeposit()"
  />
</template>

<style scoped>
</style>
