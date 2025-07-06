const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: 'src/.env'}); ;

const folderName = './src/environments';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
    const envDevFile = `export const environment = {
        TOKEN_API: '${process.env.TOKEN_API}',
    };`;
    const envProdFile = `export const environment = {
      TOKEN_API: '${process.env.TOKEN_API}',
    };`;

    const targetDevPath = path.join(__dirname, './src/environments/environment.development.ts');
    const targetProdPath = path.join(__dirname, './src/environments/environment.ts');

    fs.writeFile(targetDevPath, envDevFile, (err) => {
        if (err) {
            console.error(err);
            throw err;
        } else {
            console.log(successColor, `${checkSign} Variáveis de ambiente (dev) geradas com sucesso!`);
        }
    });

    fs.writeFile(targetProdPath, envProdFile, (err) => {
      if (err) {
          console.error(err);
          throw err;
      } else {
          console.log(successColor, `${checkSign} Variáveis de ambiente (prod) geradas com sucesso!`);
      }
    });

} catch (err) {
  console.error(err);
}
