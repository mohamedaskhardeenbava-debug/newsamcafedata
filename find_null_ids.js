
const fs = require("fs");
const db = JSON.parse(fs.readFileSync("db.json", "utf8"));

let found = false;
for (const [collection, items] of Object.entries(db)) {
  if (!Array.isArray(items)) continue;
  items.forEach((item, index) => {
    if (item.id === null || item.id === undefined || item.id === "") {
      console.log(`NULL ID in "${collection}" at index ${index}:`, JSON.stringify(item).slice(0, 100));
      found = true;
    }
  });
}

if (!found) console.log("No null IDs found.");
