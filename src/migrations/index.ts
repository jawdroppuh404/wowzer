import * as migration_20261028_141833 from "./20261028_141833";
import * as migration_20261028_155601 from "./20261028_155601";

export const migrations = [
  {
    up: migration_20261028_141833.up,
    down: migration_20261028_141833.down,
    name: "20261028_141833",
  },
  {
    up: migration_20261028_155601.up,
    down: migration_20261028_155601.down,
    name: "20261028_155601",
  },
];
