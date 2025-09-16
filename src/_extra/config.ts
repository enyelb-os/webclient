export const paths = {
    api: {
        download: {
            base: '/extra/downloads',
            get new() {
                return this.base + '/new'
            },
            get update() {
                return this.base + '/update'
            },
            get delete() {
                return this.base + '/delete'
            },
        },
    },
}
