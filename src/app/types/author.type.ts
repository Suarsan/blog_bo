import { Context } from './context.type';

export interface Author {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    context?: Context;
}
