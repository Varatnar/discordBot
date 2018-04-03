import { Message } from "discord.js";
import { ImageKeyUrl } from "./ImageKeyUrl";

export class ImagePoster {


    static postImageFromKey(message: Message, lookingForKey: string): void {

        let url = ImageKeyUrl.value[lookingForKey];

        if (url) {
            message.channel.send(url);
        }

    }


}

