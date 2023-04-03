<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'

const amount = reactive({
  value: 0,
  label: '0',
});

const props = defineProps({
  modelValue: {
    type: Number,
  },
  currency: {
    type: String,
    default: '',
  }
});

const emit = defineEmits(['update:modelValue']);

const locale = computed<String>(() => {
  return {
    "IDR": "id-ID",
    "THB": "th-TH",
    "VND": "vi-VN",
    "MYR": "ms-MY",
    "KRW": "ko-KR",
    "MMK": "my-MM",
    "INR": "hi-IN",
    "JPY": "ja-JP",
    "CNY": "zh-CN",
    "BRL": "pt-BR",
  }[props.currency] || 'en-US';
});

watchEffect(() => {
  if (props.modelValue) {
    amount.value = props.modelValue;
    amount.label = props.modelValue.toLocaleString(locale.value.toString());
  }
})

watchEffect(() => {
  const decimalSign = (0.1).toLocaleString(locale.value.toString())
      .replace(/\d/g, '');
  const amountString = amount.label
      .replace(new RegExp(`[^${decimalSign}\\d]`, 'g'), '')
      .replace(decimalSign, '.');
  amount.value = Math.ceil(Number(amountString));
  amount.label = amount.value.toLocaleString(locale.value.toString());
  emit('update:modelValue', amount.value);
});
</script>

<template>
  <div class="currency-input">
    <span>{{ currency }}</span>
    <input v-model="amount.label">
  </div>
</template>

<style scoped>
.currency-input {
  display: flex;
  align-items: baseline;
  border-radius: 4px;
  border: 1px solid darkgray;
}
.currency-input input {
  border: none;
  text-align: right;
  width: 100%;
  margin: 1px;
}
.currency-input span {
  margin-left: 6px;
  margin-right: 3px;
}
</style>
