#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/4991370a4974aca33528406d0f690b8e120d09b53b273338aa938eb621cdfdb6/contract';
import startContract from '../../snapshots/4991370a4974aca33528406d0f690b8e120d09b53b273338aa938eb621cdfdb6/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a957f01f2196c1688b0b432f5720d5c24e1338c30ceb25a316478d5517437d28/contract';
import endContract from '../../snapshots/a957f01f2196c1688b0b432f5720d5c24e1338c30ceb25a316478d5517437d28/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
