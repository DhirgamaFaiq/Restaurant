module.exports = app => {
  const produk = require("./../controller/produk_controller.js");
  app.post("/produk", produk.create);
  app.get("/produk", produk.findAll);
  app.get("/produk/:produkId", produk.findOne);
  app.put("/produk/:produkId", produk.update);
  app.delete("/produk/:produkId", produk.delete);
  app.delete("/produk", produk.deleteAll);
};