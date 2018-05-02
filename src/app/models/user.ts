export class User {
    name: string;
    email: string;
    address: string;
    phone: string;
    gender: boolean;
    age: number;
    avatar: string;
    created_at: Date;
    description: string;
    updated_at: Date;
    list_favorite: object;
    file_url: string;
    roles: object;

    constructor(authData) {
        this.email = authData.email;
        this.avatar = authData.photoURL;
        this.roles = { reader: true };
    }
}
