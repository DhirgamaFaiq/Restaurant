const db = require("./../config/db_config");
const Produk = function(produk) {
  this.id_produk = produk.id_produk;
  this.nama_produk = produk.nama_produk;
  this.harga = produk.harga;
};

Produk.create = (newProduk, result) => {
  db.query("INSERT INTO produk SET ?", newProduk, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", {...newProduk });
    result(null, { ...newProduk });
  });
};

Produk.findById = (Idproduk, result) => {
  db.query(`SELECT * FROM produk WHERE id_produk = ${Idproduk}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product : ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Produk.getAll = result => {
  db.query("SELECT * FROM produk", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("food: ", res);
    result(null, res);
  });
};

Produk.updateById = (id_produk, produk, result) => {
  db.query(
    "UPDATE produk SET nama_produk = ?, harga = ? WHERE id_produk = ?",
    [produk.nama_produk, produk.harga, id_produk],
    (err, res) => {
db.query(
    "UPDATE isi_menu SET nama_produk = ? WHERE id_produk = ?",
    [produk.nama_produk, id_produk],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
             result({ kind: "not_found" }, null);
        return;
      }
    }
  );

      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }


      console.log("updated produk: ", { id_produk: id_produk, ...produk });
      result(null, { id_produk: id_produk, ...produk });
    }
  );

};

Produk.remove = (id, result) => {
  db.query("DELETE FROM produk WHERE id_produk = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

Produk.removeAll = result => {
  db.query("DELETE FROM produk", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} product`);
    result(null, res);
  });
};

module.exports = Produk;