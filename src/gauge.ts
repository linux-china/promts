/**
 * Copyright Verizon Media, Licensed under the terms of the MIT license.
 * See LICENSE file in project root for terms.
 */

import { Metric, SUPRESS_HEADER, Labels } from './types.ts';
import { toStringLabels } from './utils.ts';

export class Gauge extends Metric {
    private ratio?: ()=>number;

    constructor(name: string, labels: Labels = {}, help = '') {
        super(name, labels, help);
    }

    getLabels(): Labels {
        return this.labels;
    }

    getRatio(): number {
       if(this.ratio) {
         return this.ratio();
       }
       return 0;
    }

    getName(): string {
        return this.name;
    }

    setRatio(ratio: ()=>number): void {
      this.ratio = ratio;
    }

    toString(supress = SUPRESS_HEADER): string {
        let result = '';
        if (!supress) {
            if (this.help != '') {
                result += `# HELP ${this.name} ${this.help}\n`;
            }

            result += `# TYPE ${this.name} gauge\n`;
        }

        result += `${this.name}{${toStringLabels(this.labels)}} ${this.getRatio()}\n`;
        return result;
    }
}
