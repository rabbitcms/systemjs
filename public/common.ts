///<reference path="common.d.ts"/>
///<reference path="node_modules/@types/systemjs/index.d.ts"/>
///<reference path="node_modules/@types/jquery.validation/index.d.ts"/>
///<reference path="node_modules/@types/bootstrap-datepicker/index.d.ts"/>
import jQuery from 'jquery';

export let locale: string = document.documentElement.getAttribute('lang') || '';

let locales = ['uk', 'ru'],
    validationInitialize = async (): Promise<void> => {
        let promise = SystemJS.import(`jquery.validation`)
            .then(() => SystemJS.import(`@common/validation/methods`))
            .then(() => SystemJS.import(`jquery.validation/localization/messages_${locale}`))
            .then(() => locales.indexOf(locale) >= 0 && SystemJS.import(`@common/validation/${locale}`));
        validationInitialize = () => promise;
        return promise;
    };

export async function validate(form: HTMLFormElement | JQuery<HTMLFormElement>, options: JQueryValidation.ValidationOptions = {}): Promise<JQueryValidation.Validator> {
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

export async function form(form: HTMLFormElement | JQuery<HTMLFormElement>, ajax?: (settings?: JQuery.AjaxSettings) => Promise<any>): Promise<JQueryValidation.Validator> {
    let $form = jQuery(form), lock = false, validator,
        options: JQueryValidation.ValidationOptions = {
            submitHandler: async (form: HTMLFormElement, e: JQueryEventObject) => {
                e.preventDefault();
                if (lock) {
                    return;
                }
                lock = true;
                try {
                    let data = await (ajax || jQuery.ajax)($.extend({
                        method: $form.attr('method'),
                        url: $form.attr('action'),
                        data: $form.serialize(),
                        error(response) {
                            if (response.status === 422) {
                                validator.showErrors(Object.keys(response.responseJSON.errors).reduce((errors, key) => {
                                    errors[key.split('.')
                                        .map((value, index) => index === 0 ? value : '[' + value + ']')
                                        .join('')] = response.responseJSON.errors[key][0];
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
                    $form.triggerHandler('success', data);
                } finally {
                    $form.removeClass('sending');
                    lock = false;
                }
            }
        };
    $form.triggerHandler('init', options);
    return validator = await validate(form, options);
}

let datepickerInitialize = async () => {
    let promise = Promise.all([
        SystemJS.import('bootstrap-datepicker/css/bootstrap-datepicker3.min.css'),
        SystemJS.import(`bootstrap-datepicker`),
        SystemJS.import(`bootstrap-datepicker/locales/bootstrap-datepicker.${locale}.min`)
    ]);
    datepickerInitialize = async () => promise;

    return promise;
};

export async function datepicker(el: HTMLDivElement | HTMLInputElement, options: DatepickerOptions = {}): Promise<JQuery<HTMLDivElement | HTMLInputElement>> {
    await datepickerInitialize();
    return <JQuery<HTMLDivElement | HTMLInputElement>>jQuery(el).datepicker(jQuery.extend(options, {
        language: locale
    }));
}

export async function scan(element: Element) {
    let list = element.querySelectorAll('[data-require]');
    for (let i = 0; i < list.length; ++i) {
        (async (element: Element) => {
            let module = await SystemJS.import(<string>element.getAttribute('data-require')),
                param = element.getAttribute('data-param');

            if (element.hasAttribute('data-bind')) {
                element.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await module[<string>element.getAttribute('data-bind')](param);
                });
            }

            if (element.hasAttribute('data-import')) {
                await module[<string>element.getAttribute('data-import')](element, param);
            }

        })(list.item(i)).catch(console.log);
    }
}

let youtubeBackgroundInitialize = (): Promise<void> => {
    let promise: Promise<void> = (async (): Promise<void> => {
        (await SystemJS.import('youtube'))
        // @ts-ignore
            .ready(await SystemJS.import('jquery.mb.YTPlayer'));
    })();
    youtubeBackgroundInitialize = async () => promise;
    return promise;
};

export async function youtubeBackground(el?: HTMLElement, options?) {
    await youtubeBackgroundInitialize();
    if (!el) return;
    if (!el.id) {
        el.id = "bgyt" + new Date().getTime()
    }
    jQuery(`#${el.id}`).YTPlayer(options || {});
}

export function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}
