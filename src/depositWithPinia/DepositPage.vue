<script setup lang="ts">
import { onMounted, inject, toRefs } from 'vue'
import PaymentMethodArea from "./PaymentMethodArea.vue";
import PaymentOptionArea from "./PaymentOptionArea.vue";
import PaymentChannelArea from "./PaymentChannelArea.vue";
import AmountArea from "./AmountArea.vue";
import { IDepositApis } from "../deposit/apis";
import { useDepositStore } from './depositStore'

const api: IDepositApis = inject('depositApis')!;
const { depositRequest, payments } = toRefs(useDepositStore());

onMounted(async () => {
  payments.value.push(...(await api.getPayments()));
});

async function doDeposit() {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log({ ...depositRequest.value });
}
</script>

<template>
  <PaymentMethodArea></PaymentMethodArea>
  <PaymentOptionArea></PaymentOptionArea>
  <PaymentChannelArea></PaymentChannelArea>
  <AmountArea></AmountArea>
  <br>
  <q-btn no-caps
         label="Deposit"
         color="primary"
         :disable="depositRequest.continuable"
         @click="doDeposit()"
  />
</template>

<style scoped>
</style>
