import $ from 'jquery';
import {locale} from 'locale';
import {System} from "systemjs";

let locales = ['uk', 'ru'],
    initialize = async () => {
        initialize = async () => void 0;
        await System.import(`jquery.validation`, __moduleName);
        await System.import(`./validation/methods`, __moduleName);
        await System.import(`jquery.validation/localization/messages_${locale}`, __moduleName);
        if (locales.indexOf(locale) >= 0) {
            await System.import(`./validation/${locale}`, __moduleName);
        }
    };

export async function validate(form: JQuery, options: JQueryValidation.ValidationOptions): Promise<JQueryValidation.Validator> {
    await initialize();
    return form.validate(options);
}
