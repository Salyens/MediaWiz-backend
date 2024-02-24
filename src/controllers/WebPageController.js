const { WebPage } = require("../models/WebPage");

exports.create = async (req, res) => {
  try {
    const page = await WebPage.create(req.body);

    return res.send(page);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.get = async (req, res) => {
  try {
    const page = await WebPage.findOne({});

    if (!page) {
      return res.status(404).send({ message: "Page is not found" });
    }

    return res.send(page);
  } catch (error) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.update = async (req, res) => {
  try {
    const updateData = JSON.parse(req.body.doc);

    if (Array.isArray(req.files)) {
      req.files.forEach(file => {
        const { fieldname, filename } = file;
        updateData[fieldname] = filename;
      });
    }

    const updatedPage = await WebPage.findOneAndUpdate(
      {}, 
      { $set: updateData }, 
      { new: true }
    );

    if (!updatedPage) {
      return res.status(404).send({ message: "Page not found" });
    }

    return res.send(updatedPage);
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).send({ message: "Something is wrong" });
  }
};
