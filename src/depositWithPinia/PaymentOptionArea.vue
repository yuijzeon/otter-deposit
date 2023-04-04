<script setup lang="ts">
import { toRefs, watch } from 'vue'
import { useDepositStore } from './depositStore'
const { selectedMethod, selectedOption, depositRequest } = toRefs(useDepositStore());

watch(() => selectedMethod.value.options, () => {
  if (!selectedMethod.value.options.filter(pm => pm.status === 'Active').some(pm => pm.key === selectedMethod.value.key)) {
    selectedOption.value = selectedMethod.value.options.filter(pm => pm.status === 'Active')[0];
  }
}, { deep: true });

watch(() => selectedOption, () => {
  depositRequest.value.bankCode = selectedOption.value.key || '';
}, { deep: true });
</script>

<template>
  {{ depositRequest.bankCode }}
  <div v-show="selectedMethod.options.length > 1">
    <template v-for="po in selectedMethod.options">
      <q-btn no-caps
          :label="po.name"
          :disable="po.status !== 'Active'"
          :color="po.key === selectedOption.key || (!po.key && !selectedOption.key) ? 'primary' : 'grey'"
          @click="() => { selectedOption = { ...po }; }"
      />
    </template>
  </div>
</template>

<style scoped>

</style>
