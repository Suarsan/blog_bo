import { RrssType } from "./rrssType.type";

export interface RrssConnection {
    id: number;
    name: string;
    tokens: string;
    rrssType: RrssType;
}