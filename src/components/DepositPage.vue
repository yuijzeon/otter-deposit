<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import * as api from "../deposit/apis";
import { PaymentMethod, PaymentOption, PaymentChannel } from "../deposit/models";
import PaymentMethodArea from "./PaymentMethodArea.vue";
import PaymentOptionArea from "./PaymentOptionArea.vue";
import PaymentChannelArea from "./PaymentChannelArea.vue";
import AmountArea from "./AmountArea.vue";

const selected = reactive({
  amount: 0,
  methodKey: "",
  optionKey: "",
  channelKey: "",
});
const paymentMethods = reactive<PaymentMethod[]>([]);
const selectedMethod = computed<PaymentMethod | null>(() => paymentMethods.find(pm => pm.key === selected.methodKey || (!pm.key && !selected.methodKey)) || null);
const selectedOption = computed<PaymentOption | null>(() => selectedMethod.value?.options.find(po => po.key === selected.optionKey || (!po.key && !selected.optionKey)) || null);
const selectedChannel = computed<PaymentChannel | null>(() => selectedOption.value?.channels.find(pc => pc.key === selected.channelKey || (!pc.key && !selected.channelKey)) || null);

onMounted(async () => {
  paymentMethods.push(...(await api.getPaymentOptions()));
});


</script>

<template>
  <PaymentMethodArea
      v-model="selected.methodKey"
      :paymentMethods="paymentMethods"
  ></PaymentMethodArea>

  <PaymentOptionArea
      v-model="selected.optionKey"
      :paymentOptions="selectedMethod?.options"
  ></PaymentOptionArea>

  <PaymentChannelArea
      v-model="selected.channelKey"
      :paymentChannels="selectedOption?.channels"
  ></PaymentChannelArea>

  <AmountArea
      v-model="selected.amount"
      :channel="selectedChannel"
  ></AmountArea>
  <!--  {{ selectedChannel }}-->
  <br>
</template>

<style scoped>
</style>
