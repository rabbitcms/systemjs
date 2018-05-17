///<reference path="node_modules/@types/jquery.validation/index.d.ts"/>
import 'jquery';
import {locale} from 'locale';

let locales = ['uk', 'ru'],
    initialize = async () => {
        initialize = async () => void 0;
        await SystemJS.import(`jquery.validation`, __moduleName);
        await SystemJS.import(`./validation/methods`, __moduleName);
        await SystemJS.import(`jquery.validation/localization/messages_${locale}`, __moduleName);
        if (locales.indexOf(locale) >= 0) {
            await System.import(`./validation/${locale}`, __moduleName);
        }
    };

export async function validate(form: JQuery, options?: JQueryValidation.ValidationOptions): Promise<JQueryValidation.Validator> {
    await initialize();
    return form.validate(options);
}