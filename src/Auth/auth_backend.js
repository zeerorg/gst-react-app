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
     * TODO: Add a persistence state
     * Sign In with Google credentials
     * @returns {Promise<any>}
     */
    googleSignIn = () => {
        return new Promise((resolve, reject) => {
            // wanted to add persistence since this project started, it's now almost 6 months old
            // took me a freaking 6 months to solve this bug, this night no one can stop me
            this.firebase.auth().setPersistence(this.firebase.auth.Auth.Persistence.LOCAL).then(() => {
                this.auth.signInWithRedirect(this.provider);
            });
        });
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

    /**
     * Check user state and pass it to function
     */
    statusCall(func) {
        this.firebase.auth().onAuthStateChanged(func);
    }
}

export let authBackend = new AuthBackend();