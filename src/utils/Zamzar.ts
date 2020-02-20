import { createReadStream, createWriteStream } from "fs";
import fetch from "node-fetch";
import FormData from "form-data";
import { ZamzarJob, ZamzarFile } from "./ZamzarUtils";

export default class Zamzar {
    // Attributes
    private apiKey: string;
    private apiUrl: string;

    // Constructor
    constructor(apiKey: string, apiUrl: string) {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
    }

    downloadFile = (fileId: number, fileDest: string): Promise<any> => {
        return new Promise<any>(async (resolve, reject) => {
            const headers = {
                Authorization: "Basic " + Buffer.from(`${this.apiKey}:`).toString("base64")
            };
            const res = await fetch(`https://${this.apiUrl}.zamzar.com/v1/files/${fileId}/content`, {
                headers: headers
            });
            const writeStream = createWriteStream(`${fileDest}`);
            writeStream.on("ready", () => {
                res.body.pipe(writeStream);
            });
            writeStream.on("error", (e) => {
                reject(e);
            });
            writeStream.on("close", () => {
                resolve(fileDest);
            });
        });
    };

    startConversionJob = async (fileUrl: string, format: string): Promise<ZamzarJob> => {
        const formData: FormData = new FormData();
        formData.append("target_format", format);
        formData.append("source_file", createReadStream(`${fileUrl}`));

        const headers = {
            Authorization: "Basic " + Buffer.from(`${this.apiKey}:`).toString("base64")
        };

        const response = await fetch(`https://${this.apiUrl}.zamzar.com/v1/jobs/`, {
            method: "POST",
            headers: headers,
            body: formData
        });
        return response.json();
    };

    checkConversionJob = async (fileId: number): Promise<ZamzarJob> => {
        const headers = {
            Authorization: "Basic " + Buffer.from(`${this.apiKey}:`).toString("base64")
        };
        const response = await fetch(`https://${this.apiUrl}.zamzar.com/v1/jobs/${fileId}`, {
            headers: headers
        });
        return response.json();
    };

    getAllFiles = async (): Promise<Array<ZamzarFile>> => {
        const headers = {
            Authorization: "Basic " + Buffer.from(`${this.apiKey}:`).toString("base64")
        };
        const response = await fetch(`https://api.zamzar.com/v1/files/`, {
            headers: headers
        });
        return (await response.json())["data"];
    };

    deleteFile = async (fileId: number): Promise<ZamzarFile> => {
        const headers = {
            Authorization: "Basic " + Buffer.from(`${this.apiKey}:`).toString("base64")
        };
        const response = await fetch(`https://api.zamzar.com/v1/files/${fileId}`, {
            method: "DELETE",
            headers: headers
        });
        return response.json();
    };
}

export { ZamzarFile, ZamzarJob };
