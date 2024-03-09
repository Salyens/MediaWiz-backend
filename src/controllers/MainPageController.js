const { MainPage } = require("../models/MainPage");
const _ = require("lodash");

exports.create = async (req, res) => {
  try {
    const page = await MainPage.create(req.body);

    return res.send(page);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.get = async (req, res) => {
  try {
    const page = await MainPage.findOne({});
    if (!page) {
      return res.status(404).send({ message: "Page is not found" });
    }

    return res.send(page);
  } catch (error) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

// exports.uploadImg = async (req, res) => {
//   try {
//     return res.send("sss");
//   } catch (error) {
//     return res.status(400).send({ message: "Something is wrong" });
//   }
// };

exports.update = async (req, res) => {
  try {
    const updateData = JSON.parse(req.body.doc);
    let fieldsToRemove;
    if (req.body.fieldsToRemove)
      fieldsToRemove = JSON.parse(req.body.fieldsToRemove);

    const page = await MainPage.findOne({});
    if (!page) {
      return res.status(404).send({ message: "Page not found" });
    }

    Object.keys(updateData).forEach((key) => {
      _.set(page, key, updateData[key]);

      const parentPath = key.split(".").slice(0, -1).join(".");
      if (parentPath) page.markModified(parentPath);
    });

    req.files.forEach((file) => {
      const { fieldname, filename } = file;
      _.set(page, fieldname, filename);

      // Если fieldname представляет собой вложенный путь, помечаем родительский путь как измененный
      const parentPath = fieldname.includes(".")
        ? fieldname.split(".").slice(0, -1).join(".")
        : fieldname;
      page.markModified(parentPath);
    });

    const removeArrayElement = (object, path) => {
      const pathParts = path.split(".");
      const lastPart = pathParts.pop();
    
      if (!isNaN(lastPart)) {
        const index = parseInt(lastPart, 10);
        const parentPath = pathParts.join(".");
        const array = _.get(object, parentPath);
    
        if (Array.isArray(array)) {
          if (array.length === 1) {
            // Если это последний элемент в массиве, заменяем его значения на '*'
            const lastElement = array[index];
            Object.keys(lastElement).forEach(key => {
              lastElement[key] = '*';
            });
          } else {
            // Удаляем элемент
            array.splice(index, 1);
          }
        }
      }
    };
    
    

    if (fieldsToRemove) {
      fieldsToRemove
        .sort((a, b) => {
          const aIndex = parseInt(a.split(".").pop(), 10);
          const bIndex = parseInt(b.split(".").pop(), 10);
          return bIndex - aIndex; // Sort in descending order
        })
        .forEach((field) => {
          removeArrayElement(page, field);
          const parentPath = field.split(".").slice(0, -1).join(".");
          page.markModified(parentPath);
        });
    }

    await page.save();

    return res.send(page);
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).send({ message: "Something is wrong" });
  }
};
