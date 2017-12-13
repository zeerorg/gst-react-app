import { firebaseBase } from '../global/base_backend';

/**
 * This class is purely a backend for authentication, a wrapper for firebase auth.
 * This should not be directly imported instead communication should be through auth_middle
 */
export default class AuthBackend {

    constructor() {
        this.firebase = firebaseBase.firebase;
        this.provider = new this.firebase.auth.GoogleAuthProvider();
        this.userCollection = firebaseBase.database.collection('users');
        this.auth = this.firebase.auth();
    }

    /**
     * Sign In with Google credentials
     * @returns {Promise<any>}
     */
    googleSignIn() {
        console.log(this.auth.Persistence);
        return this.auth.signInWithRedirect(this.provider);
    }

    /**
     * Get redirect result
     * @returns {Promise<void>}
     */
    getRedirectResult() {
        return this.auth.getRedirectResult();
    }

    /**
     * Get current User or null
     */
    getCurrentUser() {
        return this.auth.currentUser;
    }
}

export let authBackend = new AuthBackend();