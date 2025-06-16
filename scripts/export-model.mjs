import { exec } from 'child_process';
import { strict as assert } from 'assert';
import dotenv from 'dotenv';
dotenv.config();

assert(
  process.env.CONTENTFUL_SPACE_ID,
  'CONTENTFUL_SPACE_ID environment variable is not set'
);

// This script is saved as a .mjs file so that we can access the environment variables
// for the --space-id.
exec(
  `contentful space export --space-id ${process.env.CONTENTFUL_SPACE_ID} --export-dir contentful/exports --content-file model.json --skip-content --skip-roles --skip-webhooks --skip-editor-interfaces`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  }
);
