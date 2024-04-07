const dummy = blogs => {
  return 1;
};

const numOfLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  return blogs.sort((a, b) => b.likes - a.likes);
};

const mostBlogs = blogs => {
  const blogCount = {};

  blogs.forEach(blog => {
    if (blog.author in blogCount) {
      return blogCount[blog.author]++;
    } else {
      blogCount[blog.author] = 1;
    }
  });

  let maxBlogs = 0;
  let maxBlogsAuthor = '';
  for (const author in blogCount) {
    if (blogCount[author] > maxBlogs) {
      maxBlogs = blogCount[author];
      maxBlogsAuthor = author;
    }
  }

  return {
    author: maxBlogsAuthor,
    blogs: maxBlogs,
  };
};

const mostBlogsWithLodash = blogs => {
  const groupedBlogs = _.groupBy(blogs, 'author');
  const mostBlogsAuthor = _.maxBy(
    Object.keys(groupedBlogs),
    author => groupedBlogs[author].length
  );
  return {
    author: mostBlogsAuthor,
    blogs: groupedBlogs[mostBlogsAuthor].length,
  };
};

module.exports = {
  dummy,
  numOfLikes,
  favoriteBlog,
  mostBlogs,
  mostBlogsWithLodash,
};
