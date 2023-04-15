<script setup lang="ts">
import { PaymentChannel } from "./models";
import CurrencyInput from "../components/CurrencyInput.vue";

const props = defineProps({
  modelValue: {
    type: Number,
  },
  channel: {
    type: Object as () => PaymentChannel,
    default: new PaymentChannel(),
  }
});

const emit = defineEmits(['update:modelValue']);

function updateAmount(amountValue: number) {
  if (amountValue > props.channel.min
      && amountValue < props.channel.max) {
    emit('update:modelValue', amountValue);
  }
  else {
    emit('update:modelValue', null);
  }
}
</script>

<template>
  {{ modelValue === null ? 'null' : modelValue }}
  <div>
    <CurrencyInput
        style="width: 250px;"
        :model-value="modelValue"
        @update:model-value="newValue => updateAmount(newValue)"
        :currency="channel.currency"
    ></CurrencyInput>

    <template v-if="channel">
      <template v-for="sa in channel.suggestAmounts">
        <q-btn no-caps
               :label="`${sa.rank} - ${sa.amount}`"
               @click="() => { updateAmount(sa.amount) }"
        ></q-btn>
      </template>
    </template>
  </div>
</template>

<style scoped>
</style>
