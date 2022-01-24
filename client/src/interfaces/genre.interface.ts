export default interface IGenre {
    id: string;
    name: string;
    type: string;
    href: string;
    color: string;
    images: [
        {
            url: string;
        }
    ];
}
