const jsonServer = require("json-server");

/* ─────────────────────────────────────────
   🔧 PATCH lodash-id BEFORE creating server
   json-server 0.17.x uses lodash-id whose
   getById calls .toString() on every record
   id. If any id is null it throws 500.
   We patch it to skip nulls safely.
───────────────────────────────────────── */
const lodashId = require("lodash-id");
const _originalGetById = lodashId.getById;
lodashId.getById = function (collection, id) {
  const idKey = this.__id ? this.__id() : "id";
  const safe = collection.filter(
    item => item[idKey] !== null && item[idKey] !== undefined
  );
  return _originalGetById.call(this, safe, id);
};
console.log("✅ lodash-id patched");

/* ─────────────────────────────────────────
   SERVER SETUP
───────────────────────────────────────── */
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({ noCors: true });

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 10000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ JSON Server running on port ${PORT}`);
});