export const OK = 200;

export const CREATED = 201;

export const BAD_REQUEST = 400;

export const NOT_FOUND = 404;

export const INTERNAL_SERVER_ERROR = 500;

const httpResponse = (content: object, statusCode: number = OK) => ({
  statusCode,
  body: JSON.stringify(content)
});

export const ok = (content: object) => httpResponse(content);

export const created = (content: object) => httpResponse(content, CREATED);

export const badRequest = (message: string) => httpResponse({ message }, BAD_REQUEST);

export const notFound = (message = "Not Found") => httpResponse({ message }, NOT_FOUND);

export const internalServerError = () => httpResponse({ message: 'Oopss, something is wrong!'}, INTERNAL_SERVER_ERROR)
