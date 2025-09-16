<template>
  <form class="download-modal" @submit="update" autocomplete="off">
    <label for="url">URL of {{ title }}</label>
    <br />
    <input
      id="modal-download-url-input"
      type="search"
      class="rounded-sm"
      name="url"
      placeholder="Example: https://youtu.be/u2ah9tWTkmk"
      spellcheck="false"
    />
    <br /><br />
    <button type="submit">Save</button>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { NotifType, Notification } from "@/stores/notification";

import { updateDownload } from "@/_extra/requests/downloads";

import useDownloadStore from "@/_extra/stores/pages/downloads";

const props = defineProps<{
  id: string
  title: string
}>();

const store = useDownloadStore();

onMounted(() => {
  const input_elem = document.getElementById("modal-download-url-input") as HTMLInputElement;
  input_elem.focus();
  input_elem.value = "";
});

const emit = defineEmits<{
  (e: "setTitle", title: string): void;
  (e: "hideModal"): void;
}>();

emit("setTitle", "Download using specific URL");

/**
 * Create a new download. If this modal is called with a track,
 * add the track to the new download.
 * @param {Event} e
 */
function update(e: Event) {
  e.preventDefault();
  const url = (e.target as any).elements["url"].value;

  if (!url.trim()) {
    new Notification("Download url can't be empty", NotifType.Error);
    return;
  }
  updateDownload(props.id, url).then((res) => {
      if (res) {
        store.updateDownload(res);
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
