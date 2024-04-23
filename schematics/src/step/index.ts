import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  mergeWith,
  forEach,
  FileEntry,
  branchAndMerge,
  chain,
} from '@angular-devkit/schematics';
import { Schema as StepSchema } from './schema';
import path = require('path');

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function step(_options: StepSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const step = _options.name;
    const sourceFolder = url(`./files/${_options.name}`); // take all files in step folder

    // TODO: import from a separate file?
    const fileMappings: { [step: string]: { [source: string]: string } } = {
      'generate-an-app': {
        'app.component.spec.ts': 'src/app/app.component.spec.ts',
      },
    };

    return chain([
      branchAndMerge(
        mergeWith(
          apply(sourceFolder, [
            forEach((fileEntry: FileEntry) => {
              const fileName = path.basename(fileEntry.path);
              const target = fileMappings[step][fileName];

              if (!target) {
                _context.logger.warn(
                  `Target file not found for ${fileName} (${fileEntry.path})`
                );
                return null;
              }

              if (tree.exists(target)) {
                tree.overwrite(target, fileEntry.content);
              } else {
                tree.create(target, fileEntry.content);
              }

              return null;
            }),
          ])
        )
      ),
    ]);
  };
}
