export class User {
    token!: string
    user!: {
        username: string
        firstName: string
        lastName: string
    }

    constructor(username: string, firstName: string, lastName: string) {
        this.user = {
            username,
            firstName,
            lastName,
        }
    }
}
