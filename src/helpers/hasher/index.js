import bcrypt from 'bcrypt';
const saltRounds = 10;

export default function hashValue({
    password
}) {
    return bcrypt.hashSync(password, saltRounds);
}