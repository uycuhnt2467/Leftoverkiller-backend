import crypto from 'crypto';

export default function getRePassword(password) {
    //加密
    let hashPassword = crypto.createHash('sha1');
    hashPassword.update(password);
    const rePassword = hashPassword.digest('hex');
    //   console.log('rePassword: ' + rePassword);
    return rePassword;
}