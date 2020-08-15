import { Response } from 'express';
import { Service } from 'typedi';

@Service('BaseController')
class BaseController {
  public ok<T>(response: Response, _dto?: T): Response {
    if (!!_dto) {
      response.type('application/json');
      return response.status(200).json(_dto);
    } else {
      return response.sendStatus(200);
    }
  }

  public static jsonResponse(response: Response, code: number, message: string) {
    return response.status(code).json({ message });
  }

  public created(response: Response) {
    return response.sendStatus(201);
  }

  public clientError(response: Response, message?: string) {
    return BaseController.jsonResponse(response, 400, message ? message : 'Unauthorized');
  }

  public unauthorized(response: Response, message?: string) {
    return BaseController.jsonResponse(response, 401, message ? message : 'Unauthorized');
  }

  public forbidden(response: Response, message?: string) {
    return BaseController.jsonResponse(response, 403, message ? message : 'Forbidden');
  }

  public notFound(response: Response, message?: string) {
    return BaseController.jsonResponse(response, 404, message ? message : 'Not found');
  }

  public conflict(response: Response, message?: string) {
    return BaseController.jsonResponse(response, 409, message ? message : 'Conflict');
  }

  public tooMany(response: Response, message?: string) {
    return BaseController.jsonResponse(response, 429, message ? message : 'Too many requests');
  }

  public todo(response: Response) {
    return BaseController.jsonResponse(response, 400, 'TODO');
  }

  public fail(response: Response, error: Error | string) {
    return response.status(500).json({
      message: error.toString()
    });
  }
}

export default BaseController;
