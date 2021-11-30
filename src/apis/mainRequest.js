import { privateRequest, publicRequest } from './config';

class MainRequest {
  async getMain() {
    let result = await publicRequest.get('/main');
    return result.data?.data;
  }

  async changeAvatar(file) {
    const result = await privateRequest.post('/admin/change-avatar', file);
    return result;
  }
}

export default MainRequest;
