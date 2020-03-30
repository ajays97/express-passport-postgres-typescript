import { Service } from 'typedi';
import { Response } from 'express';
import { Logger } from 'winston';

@Service()
class AppController {
  constructor(public logger: Logger) {}

  public sendError(response: Response, code: number, message: string) {
    return response.status(code).json({ message });
  }
}

export default AppController;
