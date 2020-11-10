module.exports = app => {
  const paket = require("./../controller/paket_controller.js");
  const menu = require("./../controller/menu_controller.js");
  app.post("/paket", paket.create);
  app.post("/menu", menu.isiMenu);
  app.get("/paket", paket.findAll);
  app.get("/menu/:paketId", menu.findAllMenu);
  app.get("/menu/menuId/:menuId", menu.findMenuByID);
  app.put("/paket/:namaPaket", paket.update);
  app.put("/menu/:menuId/", menu.updateid);
  app.put("/menu/:menuId/:namaPaket", menu.update);
  app.delete("/paket/:paketId", paket.delete);
  app.delete("/paket", paket.deleteAll);
  app.delete("/menu/:menuId", menu.delete);
  app.delete("/menu/:menuId/:namaPaket", menu.deleteid);
  app.delete("/menu", menu.deleteAll);

};