import {EventEmitter} from 'events';

/**
 * An mpromise can be in any of three states, pending, fulfilled (success), or rejected (error). Once it is either fulfilled or rejected it's state can no longer be changed.
 */
declare class Promise<T> extends EventEmitter implements PromiseLike<T> {
  /**
   * The constructor accepts an optional function which is executed when the promise is first resolved (either fulfilled or rejected).
   */
  constructor(fn?: (err: any, arg: T, ...sink: any[]) => void);

  /**
   * Fulfilling a promise with values
   * If the promise has already been fulfilled or rejected, no action is taken.
   */
  fulfill(arg?: T, ...sink: any[]): void;

  /**
   * Rejecting a promise with a reason.
   * If the promise has already been fulfilled or rejected, no action is taken.
   */
  reject(reason: any): void;

  /**
   * Node.js callback style promise resolution (err, args...).
   * If the promise has already been fulfilled or rejected, no action is taken.
   */
  resolve(reason?: any, arg?: T, ...sink: any[]): this;

  /**
   * To register a function for execution when the promise is fulfilled, pass it to onFulfill. When executed it will receive the arguments passed to fulfill().
   * The function will only be called once when the promise is fulfilled, never when rejected.
   *
   * Registering a function with onFulfill after the promise has already been fulfilled results in the immediate execution of the function with the original arguments used to fulfill the promise.
   */
  onFulfill(fn: (arg: T, ...sink: any[]) => void): this;

  /**
   * To register a function for execution when the promise is rejected, pass it to onReject. When executed it will receive the argument passed to reject().
   * The function will only be called once when the promise is rejected, never when fulfilled.
   *
   * Registering a function with onReject after the promise has already been rejected results in the immediate execution of the function with the original argument used to reject the promise.
   */
  onReject(fn: (reason: any) => void): this;

  /**
   * Allows registration of node.js style callbacks (err, args..) to handle either promise resolution type (fulfill or reject).
   */
  onResolve(fn: (err: any, arg: T, ...sink: any[]) => void): this;

  /**
   * Creates a new promise and returns it. If onFulfill or onReject are passed, they are added as SUCCESS/ERROR callbacks to this promise after the nextTick.
   *
   * Conforms to promises/A+ specification and passes its tests.
   */
  then(onFulfill?: (arg: T, ...sink: any[]) => void | PromiseLike<void>, onReject?: (reason: any) => void | PromiseLike<void>): Promise<void>;
  then<R>(onFulfill?: (arg: T, ...sink: any[]) => R | PromiseLike<R>, onReject?: (reason: any) => R | PromiseLike<R>): Promise<R>;

  /**
   * Signifies that this promise was the last in a chain of then()s: if a handler passed to the call to then which produced this promise throws, the exception be rethrown. You can pass an OnReject handler to end so that exceptions will be handled (like a final catch clause); This method returns it's promise for easy use with return.
   */
  end(fn?: (reason: any) => void): Promise<T>;

  /**
   * Allows direct promise to promise chaining (especially useful by a outside aggregating function). It doesn't use the asynchronous resolve algorithm and so excepts only another Promise as it's argument.
   */
  chain(promise: PromiseLike<T>): Promise<T>;

  // ======================
  // Undocumented functions
  // ======================

  all<R>(fn: (arg: T, ...sink: any[]) => R[] | PromiseLike<R[]> | PromiseLike<R[] | PromiseLike<R[]>>): Promise<R[]>;

  on(event: string, callback: Function): this;

  static fulfilled(): Promise<void>;
  static fulfilled<T>(value: T, ...sink: any[]): Promise<T>;
  static rejected(reason: any): Promise<void>;
  static deferred(): Promise.Deferred<any>;
  static deferred<T>(): Promise.Deferred<T>;

  static hook(array: any[]): Promise<any[]>;
}

declare namespace Promise {
  const SUCCESS: 'complete';
  const FAILURE: 'err';

  interface Deferred<T> {
    promise: Promise<T>;
    callback: Function;

   reject(reason: any): void;
   resolve(reason?: any, arg?: T, ...sink: any[]): this;
  }
}

export = Promise;
