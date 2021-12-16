import { privateRequest, publicRequest } from './config';

class MainRequest {
  async auth(token) {
    let { data } = await publicRequest.get('/auth', {
      headers: {
        authorization: token,
      },
    });
    return data;
  }

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

  async addTimeline(timeline) {
    const result = await privateRequest.post('/admin/add-timeline', timeline);
    return result;
  }

  async changeTimeline(timeline) {
    const result = await privateRequest.post('/admin/change-timeline', timeline);
    return result;
  }

  async deleteSkill(id) {
    const { data } = await privateRequest.post('/admin/remove-skill', { id });
    return data;
  }

  async deleteTimeline(id) {
    const { data } = await privateRequest.post('/admin/remove-timeline', { id });
    return data;
  }
}

export default MainRequest;
