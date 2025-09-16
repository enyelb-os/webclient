<template>
    <div class="download-item rounded-sm">
        <span>
            {{ track.track_number }}
        </span>
        <span>
            <a :href="`https://music.youtube.com/search?q=${track.title}`" target="_blank">{{ track.title }}</a>
        </span>
        <span>
            <span :class="track.status">
                {{ track.status }}
            </span>
        </span>
        <span>
            {{ track.album_name }} 
        </span>
        <span>
            {{ track.album_artist }}
        </span>
        <span>
            {{ formatSeconds(track.duration) }}
        </span>
        <span>
            <PencilSvg class="edit" @click="showEditDownloadModal(track)" />
        </span>
        <span>
            <DeleteSvg class="delete" @click="showDeleteDownloadModal(track)" />
        </span>
    </div>
</template>

<script setup lang="ts">
import DeleteSvg from '@/assets/icons/delete.svg'
import PencilSvg from '@/assets/icons/pencil.svg'

import { formatSeconds } from '@/utils'

import { Download } from '@/_extra/interfaces'
import useModalStore from '@/_extra/stores/modal'

const { showEditDownloadModal, showDeleteDownloadModal } = useModalStore()

const props = defineProps<{
    track: Download
}>()

</script>

<style lang="scss">
// NOTE: CSS for responsiveness is at app-grid.scss

.download-item {
    display: grid;
    grid-template-columns: 1.75rem 1fr 4.75rem 1fr 1fr 4.5rem 1.5rem 1.5rem;
    align-items: center;
    justify-content: flex-start;
    gap: 0.4rem;
    font-weight: 500;
    line-height: 1.2;
    height: $song-item-height;
    padding-left: $small;
    position: relative;
    transition: background-color 0.2s ease-out;

    .completed, .pending, .error, .url {
        margin: 0px 4px;
        padding: 2px 5px;
        border-radius: 10px;
    }
    .completed {
        background: rgb(80, 175, 85);
    }
    .pending {
        background: rgb(177, 44, 155);
    }
    .error {
        background: rgb(177, 44, 51);
    }
    .url {
        background: rgb(82, 179, 162);
    }

    .delete {
        transform: scale(0.75);
        margin-bottom: -0.2rem;
        color: $red !important;
        height: 1.5rem;
    }

    .edit {
        transform: scale(0.75);
        margin-bottom: -0.15rem;
        color: $white !important;
        height: 1.2rem;
    }

    &:hover {
        background-color: $gray;

        .index.ready {
            .text {
                transition-delay: 400ms;

                transform: translateX(0);
                opacity: 0;
            }

            .heart-icon {
                transition-delay: 400ms;
                transform: translateX(0);
                opacity: 1;
                visibility: visible;
            }
        }

        .song-duration.has_help_text {
            opacity: 0;
        }

        // INFO: Show help text on hover
        .song-duration.help-text {
            opacity: 1;
        }

        .options-and-duration .heart-icon.showInlineFavIcon {
            display: block;
        }
    }

    .index {
        overflow: unset !important;

        .heart-icon {
            opacity: 0;
            visibility: hidden;
        }
    }

    .song-artists {
        width: fit-content;
        max-width: calc(100% - 10px);
    }
}

.songlist-item.current {
    background-color: $gray;
}

.songlist-item.contexton {
    background-color: $gray4 !important;
}
</style>
