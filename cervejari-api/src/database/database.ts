import { Cerveja } from 'src/cerveja/cerveja.entity';
import { writeFile, readFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Database {
  private FILENAME = 'cervejas.json';

  public async getCervejas(): Promise<Cerveja[]> {
    const cervejasInFile = await readFile(this.FILENAME, 'utf-8');
    const cervejas = JSON.parse(cervejasInFile);
    return cervejas;
  }

  public async gravar(cerveja: Cerveja) {
    await writeFile(
      this.FILENAME,
      JSON.stringify([...(await this.getCervejas()), cerveja]),
    );
  }

  public async gravarCervejas(cervejas: Cerveja[]) {
    await writeFile(this.FILENAME, JSON.stringify(cervejas));
  }
}
