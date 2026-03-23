// internal-imports
import { APP_CONFIG } from '../config/constants.js';
import { logger } from '../logger/winston.js';

// external-imports
import fs from 'fs';
import path from 'path';

// type-imports
import type { Application } from 'express';

// function to initialize all modules
export default async function (application: Application) {
  // get the directory name with the current version
  const modulesVersionedDirPath = path.join(
    APP_CONFIG.MODULE_CONFIG.DIR_NAME,
    APP_CONFIG.MODULE_CONFIG.CURRENT_VERSION
  );

  // get the modules directory path
  const completeModulesDirPath = path.join(process.cwd(), 'src', modulesVersionedDirPath);

  // if the modules directory doesn't exist, log a warning and return
  if (!fs.existsSync(completeModulesDirPath)) {
    logger.warn(`(${modulesVersionedDirPath}) doesn't exist`);
    return;
  }

  // read all the directories in the modules directory
  const moduleDirs = fs.readdirSync(completeModulesDirPath);

  // if no modules found, log a warning and return
  if (moduleDirs.length === 0) {
    logger.warn(`(${modulesVersionedDirPath}) has no modules`);
    return;
  }

  // loop through each module directory
  for (const moduleDir of moduleDirs) {
    // get the path for the module directory
    const moduleDirPath = path.join(completeModulesDirPath, moduleDir);

    // check if the path is not a directory or prefix with '_', if so continue
    if (!fs.statSync(moduleDirPath).isDirectory() || moduleDir.startsWith('_')) continue;

    // get the path for the module file
    const moduleFilePath = path.join(moduleDirPath, APP_CONFIG.MODULE_CONFIG.FILE_NAME);

    // check if the module file exists, if not log a warning and continue
    if (!fs.existsSync(moduleFilePath)) {
      logger.warn(`(${moduleDir}/${APP_CONFIG.MODULE_CONFIG.FILE_NAME}) doesn't exist`);
      continue;
    }

    // import the module file
    const module = await import(moduleFilePath);

    // if module doesn't have a default export, log a warning and continue
    if (!module.default) {
      logger.warn(`(${moduleDir}/${APP_CONFIG.MODULE_CONFIG.FILE_NAME}) has no default export`);
      continue;
    }

    // if the module has a default export, call it with the application instance and log a success message
    module.default(application);
    logger.info(`(${moduleDir}) module loaded successfully`);
  }
}
