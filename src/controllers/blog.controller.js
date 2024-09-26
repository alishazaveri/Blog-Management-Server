import Joi from "joi";
import { statusContants } from "../constants/status.constant.js";
import { addBlog } from "../use-cases/addBlog.js";
import { getBlogById } from "../use-cases/getBlogById.js";
import { getAllBlogs } from "../use-cases/getAllBlogs.js";
import { removeBlogById } from "../use-cases/removeBlogById.js";
import { updateBlogById } from "../use-cases/updateBlogById.js";
import { getAllBlogsByUserId } from "../use-cases/getAllBlogsByUserId.js";

export async function addBlogController(req, res) {
  try {
    const user = req.user;
    const { blogImageUrl, title, description } = req.body;

    validateInput({ blogImageUrl, title, description });

    const { data, error } = await addBlog({
      blogImageUrl,
      title,
      description,
      userId: user._id,
    });

    if (error && error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(statusContants.HTTP_RESPONSE_OK).json({ data });
  } catch (error) {
    console.log("Add Blog Controller Error ", error);
    return res
      .status(statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }

  function validateInput({ blogImageUrl, title, description }) {
    const schema = Joi.object({
      blogImageUrl: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
    });

    const { error } = schema.validate({ blogImageUrl, title, description });
    if (error) {
      return res
        .status(statusContants.HTTP_RESPONSE_FORBIDDEN)
        .json({ error: error.message });
    }
  }
}

export async function getBlogByIdController(req, res) {
  try {
    const { id } = req.params;

    validateInput({ id });

    const { data, error } = await getBlogById({ id });

    if (error && error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(statusContants.HTTP_RESPONSE_OK).json({ data });
  } catch (error) {
    console.log("Get Blog By Id Controller Error ", error);
    return res
      .status(statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }

  function validateInput({ id }) {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate({ id });
    if (error) {
      return res
        .status(statusContants.HTTP_RESPONSE_FORBIDDEN)
        .json({ error: error.message });
    }
  }
}

export async function getAllBlogsController(req, res) {
  try {
    const { data, error } = await getAllBlogs();

    if (error && error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(statusContants.HTTP_RESPONSE_OK).json({ data });
  } catch (error) {
    console.log("Get All Blogs Controller Error ", error);
    return res
      .status(statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

export async function getAllBlogsByUserIdController(req, res) {
  try {
    const user = req.user;

    validateInput({ userId: user._id });

    const { data, error } = await getAllBlogsByUserId({
      userId: user._id,
    });

    if (error && error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(statusContants.HTTP_RESPONSE_OK).json({ data });
  } catch (error) {
    console.log("Get All Blogs By User Id Controller Error ", error);
    return res
      .status(statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }

  function validateInput({ userId }) {
    const schema = Joi.object({
      userId: Joi.string().required(),
    });

    const { error } = schema.validate({ userId });
    if (error) {
      return res
        .status(statusContants.HTTP_RESPONSE_FORBIDDEN)
        .json({ error: error.message });
    }
  }
}

export async function removeBlogByIdController(req, res) {
  try {
    const { id } = req.params;
    const user = req.user;

    validateInput({ id });

    const { data, error } = await removeBlogById({ id, userId: user._id });

    if (error && error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(statusContants.HTTP_RESPONSE_OK).json({ data });
  } catch (error) {
    console.log("Remove Blog By Id Controller Error ", error);
    return res
      .status(statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }

  function validateInput({ id }) {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate({ id });
    if (error) {
      return res
        .status(statusContants.HTTP_RESPONSE_FORBIDDEN)
        .json({ error: error.message });
    }
  }
}

export async function updateBlogByIdController(req, res) {
  try {
    const { id } = req.params;
    const { blogImageUrl, title, description } = req.body;
    const user = req.user;

    validateInput({ id, blogImageUrl, title, description });

    const { data, error } = await updateBlogById({
      id,
      blogImageUrl,
      title,
      description,
      userId: user._id,
    });

    if (error && error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(statusContants.HTTP_RESPONSE_OK).json({ data });
  } catch (error) {
    console.log("Update Blog By Id Controller Error ", error);
    return res
      .status(statusContants.HTTP_RESPONSE_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }

  function validateInput({ id, blogImageUrl, title, description }) {
    const schema = Joi.object({
      id: Joi.string().required(),
      blogImageUrl: Joi.string(),
      title: Joi.string(),
      description: Joi.string(),
    });

    const { error } = schema.validate({ id, blogImageUrl, title, description });
    if (error) {
      return res
        .status(statusContants.HTTP_RESPONSE_FORBIDDEN)
        .json({ error: error.message });
    }
  }
}
