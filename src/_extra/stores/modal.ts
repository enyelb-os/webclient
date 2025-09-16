import { defineStore } from 'pinia'

export enum ModalOptions {
    newDownload,
    editDownload,
    deleteDownload,
}

export default defineStore('newExtraModal', {
    state: () => ({
        title: '',
        options: ModalOptions,
        component: <any>null,
        props: <any>{},
        visible: false,
    }),
    actions: {
        showModal(modalOption: ModalOptions, props: any = {}) {
            this.component = modalOption
            this.visible = true
            this.props = props
        },
        showNewDownloadModal(props: any = {}) {
            this.showModal(ModalOptions.newDownload, props)
        },
        showEditDownloadModal(props: any = {}) {
            this.showModal(ModalOptions.editDownload, props)
        },
        showDeleteDownloadModal(props: any = {}) {
            this.showModal(ModalOptions.deleteDownload, props)
        },
        hideModal() {
            this.visible = false
            this.setTitle('')
        },
        setTitle(new_title: string) {
            this.title = new_title
        },
    },
})
