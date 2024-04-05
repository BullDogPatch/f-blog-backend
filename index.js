const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);
