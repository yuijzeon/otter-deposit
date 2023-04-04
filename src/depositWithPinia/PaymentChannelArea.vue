<script setup lang="ts">
import { toRefs, watch } from 'vue'
import { useDepositStore } from './depositStore'
const { selectedOption, selectedChannel, depositRequest } = toRefs(useDepositStore());

watch(() => selectedOption.value.channels, () => {
  if (!selectedOption.value.channels.filter(pc => pc.status === 'Active').some(pc => pc.key === selectedOption.value.key)) {
    selectedChannel.value = selectedOption.value.channels.filter(pc => pc.status === 'Active')[0];
  }
}, { deep: true });

watch(() => selectedChannel, () => {
  depositRequest.value.provider = selectedChannel.value.key || '';
}, { deep: true });
</script>

<template>
  {{ depositRequest.provider }}
  <div>
    <template v-for="pc in selectedOption.channels">
      <q-btn no-caps
          :label="`${pc.name}${pc.hasFee ? '*' : ''}`"
          :disable="pc.status !== 'Active'"
          :color="pc.key === selectedChannel.key || (!pc.key && !selectedChannel.key) ? 'primary' : 'grey'"
          @click="() => { selectedChannel = { ...pc }; }"
      />
    </template>
  </div>
</template>

<style scoped>

</style>
