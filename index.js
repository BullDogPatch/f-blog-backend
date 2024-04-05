const express = require('express');
require('dotenv').config();
const Blog = require('./models/blog');
// const cors = require('cors');
const app = express();
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

app.get('/api/blogs/:id', (request, response) => {
  const id = request.params.id;
  Blog.findById(id)
    .then(blog => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/api/blogs', (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  blog.save().then(savedBlog => {
    response.status(201).json(savedBlog);
  });
});

app.delete('/api/blogs/:id', (request, response) => {
  Blog.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
