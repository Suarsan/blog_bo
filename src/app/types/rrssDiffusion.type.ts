import { RrssConnection } from "./rrssConnection.type";

export interface RrssDiffusion {
    id: number;
    name: string;
    content: string;
    uuid: string;
    rrssConnection: RrssConnection;
}