<script setup lang="ts">
import { toRefs } from "vue";
import CurrencyInput from "../components/CurrencyInput.vue";
import { useDepositStore } from './depositStore'
const { payments, selectedMethod, selectedOption, selectedChannel, depositRequest } = toRefs(useDepositStore());

function updateAmount(amountValue: number) {
  if (amountValue > selectedChannel.value.min
      && amountValue < selectedChannel.value.max) {
    depositRequest.value.amount = amountValue;
  }
  else {
    depositRequest.value.amount = null;
  }
}
</script>

<template>
  {{ depositRequest.amount === null ? 'null' : depositRequest.amount }}
  <div>
    <CurrencyInput
        style="width: 250px;"
        :model-value="depositRequest.amount"
        @update:model-value="newValue => updateAmount(newValue)"
        :currency="selectedChannel.currency"
    ></CurrencyInput>

    <template v-if="selectedChannel">
      <template v-for="sa in selectedChannel.suggestAmounts">
        <q-btn no-caps
               :label="`${sa.rank} - ${sa.amount}`"
               @click="() => { updateAmount(sa.amount) }"
        />
      </template>
    </template>
  </div>
</template>

<style scoped>
</style>
