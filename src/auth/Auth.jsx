import auth0 from 'auth0-js';
import history from '../history';

export default class Auth {
	accessToken;
	idToken;
	expiresAt;
	
	auth0 = new auth0.WebAuth({
		domain: 'dev-773y2-qd.auth0.com',
    clientID: 'iZtZt1VXPNEKPpmhnyEWVidt9Iwolotn',
    redirectUri: 'http://localhost:3000/',
    responseType: 'token id_token',
    scope: 'openid'
	});

	login = () => {
		this.auth0.authorize();
	}

	handleAuthentication = () => {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
			} else if (err) {
				history.replace('/');
				console.log(err);
				alert(`Error: ${err.error}. Check console for details.`);
			}
		});
	}

	getAccessToken = () => {
		return this.accessToken;
	}

	setSession = (authResult) => {
		localStorage.setItem('isLoggedIn', 'true');

		let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
		this.accessToken = authResult.accessToken;
		this.idToken = authResult.idToken;
		this.expiresAt = expiresAt;

		history.replace('/')
	}

	renewSession = () => {
		this.auth0.checkSession({}, (err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
			}	else if (err) {
				this.logout();
				console.log(err);
				alert(`Could not get a new token (${err.error}: ${err.error_description}).`)
			}
		});
	}

	logout = () => {
		this.accessToken = null;
		this.idToken = null;
		this.expiresAt = 0;

		localStorage.removeItem('isLoggedIn');

		this.auth0.logout({
			returnTo: window.location.origin
		})
	}

	isAuthenticated = () => {
		let expiresAt = this.expiresAt;
		return new Date().getTime() < expiresAt;
	}

}