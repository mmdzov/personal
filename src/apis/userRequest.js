import { publicRequest } from './config';

class UserRequest {
  async signUpUser(data) {
    const { data: result } = await publicRequest.post('/user/sign-up', data);
    return result;
  }

  async signInUser(data) {
    const { data: result } = await publicRequest.post('/user/log-in', data);
    return result;
  }

  async verificationUser(code) {
    const { data: result } = await publicRequest.post('/user/verification', {
      verifyCode: code,
    });
    return result;
  }
}

export default UserRequest;
