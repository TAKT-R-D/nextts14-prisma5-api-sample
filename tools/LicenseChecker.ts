import * as checker from 'license-checker';
import * as packageJson from '../package.json';
import fs from 'fs';

const { dependencies } = packageJson;

checker.init(
  {
    production: true,
    start: '.',
    relativeLicensePath: true,
  },
  function (err, packages) {
    let output: any = {};
    if (err) {
      console.error(err);
    } else {
      Object.keys(packages).forEach((pkg) => {
        const pkgName = pkg.replace(/@[^@]+$/, '');
        if (pkgName in dependencies) {
          const { licenses, repository, licenseFile, publisher } =
            packages[pkg];
          output[pkg] = { licenses, repository, licenseFile, publisher };
        }
      });

      const json = JSON.stringify(output, null, 2);

      const file = __dirname + '/../src/app/licenses/licenses.json';
      fs.writeFileSync(file, json);
    }
  }
);
