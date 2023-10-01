import * as toml from '@iarna/toml';
const json2toml = require('json2toml');
import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

import GLOBAL_PACKAGE_JSON from '@bioparallel/package.json';
import TAURI_CONF_JSON from '@bioparallel/src-tauri/tauri.conf.json';

export const synchroniseConfigurationFiles = async () => {
  const { name, version, description, author, repository } =
    GLOBAL_PACKAGE_JSON;

  readCargoFile().then((CARGO_TOML) => {
    if (!CARGO_TOML) return;

    let foundPackageSection = false;
    let foundEndOfSection = false;
    const NEW_CARGO_CONF = CARGO_TOML.split(/\r?\n/).map((line) => {
      if (line === '[package]') {
        foundPackageSection = true;
        return line;
      }
      if (line === '' && foundPackageSection) {
        foundEndOfSection = true;
        return line;
      }
      if (foundEndOfSection || !foundPackageSection) return line;

      try {
        const value = toml.parse(line);
        const keys = Object.keys(value);
        if (keys.length !== 1)
          throw new Error('Expected a toml line to only have one key');
        const key = keys[0];

        let newValue = value;

        switch (key) {
          case 'name':
            newValue.name = name;
            break;
          case 'version':
            newValue.version = version;
            break;
          case 'description':
            newValue.description = description;
            break;
          case 'authors':
            newValue.authors = [`${author.name} <${author.email}>`];
            break;
          case 'repository':
            newValue.repository = repository.url;
            break;
          case 'default-run':
            newValue['default-run'] = name;
            break;
          default:
            return line;
        }
        return json2toml(newValue, {
          indent: 0,
          newlineAfterSection: false,
        }).replace('\n', '');
      } catch (error) {
        console.error(error);
      }
    });

    // Save Cargo.toml file
    const content = NEW_CARGO_CONF.join('\n');
    writeFile(
      path.join(process.cwd(), '..', 'src-tauri', 'Cargo.toml'),
      content
    )
      .then(() => console.log('Successfully saved Cargo.toml file'))
      .catch((error) => {
        console.error(error);
      });
  });

  const NEW_TAURI_CONF_JSON = structuredClone(TAURI_CONF_JSON);
  NEW_TAURI_CONF_JSON.package.productName = name;
  NEW_TAURI_CONF_JSON.package.version = version;

  // Save tauri.conf.json file
  const content = JSON.stringify(NEW_TAURI_CONF_JSON, null, 4);
  writeFile(
    path.join(process.cwd(), '..', 'src-tauri', 'tauri.conf.json'),
    content
  )
    .then(() => console.log('Successfully saved tauri.conf.json file'))
    .catch((error) => {
      console.error(error);
    });
};

async function readCargoFile() {
  try {
    const file = await readFile(
      path.join(process.cwd(), '..', 'src-tauri', 'Cargo.toml'),
      { encoding: 'utf8' }
    );
    return file;
  } catch (error) {
    console.error(error);
  }
}
