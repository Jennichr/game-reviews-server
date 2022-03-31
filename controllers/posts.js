var GameModel = require('../models/postGame');

const getPost = async (req, res) => {
    try {
        const postGames = await GameModel.find();
        res.status(200).json(postGames);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const postGames = await GameModel.findById(id);
        res.status(200).json(postGames);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
    const data = req.body;
    const newGame = new GameModel({
        title: data.title,
        description: data.description,
        release_date: data.release_date,
        developer: data.developer,
        publisher: data.publisher,
        image: data.image,
        tags: data.tags
    });

    try {
        await newGame.save();
        res.status(201).json(newGame);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// // Create new product
// router.post("/", (req, res, next) => {
//     console.debug(req.body);
//     const data = req.body;
//     const product1 = new Product({
//       code: data.code,
//       name: data.name,
//       price: data.price,
//       qty: data.qty
//     });
//     product1.save((err, newInstance) => {
//       if (err) {
//         console.error("Hey look, Error!", err);
//         res.json(err);
//       } else {
//         res.json(newInstance);
//       }
//     });
//   });
  
//   router.delete("/:id", (req, res, next) => {
//     const id = req.params["id"]; // use ID from the route parameter
//     // const id = req.body._id;
//     console.log("Delete this id ", id);
//     console.debug("Product ID to delete", id);
//     Product.findByIdAndDelete(id, (err, doc) => {
//       if (err) {
//         console.error("Hey look, Error!", err);
//         res.json(err);
//       } else {
//         res.status(200).json(doc);
//       }
//     });
//   });
  
//   // Update whole object or partially (PATCH)
//   router.put("/", async (req, res, next) => {
//     console.debug(req.body);
//     const data = req.body;
//     const id = data._id;
//     delete data._id;
//     console.debug(data);
  
//     Product.findByIdAndUpdate(id, data, (err, doc) => {
//       if (err) {
//         console.error("Hey look, Error!", err);
//         res.json(err);
//       } else {
//         res.status(200).json(doc);
//       }
//     });
//   });

module.exports = { getPost, getPostById, createPost };