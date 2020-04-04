import fetch from "node-fetch";
import { createWriteStream } from "fs";

const downloadFile = (fileUrl: string, fileDest: string) => {
    return new Promise<boolean>((resolve, reject) => {
        fetch(fileUrl)
            .then((data) => {
                const writeStream = createWriteStream(`${fileDest}`);
                writeStream.on("ready", () => {
                    data.body.pipe(writeStream);
                });
                writeStream.on("error", (e) => {
                    return reject(e);
                });
                writeStream.on("close", () => {
                    return resolve(true);
                });
            })
            .catch((error) => {
                return reject(error);
            });
    });
};

export { downloadFile };
