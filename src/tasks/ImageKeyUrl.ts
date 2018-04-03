export class ImageKeyUrl {

    public static value: ImageEntry = {
        "kmr": "https://i.imgur.com/Db2owEp.png",
        "centrum-fire": "https://i.imgur.com/j6q1xF4.png",
        "centrum-wind": "https://i.imgur.com/KpLXcnH.png",
        "centrum-water": "https://i.imgur.com/YMFm4h3.png",
        "centrum-earth": "https://i.imgur.com/hFDSfzO.png",
        "centrum-dark": "https://i.imgur.com/C7GhFNg.png",
        "centrum-light": "https://i.imgur.com/ZQWgpuf.png"
    };

}

interface ImageEntry {
    [Key: string]: string;
}