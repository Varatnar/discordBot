import { Message } from "discord.js";
import { ImageKeyUrl } from "./ImageKeyUrl";

export class ImagePoster {


    static postImageFromKey(message: Message, lookingForKey: string): void {

        let centrumElementArray: string[] = ["fire", "wind", "dark", "water", "light", "earth"];

        if (lookingForKey == "centrum") {
            lookingForKey = "centrum-"+centrumElementArray[Math.floor(Math.random() * centrumElementArray.length)]
        }

        let url = ImageKeyUrl.value[lookingForKey];


        if (url) {
            message.channel.send(url);
        }

    }


}

