export class UserToRegister {
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

export interface UserToLogin {
    username: string;
    password: string;
}

export interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    id: string;
}

export interface SearchUsersParams {
    searchTerm: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    createdById: string;
}
