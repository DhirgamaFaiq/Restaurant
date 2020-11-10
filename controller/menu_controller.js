const Menu = require("./../model/menu_model.js");

exports.isiMenu = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const menu = new Menu({
    nama_paket: req.body.nama_paket,
    id_produk: req.body.id_produk,
    nama_produk: req.body.nama_produk,
    harga: req.body.harga,

  });

  Menu.isiMenu(menu, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Menu."
      });
    else res.send(data);
  });
  
};

exports.findAllMenu = (req, res) => {
  Menu.findMenu(req.params.paketId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Menu with Nama Paket ${req.params.paketId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Menu with Nama Paket " + req.params.paketId
        });
      }
    } else res.send(data);
  });
};

exports.findMenuByID = (req, res) => {
  Menu.findMenuByID(req.params.menuId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Menu with ID ${req.params.menuId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Menu with ID " + req.params.menuId
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

  Menu.update(
    req.params.menuId,
    req.params.namaPaket,
    new Menu(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Menu with id${req.params.menuId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Menu with id " + req.params.menuId
          });
        }
      } else res.send(data);
    }
  );
};

exports.updateid = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Menu.updateid(
    req.params.menuId,
    new Menu(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Menu with id${req.params.menuId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Menu with id " + req.params.menuId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Menu.remove(req.params.menuId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Menu with id ${req.params.menuId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete menu with id " + req.params.menuId
        });
      }
    } else res.send({ message: `Menu was deleted successfully!` });
  });
};

exports.deleteid = (req, res) => {
  Menu.removeid(req.params.menuId,req.params.namaPaket, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Menu with id ${req.params.menuId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete menu with id " + req.params.menuId
        });
      }
    } else res.send({ message: `Menu was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Menu.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all menu."
      });
    else res.send({ message: `All Menu were deleted successfully!` });
  });
};