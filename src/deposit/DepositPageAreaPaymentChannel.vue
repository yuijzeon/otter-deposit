<script setup lang="ts">
import { watch } from 'vue'
import { PaymentChannel } from "./models";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  paymentChannels: {
    type: Array as () => PaymentChannel[],
    required: true,
    default: []
  }
});

const emit = defineEmits(['update:modelValue']);

watch(() => props.paymentChannels, () => {
  if (!props.paymentChannels.filter(pc => pc.status === 'Active').some(pc => pc.key === props.modelValue)) {
    emit('update:modelValue', props.paymentChannels.filter(pc => pc.status === 'Active')[0]?.key || null);
  }
}, { deep: true });
</script>

<template>
  {{ modelValue }}
  <div>
    <template v-for="pc in paymentChannels">
      <q-btn
          no-caps
          :label="`${pc.name}${pc.hasFee ? '*' : ''}`"
          :disable="pc.status !== 'Active'"
          :color="pc.key === modelValue || (!pc.key && !modelValue) ? 'primary' : 'grey'"
          @click="() => { emit('update:modelValue', pc.key) }"
      />
    </template>
  </div>
</template>

<style scoped>

</style>
