///<reference path="common.d.ts"/>
///<reference path="node_modules/@types/systemjs/index.d.ts"/>
///<reference path="node_modules/@types/jquery.validation/index.d.ts"/>
///<reference path="node_modules/@types/bootstrap-datepicker/index.d.ts"/>
import jQuery from 'jquery';

export let locale: string = document.documentElement.getAttribute('lang') || '';
export let events = ['click', 'dblclick', 'contextmenu', 'wheel', 'mouseleave', 'mouseout', 'focus', 'blur', 'reset', 'submit', 'scroll', 'resize', 'keydown', 'keypress', 'keyup', 'mouseenter', 'mouseover', 'mousemove', 'mousedown', 'mouseup'];

let locales = ['uk', 'ru'],
    validationInitialize = async (): Promise<void> => {
        let promise = SystemJS.import(`jquery.validation`)
            .then(() => SystemJS.import(`@common/validation/methods`))
            .then(() => SystemJS.import(`jquery.validation/localization/messages_${locale}`))
            .then(() => locales.indexOf(locale) >= 0 && SystemJS.import(`@common/validation/localization/${locale}`));
        validationInitialize = () => promise;
        return promise;
    };

export async function validate(form: HTMLFormElement | JQuery<HTMLFormElement>, event?: Event | null, options: JQueryValidation.ValidationOptions = {}): Promise<JQueryValidation.Validator> {
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

async function crossAjax(settings?: JQuery.AjaxSettings): Promise<any> {
    return await jQuery.ajax(jQuery.extend(true, {
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    }, settings));
}

export async function form(form: HTMLFormElement | JQuery<HTMLFormElement>, e: Event | null, ...args): Promise<JQueryValidation.Validator> {
    let $form = jQuery(form),
        ajax: (settings?: JQuery.AjaxSettings) => Promise<any> = jQuery.ajax,
        handler: (data?: any) => boolean = () => true,
        lock = false, validator,
        options: JQueryValidation.ValidationOptions = {
            submitHandler: async (form: HTMLFormElement, e: JQueryEventObject) => {
                e.preventDefault();
                if (lock) {
                    return;
                }
                lock = true;
                try {
                    $form.addClass('sending');
                    let data = await ajax($.extend({
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
                    handler(data);
                    $form.triggerHandler('success', data);
                } catch (e) {
                    $form.triggerHandler('error', e);
                } finally {
                    $form.removeClass('sending');
                    lock = false;
                }
            }
        };
    $form.triggerHandler('init', options);
    args.forEach((arg) => {
        if (arg instanceof Function) {
            ajax = arg;
            return;
        }
        switch (arg) {
            case 'cross':
                ajax = crossAjax;
                break;
            case 'handle':
                handler = (data: any): boolean => {
                    if (!data || !data.action) {
                        return true;
                    }
                    switch (data.action) {
                        case 'redirect':
                        case 'location':
                            if (data.target) {
                                window.open(data.location, data.target);
                            } else {
                                location.href = data.location;
                            }
                            break;
                        case 'form':
                        case 'open':
                            //untested.
                            let form:JQuery<HTMLFormElement> = (function add(form:JQuery<HTMLFormElement>, data, prefix?:string):JQuery<HTMLFormElement> {
                                $.each(data, function (name:string, value) {
                                    if (prefix) {
                                        name = prefix + '[' + name + ']';
                                    }
                                    if (value !== null && (typeof value === 'object' || Array.isArray(value))) {
                                        add(form, value, name);
                                    } else {
                                        form.append($('<input/>').attr('type', 'hidden')
                                            .attr('name', name)
                                            .attr('value', value));
                                    }
                                });
                                return form;
                            })(<JQuery<HTMLFormElement>>$('<form/>')
                                    .attr('action', data.action)
                                    .attr('target', data.target || '')
                                    .attr('method', data.method || 'get')
                                    .css({'display': 'none'}).appendTo('body'),
                                data.data);
                            form[0].submit();
                            form.remove();
                            break;
                    }
                    return false;
                }

        }
    });
    return validator = await validate(form, e, options);
}

let datepickerInitialize = async () => {
    let promise = Promise.all([
        SystemJS.import('bootstrap-datepicker/css/bootstrap-datepicker3.min.css'),
        SystemJS.import(`bootstrap-datepicker`),
    ]).then(() => SystemJS.import(`bootstrap-datepicker/locales/bootstrap-datepicker.${locale}.min`));
    datepickerInitialize = async () => promise;

    return promise;
};

export async function datepicker(el: HTMLDivElement | HTMLInputElement, event: Event | null, options: DatepickerOptions = {}): Promise<JQuery<HTMLDivElement | HTMLInputElement>> {
    await datepickerInitialize();
    return <JQuery<HTMLDivElement | HTMLInputElement>>jQuery(el).datepicker(jQuery.extend(options, {
        language: locale
    }));
}

export async function scan(element: Element) {
    let list = element.querySelectorAll(events.map((e) => `[data-on-${e}]`).concat(['[data-require]']).join(','));
    for (let i = 0; i < list.length; ++i) {
        element = list.item(i);
        for (let j = 0; j < element.attributes.length; ++j) {
            let attr: Attr = <Attr>list.item(i).attributes.item(j),
                matches = /^(data-require|data-on-(.*))(-\d+)?$/.exec(attr.name);
            if (matches)
                ((element: Element, value: string, event: string | null) => {
                    let params = value.split(',');
                    let f = async (event: Event | null = null) => {
                        let module = await SystemJS.import(params[0]);
                        if (params.length > 1) {
                            await module[params[1]](element, event, ...params.slice(2))
                        }
                    };

                    if (event) {
                        element.addEventListener(event, (event: Event) => {
                            event.preventDefault();
                            f(event).catch(console.log);
                        });
                    } else {
                        f().catch(console.log);
                    }
                })(element, attr.value, matches[2] || null);
        }
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

export async function youtubeBackground(element: HTMLElement, event: Event | null, options?) {
    await youtubeBackgroundInitialize();
    if (!element) return;
    if (!element.id) {
        element.id = "bgyt" + new Date().getTime()
    }
    let $el = jQuery(`#${element.id}`);
    $el.YTPlayer(options || {});
    $el.triggerHandler('init');
}

export function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}

export async function dirtyForm(el: HTMLFormElement | JQuery<HTMLFormElement>) {
    await SystemJS.import('cdnjs/jquery.dirtyforms/2.0.0/jquery.dirtyforms.min.js');
    let $el = jQuery(el);
    $el.dirtyForms({
        ignoreSelector: '.ignore'
    }).on('dirty.dirtyforms clean.dirtyforms', (e) => {
        let buttons = $el.find('[type="reset"],[type="submit"]');
        buttons.prop('disabled', e.type !== 'dirty');
    }).on('success', () => {
        $el.dirtyForms('setClean');
    });
}
