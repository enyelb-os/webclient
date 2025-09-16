/**
 * state
 */
import state from '@/composables/state'
import useDownloadListPageStore from '@/_extra/stores/pages/downloads'

/**
 * components
 */
const DownloadListView = () => import('@/_extra/views/DownloadList.vue')

/**
 * items routes
 */
const downloads = {
    path: '/downloads',
    name: 'DownloadList',
    component: DownloadListView,
    beforeEnter: async () => {
        state.loading.value = true
        await useDownloadListPageStore()
            .fetchAll()
            .then(() => {
                state.loading.value = false
            })
    },
}

/**
 * routes
 */
const routes = [
    downloads,
]

/**
 * routes
 */
const Routes = {
    downloads: downloads.name,
}

/**
 * export
 */
export const extra = { 
    routes, 
    Routes 
};