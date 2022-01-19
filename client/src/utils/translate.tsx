export default function translate(type: string) {
    switch (type) {
        case 'album':
            return 'Album';
        case 'podcast':
            return 'Podcast';
        case 'artist':
            return 'Wykonawca';
        default:
        case 'playlist':
            return 'Playlista';
    }
}
