import bcrypt from 'bcrypt';

export default function hashValue({
    password
}) {
    return bcrypt.hashSync(password, 10);
}
