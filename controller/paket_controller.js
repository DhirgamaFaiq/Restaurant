const Paket = require("./../model/paket_model.js");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const paket = new Paket({
  	nama_paket: req.body.nama_paket,
    deskripsi: req.body.deskripsi
  });

    Paket.create(paket, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Paket."
      });
    else res.send(data);
  });
  
};

exports.findAll = (req, res) => {
  Paket.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Paket."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Paket.update(
    req.params.namaPaket,
    new Paket(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Paket with Nama Paket${req.params.namaPaket}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Paket with Nama Paket " + req.params.namaPaket
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Paket.remove(req.params.paketId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Paket with id ${req.params.paketId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Paket with id " + req.params.idPaket
        });
      }
    } else res.send({ message: `Paket was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Paket.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all paket."
      });
    else res.send({ message: `All Paket were deleted successfully!` });
  });
};
