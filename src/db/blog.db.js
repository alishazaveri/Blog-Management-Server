export default function makeBlogsDb({ db, Blog }) {
  return {
    addBlog,
    getBlogById,
    getAllBlogs,
    getAllBlogsByUserId,
    removeBlogById,
    updateBlogById,
  };

  async function addBlog({ blogImageUrl, title, description, userId }) {
    await db.connect();

    const blog = new Blog({
      blogImageUrl,
      title,
      description,
      isDeleted: false,
      userId,
    });

    await blog.save();

    return blog;
  }

  async function getBlogById({ id }) {
    await db.connect();

    const blog = await Blog.findOne({ _id: id, isDeleted: false });

    return blog;
  }

  async function getAllBlogs() {
    await db.connect();

    const blogs = await Blog.find({ isDeleted: false });

    return blogs;
  }

  async function getAllBlogsByUserId({ userId }) {
    await db.connect();

    const blogs = await Blog.find({ userId, isDeleted: false });

    return blogs;
  }

  async function removeBlogById({ id, userId }) {
    await db.connect();

    const blog = await Blog.findOneAndUpdate(
      { _id: id, userId },
      { $set: { isDeleted: true } },
      { new: true }
    );

    return blog;
  }

  async function updateBlogById({ id, updatedInfo, userId }) {
    await db.connect();

    const blog = await Blog.findOneAndUpdate(
      { _id: id, isDeleted: false, userId },
      { $set: { ...updatedInfo } },
      { new: true }
    );

    return blog;
  }
}
