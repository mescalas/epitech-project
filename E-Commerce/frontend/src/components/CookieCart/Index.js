import Cookies from 'universal-cookie';
export const CookieCart = (product) => {
	const cookie = new Cookies();
	let UserCookie = {};

	if (cookie.get('UserCart') != null) {
		UserCookie = cookie.get('UserCart');
	}

	UserCookie[product] = UserCookie[product] + 1 || 1;
	cookie.set('UserCart', UserCookie, {
		path: '/',
		expires: new Date(Date.now() + 4 * 3600 * 1000),
	});
};
