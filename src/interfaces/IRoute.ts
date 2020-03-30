export interface IRoute {
  httpVerb: string;
  path: string;
  handlers: Function[];
}
