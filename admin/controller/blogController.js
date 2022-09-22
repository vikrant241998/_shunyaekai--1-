const blogs = require("../model/blogs");
const sharp = require("sharp");
const AsyncError = require("../middleware/AsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

// New blog create
exports.addNewBlog = AsyncError(async (req, res, next) => {
  const Obj = {};

  const { blog_title, blog_description, blog_categories, page } = req.body;

  if (req.file) {
    let ext = `${req.file.mimetype}`.split("/")[1];
    Obj.name = `blog_${Date.now()}.${ext}`;
  }

  if (!blog_title || !blog_description || !page) {
    return next(new ErrorHandler("Please Enter Valid Data", 400));
  }

  if (page === "Shunya Ekai") {
    await sharp(req.file.path)
      .resize(484, 460)
      .toFile(`public/image/${Obj.name}`);

    sharp.cache(false);

    fs.unlinkSync(req.file.path);
  } else {
    await sharp(req.file.path)
      .resize(1170, 660)
      .toFile(`public/image/${Obj.name}`);

    sharp.cache(false);

    fs.unlinkSync(req.file.path);
  }

  const blogData = await blogs.create({
    blog_title,
    blog_description,
    blog_image: `image/${Obj.name}`,
    blog_categories,
    page,
  });

  res
    .status(201)
    .json({ status: "success", message: "New blog create", data: blogData });
});

// GEt single vlog
exports.getBlog = AsyncError(async (req, res, next) => {
  const blogData = await blogs.findById(req.params.id);
  if (!blogData) {
    return next(new ErrorHandler("Data not found", 400));
  }

  res.status(202).json({ meassage: "Data get succeessfully.", data: blogData });
});

// Get All Blog
exports.getAllBlog = AsyncError(async (req, res, next) => {
  let query = blogs.find();

  if (req.params.page) {
    query = blogs.find({ page: req.params.page });
  }

  const data = await query;

  res.status(200).json({
    status: "success",
    meassage: "Data get succeessfully.",
    data: data,
  });
});

// Update blog
exports.editBlog = AsyncError(async (req, res, next) => {
  const Obj = {};
  const { blog_title, blog_categories, blog_description } = req.body;
  const data = await blogs.findById(req.params.id);
  if (req.file) {
    let ext = `${req.file.mimetype}`.split("/")[1];
    Obj.name = `blog_${Date.now()}.${ext}`;

    await sharp(req.file.path)
      .resize(480, 640)
      .toFile(`public/image/${Obj.name}`);

    fs.unlinkSync(req.file.path);

    const imagePath = `public/${data.blog_image}`;

    fs.unlink(imagePath, function (err) {
      if (err) throw err;
      console.log("delete!'");
    });

    data.blog_image = `image/${Obj.name}`;
    await data.save();
  }

  const ssdata = await blogs.findByIdAndUpdate(
    req.params.id,
    {
      blog_title: blog_title || data.blog_title,
      blog_description: blog_description || data.blog_description,
      blog_categories: blog_categories || data.blog_categories,
      blog_image: Obj.name || data.blog_image,
    },
    { $new: true }
  );
  res.status(201).json({
    status: "success",
    message: "blog update successfully.",
    data: ssdata,
  });
});

// delete blog
exports.deleteBlog = AsyncError(async (req, res, next) => {
  const data = await blogs.findById(req.params.id);
  const imagePath = `public/${data.blog_image}`;
  fs.unlink(imagePath, function (err) {
    if (err) throw err;
    console.log("delete!'");
  });
  await blogs.findByIdAndDelete(req.params.id);
  res
    .status(202)
    .json({ status: "success", meassage: "Blog delete sucessfully" });
});
