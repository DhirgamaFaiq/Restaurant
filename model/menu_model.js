const db = require("./../config/db_config");

const Menu = function(menu) {
  this.nama_paket = menu.nama_paket;
  this.id_produk = menu.id_produk;
  this.nama_produk = menu.nama_produk;
  this.harga = menu.harga;

};

Menu.isiMenu = (newMenu, result) => {

    db.query("SELECT * FROM isi_menu WHERE id_produk = ? AND nama_paket = ?",[newMenu.id_produk, newMenu.nama_paket], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
    
    db.query("UPDATE isi_menu SET nama_produk = ? ,harga= ? WHERE id_produk = ?",
      [newMenu.nama_produk,  newMenu.harga, newMenu.id_produk], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
   });
    //
    db.query("UPDATE produk SET nama_produk= ? WHERE id_produk = ?",
      [newMenu.nama_produk, newMenu.id_produk],(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Inserted and updated produk to menu: ", {...newMenu });
    result(null, { ...newMenu });

  });
    //
      return;
    };
//
  db.query("INSERT INTO isi_menu SET ?", newMenu, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
     }
  });
//
   db.query("UPDATE produk SET nama_produk= ? WHERE id_produk = ?",
      [newMenu.nama_produk, newMenu.id_produk],(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Inserted and updated produk to menu: ", {...newMenu });
    result(null, { ...newMenu });

  });
});

};

Menu.findMenu = (paketId, result) => {
  db.query("SELECT id_produk, nama_produk, harga FROM isi_menu WHERE nama_paket = ? ",[paketId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found menu : ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Menu.findMenuByID = (menuId, result) => {
  db.query("SELECT nama_paket, nama_produk, harga FROM isi_menu WHERE id_produk = ? ",[menuId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found menu : ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Menu.update = (menuId, namaPaket, menu, result) => {
  db.query(
    "UPDATE isi_menu SET nama_produk= ?, harga = ? WHERE id_produk = ? AND nama_paket = ?",
    [menu.nama_produk, menu.harga, menuId, namaPaket],
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

      db.query(
    "UPDATE produk SET nama_produk = ? WHERE id_produk = ?",
    [menu.nama_produk, menuId],
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

      console.log("updated menu: ", { ...menu });
      result(null, { ...menu });
    }
  );
};

Menu.updateid = (menuId, menu, result) => {
  db.query(
    "UPDATE isi_menu SET nama_produk= ?, harga = ? WHERE id_produk = ? ",
    [menu.nama_produk, menu.harga, menuId],
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
    db.query(
    "UPDATE produk SET nama_produk = ? WHERE id_produk = ?",
    [menu.nama_produk, menuId],
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

      console.log("updated menu: ", { ...menu });
      result(null, { ...menu });
    }
  );
};

Menu.remove = (menuId, result) => {
  db.query("DELETE FROM isi_menu WHERE id_produk = ?", menuId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted menu with id: ", menuId);
    result(null, res);
  });
};

Menu.removeid = (menuId, namaPaket, result) => {
  db.query("DELETE FROM isi_menu WHERE id_produk = ? AND nama_paket = ?", [menuId, namaPaket] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted menu with id: ", menuId);
    result(null, res);
  });
};


Menu.removeAll = result => {
  db.query("DELETE FROM isi_menu", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Menu`);
    result(null, res);
  });
};

module.exports = Menu;