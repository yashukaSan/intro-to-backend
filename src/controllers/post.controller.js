import { Post } from "../models/post.model.js";

//Create a post
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "All Feild required",
      });
    }
    const post = await Post.create({ name, description, age });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//Read all the posts
const getPost = async (req, res) => {
  try {
    const getPosts = await Post.find();
    res.status(200).json(getPosts);
  } catch (err) {
    rea.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    //basic validation to check is the body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No data provided for the update",
      });
    }
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post)
      return res.status(404).json({
        message: "Not Found",
      });

    res.status(200).json({
      message: "Post successfully updated",
      post,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deletePost = async (req, res) =>{
    try{
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({
            message: "POST not found"
        });

        return res.status(200).json({
            message: "successfully deleted"
        });
    }
    catch(err){
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export { createPost, getPost, updatePost, deletePost };
