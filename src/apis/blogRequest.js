import { privateRequest, publicRequest } from './config';

class BlogRequest {
  async getBlogs(page) {
    try {
      const { data } = await publicRequest.post('/blogs', { page });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getCategories() {
    const { data } = await publicRequest.get('/blogs/categories');
    return data;
  }

  async getTags() {
    const { data } = await publicRequest.get('/blogs/tags');
    return data;
  }

  async addPostImage(blogimage) {
    const { data } = await privateRequest.post('/blogs/add-post-image', blogimage);
    return data;
  }

  async addBlog(blog) {
    const { data } = await privateRequest.post('/blogs/add', blog);
    return data;
  }

  async getBlogsByCategory(category, page) {
    const { data } = await publicRequest.get(`/blogs/get-by-category/${category}/${page}`);
    return data;
  }
}

export default BlogRequest;
