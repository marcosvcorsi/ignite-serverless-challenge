import * as Joi from "joi";

import { badRequest } from "@/helpers/http";

export function validationParser(schema: Joi.ObjectSchema, property = 'body') {
  return function (_target: Object, _propertyKey: string, descriptor: PropertyDescriptor) {
    const decorated = descriptor.value;

    descriptor.value = async function(...args) {
      const [ event ] = args;

      if(event) {
        const originalBody = event[property];

        if(originalBody) {
          const data = JSON.parse(originalBody);

          const { error, value } = schema.validate(data, { abortEarly: false });

          if(error) {
            return badRequest(error.message);
          }

          event[property] = value;
        }
      }

      return decorated.apply(this, args);
    }

    return descriptor;
  };
}