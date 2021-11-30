import { publicRequest } from './config';

class MainRequest {
  async getMain() {
    let result = await publicRequest.get('/main');
    return result.data;
  }
}

export default MainRequest;
