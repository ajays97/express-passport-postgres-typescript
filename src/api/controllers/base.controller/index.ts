import { Request, Response } from 'express';

/**
 * This is there just in case we want to have DDD based controllers in future
 */

abstract class BaseController {
  /**
   * This is the implementation that we will leave to the
   * subclasses to figure out.
   */

  protected abstract executeImpl(request: Request, response: Response): Promise<void | any>;

  /**
   * This is what we will call on the route handler.
   * We also make sure to catch any uncaught errors in the
   * implementation.
   */

  public async execute(request: Request, response: Response): Promise<void> {
    try {
      await this.executeImpl(request, response);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      this.fail(response, 'An unexpected error occurred');
    }
  }

  public ok<T>(response: Response, _dto?: T) {
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

  public paymentRequired(response: Response, message?: string) {
    return BaseController.jsonResponse(response, 402, message ? message : 'Payment required');
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
    console.log(error);
    return response.status(500).json({
      message: error.toString()
    });
  }
}

export default BaseController;
