module.exports = app => {
  const pesan = require("./../controller/pesan_controller.js");
  app.post("/pesan", pesan.create);
  app.post("/pesan/paket", pesan.createid);
  app.get("/checkout/:paketId", pesan.checkout);
  app.get("/checkout/paket/:paketId", pesan.checkoutPaket);

};