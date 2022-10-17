import jwt from 'jsonwebtoken';
const privateKey = 'clave-privada-esto-tiene-que-estar-en-dot-env';

export const jwtSign = async (data) => {
	return jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60,
			data: JSON.stringify(data)
		},
		privateKey
	);
};

export const jwtDecode = (token) => {
	try {
		return jwt.verify(token, privateKey);
	} catch {
		return null;
	}
};
