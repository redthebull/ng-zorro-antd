import {
  MigrationRule,
  ResolvedResource, TargetVersion
} from '@angular/cdk/schematics';
import { findElementWithTag } from '../../../utils/ng-update/elements';

export class FormTemplateRule extends MigrationRule<null> {

  ruleEnabled = this.targetVersion === TargetVersion.V9;

  visitTemplate(template: ResolvedResource): void {

    const deprecatedComponent = (deprecated: string, instead: string) => {
      findElementWithTag(template.content, deprecated)
        .forEach(offset => {
          this.failures.push({
            filePath: template.filePath,
            position: template.getCharacterAndLineOfPosition(offset),
            message: `Found deprecated "<${deprecated}>" component. Use "${instead}" to instead please.`
          });
        })
    };

    deprecatedComponent('nz-form-extra', 'nz-form-control[nzExtra]');
    deprecatedComponent('nz-form-explain', 'nz-form-control[nzSuccessTip][nzWarningTip][nzErrorTip]...');

  }
}
