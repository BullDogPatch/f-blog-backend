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

blogRouter.get('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = blogRouter;
