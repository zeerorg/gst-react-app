import { authBackend } from './auth_backend';
import { authStore, START_LOGGING, LOGGED_IN, LOGGED } from './AuthStore';

export default class Authentication {

    constructor() {
        this.store = authStore;
        this.backend = authBackend;
    }

    googleSignIn() {
        this.store.dispatch({
            type: START_LOGGING
        });
        if(this.backend.getCurrentUser() !== null) {
            this.store.dispatch({
                status: LOGGED,
                type: LOGGED_IN,
                user: this.backend.getCurrentUser()
            });
            return;
        }
        this.backend.getRedirectResult().then((userCred) => {
            if(userCred.user === null) {
                this.backend.googleSignIn();
            } else {
                this.store.dispatch({
                    status: LOGGED,
                    type: LOGGED_IN,
                    user: userCred.user
                })
            }
        });
    }

    getState() {
        return this.store.getState();
    }

    subscribe(listener) {
        return this.store.subscribe(listener);
    }

    getStatus() {
        return this.store.getState().status;
    }

    /**
     * Get uid of current user
     * @returns {string}
     */
    getUid() {
        return this.getState().user !== undefined ? this.getState().user.uid : null;
    }
}