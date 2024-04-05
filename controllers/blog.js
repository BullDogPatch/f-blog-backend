const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

blogRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        return response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

blogRouter.post('/', (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  blog
    .save()
    .then(savedBlog => {
      response.json(savedBlog);
    })
    .catch(error => next(error));
});

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = blogRouter;
