import { defineStore } from "pinia";

import { Download } from "@/_extra/interfaces";
import { getAllDownloads } from "@/_extra/requests/downloads";

export default defineStore("downloads", {
  state: () => ({
    downloads: <Download[]>[],
  }),
  actions: {
    /**
     * Fetch all downloads from the server
     */
    async fetchAll() {
      const downloads = await getAllDownloads();
      this.downloads = downloads;
    },
    /**
     * Adds a single download to the store
     * @param download Download to add to the store
     * @returns void
     */
    addDownload(download: Download) {
      setTimeout(() => {
        if (this.downloads.some((old) => old.track_id === download.track_id)) {
          return;
        }
        this.downloads.unshift(download);
      }, 250);
    },
    /**
     * Adds a single download to the store
     * @param download[] Download to add to the store
     * @returns void
     */
    addDownloads(downloads: Download[]) {
      downloads.forEach((download) => {
        this.addDownload(download);
      });
    },
    /**
     * Adds a single download to the store
     * @param download Download to add to the store
     * @returns void
     */
    updateDownload(download: Download) {
      setTimeout(() => {
        this.downloads.filter(old => old.track_id === download.track_id).forEach((old) => {
          old.status = download.status;
        });
      }, 250);
    },
    /**
     * Adds a single download to the store
     * @param download Download to add to the store
     * @returns void
     */
    removeDownload(download: Download) {
      setTimeout(() => {
        this.downloads = this.downloads.filter(old => old.track_id !== download.track_id);
      }, 250);
    },
  },
});
