const Pesan = require("./../model/pesan_model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const pesan = new Pesan({
    id_pesanan: req.body.id_pesanan,
    nama_item: req.body.nama_item,
  });

  Pesan.create(pesan, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });
  
};

exports.createid = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const pesan2 = new Pesan({
    id_pesanan: req.body.id_pesanan,
    nama_item: req.body.nama_item,
  });

  Pesan.createid(pesan2, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });
  
};

exports.checkout = (req, res) => {
  Pesan.checkout((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Product."
      });
    else res.send(data);
  });
};

exports.checkoutPaket = (req, res) => {
  Pesan.checkoutPaket((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Product."
      });
    else res.send(data);
  });
};

