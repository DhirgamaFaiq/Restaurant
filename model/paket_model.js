const db = require("./../config/db_config");

const Paket = function(paket) {
  this.nama_paket = paket.nama_paket;
  this.deskripsi = paket.deskripsi;
};

Paket.create = (newPaket, result) => {
  db.query("INSERT INTO menu SET ?", newPaket, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created paket: ", {...newPaket });
    result(null, { ...newPaket });
  });
};

Paket.getAll = result => {
  db.query("SELECT * FROM menu ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Paket: ", res);
    result(null, res);
  });
};

//
Paket.update = (nama_paket, paket, result) => {
  db.query(
    "UPDATE menu SET nama_paket= ?, deskripsi = ? WHERE nama_paket = ?",
    [paket.nama_paket, paket.deskripsi, nama_paket],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated paket: ", { ...paket });
      result(null, { ...paket });
    }
  );
};

Paket.remove = (paketId, result) => {
  db.query("DELETE FROM menu WHERE nama_paket = ?", paketId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted paket with id: ", paketId);
    result(null, res);
  });
};

Paket.removeAll = result => {
  db.query("DELETE FROM menu", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Paket`);
    result(null, res);
  });
};


module.exports = Paket;