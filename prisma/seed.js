"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var client_1 = require("@prisma/client");
var mock_1 = require("../lib/mock");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var group, usersByEmail, managersFirst, _i, managersFirst_1, seedUser, created, projectsByKey, _a, seedBusinessUnits_1, bu, createdBu, _b, _c, asset, createdAsset, _d, _e, project, createdProject, timeEntries, _f, timeEntries_1, entry, user, project, yyyy, mm, dd;
        var _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    console.log('🌱 Seeding database...');
                    // Clear existing entries cleanly with TRUNCATE CASCADE
                    return [4 /*yield*/, db_1.db.$executeRawUnsafe('TRUNCATE TABLE "timeEntry", "project", "asset", "businessUnit", "user", "userGroup" CASCADE;')];
                case 1:
                    // Clear existing entries cleanly with TRUNCATE CASCADE
                    _j.sent();
                    console.log('🗑️  Cleared existing records');
                    return [4 /*yield*/, db_1.db.userGroup.create({
                            data: {
                                name: 'Everyone',
                                description: 'Default group for all seeded users',
                            },
                        })];
                case 2:
                    group = _j.sent();
                    console.log('✅ User group seeded');
                    usersByEmail = new Map();
                    managersFirst = __spreadArray([], mock_1.seedUsers, true).sort(function (a) { return (a.managerEmail ? 1 : -1); });
                    _i = 0, managersFirst_1 = managersFirst;
                    _j.label = 3;
                case 3:
                    if (!(_i < managersFirst_1.length)) return [3 /*break*/, 6];
                    seedUser = managersFirst_1[_i];
                    return [4 /*yield*/, db_1.db.user.create({
                            data: {
                                email: seedUser.email,
                                name: seedUser.name,
                                role: client_1.Role[seedUser.role === 'user' ? 'User' : seedUser.role === 'manager' ? 'Manager' : 'Admin'],
                                groupId: group.id,
                                managerId: seedUser.managerEmail ? (_g = usersByEmail.get(seedUser.managerEmail)) === null || _g === void 0 ? void 0 : _g.id : undefined,
                            },
                        })];
                case 4:
                    created = _j.sent();
                    usersByEmail.set(seedUser.email, created);
                    _j.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log('✅ Users seeded');
                    projectsByKey = new Map();
                    _a = 0, seedBusinessUnits_1 = mock_1.seedBusinessUnits;
                    _j.label = 7;
                case 7:
                    if (!(_a < seedBusinessUnits_1.length)) return [3 /*break*/, 16];
                    bu = seedBusinessUnits_1[_a];
                    return [4 /*yield*/, db_1.db.businessUnit.create({
                            data: {
                                name: bu.name,
                                description: bu.description,
                            },
                        })];
                case 8:
                    createdBu = _j.sent();
                    _b = 0, _c = bu.assets;
                    _j.label = 9;
                case 9:
                    if (!(_b < _c.length)) return [3 /*break*/, 15];
                    asset = _c[_b];
                    return [4 /*yield*/, db_1.db.asset.create({
                            data: {
                                name: asset.name,
                                description: asset.description,
                                businessUnitId: createdBu.id,
                            },
                        })];
                case 10:
                    createdAsset = _j.sent();
                    _d = 0, _e = asset.projects;
                    _j.label = 11;
                case 11:
                    if (!(_d < _e.length)) return [3 /*break*/, 14];
                    project = _e[_d];
                    return [4 /*yield*/, db_1.db.project.create({
                            data: {
                                name: project.name,
                                description: "".concat(project.name, " project"),
                                status: client_1.ProjectStatus[project.status[0].toUpperCase() + project.status.slice(1)],
                                businessUnitId: createdBu.id,
                                assetId: createdAsset.id,
                            },
                        })];
                case 12:
                    createdProject = _j.sent();
                    projectsByKey.set("".concat(bu.name, "|").concat(asset.name, "|").concat(project.name), createdProject);
                    _j.label = 13;
                case 13:
                    _d++;
                    return [3 /*break*/, 11];
                case 14:
                    _b++;
                    return [3 /*break*/, 9];
                case 15:
                    _a++;
                    return [3 /*break*/, 7];
                case 16:
                    console.log('✅ Business units, assets and projects seeded');
                    timeEntries = (0, mock_1.generateSeedTimeEntries)();
                    _f = 0, timeEntries_1 = timeEntries;
                    _j.label = 17;
                case 17:
                    if (!(_f < timeEntries_1.length)) return [3 /*break*/, 20];
                    entry = timeEntries_1[_f];
                    user = usersByEmail.get(entry.userEmail);
                    project = projectsByKey.get("".concat(entry.businessUnit, "|").concat(entry.asset, "|").concat(entry.project));
                    if (!user || !project) {
                        console.warn("\u26A0\uFE0F Skipping entry, missing user/project for ".concat(entry.userEmail, " / ").concat(entry.project));
                        return [3 /*break*/, 19];
                    }
                    yyyy = entry.date.getFullYear();
                    mm = String(entry.date.getMonth() + 1).padStart(2, '0');
                    dd = String(entry.date.getDate()).padStart(2, '0');
                    return [4 /*yield*/, db_1.db.timeEntry.create({
                            data: {
                                description: (_h = entry.description) !== null && _h !== void 0 ? _h : null,
                                date: entry.date,
                                hours: entry.hours.toString(),
                                status: 'Open',
                                userId: user.id,
                                projectId: project.id,
                            },
                        })];
                case 18:
                    _j.sent();
                    _j.label = 19;
                case 19:
                    _f++;
                    return [3 /*break*/, 17];
                case 20:
                    console.log("\u2705 Seeded ".concat(timeEntries.length, " time entries covering two years across ").concat(mock_1.seedUsers.length, " users"));
                    console.log('\n🎉 Database seeded successfully!');
                    return [4 /*yield*/, db_1.db.$disconnect()];
                case 21:
                    _j.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (e) {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
});
