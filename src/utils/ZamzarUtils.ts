interface ZamzarFile {
    id: number;
    key?: string;
    name: string;
    size: number;
    format?: string;
    created_at?: string;
}

interface ZamzarJob {
    id: number;
    key: string;
    status: string;
    sandbox: boolean;
    created_at: string;
    finished_at: string;
    source_file: ZamzarFile;
    target_files: Array<ZamzarFile>;
    target_format: string;
    credit_cost: number;
}

export { ZamzarFile, ZamzarJob };
