import { mkdtempSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const [tarballArgument, angularVersion, typescriptVersion] = process.argv.slice(2);

if (!tarballArgument || !angularVersion || !typescriptVersion) {
  console.error(
    'Usage: node scripts/test-angular-compatibility.mjs <package.tgz> <angular-version> <typescript-version>'
  );
  process.exit(1);
}

let tarball = resolve(tarballArgument);

if (statSync(tarball).isDirectory()) {
  const tarballs = readdirSync(tarball).filter(file => file.endsWith('.tgz'));

  if (tarballs.length !== 1) {
    throw new Error(`Expected one package tarball in ${tarball}, found ${tarballs.length}`);
  }

  tarball = join(tarball, tarballs[0]);
}

const projectDirectory = mkdtempSync(join(tmpdir(), `angular-${angularVersion}-compatibility-`));

const run = (command, args) => {
  const result = spawnSync(command, args, {
    cwd: projectDirectory,
    encoding: 'utf8',
    stdio: 'inherit'
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} exited with status ${result.status}`);
  }
};

try {
  writeFileSync(
    join(projectDirectory, 'package.json'),
    JSON.stringify({
      private: true,
      dependencies: {
        '@angular/common': angularVersion,
        '@angular/compiler': angularVersion,
        '@angular/compiler-cli': angularVersion,
        '@angular/core': angularVersion,
        '@geoapify/angular-geocoder-autocomplete': `file:${tarball}`,
        '@geoapify/geocoder-autocomplete': '3.1.0',
        rxjs: '7.8.2',
        tslib: '2.8.1',
        typescript: typescriptVersion
      }
    }, null, 2)
  );

  writeFileSync(
    join(projectDirectory, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        declaration: false,
        experimentalDecorators: true,
        lib: ['ES2022', 'DOM'],
        module: 'ES2022',
        moduleResolution: 'bundler',
        outDir: 'out',
        skipLibCheck: false,
        strict: true,
        target: 'ES2022'
      },
      angularCompilerOptions: {
        strictTemplates: true
      },
      files: ['compatibility.module.ts']
    }, null, 2)
  );

  writeFileSync(
    join(projectDirectory, 'compatibility.module.ts'),
    `import { NgModule } from '@angular/core';
import {
  GeoapifyGeocoderAutocompleteModule
} from '@geoapify/angular-geocoder-autocomplete';

@NgModule({
  imports: [
    GeoapifyGeocoderAutocompleteModule.withConfig('compatibility-test-key')
  ],
  exports: [GeoapifyGeocoderAutocompleteModule]
})
export class CompatibilityModule {}
`
  );

  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund']);
  run(join(projectDirectory, 'node_modules', '.bin', 'ngc'), ['-p', 'tsconfig.json']);
  console.log(`Angular ${angularVersion} compatibility compilation passed.`);
} finally {
  rmSync(projectDirectory, { recursive: true, force: true });
}
