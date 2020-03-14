import bcrypt from 'bcrypt';
import config from '../../config/config';

export default function hashValue({
	password
}) {
	return bcrypt.hashSync(password, config.saltRounds);
}
