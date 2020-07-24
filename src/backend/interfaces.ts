export class User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
    roles: string[];

    constructor() {}
}

export interface RegisterConfirmParams {
    email: string;
    token: string;
}
