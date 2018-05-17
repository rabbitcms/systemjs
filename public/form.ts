import jQuery from 'jquery';
import {validate} from "./validation";

export async function form(form: JQuery<HTMLFormElement>, ajax: (settings?: JQuery.AjaxSettings) => Promise<any> = jQuery.ajax): Promise<JQueryValidation.Validator> {
    form = <JQuery<HTMLFormElement>>jQuery(form);
    let lock = false, validator,
        options: JQueryValidation.ValidationOptions = {
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
            submitHandler: async (f: HTMLFormElement, e: JQueryEventObject) => {
                if (!form.data('ajax')) {
                    f.submit();
                    return;
                }
                e.preventDefault();
                if (lock) {
                    return;
                }
                lock = true;

                try {
                    let data = await ajax($.extend(true, {
                        method: form.attr('method'),
                        url: form.attr('action'),
                        data: form.serialize(),
                        error: function (response) {
                            if (response.status === 422) {
                                validator.showErrors(Object.keys(response.responseJSON.errors).reduce(function (errors, key) {
                                    errors[key.split('.').map(function (value, index) {
                                        return index === 0 ? value : '[' + value + ']';
                                    }).join('')] = response.responseJSON.errors[key][0];
                                    return errors;
                                }, {}));
                            } else {
                                form.trigger('error', response.responseJSON);
                            }
                        }
                    }, form.attr('enctype') === 'multipart/form-data'
                        ? {
                            data: new FormData(f),
                            processData: false,
                            contentType: false,
                        }
                        : {}));
                    form.triggerHandler('success', data)
                }catch (e) {

                }
                finally {
                    form.removeClass('sending');
                    lock = false;
                }
            }
        };
    form.triggerHandler('init', options);
    return validator = await validate(form, options);
}