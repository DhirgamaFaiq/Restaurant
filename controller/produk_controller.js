const Produk = require("./../model/produk_model.js");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const produk = new Produk({
  	id_produk: req.body.id_produk,
    nama_produk: req.body.nama_produk,
    harga: req.body.harga,
  });

  
  Produk.create(produk, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
    });
  
  };

exports.findAll = (req, res) => {
  Produk.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Product."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Produk.findById(req.params.produkId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.produkId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with id " + req.params.produkId
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Produk.updateById(
    req.params.produkId,
    new Produk(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found PRoduct with id ${req.params.produkId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.produkId
          });
        }
      } else res.send(data);
    }
  );
};


exports.delete = (req, res) => {
  Produk.remove(req.params.produkId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.produkId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.produkId
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};


exports.deleteAll = (req, res) => {
    Produk.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all food."
      });
    else res.send({ message: `All product were deleted successfully!` });
  });
};