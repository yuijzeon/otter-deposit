<script setup lang="ts">
import { watchEffect } from 'vue'
import { PaymentChannel } from "../deposit/models";
import CurrencyInput from "./CurrencyInput.vue";

const props = defineProps({
  modelValue: {
    type: Number,
  },
  channel: {
    type: Object as () => PaymentChannel,
  }
});

const currency = 'USDT';
const emit = defineEmits(['update:modelValue']);

watchEffect(() => {
  emit('update:modelValue', props.modelValue);
});
</script>

<template>
  {{ modelValue === null ? 'null' : modelValue }}
  <div>
    <CurrencyInput
        :model-value="modelValue"
        @update:model-value="newValue => emit('update:modelValue', newValue)"
        :currency="currency"
    ></CurrencyInput>
    <br>
    <template v-if="channel">
      <template v-for="ar in channel.amountRanges">
        {{ ar }}
      </template>
    </template>

  </div>
</template>

<style scoped>
</style>
