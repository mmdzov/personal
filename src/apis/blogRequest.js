import { publicRequest } from './config';

class BlogRequest {
  async getBlogs() {
    try {
      const { data } = await publicRequest.get('/blogs');
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getCategories() {
    const { data } = await publicRequest.get('/blogs/categories');
    return data;
  }
}

export default BlogRequest;
