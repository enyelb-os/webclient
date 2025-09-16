<template>
  <div class="confirm-modal">
        <div class="t-center" style="padding: 0 4rem">Are you sure you want to permanently delete {{ title }}?</div>
        <div class="buttons">
            <button class="cancel" @click="cancel">Cancel</button>
            <button class="confirm" @click="deleted">Delete</button>
        </div>
    </div>
</template>

<script setup lang="ts">

import { deleteDownload } from "@/_extra/requests/downloads";

import useDownloadStore from "@/_extra/stores/pages/downloads";

const props = defineProps<{
  id: string
  title: string
}>();

const store = useDownloadStore();

const emit = defineEmits<{
  (e: "setTitle", title: string): void;
  (e: "hideModal"): void;
}>();

emit("setTitle", "");

/**
 * Create a new download. If this modal is called with a track,
 * add the track to the new download.
 * @param {Event} e
 */
function cancel(e: Event) {
  emit("hideModal");
}

/**
 * Create a new download. If this modal is called with a track,
 * add the track to the new download.
 * @param {Event} e
 */
function deleted(e: Event) {
  deleteDownload(props.id).then((res) => {
      if (res) {
        store.removeDownload(res);
      }
      emit("hideModal");
    });  
}
</script>

<style lang="scss">
.download-modal {
  grid-gap: 1rem;
  margin-top: 1rem;

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: $gray1;
  }

  .submit {
    display: flex;
    justify-content: flex-end;
  }

  button {
    margin: 0 auto;
    width: 8rem;
    padding: 1.25rem;
    // font-weight: normal;
    background-color: $white;
    color: $black;

    &:hover {
      color: $white;
    }
  }
}
</style>
