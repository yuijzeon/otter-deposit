<script setup lang="ts">
import { watch } from 'vue'
import { PaymentOption } from "../deposit/models";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  paymentOptions: {
    type: Array as () => PaymentOption[],
    required: true,
    default: []
  }
});

const emit = defineEmits(['update:modelValue']);

watch(() => props.paymentOptions, () => {
  if (!props.paymentOptions.filter(po => po.status === 'Active').some(po => po.key === props.modelValue)) {
    emit('update:modelValue', props.paymentOptions.filter(po => po.status === 'Active')[0]?.key || '');
  }
}, { deep: true });
</script>

<template>
  {{ modelValue }}
  <div v-show="paymentOptions.length > 1">
    <template v-for="po in paymentOptions">
      <q-btn no-caps
          :label="po.name"
          :disable="po.status !== 'Active'"
          :color="po.key === modelValue || (!po.key && !modelValue) ? 'primary' : 'grey'"
          @click="() => { emit('update:modelValue', po.key) }"
      />
    </template>
  </div>
</template>

<style scoped>

</style>
