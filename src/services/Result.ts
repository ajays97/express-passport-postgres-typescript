import { Service } from 'typedi';

type ResultErrorInterface = {
  code?: number;
  message: string;
};

@Service('Result')
export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: ResultErrorInterface;
  private _value: T;

  private constructor(isSuccess: boolean, error?: ResultErrorInterface, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be successful and contain an error`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result needs to contain an error message`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return this._value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: ResultErrorInterface | string): Result<U> {
    if (typeof error === 'string') return new Result<U>(false, { message: error });
    else return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok<any>();
  }
}
