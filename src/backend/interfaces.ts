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

export interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    id: string;
}
export interface UserToLogin {
    username: string;
    password: string;
}

export interface UserForForgotPassword {
    email: string;
}

export interface UserForForgotPasswordConfirm {
    password: string;
    passwordConfirm: string;
    email: string;
    token: string;
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
    commentedById: string;
}

export interface CommentToAdd {
    postId: number;
    content: string;
    CommentedById: string;
}

export interface CommentForUpdate {
    postId: number;
    content: string;
    id: number;
}

export interface CommentForDelete {
    postId: number;
    commentId: number;
}

export interface PhotoForUpload {
    photoName: string;
    photoBase64String: string;
    postId: number;
}

export interface PhotosForUpload {
    photos: PhotoForUpload[];
}
