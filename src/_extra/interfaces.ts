export interface Download {
    id: number,
    download_id: number,
    user_id: number
    album_artist: string,
    album_id: string,
    album_name: string,
    album_type: string,
    artist: string,
    artist_id: string,
    date: string,
    duration: number,
    url_original: string,
    status: 'pending' | 'processing' | 'completed' | 'error'
    title: string,
    track_id: string,
    track_number: number,
}