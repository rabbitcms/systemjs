///<reference path="node_modules/@types/systemjs/index.d.ts"/>
///<reference path="node_modules/@types/jquery.validation/index.d.ts"/>
///<reference path="common.d.ts"/>
import jQuery from 'jquery';

export {locale} from 'locale';
import {locale} from 'locale';

let locales = ['uk', 'ru'],
    validationInitialize = async () => {
        validationInitialize = async () => void 0;
        await SystemJS.import(`jquery.validation`);
        await SystemJS.import(`@common/validation/methods`);
        await SystemJS.import(`jquery.validation/localization/messages_${locale}`,);
        if (locales.indexOf(locale) >= 0) {
            await SystemJS.import(`@common/validation/${locale}`);
        }
    };

export async function validate(form: HTMLFormElement, options: JQueryValidation.ValidationOptions = {}): Promise<JQueryValidation.Validator> {
    await validationInitialize();
    return jQuery(form).validate(jQuery.extend({
        ignore: '',
        highlight: (element) => {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: (element) => {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorPlacement: (error, element) => {
            let group = element.closest('.input-group');
            error.insertAfter(group.length ? group : element);
        },
    }, options));
}

export async function form(form: HTMLFormElement, ajax: (settings?: JQuery.AjaxSettings) => Promise<any> = jQuery.ajax): Promise<JQueryValidation.Validator> {
    let $form = jQuery(form), lock = false, validator,
        options: JQueryValidation.ValidationOptions = {
            submitHandler: async (form: HTMLFormElement, e: JQueryEventObject) => {
                e.preventDefault();
                if (lock) {
                    return;
                }
                lock = true;

                try {
                    let data = await ajax($.extend(true, {
                        method: $form.attr('method'),
                        url: $form.attr('action'),
                        data: $form.serialize(),
                        error: function (response) {
                            if (response.status === 422) {
                                validator.showErrors(Object.keys(response.responseJSON.errors).reduce(function (errors, key) {
                                    errors[key.split('.').map(function (value, index) {
                                        return index === 0 ? value : '[' + value + ']';
                                    }).join('')] = response.responseJSON.errors[key][0];
                                    return errors;
                                }, {}));
                            } else {
                                $form.trigger('error', response);
                            }
                        }
                    }, $form.attr('enctype') === 'multipart/form-data'
                        ? {
                            data: new FormData(form),
                            processData: false,
                            contentType: false,
                        }
                        : {}));
                    $form.triggerHandler('success', data)
                } catch (e) {

                }
                finally {
                    $form.removeClass('sending');
                    lock = false;
                }
            }
        };
    $form.triggerHandler('init', options);
    return validator = await validate(form, options);
}


let datepickerInitialize = async () => {
    datepickerInitialize = async () => void 0;
    SystemJS.import('bootstrap-datepicker/css/bootstrap-datepicker3.min.css');
    await SystemJS.import(`bootstrap-datepicker`);
    await SystemJS.import(`bootstrap-datepicker/locales/bootstrap-datepicker.${locale}.min`);
};

export async function datepicker(el: HTMLDivElement | HTMLInputElement, options: DatepickerOptions = {}): Promise<JQuery<HTMLDivElement | HTMLInputElement>> {
    await datepickerInitialize();
    return <JQuery<HTMLDivElement | HTMLInputElement>>jQuery(el).datepicker(jQuery.extend(options, {
        language: locale
    }));
}
