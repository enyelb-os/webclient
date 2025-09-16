<template>
    <!-- 👇 login modal should not be dismissable -->
    <div v-if="modal.visible" class="extra-modal">
        <div class="bg" @click="modal.hideModal"></div>
        <div
            v-motion-slide-top
            class="m-content rounded"
            :class="{
                downloads: modal.component == modal.options.newDownload,
            }"
        >
            <!-- TODO: MOVE MAX WIDTH TO CLASS -->
            <div class="heading">{{ modal.title }}</div>
            <NewDownload
                v-if="modal.component == modal.options.newDownload"
                v-bind="modal.props"
                @hideModal="modal.hideModal"
                @setTitle="modal.setTitle"
            />
            <EditDownload
                v-if="modal.component == modal.options.editDownload"
                v-bind="modal.props"
                @hideModal="modal.hideModal"
                @setTitle="modal.setTitle"
            />
            <DeleteDownload
                v-if="modal.component == modal.options.deleteDownload"
                v-bind="modal.props"
                @hideModal="modal.hideModal"
                @setTitle="modal.setTitle"
            />
        </div>
    </div>
</template>

<script setup lang="ts">

import useModalStore from '@/_extra/stores/modal'

const modal = useModalStore()

import NewDownload from '@/_extra/components/modals/NewDownload.vue'
import EditDownload from '@/_extra/components/modals/EditDownload.vue'
import DeleteDownload from '@/_extra/components/modals/DeleteDownload.vue'

</script>

<style lang="scss">
.extra-modal {
    position: fixed;
    z-index: 21;
    height: 100vh;
    width: 100vw;
    display: grid;
    place-items: center;

    .m-content {
        max-width: 30rem;
    }

    input[type='search'] {
        margin: $small 0;
        border: none;
        background-color: $gray5;

        color: #fff;
        width: 100%;
        padding: $small $medium;
        font-size: 14px;
        outline: none;
        height: 2.75rem !important;
    }

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // opacity: 0;
        // visibility: hidden;
        background-color: rgb(0, 0, 0, 0.6);
        // transition: opacity 300ms ease, visibility 300ms ease;
        //background-color: rgba(22, 22, 22, 0.8);
        // backdrop-filter: blur(5px);
    }

    .m-content {
        width: calc(100% - 4rem);
        max-height: calc(100% - 4rem);
        padding: 2rem 1.25rem;
        position: relative;
        background-color: $black;

        @include allPhones {
            width: calc(100% - 2rem);
            max-height: calc(100% - 2rem);
            padding: 2rem 1rem;
        }
    }

    .m-content.downloads {
        max-width: 50rem !important;
    }
}
</style>
