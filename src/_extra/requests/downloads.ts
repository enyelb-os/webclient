import useAxios from '@/requests/useAxios'
import { NotifType, Notification } from '@/stores/notification'

import { paths } from '@/_extra/config'
import { Download } from '@/_extra/interfaces'

const urls = paths.api.download

/**
 * Creates a new download on the server.
 * @param download_name The name of the download to create.
 */
export async function createDownload(url: string) {
    const { data, status } = await useAxios({
        url: urls.new,
        props: { url },
    })

    if (status == 201) {
        new Notification('Download created successfullly!', NotifType.Success)
        return data.downloads as Download[]
    }

    let message = 'Something went wrong'

    if (status == 409) {
        message = 'That download already exists'
    }

    new Notification(message, NotifType.Error)

    return null
}

/**
 * Creates a new download on the server.
 * @param download_name The name of the download to create.
 */
export async function updateDownload(id: string, url: string) {
    const { data, status } = await useAxios({
        url: urls.update,
        props: { id, url },
    })

    if (status == 200) {
        new Notification('Download update successfullly!', NotifType.Success)
        return data.download as Download
    }

    let message = 'Something went wrong'

    if (status == 409) {
        message = 'That download already exists'
    }

    new Notification(message, NotifType.Error)

    return null
}

/**
 * Creates a new download on the server.
 * @param download_name The name of the download to create.
 */
export async function deleteDownload(id: string) {
    const { data, status } = await useAxios({
        url: urls.delete,
        props: { id },
    })

    if (status == 200) {
        new Notification('Download deleted successfullly!', NotifType.Success)
        return data.download as Download
    }

    let message = 'Something went wrong'

    if (status == 409) {
        message = 'That download already exists'
    }

    new Notification(message, NotifType.Error)

    return null
}

/**
 * Fetches all downloads from the server.
 * @returns {Promise<Download[]>} A promise that resolves to an array of downloads.
 */
export async function getAllDownloads(): Promise<Download[]> {
    const { data, error } = await useAxios({
        url: urls.base,
        method: 'GET',
    })

    if (error) console.error(error)

    if (data) {
        return data.data
    }

    return []
}
