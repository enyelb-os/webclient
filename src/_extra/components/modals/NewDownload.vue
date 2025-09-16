<template>
  <form class="download-modal" @submit="create" autocomplete="off">
    <label for="url">URL</label>
    <br />
    <input
      id="modal-download-url-input"
      type="search"
      class="rounded-sm"
      name="url"
      placeholder="Example: https://open.spotify.com/intl-es/album/5i9lMMUZ1QZNsLEE3j50kT"
      spellcheck="false"
    />
    <br /><br />
    <button type="submit">Create</button>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { NotifType, Notification } from "@/stores/notification";

import { createDownload } from "@/_extra/requests/downloads";

import useDownloadStore from "@/_extra/stores/pages/downloads";

const props = defineProps<{
  download_url?: string;
}>();

const store = useDownloadStore();

onMounted(() => {
  const input_elem = document.getElementById("modal-download-url-input") as HTMLInputElement;
  input_elem.focus();
  input_elem.value = props.download_url || "";
});

const emit = defineEmits<{
  (e: "setTitle", title: string): void;
  (e: "hideModal"): void;
}>();

emit("setTitle", "New Download");

/**
 * Create a new download. If this modal is called with a track,
 * add the track to the new download.
 * @param {Event} e
 */
function create(e: Event) {
  e.preventDefault();
  const url = (e.target as any).elements["url"].value;

  if (!url.trim()) {
    new Notification("Download url can't be empty", NotifType.Error);
    return;
  }
  createDownload(url).then((res) => {
      if (res) {
        store.addDownloads(res);
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
