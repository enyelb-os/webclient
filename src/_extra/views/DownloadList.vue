<template>
    <div id="p-view" class="content-page">
        <Header>
            <template #name>Downloads</template>
            <template #description>
                You have {{ pendings.length + downloads.length }} downloads in your library
                <br />
                <form spellcheck="false" @submit.prevent="() => {}">
                    <input
                        id="downloadsearch"
                        v-model="input"
                        class="rounded-sm no-border"
                        type="search"
                        placeholder="Search downloads"
                        name=""
                    />
                </form>
            </template>
            <template #right>
                <button class="download-button" @click="showNewDownloadModal()">
                    <PlusSvg /> New Download
                </button>
            </template>
        </Header>
        <div class="folder-view v-scroll-page" :class="{ isSmall, isMedium }">
            <div>
                <DownloadItem 
                    v-for="track in pendings" 
                    :key="track.id"
                    :track="track"
                />
            </div>
        </div>
        <div class="folder-view v-scroll-page" :class="{ isSmall, isMedium }">
            <div>
                <DownloadItem 
                    v-for="track in downloads" 
                    :key="track.id"
                    :track="track"
                />
            </div>
        </div>
        <!--DownloadCardGroup v-if="!query && pendingDonwloads.length" :downloads="pendingDonwloads" :title="'Pending'" />
        <DownloadCardGroup
            v-if="othersDownloads.length"
            :downloads="othersDownloads"
            :title="query ? 'Search Results' : `${pendingDonwloads.length ? 'Other' : 'All'} Downloads`"
        /-->
        <NoItems
            :flag="!(pendings.length + downloads.length)"
            :icon="DownloadSvg"
            :title="'No downloads found'"
            :description="description"
        />
    </div>
</template>

<script setup lang="ts">
import { debouncedRef } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'

import { isMedium, isSmall, isSmallPhone } from '@/stores/content-width'


import { useFuse } from '@/utils'
import updatePageTitle from '@/utils/updatePageTitle'

import DownloadSvg from '@/assets/icons/playlist-1.svg'
import PlusSvg from '@/assets/icons/plus.svg'
import Header from '@/components/shared/GenericHeader.vue'
import NoItems from '@/components/shared/NoItems.vue'

import usePStore from '@/_extra/stores/pages/downloads'
import useModalStore from '@/_extra/stores/modal'
import DownloadItem from '@/_extra/components/DownloadsList/DownloadItem.vue'
import { Download } from '../interfaces'

const store = usePStore()
const { showNewDownloadModal } = useModalStore()

const input = ref('')
const query = debouncedRef(input, 300)

const description = `You can create a download by right clicking on a track and selecting the
        "Add to Download" option`


onMounted(() => {
    updatePageTitle('Downloads')
})

const pendings = computed<Download[]>(() => store.downloads.filter(d => d.status === 'pending'))

const downloads = computed<Download[]>(() => {
    if (!query.value) {
        return store.downloads.filter(d => d.status !== 'pending')
    }

    const p = useFuse(query.value, store.downloads, {
        keys: ['title', 'album_artist', 'album_name'],
    })

    return p.value.map(r => r.item)
})
</script>

<style lang="scss">
#p-view {
    padding-bottom: $content-padding-bottom;
    height: 100%;
    overflow: auto;

    .download-button {
        svg {
            height: 1.5rem;
        }
    }

    .grid {
        grid-template-columns: repeat(auto-fill, minmax($cardwidth, 1fr));
        gap: 2.5rem 1.5rem;

        @include mediumPhones {
            grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
            gap: 1rem;
        }
    }

    #downloadsearch {
        width: 16rem;
        max-width: 100%;
        margin-top: 1rem;
        background-color: $gray5;
        color: white;
        font-size: 0.95rem;
        font-weight: 500;
        padding: $medium;
        outline: none;
        appearance: none;
    }

    .download-button {
        padding-right: $medium;
    }

    .nothing {
        height: 50%;

        svg {
            margin-bottom: 0;
        }
    }
}
</style>
