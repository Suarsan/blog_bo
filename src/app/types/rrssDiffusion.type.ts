import { RrssConnection } from "./rrssConnection.type";

export interface RrssDiffusion {
    id: number;
    name: string;
    content: string;
    date: string;
    uuid: string;
    rrssConnection: RrssConnection;
}