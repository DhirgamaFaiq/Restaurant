const db = require("./../config/db_config");
const Pesan = function(pesan) {
  this.id_pesanan = pesan.id_pesanan;
  this.nama_item = pesan.nama_item;

};

Pesan.create = (pesan, result) => {
  db.query("SELECT * FROM produk WHERE nama_produk = ? ",pesan.nama_item, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      db.query("INSERT INTO pesan SET ?", pesan, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
     }
  });
      return;
    }
    result({ kind: "not_found on Produk" }, null);
  });
};


Pesan.createid = (pesan, result) => {
  db.query("SELECT * FROM isi_menu WHERE nama_paket = ? ",pesan.nama_item, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      db.query("INSERT INTO pesan_paket SET ?", pesan, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
     }
  });
      return;
    }
    result({ kind: "not_found on Menu " }, null);
  });
};

Pesan.checkout = (paketId, result) => {
  db.query("SELECT id_pesanan AS id_pesanan, nama_item AS nama_item, harga AS harga FROM pesan INNER JOIN produk ON pesan.nama_item = produk.nama_produk WHERE id_pesanan  ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("cek");
      return;
    }
    result({ kind: "not_found on produk" }, null);
  });
};

Pesan.checkoutPaket = (paketId, result) => {
  db.query("SELECT id_pesanan AS id_pesanan, nama_item AS nama_item,harga AS harga, nama_produk AS nama_produk FROM pesan_paket INNER JOIN isi_menu ON pesan_paket.nama_item = isi_menu.nama_paket WHERE id_pesanan",paketId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("cek");
      return;
    }
    result({ kind: "not_found on menu" }, null);
  });
};

module.exports = Pesan;