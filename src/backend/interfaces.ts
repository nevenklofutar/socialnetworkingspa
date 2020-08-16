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
    likes: Likes;
    comments: Comment[];
}

export interface PostForUpdate {
    id: number;
    title: string;
    body: string;
}

export interface Likes {
    likesCount: number;
    currentUserLiked: boolean;
}

export interface Comment {
    id: number;
    content: string;
    createdOn: Date;
    commentedByName: string;
}

export interface CommentToAdd {
    postId: number;
    content: string;
    CommentedById: string;
}
