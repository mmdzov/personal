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

  async changeUsername(username) {
    const result = await privateRequest.post('/admin/change-username', {
      username,
    });
    return result;
  }

  async changeBio(bio) {
    const result = await privateRequest.post('/admin/change-bio', {
      bio,
    });
    return result;
  }

  async changeSkill(skill) {
    const result = await privateRequest.post('/admin/change-skill', skill);
    return result;
  }

  async addSkill(skill) {
    const result = await privateRequest.post('/admin/add-skill', skill);
    return result;
  }
}

export default MainRequest;