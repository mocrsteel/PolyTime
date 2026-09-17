#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4991370a4974aca33528406d0f690b8e120d09b53b273338aa938eb621cdfdb6/contract';
import endContract from '../../snapshots/4991370a4974aca33528406d0f690b8e120d09b53b273338aa938eb621cdfdb6/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
