"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
var adapter_pg_1 = require("@prisma/adapter-pg");
var client_1 = require("@prisma/client");
var adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env['DATABASE_URL'],
});
exports.db = new client_1.PrismaClient({ adapter: adapter });
