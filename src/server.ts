import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "path";
import { parseEmenta } from "./ementas/EmentaParser";
import Zamzar from "./utils/Zamzar";
import { ZamzarFile, ZamzarJob } from "./utils/Zamzar";
import { downloadFile } from "./utils/DownloadUtils";
import { Ementa } from "./ementas/Ementa";

const zamzar = new Zamzar(<string>process.env.API_KEY, <string>process.env.API_URL);

async function checkExistingFile() {
    try {
        const allFiles: Array<ZamzarFile> = await zamzar.getAllFiles();

        // Finds newest .xlsx file
        const newestFile: ZamzarFile = allFiles.reduce(
            (previous: ZamzarFile, current: ZamzarFile): ZamzarFile => {
                if (current["format"] != "xlsx") {
                    // Wrong format
                    return previous;
                }
                const previousDate: Date = new Date(<string>previous["created_at"]);
                const currentDate: Date = new Date(<string>current["created_at"]);
                return previousDate.getTime() > currentDate.getTime() ? previous : current;
            }
        );

        // Downloads new file
        await zamzar.downloadFile(newestFile["id"], `${__dirname}/${newestFile["name"]}`);
    } catch (error) {
        throw error;
    }
    return true;
}

async function downloadNewEmenta() {
    try {
        // Gets all files
        const allFiles: Array<ZamzarFile> = await zamzar.getAllFiles();
        console.log("Got all files.");

        // Deletes all files
        for (const file of allFiles) {
            await zamzar.deleteFile(file["id"]);
            console.log(`File ${file["id"]} deleted.`);
        }

        // Download PDF
        await downloadFile("http://www.ipv.pt/sas/ementas/ESTGV.pdf", `${__dirname}/ESTGV.pdf`);
        console.log("Downloaded new PDF.");

        // Start conversion job to .xlsx
        let jobDetails: ZamzarJob = await zamzar.startConversionJob(`${__dirname}/ESTGV.pdf`, "xlsx");
        console.log("Started new conversion job.");

        // Check for finished job
        do {
            jobDetails = await zamzar.checkConversionJob(jobDetails["id"]);
            if (jobDetails["status"] == "failed") {
                const error = new Error("Failed Job.");
                throw error;
            }
            if (jobDetails["status"] == "successful") {
                console.log("Job succesful.");
                break;
            }
        } while (true);

        // Download all files
        for (const file of jobDetails["target_files"]) {
            await zamzar.downloadFile(file["id"], `${__dirname}/${file["name"]}`);
            console.log(`File downloaded to ${__dirname}/${file["name"]}`);
        }
    } catch (error) {
        throw error;
    }
    return true;
}

async function getEmentas() {
    try {
        await checkExistingFile();
        // Parse ementas
        const ementas = parseEmenta(`${__dirname}/ESTGV.xlsx`);

        const newestEmenta: Ementa = ementas.reduce(
            (previous: Ementa, current: Ementa): Ementa => {
                return previous["date"].getTime() > current["date"].getTime() ? previous : current;
            }
        );

        const currentDate = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());

        if (newestEmenta["date"].getTime() < currentDate.getTime()) {
            // Ementa is too old
            console.log("Current ementa is too old. Downloading new one.");
            await downloadNewEmenta();
        }
    } catch (error) {
        console.log("No ementa available. Downloading a new one.");
        await downloadNewEmenta();
    } finally {
        const ementas = parseEmenta(`${__dirname}/ESTGV.xlsx`);
        return ementas;
    }
}

async function startServer() {
    const ementas: Array<Ementa> = [];

    const app: express.Express = express();
    const PORT = process.env.PORT || 8080;
    const limiter: rateLimit.RateLimit = rateLimit({
        windowMs: 24 * 3600 * 1000, // 24h
        max: 100 // 100requests/windowsMs
    });

    app.use(helmet());
    app.use(cors());
    app.use(limiter);
    app.use(express.urlencoded({ extended: true }));

    // Logging for each request
    app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
        const now = new Date();
        const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
        const path = `"${req.method} ${req.path}"`;
        const m = `${req.ip} - ${time} - ${path}`;
        // eslint-disable-next-line no-console
        console.log(m);
        return next();
    });

    app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req["headers"]["accept"] == "application/json") {
            return res.json(ementas);
        }
        return next();
    });

    app.use(express.static(path.join(__dirname, "../public")));

    return app.listen(PORT, function() {
        console.log(`A ${process.env.NODE_ENV} server is listening on port ${PORT}`);
    });
}

startServer();
