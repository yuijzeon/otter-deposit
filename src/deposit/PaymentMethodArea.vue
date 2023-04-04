<script setup lang="ts">
import { watch } from 'vue'
import { PaymentMethod } from "./models";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  paymentMethods: {
    type: Array as () => PaymentMethod[],
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

watch(() => props.paymentMethods, () => {
  if (!props.paymentMethods.filter(pm => pm.status === 'Active').some(pm => pm.key === props.modelValue)) {
    emit('update:modelValue', props.paymentMethods.filter(pm => pm.status === 'Active')[0]?.key || '');
  }
}, { deep: true });
</script>

<template>
  {{ modelValue }}
  <div>
    <template v-for="pm in paymentMethods">
      <q-btn no-caps
          :label="pm.name"
          :disable="pm.status !== 'Active'"
          :color="pm.key === modelValue || (!pm.key && !modelValue) ? 'primary' : 'grey'"
          @click="() => { emit('update:modelValue', pm.key) }"
      />
    </template>
  </div>
</template>

<style scoped>

</style>
