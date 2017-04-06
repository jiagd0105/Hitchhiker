import * as crypto from 'crypto';
import { Setting } from "./setting";

export class StringUtil {
    static md5(str: string): string {
        return crypto.createHash('md5').update(str).digest('hex');
    }

    static encrypt(str: string): string {
        const cipher = crypto.createCipher('aes-256-cbc', Setting.instance.app.encrptykey);
        let rst = cipher.update(str, 'utf8', 'base64');
        rst += cipher.final('base64');
        return rst;
    }

    static decrypt(str: string): string {
        const decipher = crypto.createDecipher('aes-256-cbc', Setting.instance.app.encrptykey);
        let rst = decipher.update(str, 'base64', 'utf8');
        rst += decipher.final('utf8');
        return rst;
    }

    static applyTemplate(target: string, variables: { [key: string]: string }): string {
        let arr = new Array<string>();
        let regex = /{{.*?}}/g;
        let rst;
        while ((rst = regex.exec(target)) !== null) {
            arr.push(<string>rst);
        }

        if (arr.length === 0) {
            return target;
        }

        arr.forEach(o => {
            let key = o.replace('{{', '').replace('}}', '');
            let variable = variables[key];
            if (variable !== undefined) {
                target = target.replace(o, variable);
            }
        });
        return target;
    }
}