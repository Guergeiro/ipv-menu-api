import fetch from "node-fetch";
import { createWriteStream } from "fs";

const downloadFile = (fileUrl: string, fileDest: string): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        const res = await fetch(`${fileUrl}`);
        const writeStream = createWriteStream(`${fileDest}`);
        writeStream.on("ready", () => {
            res.body.pipe(writeStream);
        });
        writeStream.on("error", (e) => {
            reject(e);
        });
        writeStream.on("close", () => {
            resolve(true);
        });
    });
};

export { downloadFile };
