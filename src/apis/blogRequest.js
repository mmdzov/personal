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

  async searchTag(param) {
    const { data } = await publicRequest.post(`/blogs/tags/search`, { search: param });
    return data;
  }

  async getBlogsByTag(param) {
    const { data } = await publicRequest.post(`/blogs/tags/getblogs`, { tag: param });
    return data;
  }

  async getSingleBlog(id) {
    const { data } = await privateRequest.get(`/blogs/blogpost/${id}`);
    return data;
  }

  async replyComment(id, comment) {
    const { data } = await privateRequest.post(`/blogs/blogpost/reply-comment/${id}`, comment);
    return data;
  }

  async likeBlogpost(id, like) {
    const { data } = await privateRequest.post(`/blogs/blogpost/like/${id}`, {
      like: like,
    });
    return data;
  }

  async addComment(id, comment) {
    const { data } = await privateRequest.post(`/blogs/blogpost/comment/${id}`, comment);
    return data;
  }
}

export default BlogRequest;
