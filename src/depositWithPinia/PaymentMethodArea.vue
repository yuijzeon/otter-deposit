<script setup lang="ts">
import { toRefs, watch } from 'vue'
import { useDepositStore } from './depositStore'
import { PaymentMethod } from "../deposit/models";
const { payments, selectedMethod, depositRequest } = toRefs(useDepositStore());

watch(() => payments, () => {
  if (!payments.value.filter((pm: PaymentMethod) => pm.status === 'Active').some((pm: PaymentMethod) => pm.key === selectedMethod.value.key)) {
    selectedMethod.value = payments.value.filter((pm: PaymentMethod) => pm.status === 'Active')[0];
  }
}, { deep: true });

watch(() => selectedMethod, () => {
  depositRequest.value.paymentMethod = selectedMethod.value?.key || '';
}, { deep: true });
</script>

<template>
  {{ depositRequest.paymentMethod }}
  <div>
      <template v-for="pm in payments">
        <q-btn
            no-caps
            :label="pm.name"
            :disable="pm.status !== 'Active'"
            :color="pm.key === selectedMethod?.key || (!pm.key && !selectedMethod?.key) ? 'primary' : 'grey'"
            @click="() => { selectedMethod = { ...pm }; }"
        />
      </template>
  </div>
</template>

<style scoped>

</style>
