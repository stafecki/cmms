
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Certification
 * 
 */
export type Certification = $Result.DefaultSelection<Prisma.$CertificationPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model Machine
 * 
 */
export type Machine = $Result.DefaultSelection<Prisma.$MachinePayload>
/**
 * Model MachineDocument
 * 
 */
export type MachineDocument = $Result.DefaultSelection<Prisma.$MachineDocumentPayload>
/**
 * Model WorkOrder
 * 
 */
export type WorkOrder = $Result.DefaultSelection<Prisma.$WorkOrderPayload>
/**
 * Model WorkOrderMessage
 * 
 */
export type WorkOrderMessage = $Result.DefaultSelection<Prisma.$WorkOrderMessagePayload>
/**
 * Model PartCategory
 * 
 */
export type PartCategory = $Result.DefaultSelection<Prisma.$PartCategoryPayload>
/**
 * Model Part
 * 
 */
export type Part = $Result.DefaultSelection<Prisma.$PartPayload>
/**
 * Model WorkOrderPart
 * 
 */
export type WorkOrderPart = $Result.DefaultSelection<Prisma.$WorkOrderPartPayload>
/**
 * Model ToolLoan
 * 
 */
export type ToolLoan = $Result.DefaultSelection<Prisma.$ToolLoanPayload>
/**
 * Model PreventivePlan
 * 
 */
export type PreventivePlan = $Result.DefaultSelection<Prisma.$PreventivePlanPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model EventLog
 * 
 */
export type EventLog = $Result.DefaultSelection<Prisma.$EventLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  TECHNICIAN: 'TECHNICIAN',
  WAREHOUSE: 'WAREHOUSE',
  OPERATOR: 'OPERATOR'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const CertificationType: {
  SEP: 'SEP',
  FORKLIFT: 'FORKLIFT',
  GAS: 'GAS',
  HEIGHT_WORK: 'HEIGHT_WORK',
  WELDING: 'WELDING',
  OTHER: 'OTHER'
};

export type CertificationType = (typeof CertificationType)[keyof typeof CertificationType]


export const LocationType: {
  PLANT: 'PLANT',
  HALL: 'HALL',
  LINE: 'LINE',
  STATION: 'STATION'
};

export type LocationType = (typeof LocationType)[keyof typeof LocationType]


export const WorkOrderStatus: {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  WAITING_FOR_PARTS: 'WAITING_FOR_PARTS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type WorkOrderStatus = (typeof WorkOrderStatus)[keyof typeof WorkOrderStatus]


export const Priority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type Priority = (typeof Priority)[keyof typeof Priority]


export const NotificationType: {
  CRITICAL_FAILURE: 'CRITICAL_FAILURE',
  REORDER_ALERT: 'REORDER_ALERT',
  PREVENTIVE_DUE: 'PREVENTIVE_DUE',
  CERT_EXPIRING: 'CERT_EXPIRING',
  WORK_ORDER_ASSIGNED: 'WORK_ORDER_ASSIGNED',
  ANNOUNCEMENT: 'ANNOUNCEMENT'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type CertificationType = $Enums.CertificationType

export const CertificationType: typeof $Enums.CertificationType

export type LocationType = $Enums.LocationType

export const LocationType: typeof $Enums.LocationType

export type WorkOrderStatus = $Enums.WorkOrderStatus

export const WorkOrderStatus: typeof $Enums.WorkOrderStatus

export type Priority = $Enums.Priority

export const Priority: typeof $Enums.Priority

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.certification`: Exposes CRUD operations for the **Certification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Certifications
    * const certifications = await prisma.certification.findMany()
    * ```
    */
  get certification(): Prisma.CertificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.machine`: Exposes CRUD operations for the **Machine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Machines
    * const machines = await prisma.machine.findMany()
    * ```
    */
  get machine(): Prisma.MachineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.machineDocument`: Exposes CRUD operations for the **MachineDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MachineDocuments
    * const machineDocuments = await prisma.machineDocument.findMany()
    * ```
    */
  get machineDocument(): Prisma.MachineDocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workOrder`: Exposes CRUD operations for the **WorkOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkOrders
    * const workOrders = await prisma.workOrder.findMany()
    * ```
    */
  get workOrder(): Prisma.WorkOrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workOrderMessage`: Exposes CRUD operations for the **WorkOrderMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkOrderMessages
    * const workOrderMessages = await prisma.workOrderMessage.findMany()
    * ```
    */
  get workOrderMessage(): Prisma.WorkOrderMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.partCategory`: Exposes CRUD operations for the **PartCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PartCategories
    * const partCategories = await prisma.partCategory.findMany()
    * ```
    */
  get partCategory(): Prisma.PartCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.part`: Exposes CRUD operations for the **Part** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parts
    * const parts = await prisma.part.findMany()
    * ```
    */
  get part(): Prisma.PartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workOrderPart`: Exposes CRUD operations for the **WorkOrderPart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkOrderParts
    * const workOrderParts = await prisma.workOrderPart.findMany()
    * ```
    */
  get workOrderPart(): Prisma.WorkOrderPartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.toolLoan`: Exposes CRUD operations for the **ToolLoan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ToolLoans
    * const toolLoans = await prisma.toolLoan.findMany()
    * ```
    */
  get toolLoan(): Prisma.ToolLoanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preventivePlan`: Exposes CRUD operations for the **PreventivePlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreventivePlans
    * const preventivePlans = await prisma.preventivePlan.findMany()
    * ```
    */
  get preventivePlan(): Prisma.PreventivePlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventLog`: Exposes CRUD operations for the **EventLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventLogs
    * const eventLogs = await prisma.eventLog.findMany()
    * ```
    */
  get eventLog(): Prisma.EventLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Certification: 'Certification',
    Location: 'Location',
    Machine: 'Machine',
    MachineDocument: 'MachineDocument',
    WorkOrder: 'WorkOrder',
    WorkOrderMessage: 'WorkOrderMessage',
    PartCategory: 'PartCategory',
    Part: 'Part',
    WorkOrderPart: 'WorkOrderPart',
    ToolLoan: 'ToolLoan',
    PreventivePlan: 'PreventivePlan',
    Notification: 'Notification',
    EventLog: 'EventLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "certification" | "location" | "machine" | "machineDocument" | "workOrder" | "workOrderMessage" | "partCategory" | "part" | "workOrderPart" | "toolLoan" | "preventivePlan" | "notification" | "eventLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Certification: {
        payload: Prisma.$CertificationPayload<ExtArgs>
        fields: Prisma.CertificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CertificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CertificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          findFirst: {
            args: Prisma.CertificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CertificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          findMany: {
            args: Prisma.CertificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>[]
          }
          create: {
            args: Prisma.CertificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          createMany: {
            args: Prisma.CertificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CertificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          update: {
            args: Prisma.CertificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          deleteMany: {
            args: Prisma.CertificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CertificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CertificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          aggregate: {
            args: Prisma.CertificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCertification>
          }
          groupBy: {
            args: Prisma.CertificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CertificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CertificationCountArgs<ExtArgs>
            result: $Utils.Optional<CertificationCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      Machine: {
        payload: Prisma.$MachinePayload<ExtArgs>
        fields: Prisma.MachineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MachineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MachineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachinePayload>
          }
          findFirst: {
            args: Prisma.MachineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MachineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachinePayload>
          }
          findMany: {
            args: Prisma.MachineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachinePayload>[]
          }
          create: {
            args: Prisma.MachineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachinePayload>
          }
          createMany: {
            args: Prisma.MachineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MachineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachinePayload>
          }
          update: {
            args: Prisma.MachineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachinePayload>
          }
          deleteMany: {
            args: Prisma.MachineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MachineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MachineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachinePayload>
          }
          aggregate: {
            args: Prisma.MachineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMachine>
          }
          groupBy: {
            args: Prisma.MachineGroupByArgs<ExtArgs>
            result: $Utils.Optional<MachineGroupByOutputType>[]
          }
          count: {
            args: Prisma.MachineCountArgs<ExtArgs>
            result: $Utils.Optional<MachineCountAggregateOutputType> | number
          }
        }
      }
      MachineDocument: {
        payload: Prisma.$MachineDocumentPayload<ExtArgs>
        fields: Prisma.MachineDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MachineDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachineDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MachineDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachineDocumentPayload>
          }
          findFirst: {
            args: Prisma.MachineDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachineDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MachineDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachineDocumentPayload>
          }
          findMany: {
            args: Prisma.MachineDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachineDocumentPayload>[]
          }
          create: {
            args: Prisma.MachineDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachineDocumentPayload>
          }
          createMany: {
            args: Prisma.MachineDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MachineDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachineDocumentPayload>
          }
          update: {
            args: Prisma.MachineDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachineDocumentPayload>
          }
          deleteMany: {
            args: Prisma.MachineDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MachineDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MachineDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MachineDocumentPayload>
          }
          aggregate: {
            args: Prisma.MachineDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMachineDocument>
          }
          groupBy: {
            args: Prisma.MachineDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<MachineDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.MachineDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<MachineDocumentCountAggregateOutputType> | number
          }
        }
      }
      WorkOrder: {
        payload: Prisma.$WorkOrderPayload<ExtArgs>
        fields: Prisma.WorkOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          findFirst: {
            args: Prisma.WorkOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          findMany: {
            args: Prisma.WorkOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>[]
          }
          create: {
            args: Prisma.WorkOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          createMany: {
            args: Prisma.WorkOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WorkOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          update: {
            args: Prisma.WorkOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          deleteMany: {
            args: Prisma.WorkOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPayload>
          }
          aggregate: {
            args: Prisma.WorkOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkOrder>
          }
          groupBy: {
            args: Prisma.WorkOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkOrderCountArgs<ExtArgs>
            result: $Utils.Optional<WorkOrderCountAggregateOutputType> | number
          }
        }
      }
      WorkOrderMessage: {
        payload: Prisma.$WorkOrderMessagePayload<ExtArgs>
        fields: Prisma.WorkOrderMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkOrderMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkOrderMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderMessagePayload>
          }
          findFirst: {
            args: Prisma.WorkOrderMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkOrderMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderMessagePayload>
          }
          findMany: {
            args: Prisma.WorkOrderMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderMessagePayload>[]
          }
          create: {
            args: Prisma.WorkOrderMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderMessagePayload>
          }
          createMany: {
            args: Prisma.WorkOrderMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WorkOrderMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderMessagePayload>
          }
          update: {
            args: Prisma.WorkOrderMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderMessagePayload>
          }
          deleteMany: {
            args: Prisma.WorkOrderMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkOrderMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkOrderMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderMessagePayload>
          }
          aggregate: {
            args: Prisma.WorkOrderMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkOrderMessage>
          }
          groupBy: {
            args: Prisma.WorkOrderMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkOrderMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkOrderMessageCountArgs<ExtArgs>
            result: $Utils.Optional<WorkOrderMessageCountAggregateOutputType> | number
          }
        }
      }
      PartCategory: {
        payload: Prisma.$PartCategoryPayload<ExtArgs>
        fields: Prisma.PartCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartCategoryPayload>
          }
          findFirst: {
            args: Prisma.PartCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartCategoryPayload>
          }
          findMany: {
            args: Prisma.PartCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartCategoryPayload>[]
          }
          create: {
            args: Prisma.PartCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartCategoryPayload>
          }
          createMany: {
            args: Prisma.PartCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PartCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartCategoryPayload>
          }
          update: {
            args: Prisma.PartCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartCategoryPayload>
          }
          deleteMany: {
            args: Prisma.PartCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartCategoryPayload>
          }
          aggregate: {
            args: Prisma.PartCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartCategory>
          }
          groupBy: {
            args: Prisma.PartCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<PartCategoryCountAggregateOutputType> | number
          }
        }
      }
      Part: {
        payload: Prisma.$PartPayload<ExtArgs>
        fields: Prisma.PartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findFirst: {
            args: Prisma.PartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findMany: {
            args: Prisma.PartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          create: {
            args: Prisma.PartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          createMany: {
            args: Prisma.PartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          update: {
            args: Prisma.PartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          deleteMany: {
            args: Prisma.PartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          aggregate: {
            args: Prisma.PartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePart>
          }
          groupBy: {
            args: Prisma.PartGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartCountArgs<ExtArgs>
            result: $Utils.Optional<PartCountAggregateOutputType> | number
          }
        }
      }
      WorkOrderPart: {
        payload: Prisma.$WorkOrderPartPayload<ExtArgs>
        fields: Prisma.WorkOrderPartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkOrderPartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkOrderPartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>
          }
          findFirst: {
            args: Prisma.WorkOrderPartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkOrderPartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>
          }
          findMany: {
            args: Prisma.WorkOrderPartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>[]
          }
          create: {
            args: Prisma.WorkOrderPartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>
          }
          createMany: {
            args: Prisma.WorkOrderPartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WorkOrderPartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>
          }
          update: {
            args: Prisma.WorkOrderPartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>
          }
          deleteMany: {
            args: Prisma.WorkOrderPartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkOrderPartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkOrderPartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>
          }
          aggregate: {
            args: Prisma.WorkOrderPartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkOrderPart>
          }
          groupBy: {
            args: Prisma.WorkOrderPartGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkOrderPartGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkOrderPartCountArgs<ExtArgs>
            result: $Utils.Optional<WorkOrderPartCountAggregateOutputType> | number
          }
        }
      }
      ToolLoan: {
        payload: Prisma.$ToolLoanPayload<ExtArgs>
        fields: Prisma.ToolLoanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ToolLoanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolLoanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ToolLoanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolLoanPayload>
          }
          findFirst: {
            args: Prisma.ToolLoanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolLoanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ToolLoanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolLoanPayload>
          }
          findMany: {
            args: Prisma.ToolLoanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolLoanPayload>[]
          }
          create: {
            args: Prisma.ToolLoanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolLoanPayload>
          }
          createMany: {
            args: Prisma.ToolLoanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ToolLoanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolLoanPayload>
          }
          update: {
            args: Prisma.ToolLoanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolLoanPayload>
          }
          deleteMany: {
            args: Prisma.ToolLoanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ToolLoanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ToolLoanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToolLoanPayload>
          }
          aggregate: {
            args: Prisma.ToolLoanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToolLoan>
          }
          groupBy: {
            args: Prisma.ToolLoanGroupByArgs<ExtArgs>
            result: $Utils.Optional<ToolLoanGroupByOutputType>[]
          }
          count: {
            args: Prisma.ToolLoanCountArgs<ExtArgs>
            result: $Utils.Optional<ToolLoanCountAggregateOutputType> | number
          }
        }
      }
      PreventivePlan: {
        payload: Prisma.$PreventivePlanPayload<ExtArgs>
        fields: Prisma.PreventivePlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreventivePlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivePlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreventivePlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivePlanPayload>
          }
          findFirst: {
            args: Prisma.PreventivePlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivePlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreventivePlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivePlanPayload>
          }
          findMany: {
            args: Prisma.PreventivePlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivePlanPayload>[]
          }
          create: {
            args: Prisma.PreventivePlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivePlanPayload>
          }
          createMany: {
            args: Prisma.PreventivePlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PreventivePlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivePlanPayload>
          }
          update: {
            args: Prisma.PreventivePlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivePlanPayload>
          }
          deleteMany: {
            args: Prisma.PreventivePlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreventivePlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PreventivePlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivePlanPayload>
          }
          aggregate: {
            args: Prisma.PreventivePlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreventivePlan>
          }
          groupBy: {
            args: Prisma.PreventivePlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreventivePlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreventivePlanCountArgs<ExtArgs>
            result: $Utils.Optional<PreventivePlanCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      EventLog: {
        payload: Prisma.$EventLogPayload<ExtArgs>
        fields: Prisma.EventLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          findFirst: {
            args: Prisma.EventLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          findMany: {
            args: Prisma.EventLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>[]
          }
          create: {
            args: Prisma.EventLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          createMany: {
            args: Prisma.EventLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EventLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          update: {
            args: Prisma.EventLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          deleteMany: {
            args: Prisma.EventLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EventLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          aggregate: {
            args: Prisma.EventLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventLog>
          }
          groupBy: {
            args: Prisma.EventLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventLogCountArgs<ExtArgs>
            result: $Utils.Optional<EventLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    certification?: CertificationOmit
    location?: LocationOmit
    machine?: MachineOmit
    machineDocument?: MachineDocumentOmit
    workOrder?: WorkOrderOmit
    workOrderMessage?: WorkOrderMessageOmit
    partCategory?: PartCategoryOmit
    part?: PartOmit
    workOrderPart?: WorkOrderPartOmit
    toolLoan?: ToolLoanOmit
    preventivePlan?: PreventivePlanOmit
    notification?: NotificationOmit
    eventLog?: EventLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    certifications: number
    reportedOrders: number
    assignedOrders: number
    messages: number
    toolLoans: number
    notifications: number
    uploadedDocuments: number
    eventLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    certifications?: boolean | UserCountOutputTypeCountCertificationsArgs
    reportedOrders?: boolean | UserCountOutputTypeCountReportedOrdersArgs
    assignedOrders?: boolean | UserCountOutputTypeCountAssignedOrdersArgs
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
    toolLoans?: boolean | UserCountOutputTypeCountToolLoansArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    uploadedDocuments?: boolean | UserCountOutputTypeCountUploadedDocumentsArgs
    eventLogs?: boolean | UserCountOutputTypeCountEventLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCertificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportedOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderMessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountToolLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolLoanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadedDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MachineDocumentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventLogWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    children: number
    machines: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | LocationCountOutputTypeCountChildrenArgs
    machines?: boolean | LocationCountOutputTypeCountMachinesArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountMachinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MachineWhereInput
  }


  /**
   * Count Type MachineCountOutputType
   */

  export type MachineCountOutputType = {
    documents: number
    workOrders: number
    preventivePlans: number
  }

  export type MachineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | MachineCountOutputTypeCountDocumentsArgs
    workOrders?: boolean | MachineCountOutputTypeCountWorkOrdersArgs
    preventivePlans?: boolean | MachineCountOutputTypeCountPreventivePlansArgs
  }

  // Custom InputTypes
  /**
   * MachineCountOutputType without action
   */
  export type MachineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineCountOutputType
     */
    select?: MachineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MachineCountOutputType without action
   */
  export type MachineCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MachineDocumentWhereInput
  }

  /**
   * MachineCountOutputType without action
   */
  export type MachineCountOutputTypeCountWorkOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderWhereInput
  }

  /**
   * MachineCountOutputType without action
   */
  export type MachineCountOutputTypeCountPreventivePlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreventivePlanWhereInput
  }


  /**
   * Count Type WorkOrderCountOutputType
   */

  export type WorkOrderCountOutputType = {
    messages: number
    parts: number
    toolLoans: number
  }

  export type WorkOrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | WorkOrderCountOutputTypeCountMessagesArgs
    parts?: boolean | WorkOrderCountOutputTypeCountPartsArgs
    toolLoans?: boolean | WorkOrderCountOutputTypeCountToolLoansArgs
  }

  // Custom InputTypes
  /**
   * WorkOrderCountOutputType without action
   */
  export type WorkOrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderCountOutputType
     */
    select?: WorkOrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkOrderCountOutputType without action
   */
  export type WorkOrderCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderMessageWhereInput
  }

  /**
   * WorkOrderCountOutputType without action
   */
  export type WorkOrderCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderPartWhereInput
  }

  /**
   * WorkOrderCountOutputType without action
   */
  export type WorkOrderCountOutputTypeCountToolLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolLoanWhereInput
  }


  /**
   * Count Type PartCategoryCountOutputType
   */

  export type PartCategoryCountOutputType = {
    parts: number
  }

  export type PartCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | PartCategoryCountOutputTypeCountPartsArgs
  }

  // Custom InputTypes
  /**
   * PartCategoryCountOutputType without action
   */
  export type PartCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategoryCountOutputType
     */
    select?: PartCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartCategoryCountOutputType without action
   */
  export type PartCategoryCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
  }


  /**
   * Count Type PartCountOutputType
   */

  export type PartCountOutputType = {
    workOrderParts: number
    toolLoans: number
  }

  export type PartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workOrderParts?: boolean | PartCountOutputTypeCountWorkOrderPartsArgs
    toolLoans?: boolean | PartCountOutputTypeCountToolLoansArgs
  }

  // Custom InputTypes
  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCountOutputType
     */
    select?: PartCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeCountWorkOrderPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderPartWhereInput
  }

  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeCountToolLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolLoanWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    certifications?: boolean | User$certificationsArgs<ExtArgs>
    reportedOrders?: boolean | User$reportedOrdersArgs<ExtArgs>
    assignedOrders?: boolean | User$assignedOrdersArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    toolLoans?: boolean | User$toolLoansArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    uploadedDocuments?: boolean | User$uploadedDocumentsArgs<ExtArgs>
    eventLogs?: boolean | User$eventLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "role" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    certifications?: boolean | User$certificationsArgs<ExtArgs>
    reportedOrders?: boolean | User$reportedOrdersArgs<ExtArgs>
    assignedOrders?: boolean | User$assignedOrdersArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    toolLoans?: boolean | User$toolLoansArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    uploadedDocuments?: boolean | User$uploadedDocumentsArgs<ExtArgs>
    eventLogs?: boolean | User$eventLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      certifications: Prisma.$CertificationPayload<ExtArgs>[]
      reportedOrders: Prisma.$WorkOrderPayload<ExtArgs>[]
      assignedOrders: Prisma.$WorkOrderPayload<ExtArgs>[]
      messages: Prisma.$WorkOrderMessagePayload<ExtArgs>[]
      toolLoans: Prisma.$ToolLoanPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      uploadedDocuments: Prisma.$MachineDocumentPayload<ExtArgs>[]
      eventLogs: Prisma.$EventLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    certifications<T extends User$certificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$certificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reportedOrders<T extends User$reportedOrdersArgs<ExtArgs> = {}>(args?: Subset<T, User$reportedOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedOrders<T extends User$assignedOrdersArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    toolLoans<T extends User$toolLoansArgs<ExtArgs> = {}>(args?: Subset<T, User$toolLoansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    uploadedDocuments<T extends User$uploadedDocumentsArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadedDocumentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    eventLogs<T extends User$eventLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.certifications
   */
  export type User$certificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    where?: CertificationWhereInput
    orderBy?: CertificationOrderByWithRelationInput | CertificationOrderByWithRelationInput[]
    cursor?: CertificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CertificationScalarFieldEnum | CertificationScalarFieldEnum[]
  }

  /**
   * User.reportedOrders
   */
  export type User$reportedOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    where?: WorkOrderWhereInput
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    cursor?: WorkOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * User.assignedOrders
   */
  export type User$assignedOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    where?: WorkOrderWhereInput
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    cursor?: WorkOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    where?: WorkOrderMessageWhereInput
    orderBy?: WorkOrderMessageOrderByWithRelationInput | WorkOrderMessageOrderByWithRelationInput[]
    cursor?: WorkOrderMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkOrderMessageScalarFieldEnum | WorkOrderMessageScalarFieldEnum[]
  }

  /**
   * User.toolLoans
   */
  export type User$toolLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    where?: ToolLoanWhereInput
    orderBy?: ToolLoanOrderByWithRelationInput | ToolLoanOrderByWithRelationInput[]
    cursor?: ToolLoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ToolLoanScalarFieldEnum | ToolLoanScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.uploadedDocuments
   */
  export type User$uploadedDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    where?: MachineDocumentWhereInput
    orderBy?: MachineDocumentOrderByWithRelationInput | MachineDocumentOrderByWithRelationInput[]
    cursor?: MachineDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MachineDocumentScalarFieldEnum | MachineDocumentScalarFieldEnum[]
  }

  /**
   * User.eventLogs
   */
  export type User$eventLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
    where?: EventLogWhereInput
    orderBy?: EventLogOrderByWithRelationInput | EventLogOrderByWithRelationInput[]
    cursor?: EventLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventLogScalarFieldEnum | EventLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Certification
   */

  export type AggregateCertification = {
    _count: CertificationCountAggregateOutputType | null
    _min: CertificationMinAggregateOutputType | null
    _max: CertificationMaxAggregateOutputType | null
  }

  export type CertificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.CertificationType | null
    issuedAt: Date | null
    expiresAt: Date | null
    isValid: boolean | null
    createdAt: Date | null
  }

  export type CertificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.CertificationType | null
    issuedAt: Date | null
    expiresAt: Date | null
    isValid: boolean | null
    createdAt: Date | null
  }

  export type CertificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    issuedAt: number
    expiresAt: number
    isValid: number
    createdAt: number
    _all: number
  }


  export type CertificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    issuedAt?: true
    expiresAt?: true
    isValid?: true
    createdAt?: true
  }

  export type CertificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    issuedAt?: true
    expiresAt?: true
    isValid?: true
    createdAt?: true
  }

  export type CertificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    issuedAt?: true
    expiresAt?: true
    isValid?: true
    createdAt?: true
    _all?: true
  }

  export type CertificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certification to aggregate.
     */
    where?: CertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certifications to fetch.
     */
    orderBy?: CertificationOrderByWithRelationInput | CertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Certifications
    **/
    _count?: true | CertificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CertificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CertificationMaxAggregateInputType
  }

  export type GetCertificationAggregateType<T extends CertificationAggregateArgs> = {
        [P in keyof T & keyof AggregateCertification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCertification[P]>
      : GetScalarType<T[P], AggregateCertification[P]>
  }




  export type CertificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificationWhereInput
    orderBy?: CertificationOrderByWithAggregationInput | CertificationOrderByWithAggregationInput[]
    by: CertificationScalarFieldEnum[] | CertificationScalarFieldEnum
    having?: CertificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CertificationCountAggregateInputType | true
    _min?: CertificationMinAggregateInputType
    _max?: CertificationMaxAggregateInputType
  }

  export type CertificationGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.CertificationType
    issuedAt: Date
    expiresAt: Date
    isValid: boolean
    createdAt: Date
    _count: CertificationCountAggregateOutputType | null
    _min: CertificationMinAggregateOutputType | null
    _max: CertificationMaxAggregateOutputType | null
  }

  type GetCertificationGroupByPayload<T extends CertificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CertificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CertificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CertificationGroupByOutputType[P]>
            : GetScalarType<T[P], CertificationGroupByOutputType[P]>
        }
      >
    >


  export type CertificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    isValid?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certification"]>



  export type CertificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    isValid?: boolean
    createdAt?: boolean
  }

  export type CertificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "issuedAt" | "expiresAt" | "isValid" | "createdAt", ExtArgs["result"]["certification"]>
  export type CertificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CertificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Certification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.CertificationType
      issuedAt: Date
      expiresAt: Date
      isValid: boolean
      createdAt: Date
    }, ExtArgs["result"]["certification"]>
    composites: {}
  }

  type CertificationGetPayload<S extends boolean | null | undefined | CertificationDefaultArgs> = $Result.GetResult<Prisma.$CertificationPayload, S>

  type CertificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CertificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CertificationCountAggregateInputType | true
    }

  export interface CertificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Certification'], meta: { name: 'Certification' } }
    /**
     * Find zero or one Certification that matches the filter.
     * @param {CertificationFindUniqueArgs} args - Arguments to find a Certification
     * @example
     * // Get one Certification
     * const certification = await prisma.certification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CertificationFindUniqueArgs>(args: SelectSubset<T, CertificationFindUniqueArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Certification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CertificationFindUniqueOrThrowArgs} args - Arguments to find a Certification
     * @example
     * // Get one Certification
     * const certification = await prisma.certification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CertificationFindUniqueOrThrowArgs>(args: SelectSubset<T, CertificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Certification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationFindFirstArgs} args - Arguments to find a Certification
     * @example
     * // Get one Certification
     * const certification = await prisma.certification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CertificationFindFirstArgs>(args?: SelectSubset<T, CertificationFindFirstArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Certification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationFindFirstOrThrowArgs} args - Arguments to find a Certification
     * @example
     * // Get one Certification
     * const certification = await prisma.certification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CertificationFindFirstOrThrowArgs>(args?: SelectSubset<T, CertificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Certifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Certifications
     * const certifications = await prisma.certification.findMany()
     * 
     * // Get first 10 Certifications
     * const certifications = await prisma.certification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const certificationWithIdOnly = await prisma.certification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CertificationFindManyArgs>(args?: SelectSubset<T, CertificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Certification.
     * @param {CertificationCreateArgs} args - Arguments to create a Certification.
     * @example
     * // Create one Certification
     * const Certification = await prisma.certification.create({
     *   data: {
     *     // ... data to create a Certification
     *   }
     * })
     * 
     */
    create<T extends CertificationCreateArgs>(args: SelectSubset<T, CertificationCreateArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Certifications.
     * @param {CertificationCreateManyArgs} args - Arguments to create many Certifications.
     * @example
     * // Create many Certifications
     * const certification = await prisma.certification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CertificationCreateManyArgs>(args?: SelectSubset<T, CertificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Certification.
     * @param {CertificationDeleteArgs} args - Arguments to delete one Certification.
     * @example
     * // Delete one Certification
     * const Certification = await prisma.certification.delete({
     *   where: {
     *     // ... filter to delete one Certification
     *   }
     * })
     * 
     */
    delete<T extends CertificationDeleteArgs>(args: SelectSubset<T, CertificationDeleteArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Certification.
     * @param {CertificationUpdateArgs} args - Arguments to update one Certification.
     * @example
     * // Update one Certification
     * const certification = await prisma.certification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CertificationUpdateArgs>(args: SelectSubset<T, CertificationUpdateArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Certifications.
     * @param {CertificationDeleteManyArgs} args - Arguments to filter Certifications to delete.
     * @example
     * // Delete a few Certifications
     * const { count } = await prisma.certification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CertificationDeleteManyArgs>(args?: SelectSubset<T, CertificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Certifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Certifications
     * const certification = await prisma.certification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CertificationUpdateManyArgs>(args: SelectSubset<T, CertificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Certification.
     * @param {CertificationUpsertArgs} args - Arguments to update or create a Certification.
     * @example
     * // Update or create a Certification
     * const certification = await prisma.certification.upsert({
     *   create: {
     *     // ... data to create a Certification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Certification we want to update
     *   }
     * })
     */
    upsert<T extends CertificationUpsertArgs>(args: SelectSubset<T, CertificationUpsertArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Certifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationCountArgs} args - Arguments to filter Certifications to count.
     * @example
     * // Count the number of Certifications
     * const count = await prisma.certification.count({
     *   where: {
     *     // ... the filter for the Certifications we want to count
     *   }
     * })
    **/
    count<T extends CertificationCountArgs>(
      args?: Subset<T, CertificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CertificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Certification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CertificationAggregateArgs>(args: Subset<T, CertificationAggregateArgs>): Prisma.PrismaPromise<GetCertificationAggregateType<T>>

    /**
     * Group by Certification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CertificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CertificationGroupByArgs['orderBy'] }
        : { orderBy?: CertificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CertificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Certification model
   */
  readonly fields: CertificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Certification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CertificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Certification model
   */
  interface CertificationFieldRefs {
    readonly id: FieldRef<"Certification", 'String'>
    readonly userId: FieldRef<"Certification", 'String'>
    readonly type: FieldRef<"Certification", 'CertificationType'>
    readonly issuedAt: FieldRef<"Certification", 'DateTime'>
    readonly expiresAt: FieldRef<"Certification", 'DateTime'>
    readonly isValid: FieldRef<"Certification", 'Boolean'>
    readonly createdAt: FieldRef<"Certification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Certification findUnique
   */
  export type CertificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter, which Certification to fetch.
     */
    where: CertificationWhereUniqueInput
  }

  /**
   * Certification findUniqueOrThrow
   */
  export type CertificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter, which Certification to fetch.
     */
    where: CertificationWhereUniqueInput
  }

  /**
   * Certification findFirst
   */
  export type CertificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter, which Certification to fetch.
     */
    where?: CertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certifications to fetch.
     */
    orderBy?: CertificationOrderByWithRelationInput | CertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certifications.
     */
    cursor?: CertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certifications.
     */
    distinct?: CertificationScalarFieldEnum | CertificationScalarFieldEnum[]
  }

  /**
   * Certification findFirstOrThrow
   */
  export type CertificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter, which Certification to fetch.
     */
    where?: CertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certifications to fetch.
     */
    orderBy?: CertificationOrderByWithRelationInput | CertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certifications.
     */
    cursor?: CertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certifications.
     */
    distinct?: CertificationScalarFieldEnum | CertificationScalarFieldEnum[]
  }

  /**
   * Certification findMany
   */
  export type CertificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter, which Certifications to fetch.
     */
    where?: CertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certifications to fetch.
     */
    orderBy?: CertificationOrderByWithRelationInput | CertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Certifications.
     */
    cursor?: CertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certifications.
     */
    distinct?: CertificationScalarFieldEnum | CertificationScalarFieldEnum[]
  }

  /**
   * Certification create
   */
  export type CertificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Certification.
     */
    data: XOR<CertificationCreateInput, CertificationUncheckedCreateInput>
  }

  /**
   * Certification createMany
   */
  export type CertificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Certifications.
     */
    data: CertificationCreateManyInput | CertificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Certification update
   */
  export type CertificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Certification.
     */
    data: XOR<CertificationUpdateInput, CertificationUncheckedUpdateInput>
    /**
     * Choose, which Certification to update.
     */
    where: CertificationWhereUniqueInput
  }

  /**
   * Certification updateMany
   */
  export type CertificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Certifications.
     */
    data: XOR<CertificationUpdateManyMutationInput, CertificationUncheckedUpdateManyInput>
    /**
     * Filter which Certifications to update
     */
    where?: CertificationWhereInput
    /**
     * Limit how many Certifications to update.
     */
    limit?: number
  }

  /**
   * Certification upsert
   */
  export type CertificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Certification to update in case it exists.
     */
    where: CertificationWhereUniqueInput
    /**
     * In case the Certification found by the `where` argument doesn't exist, create a new Certification with this data.
     */
    create: XOR<CertificationCreateInput, CertificationUncheckedCreateInput>
    /**
     * In case the Certification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CertificationUpdateInput, CertificationUncheckedUpdateInput>
  }

  /**
   * Certification delete
   */
  export type CertificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter which Certification to delete.
     */
    where: CertificationWhereUniqueInput
  }

  /**
   * Certification deleteMany
   */
  export type CertificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certifications to delete
     */
    where?: CertificationWhereInput
    /**
     * Limit how many Certifications to delete.
     */
    limit?: number
  }

  /**
   * Certification without action
   */
  export type CertificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.LocationType | null
    parentId: string | null
  }

  export type LocationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.LocationType | null
    parentId: string | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    name: number
    type: number
    parentId: number
    _all: number
  }


  export type LocationMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    parentId?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    parentId?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    parentId?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: string
    name: string
    type: $Enums.LocationType
    parentId: string | null
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    parentId?: boolean
    parent?: boolean | Location$parentArgs<ExtArgs>
    children?: boolean | Location$childrenArgs<ExtArgs>
    machines?: boolean | Location$machinesArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>



  export type LocationSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    parentId?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "parentId", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Location$parentArgs<ExtArgs>
    children?: boolean | Location$childrenArgs<ExtArgs>
    machines?: boolean | Location$machinesArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      parent: Prisma.$LocationPayload<ExtArgs> | null
      children: Prisma.$LocationPayload<ExtArgs>[]
      machines: Prisma.$MachinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.LocationType
      parentId: string | null
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Location$parentArgs<ExtArgs> = {}>(args?: Subset<T, Location$parentArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Location$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Location$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    machines<T extends Location$machinesArgs<ExtArgs> = {}>(args?: Subset<T, Location$machinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'String'>
    readonly name: FieldRef<"Location", 'String'>
    readonly type: FieldRef<"Location", 'LocationType'>
    readonly parentId: FieldRef<"Location", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location.parent
   */
  export type Location$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * Location.children
   */
  export type Location$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    cursor?: LocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location.machines
   */
  export type Location$machinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
    where?: MachineWhereInput
    orderBy?: MachineOrderByWithRelationInput | MachineOrderByWithRelationInput[]
    cursor?: MachineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MachineScalarFieldEnum | MachineScalarFieldEnum[]
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model Machine
   */

  export type AggregateMachine = {
    _count: MachineCountAggregateOutputType | null
    _avg: MachineAvgAggregateOutputType | null
    _sum: MachineSumAggregateOutputType | null
    _min: MachineMinAggregateOutputType | null
    _max: MachineMaxAggregateOutputType | null
  }

  export type MachineAvgAggregateOutputType = {
    operatingHours: number | null
    purchasePrice: Decimal | null
  }

  export type MachineSumAggregateOutputType = {
    operatingHours: number | null
    purchasePrice: Decimal | null
  }

  export type MachineMinAggregateOutputType = {
    id: string | null
    name: string | null
    serialNumber: string | null
    locationId: string | null
    operatingHours: number | null
    purchaseDate: Date | null
    purchasePrice: Decimal | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MachineMaxAggregateOutputType = {
    id: string | null
    name: string | null
    serialNumber: string | null
    locationId: string | null
    operatingHours: number | null
    purchaseDate: Date | null
    purchasePrice: Decimal | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MachineCountAggregateOutputType = {
    id: number
    name: number
    serialNumber: number
    locationId: number
    operatingHours: number
    purchaseDate: number
    purchasePrice: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MachineAvgAggregateInputType = {
    operatingHours?: true
    purchasePrice?: true
  }

  export type MachineSumAggregateInputType = {
    operatingHours?: true
    purchasePrice?: true
  }

  export type MachineMinAggregateInputType = {
    id?: true
    name?: true
    serialNumber?: true
    locationId?: true
    operatingHours?: true
    purchaseDate?: true
    purchasePrice?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MachineMaxAggregateInputType = {
    id?: true
    name?: true
    serialNumber?: true
    locationId?: true
    operatingHours?: true
    purchaseDate?: true
    purchasePrice?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MachineCountAggregateInputType = {
    id?: true
    name?: true
    serialNumber?: true
    locationId?: true
    operatingHours?: true
    purchaseDate?: true
    purchasePrice?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MachineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Machine to aggregate.
     */
    where?: MachineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Machines to fetch.
     */
    orderBy?: MachineOrderByWithRelationInput | MachineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MachineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Machines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Machines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Machines
    **/
    _count?: true | MachineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MachineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MachineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MachineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MachineMaxAggregateInputType
  }

  export type GetMachineAggregateType<T extends MachineAggregateArgs> = {
        [P in keyof T & keyof AggregateMachine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMachine[P]>
      : GetScalarType<T[P], AggregateMachine[P]>
  }




  export type MachineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MachineWhereInput
    orderBy?: MachineOrderByWithAggregationInput | MachineOrderByWithAggregationInput[]
    by: MachineScalarFieldEnum[] | MachineScalarFieldEnum
    having?: MachineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MachineCountAggregateInputType | true
    _avg?: MachineAvgAggregateInputType
    _sum?: MachineSumAggregateInputType
    _min?: MachineMinAggregateInputType
    _max?: MachineMaxAggregateInputType
  }

  export type MachineGroupByOutputType = {
    id: string
    name: string
    serialNumber: string
    locationId: string
    operatingHours: number
    purchaseDate: Date
    purchasePrice: Decimal
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: MachineCountAggregateOutputType | null
    _avg: MachineAvgAggregateOutputType | null
    _sum: MachineSumAggregateOutputType | null
    _min: MachineMinAggregateOutputType | null
    _max: MachineMaxAggregateOutputType | null
  }

  type GetMachineGroupByPayload<T extends MachineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MachineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MachineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MachineGroupByOutputType[P]>
            : GetScalarType<T[P], MachineGroupByOutputType[P]>
        }
      >
    >


  export type MachineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    serialNumber?: boolean
    locationId?: boolean
    operatingHours?: boolean
    purchaseDate?: boolean
    purchasePrice?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    documents?: boolean | Machine$documentsArgs<ExtArgs>
    workOrders?: boolean | Machine$workOrdersArgs<ExtArgs>
    preventivePlans?: boolean | Machine$preventivePlansArgs<ExtArgs>
    _count?: boolean | MachineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["machine"]>



  export type MachineSelectScalar = {
    id?: boolean
    name?: boolean
    serialNumber?: boolean
    locationId?: boolean
    operatingHours?: boolean
    purchaseDate?: boolean
    purchasePrice?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MachineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "serialNumber" | "locationId" | "operatingHours" | "purchaseDate" | "purchasePrice" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["machine"]>
  export type MachineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    documents?: boolean | Machine$documentsArgs<ExtArgs>
    workOrders?: boolean | Machine$workOrdersArgs<ExtArgs>
    preventivePlans?: boolean | Machine$preventivePlansArgs<ExtArgs>
    _count?: boolean | MachineCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MachinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Machine"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs>
      documents: Prisma.$MachineDocumentPayload<ExtArgs>[]
      workOrders: Prisma.$WorkOrderPayload<ExtArgs>[]
      preventivePlans: Prisma.$PreventivePlanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      serialNumber: string
      locationId: string
      operatingHours: number
      purchaseDate: Date
      purchasePrice: Prisma.Decimal
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["machine"]>
    composites: {}
  }

  type MachineGetPayload<S extends boolean | null | undefined | MachineDefaultArgs> = $Result.GetResult<Prisma.$MachinePayload, S>

  type MachineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MachineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MachineCountAggregateInputType | true
    }

  export interface MachineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Machine'], meta: { name: 'Machine' } }
    /**
     * Find zero or one Machine that matches the filter.
     * @param {MachineFindUniqueArgs} args - Arguments to find a Machine
     * @example
     * // Get one Machine
     * const machine = await prisma.machine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MachineFindUniqueArgs>(args: SelectSubset<T, MachineFindUniqueArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Machine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MachineFindUniqueOrThrowArgs} args - Arguments to find a Machine
     * @example
     * // Get one Machine
     * const machine = await prisma.machine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MachineFindUniqueOrThrowArgs>(args: SelectSubset<T, MachineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Machine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineFindFirstArgs} args - Arguments to find a Machine
     * @example
     * // Get one Machine
     * const machine = await prisma.machine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MachineFindFirstArgs>(args?: SelectSubset<T, MachineFindFirstArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Machine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineFindFirstOrThrowArgs} args - Arguments to find a Machine
     * @example
     * // Get one Machine
     * const machine = await prisma.machine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MachineFindFirstOrThrowArgs>(args?: SelectSubset<T, MachineFindFirstOrThrowArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Machines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Machines
     * const machines = await prisma.machine.findMany()
     * 
     * // Get first 10 Machines
     * const machines = await prisma.machine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const machineWithIdOnly = await prisma.machine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MachineFindManyArgs>(args?: SelectSubset<T, MachineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Machine.
     * @param {MachineCreateArgs} args - Arguments to create a Machine.
     * @example
     * // Create one Machine
     * const Machine = await prisma.machine.create({
     *   data: {
     *     // ... data to create a Machine
     *   }
     * })
     * 
     */
    create<T extends MachineCreateArgs>(args: SelectSubset<T, MachineCreateArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Machines.
     * @param {MachineCreateManyArgs} args - Arguments to create many Machines.
     * @example
     * // Create many Machines
     * const machine = await prisma.machine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MachineCreateManyArgs>(args?: SelectSubset<T, MachineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Machine.
     * @param {MachineDeleteArgs} args - Arguments to delete one Machine.
     * @example
     * // Delete one Machine
     * const Machine = await prisma.machine.delete({
     *   where: {
     *     // ... filter to delete one Machine
     *   }
     * })
     * 
     */
    delete<T extends MachineDeleteArgs>(args: SelectSubset<T, MachineDeleteArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Machine.
     * @param {MachineUpdateArgs} args - Arguments to update one Machine.
     * @example
     * // Update one Machine
     * const machine = await prisma.machine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MachineUpdateArgs>(args: SelectSubset<T, MachineUpdateArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Machines.
     * @param {MachineDeleteManyArgs} args - Arguments to filter Machines to delete.
     * @example
     * // Delete a few Machines
     * const { count } = await prisma.machine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MachineDeleteManyArgs>(args?: SelectSubset<T, MachineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Machines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Machines
     * const machine = await prisma.machine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MachineUpdateManyArgs>(args: SelectSubset<T, MachineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Machine.
     * @param {MachineUpsertArgs} args - Arguments to update or create a Machine.
     * @example
     * // Update or create a Machine
     * const machine = await prisma.machine.upsert({
     *   create: {
     *     // ... data to create a Machine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Machine we want to update
     *   }
     * })
     */
    upsert<T extends MachineUpsertArgs>(args: SelectSubset<T, MachineUpsertArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Machines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineCountArgs} args - Arguments to filter Machines to count.
     * @example
     * // Count the number of Machines
     * const count = await prisma.machine.count({
     *   where: {
     *     // ... the filter for the Machines we want to count
     *   }
     * })
    **/
    count<T extends MachineCountArgs>(
      args?: Subset<T, MachineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MachineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Machine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MachineAggregateArgs>(args: Subset<T, MachineAggregateArgs>): Prisma.PrismaPromise<GetMachineAggregateType<T>>

    /**
     * Group by Machine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MachineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MachineGroupByArgs['orderBy'] }
        : { orderBy?: MachineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MachineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMachineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Machine model
   */
  readonly fields: MachineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Machine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MachineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    documents<T extends Machine$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Machine$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workOrders<T extends Machine$workOrdersArgs<ExtArgs> = {}>(args?: Subset<T, Machine$workOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    preventivePlans<T extends Machine$preventivePlansArgs<ExtArgs> = {}>(args?: Subset<T, Machine$preventivePlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivePlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Machine model
   */
  interface MachineFieldRefs {
    readonly id: FieldRef<"Machine", 'String'>
    readonly name: FieldRef<"Machine", 'String'>
    readonly serialNumber: FieldRef<"Machine", 'String'>
    readonly locationId: FieldRef<"Machine", 'String'>
    readonly operatingHours: FieldRef<"Machine", 'Float'>
    readonly purchaseDate: FieldRef<"Machine", 'DateTime'>
    readonly purchasePrice: FieldRef<"Machine", 'Decimal'>
    readonly isActive: FieldRef<"Machine", 'Boolean'>
    readonly createdAt: FieldRef<"Machine", 'DateTime'>
    readonly updatedAt: FieldRef<"Machine", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Machine findUnique
   */
  export type MachineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
    /**
     * Filter, which Machine to fetch.
     */
    where: MachineWhereUniqueInput
  }

  /**
   * Machine findUniqueOrThrow
   */
  export type MachineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
    /**
     * Filter, which Machine to fetch.
     */
    where: MachineWhereUniqueInput
  }

  /**
   * Machine findFirst
   */
  export type MachineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
    /**
     * Filter, which Machine to fetch.
     */
    where?: MachineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Machines to fetch.
     */
    orderBy?: MachineOrderByWithRelationInput | MachineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Machines.
     */
    cursor?: MachineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Machines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Machines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Machines.
     */
    distinct?: MachineScalarFieldEnum | MachineScalarFieldEnum[]
  }

  /**
   * Machine findFirstOrThrow
   */
  export type MachineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
    /**
     * Filter, which Machine to fetch.
     */
    where?: MachineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Machines to fetch.
     */
    orderBy?: MachineOrderByWithRelationInput | MachineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Machines.
     */
    cursor?: MachineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Machines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Machines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Machines.
     */
    distinct?: MachineScalarFieldEnum | MachineScalarFieldEnum[]
  }

  /**
   * Machine findMany
   */
  export type MachineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
    /**
     * Filter, which Machines to fetch.
     */
    where?: MachineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Machines to fetch.
     */
    orderBy?: MachineOrderByWithRelationInput | MachineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Machines.
     */
    cursor?: MachineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Machines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Machines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Machines.
     */
    distinct?: MachineScalarFieldEnum | MachineScalarFieldEnum[]
  }

  /**
   * Machine create
   */
  export type MachineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
    /**
     * The data needed to create a Machine.
     */
    data: XOR<MachineCreateInput, MachineUncheckedCreateInput>
  }

  /**
   * Machine createMany
   */
  export type MachineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Machines.
     */
    data: MachineCreateManyInput | MachineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Machine update
   */
  export type MachineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
    /**
     * The data needed to update a Machine.
     */
    data: XOR<MachineUpdateInput, MachineUncheckedUpdateInput>
    /**
     * Choose, which Machine to update.
     */
    where: MachineWhereUniqueInput
  }

  /**
   * Machine updateMany
   */
  export type MachineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Machines.
     */
    data: XOR<MachineUpdateManyMutationInput, MachineUncheckedUpdateManyInput>
    /**
     * Filter which Machines to update
     */
    where?: MachineWhereInput
    /**
     * Limit how many Machines to update.
     */
    limit?: number
  }

  /**
   * Machine upsert
   */
  export type MachineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
    /**
     * The filter to search for the Machine to update in case it exists.
     */
    where: MachineWhereUniqueInput
    /**
     * In case the Machine found by the `where` argument doesn't exist, create a new Machine with this data.
     */
    create: XOR<MachineCreateInput, MachineUncheckedCreateInput>
    /**
     * In case the Machine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MachineUpdateInput, MachineUncheckedUpdateInput>
  }

  /**
   * Machine delete
   */
  export type MachineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
    /**
     * Filter which Machine to delete.
     */
    where: MachineWhereUniqueInput
  }

  /**
   * Machine deleteMany
   */
  export type MachineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Machines to delete
     */
    where?: MachineWhereInput
    /**
     * Limit how many Machines to delete.
     */
    limit?: number
  }

  /**
   * Machine.documents
   */
  export type Machine$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    where?: MachineDocumentWhereInput
    orderBy?: MachineDocumentOrderByWithRelationInput | MachineDocumentOrderByWithRelationInput[]
    cursor?: MachineDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MachineDocumentScalarFieldEnum | MachineDocumentScalarFieldEnum[]
  }

  /**
   * Machine.workOrders
   */
  export type Machine$workOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    where?: WorkOrderWhereInput
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    cursor?: WorkOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * Machine.preventivePlans
   */
  export type Machine$preventivePlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
    where?: PreventivePlanWhereInput
    orderBy?: PreventivePlanOrderByWithRelationInput | PreventivePlanOrderByWithRelationInput[]
    cursor?: PreventivePlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PreventivePlanScalarFieldEnum | PreventivePlanScalarFieldEnum[]
  }

  /**
   * Machine without action
   */
  export type MachineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Machine
     */
    omit?: MachineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineInclude<ExtArgs> | null
  }


  /**
   * Model MachineDocument
   */

  export type AggregateMachineDocument = {
    _count: MachineDocumentCountAggregateOutputType | null
    _avg: MachineDocumentAvgAggregateOutputType | null
    _sum: MachineDocumentSumAggregateOutputType | null
    _min: MachineDocumentMinAggregateOutputType | null
    _max: MachineDocumentMaxAggregateOutputType | null
  }

  export type MachineDocumentAvgAggregateOutputType = {
    version: number | null
  }

  export type MachineDocumentSumAggregateOutputType = {
    version: number | null
  }

  export type MachineDocumentMinAggregateOutputType = {
    id: string | null
    machineId: string | null
    uploadedById: string | null
    filename: string | null
    filePath: string | null
    version: number | null
    isLatest: boolean | null
    uploadedAt: Date | null
  }

  export type MachineDocumentMaxAggregateOutputType = {
    id: string | null
    machineId: string | null
    uploadedById: string | null
    filename: string | null
    filePath: string | null
    version: number | null
    isLatest: boolean | null
    uploadedAt: Date | null
  }

  export type MachineDocumentCountAggregateOutputType = {
    id: number
    machineId: number
    uploadedById: number
    filename: number
    filePath: number
    version: number
    isLatest: number
    uploadedAt: number
    _all: number
  }


  export type MachineDocumentAvgAggregateInputType = {
    version?: true
  }

  export type MachineDocumentSumAggregateInputType = {
    version?: true
  }

  export type MachineDocumentMinAggregateInputType = {
    id?: true
    machineId?: true
    uploadedById?: true
    filename?: true
    filePath?: true
    version?: true
    isLatest?: true
    uploadedAt?: true
  }

  export type MachineDocumentMaxAggregateInputType = {
    id?: true
    machineId?: true
    uploadedById?: true
    filename?: true
    filePath?: true
    version?: true
    isLatest?: true
    uploadedAt?: true
  }

  export type MachineDocumentCountAggregateInputType = {
    id?: true
    machineId?: true
    uploadedById?: true
    filename?: true
    filePath?: true
    version?: true
    isLatest?: true
    uploadedAt?: true
    _all?: true
  }

  export type MachineDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MachineDocument to aggregate.
     */
    where?: MachineDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MachineDocuments to fetch.
     */
    orderBy?: MachineDocumentOrderByWithRelationInput | MachineDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MachineDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MachineDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MachineDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MachineDocuments
    **/
    _count?: true | MachineDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MachineDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MachineDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MachineDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MachineDocumentMaxAggregateInputType
  }

  export type GetMachineDocumentAggregateType<T extends MachineDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateMachineDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMachineDocument[P]>
      : GetScalarType<T[P], AggregateMachineDocument[P]>
  }




  export type MachineDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MachineDocumentWhereInput
    orderBy?: MachineDocumentOrderByWithAggregationInput | MachineDocumentOrderByWithAggregationInput[]
    by: MachineDocumentScalarFieldEnum[] | MachineDocumentScalarFieldEnum
    having?: MachineDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MachineDocumentCountAggregateInputType | true
    _avg?: MachineDocumentAvgAggregateInputType
    _sum?: MachineDocumentSumAggregateInputType
    _min?: MachineDocumentMinAggregateInputType
    _max?: MachineDocumentMaxAggregateInputType
  }

  export type MachineDocumentGroupByOutputType = {
    id: string
    machineId: string
    uploadedById: string
    filename: string
    filePath: string
    version: number
    isLatest: boolean
    uploadedAt: Date
    _count: MachineDocumentCountAggregateOutputType | null
    _avg: MachineDocumentAvgAggregateOutputType | null
    _sum: MachineDocumentSumAggregateOutputType | null
    _min: MachineDocumentMinAggregateOutputType | null
    _max: MachineDocumentMaxAggregateOutputType | null
  }

  type GetMachineDocumentGroupByPayload<T extends MachineDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MachineDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MachineDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MachineDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], MachineDocumentGroupByOutputType[P]>
        }
      >
    >


  export type MachineDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    machineId?: boolean
    uploadedById?: boolean
    filename?: boolean
    filePath?: boolean
    version?: boolean
    isLatest?: boolean
    uploadedAt?: boolean
    machine?: boolean | MachineDefaultArgs<ExtArgs>
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["machineDocument"]>



  export type MachineDocumentSelectScalar = {
    id?: boolean
    machineId?: boolean
    uploadedById?: boolean
    filename?: boolean
    filePath?: boolean
    version?: boolean
    isLatest?: boolean
    uploadedAt?: boolean
  }

  export type MachineDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "machineId" | "uploadedById" | "filename" | "filePath" | "version" | "isLatest" | "uploadedAt", ExtArgs["result"]["machineDocument"]>
  export type MachineDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    machine?: boolean | MachineDefaultArgs<ExtArgs>
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MachineDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MachineDocument"
    objects: {
      machine: Prisma.$MachinePayload<ExtArgs>
      uploadedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      machineId: string
      uploadedById: string
      filename: string
      filePath: string
      version: number
      isLatest: boolean
      uploadedAt: Date
    }, ExtArgs["result"]["machineDocument"]>
    composites: {}
  }

  type MachineDocumentGetPayload<S extends boolean | null | undefined | MachineDocumentDefaultArgs> = $Result.GetResult<Prisma.$MachineDocumentPayload, S>

  type MachineDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MachineDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MachineDocumentCountAggregateInputType | true
    }

  export interface MachineDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MachineDocument'], meta: { name: 'MachineDocument' } }
    /**
     * Find zero or one MachineDocument that matches the filter.
     * @param {MachineDocumentFindUniqueArgs} args - Arguments to find a MachineDocument
     * @example
     * // Get one MachineDocument
     * const machineDocument = await prisma.machineDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MachineDocumentFindUniqueArgs>(args: SelectSubset<T, MachineDocumentFindUniqueArgs<ExtArgs>>): Prisma__MachineDocumentClient<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MachineDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MachineDocumentFindUniqueOrThrowArgs} args - Arguments to find a MachineDocument
     * @example
     * // Get one MachineDocument
     * const machineDocument = await prisma.machineDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MachineDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, MachineDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MachineDocumentClient<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MachineDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineDocumentFindFirstArgs} args - Arguments to find a MachineDocument
     * @example
     * // Get one MachineDocument
     * const machineDocument = await prisma.machineDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MachineDocumentFindFirstArgs>(args?: SelectSubset<T, MachineDocumentFindFirstArgs<ExtArgs>>): Prisma__MachineDocumentClient<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MachineDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineDocumentFindFirstOrThrowArgs} args - Arguments to find a MachineDocument
     * @example
     * // Get one MachineDocument
     * const machineDocument = await prisma.machineDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MachineDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, MachineDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__MachineDocumentClient<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MachineDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MachineDocuments
     * const machineDocuments = await prisma.machineDocument.findMany()
     * 
     * // Get first 10 MachineDocuments
     * const machineDocuments = await prisma.machineDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const machineDocumentWithIdOnly = await prisma.machineDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MachineDocumentFindManyArgs>(args?: SelectSubset<T, MachineDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MachineDocument.
     * @param {MachineDocumentCreateArgs} args - Arguments to create a MachineDocument.
     * @example
     * // Create one MachineDocument
     * const MachineDocument = await prisma.machineDocument.create({
     *   data: {
     *     // ... data to create a MachineDocument
     *   }
     * })
     * 
     */
    create<T extends MachineDocumentCreateArgs>(args: SelectSubset<T, MachineDocumentCreateArgs<ExtArgs>>): Prisma__MachineDocumentClient<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MachineDocuments.
     * @param {MachineDocumentCreateManyArgs} args - Arguments to create many MachineDocuments.
     * @example
     * // Create many MachineDocuments
     * const machineDocument = await prisma.machineDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MachineDocumentCreateManyArgs>(args?: SelectSubset<T, MachineDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MachineDocument.
     * @param {MachineDocumentDeleteArgs} args - Arguments to delete one MachineDocument.
     * @example
     * // Delete one MachineDocument
     * const MachineDocument = await prisma.machineDocument.delete({
     *   where: {
     *     // ... filter to delete one MachineDocument
     *   }
     * })
     * 
     */
    delete<T extends MachineDocumentDeleteArgs>(args: SelectSubset<T, MachineDocumentDeleteArgs<ExtArgs>>): Prisma__MachineDocumentClient<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MachineDocument.
     * @param {MachineDocumentUpdateArgs} args - Arguments to update one MachineDocument.
     * @example
     * // Update one MachineDocument
     * const machineDocument = await prisma.machineDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MachineDocumentUpdateArgs>(args: SelectSubset<T, MachineDocumentUpdateArgs<ExtArgs>>): Prisma__MachineDocumentClient<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MachineDocuments.
     * @param {MachineDocumentDeleteManyArgs} args - Arguments to filter MachineDocuments to delete.
     * @example
     * // Delete a few MachineDocuments
     * const { count } = await prisma.machineDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MachineDocumentDeleteManyArgs>(args?: SelectSubset<T, MachineDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MachineDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MachineDocuments
     * const machineDocument = await prisma.machineDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MachineDocumentUpdateManyArgs>(args: SelectSubset<T, MachineDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MachineDocument.
     * @param {MachineDocumentUpsertArgs} args - Arguments to update or create a MachineDocument.
     * @example
     * // Update or create a MachineDocument
     * const machineDocument = await prisma.machineDocument.upsert({
     *   create: {
     *     // ... data to create a MachineDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MachineDocument we want to update
     *   }
     * })
     */
    upsert<T extends MachineDocumentUpsertArgs>(args: SelectSubset<T, MachineDocumentUpsertArgs<ExtArgs>>): Prisma__MachineDocumentClient<$Result.GetResult<Prisma.$MachineDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MachineDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineDocumentCountArgs} args - Arguments to filter MachineDocuments to count.
     * @example
     * // Count the number of MachineDocuments
     * const count = await prisma.machineDocument.count({
     *   where: {
     *     // ... the filter for the MachineDocuments we want to count
     *   }
     * })
    **/
    count<T extends MachineDocumentCountArgs>(
      args?: Subset<T, MachineDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MachineDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MachineDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MachineDocumentAggregateArgs>(args: Subset<T, MachineDocumentAggregateArgs>): Prisma.PrismaPromise<GetMachineDocumentAggregateType<T>>

    /**
     * Group by MachineDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MachineDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MachineDocumentGroupByArgs['orderBy'] }
        : { orderBy?: MachineDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MachineDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMachineDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MachineDocument model
   */
  readonly fields: MachineDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MachineDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MachineDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    machine<T extends MachineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MachineDefaultArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    uploadedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MachineDocument model
   */
  interface MachineDocumentFieldRefs {
    readonly id: FieldRef<"MachineDocument", 'String'>
    readonly machineId: FieldRef<"MachineDocument", 'String'>
    readonly uploadedById: FieldRef<"MachineDocument", 'String'>
    readonly filename: FieldRef<"MachineDocument", 'String'>
    readonly filePath: FieldRef<"MachineDocument", 'String'>
    readonly version: FieldRef<"MachineDocument", 'Int'>
    readonly isLatest: FieldRef<"MachineDocument", 'Boolean'>
    readonly uploadedAt: FieldRef<"MachineDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MachineDocument findUnique
   */
  export type MachineDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MachineDocument to fetch.
     */
    where: MachineDocumentWhereUniqueInput
  }

  /**
   * MachineDocument findUniqueOrThrow
   */
  export type MachineDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MachineDocument to fetch.
     */
    where: MachineDocumentWhereUniqueInput
  }

  /**
   * MachineDocument findFirst
   */
  export type MachineDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MachineDocument to fetch.
     */
    where?: MachineDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MachineDocuments to fetch.
     */
    orderBy?: MachineDocumentOrderByWithRelationInput | MachineDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MachineDocuments.
     */
    cursor?: MachineDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MachineDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MachineDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MachineDocuments.
     */
    distinct?: MachineDocumentScalarFieldEnum | MachineDocumentScalarFieldEnum[]
  }

  /**
   * MachineDocument findFirstOrThrow
   */
  export type MachineDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MachineDocument to fetch.
     */
    where?: MachineDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MachineDocuments to fetch.
     */
    orderBy?: MachineDocumentOrderByWithRelationInput | MachineDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MachineDocuments.
     */
    cursor?: MachineDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MachineDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MachineDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MachineDocuments.
     */
    distinct?: MachineDocumentScalarFieldEnum | MachineDocumentScalarFieldEnum[]
  }

  /**
   * MachineDocument findMany
   */
  export type MachineDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MachineDocuments to fetch.
     */
    where?: MachineDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MachineDocuments to fetch.
     */
    orderBy?: MachineDocumentOrderByWithRelationInput | MachineDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MachineDocuments.
     */
    cursor?: MachineDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MachineDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MachineDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MachineDocuments.
     */
    distinct?: MachineDocumentScalarFieldEnum | MachineDocumentScalarFieldEnum[]
  }

  /**
   * MachineDocument create
   */
  export type MachineDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a MachineDocument.
     */
    data: XOR<MachineDocumentCreateInput, MachineDocumentUncheckedCreateInput>
  }

  /**
   * MachineDocument createMany
   */
  export type MachineDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MachineDocuments.
     */
    data: MachineDocumentCreateManyInput | MachineDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MachineDocument update
   */
  export type MachineDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a MachineDocument.
     */
    data: XOR<MachineDocumentUpdateInput, MachineDocumentUncheckedUpdateInput>
    /**
     * Choose, which MachineDocument to update.
     */
    where: MachineDocumentWhereUniqueInput
  }

  /**
   * MachineDocument updateMany
   */
  export type MachineDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MachineDocuments.
     */
    data: XOR<MachineDocumentUpdateManyMutationInput, MachineDocumentUncheckedUpdateManyInput>
    /**
     * Filter which MachineDocuments to update
     */
    where?: MachineDocumentWhereInput
    /**
     * Limit how many MachineDocuments to update.
     */
    limit?: number
  }

  /**
   * MachineDocument upsert
   */
  export type MachineDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the MachineDocument to update in case it exists.
     */
    where: MachineDocumentWhereUniqueInput
    /**
     * In case the MachineDocument found by the `where` argument doesn't exist, create a new MachineDocument with this data.
     */
    create: XOR<MachineDocumentCreateInput, MachineDocumentUncheckedCreateInput>
    /**
     * In case the MachineDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MachineDocumentUpdateInput, MachineDocumentUncheckedUpdateInput>
  }

  /**
   * MachineDocument delete
   */
  export type MachineDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
    /**
     * Filter which MachineDocument to delete.
     */
    where: MachineDocumentWhereUniqueInput
  }

  /**
   * MachineDocument deleteMany
   */
  export type MachineDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MachineDocuments to delete
     */
    where?: MachineDocumentWhereInput
    /**
     * Limit how many MachineDocuments to delete.
     */
    limit?: number
  }

  /**
   * MachineDocument without action
   */
  export type MachineDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MachineDocument
     */
    select?: MachineDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MachineDocument
     */
    omit?: MachineDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MachineDocumentInclude<ExtArgs> | null
  }


  /**
   * Model WorkOrder
   */

  export type AggregateWorkOrder = {
    _count: WorkOrderCountAggregateOutputType | null
    _avg: WorkOrderAvgAggregateOutputType | null
    _sum: WorkOrderSumAggregateOutputType | null
    _min: WorkOrderMinAggregateOutputType | null
    _max: WorkOrderMaxAggregateOutputType | null
  }

  export type WorkOrderAvgAggregateOutputType = {
    laborCost: Decimal | null
    partsCost: Decimal | null
  }

  export type WorkOrderSumAggregateOutputType = {
    laborCost: Decimal | null
    partsCost: Decimal | null
  }

  export type WorkOrderMinAggregateOutputType = {
    id: string | null
    machineId: string | null
    reportedById: string | null
    assignedToId: string | null
    status: $Enums.WorkOrderStatus | null
    priority: $Enums.Priority | null
    title: string | null
    description: string | null
    bhpConfirmed: boolean | null
    laborCost: Decimal | null
    partsCost: Decimal | null
    createdAt: Date | null
    startedAt: Date | null
    closedAt: Date | null
    updatedAt: Date | null
  }

  export type WorkOrderMaxAggregateOutputType = {
    id: string | null
    machineId: string | null
    reportedById: string | null
    assignedToId: string | null
    status: $Enums.WorkOrderStatus | null
    priority: $Enums.Priority | null
    title: string | null
    description: string | null
    bhpConfirmed: boolean | null
    laborCost: Decimal | null
    partsCost: Decimal | null
    createdAt: Date | null
    startedAt: Date | null
    closedAt: Date | null
    updatedAt: Date | null
  }

  export type WorkOrderCountAggregateOutputType = {
    id: number
    machineId: number
    reportedById: number
    assignedToId: number
    status: number
    priority: number
    title: number
    description: number
    bhpConfirmed: number
    laborCost: number
    partsCost: number
    createdAt: number
    startedAt: number
    closedAt: number
    updatedAt: number
    _all: number
  }


  export type WorkOrderAvgAggregateInputType = {
    laborCost?: true
    partsCost?: true
  }

  export type WorkOrderSumAggregateInputType = {
    laborCost?: true
    partsCost?: true
  }

  export type WorkOrderMinAggregateInputType = {
    id?: true
    machineId?: true
    reportedById?: true
    assignedToId?: true
    status?: true
    priority?: true
    title?: true
    description?: true
    bhpConfirmed?: true
    laborCost?: true
    partsCost?: true
    createdAt?: true
    startedAt?: true
    closedAt?: true
    updatedAt?: true
  }

  export type WorkOrderMaxAggregateInputType = {
    id?: true
    machineId?: true
    reportedById?: true
    assignedToId?: true
    status?: true
    priority?: true
    title?: true
    description?: true
    bhpConfirmed?: true
    laborCost?: true
    partsCost?: true
    createdAt?: true
    startedAt?: true
    closedAt?: true
    updatedAt?: true
  }

  export type WorkOrderCountAggregateInputType = {
    id?: true
    machineId?: true
    reportedById?: true
    assignedToId?: true
    status?: true
    priority?: true
    title?: true
    description?: true
    bhpConfirmed?: true
    laborCost?: true
    partsCost?: true
    createdAt?: true
    startedAt?: true
    closedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrder to aggregate.
     */
    where?: WorkOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkOrders
    **/
    _count?: true | WorkOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkOrderMaxAggregateInputType
  }

  export type GetWorkOrderAggregateType<T extends WorkOrderAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkOrder[P]>
      : GetScalarType<T[P], AggregateWorkOrder[P]>
  }




  export type WorkOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderWhereInput
    orderBy?: WorkOrderOrderByWithAggregationInput | WorkOrderOrderByWithAggregationInput[]
    by: WorkOrderScalarFieldEnum[] | WorkOrderScalarFieldEnum
    having?: WorkOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkOrderCountAggregateInputType | true
    _avg?: WorkOrderAvgAggregateInputType
    _sum?: WorkOrderSumAggregateInputType
    _min?: WorkOrderMinAggregateInputType
    _max?: WorkOrderMaxAggregateInputType
  }

  export type WorkOrderGroupByOutputType = {
    id: string
    machineId: string
    reportedById: string
    assignedToId: string | null
    status: $Enums.WorkOrderStatus
    priority: $Enums.Priority
    title: string
    description: string
    bhpConfirmed: boolean
    laborCost: Decimal
    partsCost: Decimal
    createdAt: Date
    startedAt: Date | null
    closedAt: Date | null
    updatedAt: Date
    _count: WorkOrderCountAggregateOutputType | null
    _avg: WorkOrderAvgAggregateOutputType | null
    _sum: WorkOrderSumAggregateOutputType | null
    _min: WorkOrderMinAggregateOutputType | null
    _max: WorkOrderMaxAggregateOutputType | null
  }

  type GetWorkOrderGroupByPayload<T extends WorkOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkOrderGroupByOutputType[P]>
            : GetScalarType<T[P], WorkOrderGroupByOutputType[P]>
        }
      >
    >


  export type WorkOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    machineId?: boolean
    reportedById?: boolean
    assignedToId?: boolean
    status?: boolean
    priority?: boolean
    title?: boolean
    description?: boolean
    bhpConfirmed?: boolean
    laborCost?: boolean
    partsCost?: boolean
    createdAt?: boolean
    startedAt?: boolean
    closedAt?: boolean
    updatedAt?: boolean
    machine?: boolean | MachineDefaultArgs<ExtArgs>
    reportedBy?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | WorkOrder$assignedToArgs<ExtArgs>
    messages?: boolean | WorkOrder$messagesArgs<ExtArgs>
    parts?: boolean | WorkOrder$partsArgs<ExtArgs>
    toolLoans?: boolean | WorkOrder$toolLoansArgs<ExtArgs>
    _count?: boolean | WorkOrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workOrder"]>



  export type WorkOrderSelectScalar = {
    id?: boolean
    machineId?: boolean
    reportedById?: boolean
    assignedToId?: boolean
    status?: boolean
    priority?: boolean
    title?: boolean
    description?: boolean
    bhpConfirmed?: boolean
    laborCost?: boolean
    partsCost?: boolean
    createdAt?: boolean
    startedAt?: boolean
    closedAt?: boolean
    updatedAt?: boolean
  }

  export type WorkOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "machineId" | "reportedById" | "assignedToId" | "status" | "priority" | "title" | "description" | "bhpConfirmed" | "laborCost" | "partsCost" | "createdAt" | "startedAt" | "closedAt" | "updatedAt", ExtArgs["result"]["workOrder"]>
  export type WorkOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    machine?: boolean | MachineDefaultArgs<ExtArgs>
    reportedBy?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | WorkOrder$assignedToArgs<ExtArgs>
    messages?: boolean | WorkOrder$messagesArgs<ExtArgs>
    parts?: boolean | WorkOrder$partsArgs<ExtArgs>
    toolLoans?: boolean | WorkOrder$toolLoansArgs<ExtArgs>
    _count?: boolean | WorkOrderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $WorkOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkOrder"
    objects: {
      machine: Prisma.$MachinePayload<ExtArgs>
      reportedBy: Prisma.$UserPayload<ExtArgs>
      assignedTo: Prisma.$UserPayload<ExtArgs> | null
      messages: Prisma.$WorkOrderMessagePayload<ExtArgs>[]
      parts: Prisma.$WorkOrderPartPayload<ExtArgs>[]
      toolLoans: Prisma.$ToolLoanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      machineId: string
      reportedById: string
      assignedToId: string | null
      status: $Enums.WorkOrderStatus
      priority: $Enums.Priority
      title: string
      description: string
      bhpConfirmed: boolean
      laborCost: Prisma.Decimal
      partsCost: Prisma.Decimal
      createdAt: Date
      startedAt: Date | null
      closedAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["workOrder"]>
    composites: {}
  }

  type WorkOrderGetPayload<S extends boolean | null | undefined | WorkOrderDefaultArgs> = $Result.GetResult<Prisma.$WorkOrderPayload, S>

  type WorkOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkOrderCountAggregateInputType | true
    }

  export interface WorkOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkOrder'], meta: { name: 'WorkOrder' } }
    /**
     * Find zero or one WorkOrder that matches the filter.
     * @param {WorkOrderFindUniqueArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkOrderFindUniqueArgs>(args: SelectSubset<T, WorkOrderFindUniqueArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkOrderFindUniqueOrThrowArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindFirstArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkOrderFindFirstArgs>(args?: SelectSubset<T, WorkOrderFindFirstArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindFirstOrThrowArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkOrders
     * const workOrders = await prisma.workOrder.findMany()
     * 
     * // Get first 10 WorkOrders
     * const workOrders = await prisma.workOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workOrderWithIdOnly = await prisma.workOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkOrderFindManyArgs>(args?: SelectSubset<T, WorkOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkOrder.
     * @param {WorkOrderCreateArgs} args - Arguments to create a WorkOrder.
     * @example
     * // Create one WorkOrder
     * const WorkOrder = await prisma.workOrder.create({
     *   data: {
     *     // ... data to create a WorkOrder
     *   }
     * })
     * 
     */
    create<T extends WorkOrderCreateArgs>(args: SelectSubset<T, WorkOrderCreateArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkOrders.
     * @param {WorkOrderCreateManyArgs} args - Arguments to create many WorkOrders.
     * @example
     * // Create many WorkOrders
     * const workOrder = await prisma.workOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkOrderCreateManyArgs>(args?: SelectSubset<T, WorkOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WorkOrder.
     * @param {WorkOrderDeleteArgs} args - Arguments to delete one WorkOrder.
     * @example
     * // Delete one WorkOrder
     * const WorkOrder = await prisma.workOrder.delete({
     *   where: {
     *     // ... filter to delete one WorkOrder
     *   }
     * })
     * 
     */
    delete<T extends WorkOrderDeleteArgs>(args: SelectSubset<T, WorkOrderDeleteArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkOrder.
     * @param {WorkOrderUpdateArgs} args - Arguments to update one WorkOrder.
     * @example
     * // Update one WorkOrder
     * const workOrder = await prisma.workOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkOrderUpdateArgs>(args: SelectSubset<T, WorkOrderUpdateArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkOrders.
     * @param {WorkOrderDeleteManyArgs} args - Arguments to filter WorkOrders to delete.
     * @example
     * // Delete a few WorkOrders
     * const { count } = await prisma.workOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkOrderDeleteManyArgs>(args?: SelectSubset<T, WorkOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkOrders
     * const workOrder = await prisma.workOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkOrderUpdateManyArgs>(args: SelectSubset<T, WorkOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkOrder.
     * @param {WorkOrderUpsertArgs} args - Arguments to update or create a WorkOrder.
     * @example
     * // Update or create a WorkOrder
     * const workOrder = await prisma.workOrder.upsert({
     *   create: {
     *     // ... data to create a WorkOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkOrder we want to update
     *   }
     * })
     */
    upsert<T extends WorkOrderUpsertArgs>(args: SelectSubset<T, WorkOrderUpsertArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderCountArgs} args - Arguments to filter WorkOrders to count.
     * @example
     * // Count the number of WorkOrders
     * const count = await prisma.workOrder.count({
     *   where: {
     *     // ... the filter for the WorkOrders we want to count
     *   }
     * })
    **/
    count<T extends WorkOrderCountArgs>(
      args?: Subset<T, WorkOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkOrderAggregateArgs>(args: Subset<T, WorkOrderAggregateArgs>): Prisma.PrismaPromise<GetWorkOrderAggregateType<T>>

    /**
     * Group by WorkOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkOrderGroupByArgs['orderBy'] }
        : { orderBy?: WorkOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkOrder model
   */
  readonly fields: WorkOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    machine<T extends MachineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MachineDefaultArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reportedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignedTo<T extends WorkOrder$assignedToArgs<ExtArgs> = {}>(args?: Subset<T, WorkOrder$assignedToArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends WorkOrder$messagesArgs<ExtArgs> = {}>(args?: Subset<T, WorkOrder$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parts<T extends WorkOrder$partsArgs<ExtArgs> = {}>(args?: Subset<T, WorkOrder$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    toolLoans<T extends WorkOrder$toolLoansArgs<ExtArgs> = {}>(args?: Subset<T, WorkOrder$toolLoansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkOrder model
   */
  interface WorkOrderFieldRefs {
    readonly id: FieldRef<"WorkOrder", 'String'>
    readonly machineId: FieldRef<"WorkOrder", 'String'>
    readonly reportedById: FieldRef<"WorkOrder", 'String'>
    readonly assignedToId: FieldRef<"WorkOrder", 'String'>
    readonly status: FieldRef<"WorkOrder", 'WorkOrderStatus'>
    readonly priority: FieldRef<"WorkOrder", 'Priority'>
    readonly title: FieldRef<"WorkOrder", 'String'>
    readonly description: FieldRef<"WorkOrder", 'String'>
    readonly bhpConfirmed: FieldRef<"WorkOrder", 'Boolean'>
    readonly laborCost: FieldRef<"WorkOrder", 'Decimal'>
    readonly partsCost: FieldRef<"WorkOrder", 'Decimal'>
    readonly createdAt: FieldRef<"WorkOrder", 'DateTime'>
    readonly startedAt: FieldRef<"WorkOrder", 'DateTime'>
    readonly closedAt: FieldRef<"WorkOrder", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkOrder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkOrder findUnique
   */
  export type WorkOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrder to fetch.
     */
    where: WorkOrderWhereUniqueInput
  }

  /**
   * WorkOrder findUniqueOrThrow
   */
  export type WorkOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrder to fetch.
     */
    where: WorkOrderWhereUniqueInput
  }

  /**
   * WorkOrder findFirst
   */
  export type WorkOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrder to fetch.
     */
    where?: WorkOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkOrders.
     */
    cursor?: WorkOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrders.
     */
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * WorkOrder findFirstOrThrow
   */
  export type WorkOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrder to fetch.
     */
    where?: WorkOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkOrders.
     */
    cursor?: WorkOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrders.
     */
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * WorkOrder findMany
   */
  export type WorkOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrders to fetch.
     */
    where?: WorkOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: WorkOrderOrderByWithRelationInput | WorkOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkOrders.
     */
    cursor?: WorkOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrders.
     */
    distinct?: WorkOrderScalarFieldEnum | WorkOrderScalarFieldEnum[]
  }

  /**
   * WorkOrder create
   */
  export type WorkOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkOrder.
     */
    data: XOR<WorkOrderCreateInput, WorkOrderUncheckedCreateInput>
  }

  /**
   * WorkOrder createMany
   */
  export type WorkOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkOrders.
     */
    data: WorkOrderCreateManyInput | WorkOrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkOrder update
   */
  export type WorkOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkOrder.
     */
    data: XOR<WorkOrderUpdateInput, WorkOrderUncheckedUpdateInput>
    /**
     * Choose, which WorkOrder to update.
     */
    where: WorkOrderWhereUniqueInput
  }

  /**
   * WorkOrder updateMany
   */
  export type WorkOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkOrders.
     */
    data: XOR<WorkOrderUpdateManyMutationInput, WorkOrderUncheckedUpdateManyInput>
    /**
     * Filter which WorkOrders to update
     */
    where?: WorkOrderWhereInput
    /**
     * Limit how many WorkOrders to update.
     */
    limit?: number
  }

  /**
   * WorkOrder upsert
   */
  export type WorkOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkOrder to update in case it exists.
     */
    where: WorkOrderWhereUniqueInput
    /**
     * In case the WorkOrder found by the `where` argument doesn't exist, create a new WorkOrder with this data.
     */
    create: XOR<WorkOrderCreateInput, WorkOrderUncheckedCreateInput>
    /**
     * In case the WorkOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkOrderUpdateInput, WorkOrderUncheckedUpdateInput>
  }

  /**
   * WorkOrder delete
   */
  export type WorkOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    /**
     * Filter which WorkOrder to delete.
     */
    where: WorkOrderWhereUniqueInput
  }

  /**
   * WorkOrder deleteMany
   */
  export type WorkOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrders to delete
     */
    where?: WorkOrderWhereInput
    /**
     * Limit how many WorkOrders to delete.
     */
    limit?: number
  }

  /**
   * WorkOrder.assignedTo
   */
  export type WorkOrder$assignedToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * WorkOrder.messages
   */
  export type WorkOrder$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    where?: WorkOrderMessageWhereInput
    orderBy?: WorkOrderMessageOrderByWithRelationInput | WorkOrderMessageOrderByWithRelationInput[]
    cursor?: WorkOrderMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkOrderMessageScalarFieldEnum | WorkOrderMessageScalarFieldEnum[]
  }

  /**
   * WorkOrder.parts
   */
  export type WorkOrder$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    where?: WorkOrderPartWhereInput
    orderBy?: WorkOrderPartOrderByWithRelationInput | WorkOrderPartOrderByWithRelationInput[]
    cursor?: WorkOrderPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkOrderPartScalarFieldEnum | WorkOrderPartScalarFieldEnum[]
  }

  /**
   * WorkOrder.toolLoans
   */
  export type WorkOrder$toolLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    where?: ToolLoanWhereInput
    orderBy?: ToolLoanOrderByWithRelationInput | ToolLoanOrderByWithRelationInput[]
    cursor?: ToolLoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ToolLoanScalarFieldEnum | ToolLoanScalarFieldEnum[]
  }

  /**
   * WorkOrder without action
   */
  export type WorkOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
  }


  /**
   * Model WorkOrderMessage
   */

  export type AggregateWorkOrderMessage = {
    _count: WorkOrderMessageCountAggregateOutputType | null
    _min: WorkOrderMessageMinAggregateOutputType | null
    _max: WorkOrderMessageMaxAggregateOutputType | null
  }

  export type WorkOrderMessageMinAggregateOutputType = {
    id: string | null
    workOrderId: string | null
    userId: string | null
    content: string | null
    sentAt: Date | null
  }

  export type WorkOrderMessageMaxAggregateOutputType = {
    id: string | null
    workOrderId: string | null
    userId: string | null
    content: string | null
    sentAt: Date | null
  }

  export type WorkOrderMessageCountAggregateOutputType = {
    id: number
    workOrderId: number
    userId: number
    content: number
    sentAt: number
    _all: number
  }


  export type WorkOrderMessageMinAggregateInputType = {
    id?: true
    workOrderId?: true
    userId?: true
    content?: true
    sentAt?: true
  }

  export type WorkOrderMessageMaxAggregateInputType = {
    id?: true
    workOrderId?: true
    userId?: true
    content?: true
    sentAt?: true
  }

  export type WorkOrderMessageCountAggregateInputType = {
    id?: true
    workOrderId?: true
    userId?: true
    content?: true
    sentAt?: true
    _all?: true
  }

  export type WorkOrderMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrderMessage to aggregate.
     */
    where?: WorkOrderMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrderMessages to fetch.
     */
    orderBy?: WorkOrderMessageOrderByWithRelationInput | WorkOrderMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkOrderMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrderMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrderMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkOrderMessages
    **/
    _count?: true | WorkOrderMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkOrderMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkOrderMessageMaxAggregateInputType
  }

  export type GetWorkOrderMessageAggregateType<T extends WorkOrderMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkOrderMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkOrderMessage[P]>
      : GetScalarType<T[P], AggregateWorkOrderMessage[P]>
  }




  export type WorkOrderMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderMessageWhereInput
    orderBy?: WorkOrderMessageOrderByWithAggregationInput | WorkOrderMessageOrderByWithAggregationInput[]
    by: WorkOrderMessageScalarFieldEnum[] | WorkOrderMessageScalarFieldEnum
    having?: WorkOrderMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkOrderMessageCountAggregateInputType | true
    _min?: WorkOrderMessageMinAggregateInputType
    _max?: WorkOrderMessageMaxAggregateInputType
  }

  export type WorkOrderMessageGroupByOutputType = {
    id: string
    workOrderId: string
    userId: string
    content: string
    sentAt: Date
    _count: WorkOrderMessageCountAggregateOutputType | null
    _min: WorkOrderMessageMinAggregateOutputType | null
    _max: WorkOrderMessageMaxAggregateOutputType | null
  }

  type GetWorkOrderMessageGroupByPayload<T extends WorkOrderMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkOrderMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkOrderMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkOrderMessageGroupByOutputType[P]>
            : GetScalarType<T[P], WorkOrderMessageGroupByOutputType[P]>
        }
      >
    >


  export type WorkOrderMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workOrderId?: boolean
    userId?: boolean
    content?: boolean
    sentAt?: boolean
    workOrder?: boolean | WorkOrderDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workOrderMessage"]>



  export type WorkOrderMessageSelectScalar = {
    id?: boolean
    workOrderId?: boolean
    userId?: boolean
    content?: boolean
    sentAt?: boolean
  }

  export type WorkOrderMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workOrderId" | "userId" | "content" | "sentAt", ExtArgs["result"]["workOrderMessage"]>
  export type WorkOrderMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workOrder?: boolean | WorkOrderDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkOrderMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkOrderMessage"
    objects: {
      workOrder: Prisma.$WorkOrderPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workOrderId: string
      userId: string
      content: string
      sentAt: Date
    }, ExtArgs["result"]["workOrderMessage"]>
    composites: {}
  }

  type WorkOrderMessageGetPayload<S extends boolean | null | undefined | WorkOrderMessageDefaultArgs> = $Result.GetResult<Prisma.$WorkOrderMessagePayload, S>

  type WorkOrderMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkOrderMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkOrderMessageCountAggregateInputType | true
    }

  export interface WorkOrderMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkOrderMessage'], meta: { name: 'WorkOrderMessage' } }
    /**
     * Find zero or one WorkOrderMessage that matches the filter.
     * @param {WorkOrderMessageFindUniqueArgs} args - Arguments to find a WorkOrderMessage
     * @example
     * // Get one WorkOrderMessage
     * const workOrderMessage = await prisma.workOrderMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkOrderMessageFindUniqueArgs>(args: SelectSubset<T, WorkOrderMessageFindUniqueArgs<ExtArgs>>): Prisma__WorkOrderMessageClient<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkOrderMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkOrderMessageFindUniqueOrThrowArgs} args - Arguments to find a WorkOrderMessage
     * @example
     * // Get one WorkOrderMessage
     * const workOrderMessage = await prisma.workOrderMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkOrderMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkOrderMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkOrderMessageClient<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkOrderMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderMessageFindFirstArgs} args - Arguments to find a WorkOrderMessage
     * @example
     * // Get one WorkOrderMessage
     * const workOrderMessage = await prisma.workOrderMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkOrderMessageFindFirstArgs>(args?: SelectSubset<T, WorkOrderMessageFindFirstArgs<ExtArgs>>): Prisma__WorkOrderMessageClient<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkOrderMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderMessageFindFirstOrThrowArgs} args - Arguments to find a WorkOrderMessage
     * @example
     * // Get one WorkOrderMessage
     * const workOrderMessage = await prisma.workOrderMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkOrderMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkOrderMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkOrderMessageClient<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkOrderMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkOrderMessages
     * const workOrderMessages = await prisma.workOrderMessage.findMany()
     * 
     * // Get first 10 WorkOrderMessages
     * const workOrderMessages = await prisma.workOrderMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workOrderMessageWithIdOnly = await prisma.workOrderMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkOrderMessageFindManyArgs>(args?: SelectSubset<T, WorkOrderMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkOrderMessage.
     * @param {WorkOrderMessageCreateArgs} args - Arguments to create a WorkOrderMessage.
     * @example
     * // Create one WorkOrderMessage
     * const WorkOrderMessage = await prisma.workOrderMessage.create({
     *   data: {
     *     // ... data to create a WorkOrderMessage
     *   }
     * })
     * 
     */
    create<T extends WorkOrderMessageCreateArgs>(args: SelectSubset<T, WorkOrderMessageCreateArgs<ExtArgs>>): Prisma__WorkOrderMessageClient<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkOrderMessages.
     * @param {WorkOrderMessageCreateManyArgs} args - Arguments to create many WorkOrderMessages.
     * @example
     * // Create many WorkOrderMessages
     * const workOrderMessage = await prisma.workOrderMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkOrderMessageCreateManyArgs>(args?: SelectSubset<T, WorkOrderMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WorkOrderMessage.
     * @param {WorkOrderMessageDeleteArgs} args - Arguments to delete one WorkOrderMessage.
     * @example
     * // Delete one WorkOrderMessage
     * const WorkOrderMessage = await prisma.workOrderMessage.delete({
     *   where: {
     *     // ... filter to delete one WorkOrderMessage
     *   }
     * })
     * 
     */
    delete<T extends WorkOrderMessageDeleteArgs>(args: SelectSubset<T, WorkOrderMessageDeleteArgs<ExtArgs>>): Prisma__WorkOrderMessageClient<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkOrderMessage.
     * @param {WorkOrderMessageUpdateArgs} args - Arguments to update one WorkOrderMessage.
     * @example
     * // Update one WorkOrderMessage
     * const workOrderMessage = await prisma.workOrderMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkOrderMessageUpdateArgs>(args: SelectSubset<T, WorkOrderMessageUpdateArgs<ExtArgs>>): Prisma__WorkOrderMessageClient<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkOrderMessages.
     * @param {WorkOrderMessageDeleteManyArgs} args - Arguments to filter WorkOrderMessages to delete.
     * @example
     * // Delete a few WorkOrderMessages
     * const { count } = await prisma.workOrderMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkOrderMessageDeleteManyArgs>(args?: SelectSubset<T, WorkOrderMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkOrderMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkOrderMessages
     * const workOrderMessage = await prisma.workOrderMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkOrderMessageUpdateManyArgs>(args: SelectSubset<T, WorkOrderMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkOrderMessage.
     * @param {WorkOrderMessageUpsertArgs} args - Arguments to update or create a WorkOrderMessage.
     * @example
     * // Update or create a WorkOrderMessage
     * const workOrderMessage = await prisma.workOrderMessage.upsert({
     *   create: {
     *     // ... data to create a WorkOrderMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkOrderMessage we want to update
     *   }
     * })
     */
    upsert<T extends WorkOrderMessageUpsertArgs>(args: SelectSubset<T, WorkOrderMessageUpsertArgs<ExtArgs>>): Prisma__WorkOrderMessageClient<$Result.GetResult<Prisma.$WorkOrderMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkOrderMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderMessageCountArgs} args - Arguments to filter WorkOrderMessages to count.
     * @example
     * // Count the number of WorkOrderMessages
     * const count = await prisma.workOrderMessage.count({
     *   where: {
     *     // ... the filter for the WorkOrderMessages we want to count
     *   }
     * })
    **/
    count<T extends WorkOrderMessageCountArgs>(
      args?: Subset<T, WorkOrderMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkOrderMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkOrderMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkOrderMessageAggregateArgs>(args: Subset<T, WorkOrderMessageAggregateArgs>): Prisma.PrismaPromise<GetWorkOrderMessageAggregateType<T>>

    /**
     * Group by WorkOrderMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkOrderMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkOrderMessageGroupByArgs['orderBy'] }
        : { orderBy?: WorkOrderMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkOrderMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkOrderMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkOrderMessage model
   */
  readonly fields: WorkOrderMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkOrderMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkOrderMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workOrder<T extends WorkOrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkOrderDefaultArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkOrderMessage model
   */
  interface WorkOrderMessageFieldRefs {
    readonly id: FieldRef<"WorkOrderMessage", 'String'>
    readonly workOrderId: FieldRef<"WorkOrderMessage", 'String'>
    readonly userId: FieldRef<"WorkOrderMessage", 'String'>
    readonly content: FieldRef<"WorkOrderMessage", 'String'>
    readonly sentAt: FieldRef<"WorkOrderMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkOrderMessage findUnique
   */
  export type WorkOrderMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrderMessage to fetch.
     */
    where: WorkOrderMessageWhereUniqueInput
  }

  /**
   * WorkOrderMessage findUniqueOrThrow
   */
  export type WorkOrderMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrderMessage to fetch.
     */
    where: WorkOrderMessageWhereUniqueInput
  }

  /**
   * WorkOrderMessage findFirst
   */
  export type WorkOrderMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrderMessage to fetch.
     */
    where?: WorkOrderMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrderMessages to fetch.
     */
    orderBy?: WorkOrderMessageOrderByWithRelationInput | WorkOrderMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkOrderMessages.
     */
    cursor?: WorkOrderMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrderMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrderMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrderMessages.
     */
    distinct?: WorkOrderMessageScalarFieldEnum | WorkOrderMessageScalarFieldEnum[]
  }

  /**
   * WorkOrderMessage findFirstOrThrow
   */
  export type WorkOrderMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrderMessage to fetch.
     */
    where?: WorkOrderMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrderMessages to fetch.
     */
    orderBy?: WorkOrderMessageOrderByWithRelationInput | WorkOrderMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkOrderMessages.
     */
    cursor?: WorkOrderMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrderMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrderMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrderMessages.
     */
    distinct?: WorkOrderMessageScalarFieldEnum | WorkOrderMessageScalarFieldEnum[]
  }

  /**
   * WorkOrderMessage findMany
   */
  export type WorkOrderMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrderMessages to fetch.
     */
    where?: WorkOrderMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrderMessages to fetch.
     */
    orderBy?: WorkOrderMessageOrderByWithRelationInput | WorkOrderMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkOrderMessages.
     */
    cursor?: WorkOrderMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrderMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrderMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrderMessages.
     */
    distinct?: WorkOrderMessageScalarFieldEnum | WorkOrderMessageScalarFieldEnum[]
  }

  /**
   * WorkOrderMessage create
   */
  export type WorkOrderMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkOrderMessage.
     */
    data: XOR<WorkOrderMessageCreateInput, WorkOrderMessageUncheckedCreateInput>
  }

  /**
   * WorkOrderMessage createMany
   */
  export type WorkOrderMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkOrderMessages.
     */
    data: WorkOrderMessageCreateManyInput | WorkOrderMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkOrderMessage update
   */
  export type WorkOrderMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkOrderMessage.
     */
    data: XOR<WorkOrderMessageUpdateInput, WorkOrderMessageUncheckedUpdateInput>
    /**
     * Choose, which WorkOrderMessage to update.
     */
    where: WorkOrderMessageWhereUniqueInput
  }

  /**
   * WorkOrderMessage updateMany
   */
  export type WorkOrderMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkOrderMessages.
     */
    data: XOR<WorkOrderMessageUpdateManyMutationInput, WorkOrderMessageUncheckedUpdateManyInput>
    /**
     * Filter which WorkOrderMessages to update
     */
    where?: WorkOrderMessageWhereInput
    /**
     * Limit how many WorkOrderMessages to update.
     */
    limit?: number
  }

  /**
   * WorkOrderMessage upsert
   */
  export type WorkOrderMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkOrderMessage to update in case it exists.
     */
    where: WorkOrderMessageWhereUniqueInput
    /**
     * In case the WorkOrderMessage found by the `where` argument doesn't exist, create a new WorkOrderMessage with this data.
     */
    create: XOR<WorkOrderMessageCreateInput, WorkOrderMessageUncheckedCreateInput>
    /**
     * In case the WorkOrderMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkOrderMessageUpdateInput, WorkOrderMessageUncheckedUpdateInput>
  }

  /**
   * WorkOrderMessage delete
   */
  export type WorkOrderMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
    /**
     * Filter which WorkOrderMessage to delete.
     */
    where: WorkOrderMessageWhereUniqueInput
  }

  /**
   * WorkOrderMessage deleteMany
   */
  export type WorkOrderMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrderMessages to delete
     */
    where?: WorkOrderMessageWhereInput
    /**
     * Limit how many WorkOrderMessages to delete.
     */
    limit?: number
  }

  /**
   * WorkOrderMessage without action
   */
  export type WorkOrderMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderMessage
     */
    select?: WorkOrderMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderMessage
     */
    omit?: WorkOrderMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderMessageInclude<ExtArgs> | null
  }


  /**
   * Model PartCategory
   */

  export type AggregatePartCategory = {
    _count: PartCategoryCountAggregateOutputType | null
    _min: PartCategoryMinAggregateOutputType | null
    _max: PartCategoryMaxAggregateOutputType | null
  }

  export type PartCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type PartCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type PartCategoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type PartCategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type PartCategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type PartCategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type PartCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PartCategory to aggregate.
     */
    where?: PartCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartCategories to fetch.
     */
    orderBy?: PartCategoryOrderByWithRelationInput | PartCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PartCategories
    **/
    _count?: true | PartCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartCategoryMaxAggregateInputType
  }

  export type GetPartCategoryAggregateType<T extends PartCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePartCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartCategory[P]>
      : GetScalarType<T[P], AggregatePartCategory[P]>
  }




  export type PartCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartCategoryWhereInput
    orderBy?: PartCategoryOrderByWithAggregationInput | PartCategoryOrderByWithAggregationInput[]
    by: PartCategoryScalarFieldEnum[] | PartCategoryScalarFieldEnum
    having?: PartCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartCategoryCountAggregateInputType | true
    _min?: PartCategoryMinAggregateInputType
    _max?: PartCategoryMaxAggregateInputType
  }

  export type PartCategoryGroupByOutputType = {
    id: string
    name: string
    _count: PartCategoryCountAggregateOutputType | null
    _min: PartCategoryMinAggregateOutputType | null
    _max: PartCategoryMaxAggregateOutputType | null
  }

  type GetPartCategoryGroupByPayload<T extends PartCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], PartCategoryGroupByOutputType[P]>
        }
      >
    >


  export type PartCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parts?: boolean | PartCategory$partsArgs<ExtArgs>
    _count?: boolean | PartCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partCategory"]>



  export type PartCategorySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type PartCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["partCategory"]>
  export type PartCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | PartCategory$partsArgs<ExtArgs>
    _count?: boolean | PartCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PartCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PartCategory"
    objects: {
      parts: Prisma.$PartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["partCategory"]>
    composites: {}
  }

  type PartCategoryGetPayload<S extends boolean | null | undefined | PartCategoryDefaultArgs> = $Result.GetResult<Prisma.$PartCategoryPayload, S>

  type PartCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartCategoryCountAggregateInputType | true
    }

  export interface PartCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PartCategory'], meta: { name: 'PartCategory' } }
    /**
     * Find zero or one PartCategory that matches the filter.
     * @param {PartCategoryFindUniqueArgs} args - Arguments to find a PartCategory
     * @example
     * // Get one PartCategory
     * const partCategory = await prisma.partCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartCategoryFindUniqueArgs>(args: SelectSubset<T, PartCategoryFindUniqueArgs<ExtArgs>>): Prisma__PartCategoryClient<$Result.GetResult<Prisma.$PartCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PartCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartCategoryFindUniqueOrThrowArgs} args - Arguments to find a PartCategory
     * @example
     * // Get one PartCategory
     * const partCategory = await prisma.partCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PartCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartCategoryClient<$Result.GetResult<Prisma.$PartCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PartCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCategoryFindFirstArgs} args - Arguments to find a PartCategory
     * @example
     * // Get one PartCategory
     * const partCategory = await prisma.partCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartCategoryFindFirstArgs>(args?: SelectSubset<T, PartCategoryFindFirstArgs<ExtArgs>>): Prisma__PartCategoryClient<$Result.GetResult<Prisma.$PartCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PartCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCategoryFindFirstOrThrowArgs} args - Arguments to find a PartCategory
     * @example
     * // Get one PartCategory
     * const partCategory = await prisma.partCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PartCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartCategoryClient<$Result.GetResult<Prisma.$PartCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PartCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PartCategories
     * const partCategories = await prisma.partCategory.findMany()
     * 
     * // Get first 10 PartCategories
     * const partCategories = await prisma.partCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partCategoryWithIdOnly = await prisma.partCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartCategoryFindManyArgs>(args?: SelectSubset<T, PartCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PartCategory.
     * @param {PartCategoryCreateArgs} args - Arguments to create a PartCategory.
     * @example
     * // Create one PartCategory
     * const PartCategory = await prisma.partCategory.create({
     *   data: {
     *     // ... data to create a PartCategory
     *   }
     * })
     * 
     */
    create<T extends PartCategoryCreateArgs>(args: SelectSubset<T, PartCategoryCreateArgs<ExtArgs>>): Prisma__PartCategoryClient<$Result.GetResult<Prisma.$PartCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PartCategories.
     * @param {PartCategoryCreateManyArgs} args - Arguments to create many PartCategories.
     * @example
     * // Create many PartCategories
     * const partCategory = await prisma.partCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartCategoryCreateManyArgs>(args?: SelectSubset<T, PartCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PartCategory.
     * @param {PartCategoryDeleteArgs} args - Arguments to delete one PartCategory.
     * @example
     * // Delete one PartCategory
     * const PartCategory = await prisma.partCategory.delete({
     *   where: {
     *     // ... filter to delete one PartCategory
     *   }
     * })
     * 
     */
    delete<T extends PartCategoryDeleteArgs>(args: SelectSubset<T, PartCategoryDeleteArgs<ExtArgs>>): Prisma__PartCategoryClient<$Result.GetResult<Prisma.$PartCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PartCategory.
     * @param {PartCategoryUpdateArgs} args - Arguments to update one PartCategory.
     * @example
     * // Update one PartCategory
     * const partCategory = await prisma.partCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartCategoryUpdateArgs>(args: SelectSubset<T, PartCategoryUpdateArgs<ExtArgs>>): Prisma__PartCategoryClient<$Result.GetResult<Prisma.$PartCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PartCategories.
     * @param {PartCategoryDeleteManyArgs} args - Arguments to filter PartCategories to delete.
     * @example
     * // Delete a few PartCategories
     * const { count } = await prisma.partCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartCategoryDeleteManyArgs>(args?: SelectSubset<T, PartCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PartCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PartCategories
     * const partCategory = await prisma.partCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartCategoryUpdateManyArgs>(args: SelectSubset<T, PartCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PartCategory.
     * @param {PartCategoryUpsertArgs} args - Arguments to update or create a PartCategory.
     * @example
     * // Update or create a PartCategory
     * const partCategory = await prisma.partCategory.upsert({
     *   create: {
     *     // ... data to create a PartCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PartCategory we want to update
     *   }
     * })
     */
    upsert<T extends PartCategoryUpsertArgs>(args: SelectSubset<T, PartCategoryUpsertArgs<ExtArgs>>): Prisma__PartCategoryClient<$Result.GetResult<Prisma.$PartCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PartCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCategoryCountArgs} args - Arguments to filter PartCategories to count.
     * @example
     * // Count the number of PartCategories
     * const count = await prisma.partCategory.count({
     *   where: {
     *     // ... the filter for the PartCategories we want to count
     *   }
     * })
    **/
    count<T extends PartCategoryCountArgs>(
      args?: Subset<T, PartCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PartCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartCategoryAggregateArgs>(args: Subset<T, PartCategoryAggregateArgs>): Prisma.PrismaPromise<GetPartCategoryAggregateType<T>>

    /**
     * Group by PartCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartCategoryGroupByArgs['orderBy'] }
        : { orderBy?: PartCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PartCategory model
   */
  readonly fields: PartCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PartCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parts<T extends PartCategory$partsArgs<ExtArgs> = {}>(args?: Subset<T, PartCategory$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PartCategory model
   */
  interface PartCategoryFieldRefs {
    readonly id: FieldRef<"PartCategory", 'String'>
    readonly name: FieldRef<"PartCategory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PartCategory findUnique
   */
  export type PartCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategory
     */
    select?: PartCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartCategory
     */
    omit?: PartCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PartCategory to fetch.
     */
    where: PartCategoryWhereUniqueInput
  }

  /**
   * PartCategory findUniqueOrThrow
   */
  export type PartCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategory
     */
    select?: PartCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartCategory
     */
    omit?: PartCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PartCategory to fetch.
     */
    where: PartCategoryWhereUniqueInput
  }

  /**
   * PartCategory findFirst
   */
  export type PartCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategory
     */
    select?: PartCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartCategory
     */
    omit?: PartCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PartCategory to fetch.
     */
    where?: PartCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartCategories to fetch.
     */
    orderBy?: PartCategoryOrderByWithRelationInput | PartCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PartCategories.
     */
    cursor?: PartCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartCategories.
     */
    distinct?: PartCategoryScalarFieldEnum | PartCategoryScalarFieldEnum[]
  }

  /**
   * PartCategory findFirstOrThrow
   */
  export type PartCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategory
     */
    select?: PartCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartCategory
     */
    omit?: PartCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PartCategory to fetch.
     */
    where?: PartCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartCategories to fetch.
     */
    orderBy?: PartCategoryOrderByWithRelationInput | PartCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PartCategories.
     */
    cursor?: PartCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartCategories.
     */
    distinct?: PartCategoryScalarFieldEnum | PartCategoryScalarFieldEnum[]
  }

  /**
   * PartCategory findMany
   */
  export type PartCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategory
     */
    select?: PartCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartCategory
     */
    omit?: PartCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PartCategories to fetch.
     */
    where?: PartCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartCategories to fetch.
     */
    orderBy?: PartCategoryOrderByWithRelationInput | PartCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PartCategories.
     */
    cursor?: PartCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartCategories.
     */
    distinct?: PartCategoryScalarFieldEnum | PartCategoryScalarFieldEnum[]
  }

  /**
   * PartCategory create
   */
  export type PartCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategory
     */
    select?: PartCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartCategory
     */
    omit?: PartCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PartCategory.
     */
    data: XOR<PartCategoryCreateInput, PartCategoryUncheckedCreateInput>
  }

  /**
   * PartCategory createMany
   */
  export type PartCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PartCategories.
     */
    data: PartCategoryCreateManyInput | PartCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PartCategory update
   */
  export type PartCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategory
     */
    select?: PartCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartCategory
     */
    omit?: PartCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PartCategory.
     */
    data: XOR<PartCategoryUpdateInput, PartCategoryUncheckedUpdateInput>
    /**
     * Choose, which PartCategory to update.
     */
    where: PartCategoryWhereUniqueInput
  }

  /**
   * PartCategory updateMany
   */
  export type PartCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PartCategories.
     */
    data: XOR<PartCategoryUpdateManyMutationInput, PartCategoryUncheckedUpdateManyInput>
    /**
     * Filter which PartCategories to update
     */
    where?: PartCategoryWhereInput
    /**
     * Limit how many PartCategories to update.
     */
    limit?: number
  }

  /**
   * PartCategory upsert
   */
  export type PartCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategory
     */
    select?: PartCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartCategory
     */
    omit?: PartCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PartCategory to update in case it exists.
     */
    where: PartCategoryWhereUniqueInput
    /**
     * In case the PartCategory found by the `where` argument doesn't exist, create a new PartCategory with this data.
     */
    create: XOR<PartCategoryCreateInput, PartCategoryUncheckedCreateInput>
    /**
     * In case the PartCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartCategoryUpdateInput, PartCategoryUncheckedUpdateInput>
  }

  /**
   * PartCategory delete
   */
  export type PartCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategory
     */
    select?: PartCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartCategory
     */
    omit?: PartCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartCategoryInclude<ExtArgs> | null
    /**
     * Filter which PartCategory to delete.
     */
    where: PartCategoryWhereUniqueInput
  }

  /**
   * PartCategory deleteMany
   */
  export type PartCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PartCategories to delete
     */
    where?: PartCategoryWhereInput
    /**
     * Limit how many PartCategories to delete.
     */
    limit?: number
  }

  /**
   * PartCategory.parts
   */
  export type PartCategory$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    where?: PartWhereInput
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    cursor?: PartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * PartCategory without action
   */
  export type PartCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCategory
     */
    select?: PartCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartCategory
     */
    omit?: PartCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Part
   */

  export type AggregatePart = {
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  export type PartAvgAggregateOutputType = {
    stockQuantity: number | null
    reorderPoint: number | null
    unitPrice: Decimal | null
  }

  export type PartSumAggregateOutputType = {
    stockQuantity: number | null
    reorderPoint: number | null
    unitPrice: Decimal | null
  }

  export type PartMinAggregateOutputType = {
    id: string | null
    categoryId: string | null
    name: string | null
    stockQuantity: number | null
    reorderPoint: number | null
    unitPrice: Decimal | null
    qrCode: string | null
    isActive: boolean | null
  }

  export type PartMaxAggregateOutputType = {
    id: string | null
    categoryId: string | null
    name: string | null
    stockQuantity: number | null
    reorderPoint: number | null
    unitPrice: Decimal | null
    qrCode: string | null
    isActive: boolean | null
  }

  export type PartCountAggregateOutputType = {
    id: number
    categoryId: number
    name: number
    stockQuantity: number
    reorderPoint: number
    unitPrice: number
    qrCode: number
    isActive: number
    _all: number
  }


  export type PartAvgAggregateInputType = {
    stockQuantity?: true
    reorderPoint?: true
    unitPrice?: true
  }

  export type PartSumAggregateInputType = {
    stockQuantity?: true
    reorderPoint?: true
    unitPrice?: true
  }

  export type PartMinAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    stockQuantity?: true
    reorderPoint?: true
    unitPrice?: true
    qrCode?: true
    isActive?: true
  }

  export type PartMaxAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    stockQuantity?: true
    reorderPoint?: true
    unitPrice?: true
    qrCode?: true
    isActive?: true
  }

  export type PartCountAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    stockQuantity?: true
    reorderPoint?: true
    unitPrice?: true
    qrCode?: true
    isActive?: true
    _all?: true
  }

  export type PartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Part to aggregate.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parts
    **/
    _count?: true | PartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartMaxAggregateInputType
  }

  export type GetPartAggregateType<T extends PartAggregateArgs> = {
        [P in keyof T & keyof AggregatePart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePart[P]>
      : GetScalarType<T[P], AggregatePart[P]>
  }




  export type PartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
    orderBy?: PartOrderByWithAggregationInput | PartOrderByWithAggregationInput[]
    by: PartScalarFieldEnum[] | PartScalarFieldEnum
    having?: PartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartCountAggregateInputType | true
    _avg?: PartAvgAggregateInputType
    _sum?: PartSumAggregateInputType
    _min?: PartMinAggregateInputType
    _max?: PartMaxAggregateInputType
  }

  export type PartGroupByOutputType = {
    id: string
    categoryId: string
    name: string
    stockQuantity: number
    reorderPoint: number
    unitPrice: Decimal
    qrCode: string | null
    isActive: boolean
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  type GetPartGroupByPayload<T extends PartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartGroupByOutputType[P]>
            : GetScalarType<T[P], PartGroupByOutputType[P]>
        }
      >
    >


  export type PartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    name?: boolean
    stockQuantity?: boolean
    reorderPoint?: boolean
    unitPrice?: boolean
    qrCode?: boolean
    isActive?: boolean
    category?: boolean | PartCategoryDefaultArgs<ExtArgs>
    workOrderParts?: boolean | Part$workOrderPartsArgs<ExtArgs>
    toolLoans?: boolean | Part$toolLoansArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>



  export type PartSelectScalar = {
    id?: boolean
    categoryId?: boolean
    name?: boolean
    stockQuantity?: boolean
    reorderPoint?: boolean
    unitPrice?: boolean
    qrCode?: boolean
    isActive?: boolean
  }

  export type PartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "categoryId" | "name" | "stockQuantity" | "reorderPoint" | "unitPrice" | "qrCode" | "isActive", ExtArgs["result"]["part"]>
  export type PartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | PartCategoryDefaultArgs<ExtArgs>
    workOrderParts?: boolean | Part$workOrderPartsArgs<ExtArgs>
    toolLoans?: boolean | Part$toolLoansArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Part"
    objects: {
      category: Prisma.$PartCategoryPayload<ExtArgs>
      workOrderParts: Prisma.$WorkOrderPartPayload<ExtArgs>[]
      toolLoans: Prisma.$ToolLoanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      categoryId: string
      name: string
      stockQuantity: number
      reorderPoint: number
      unitPrice: Prisma.Decimal
      qrCode: string | null
      isActive: boolean
    }, ExtArgs["result"]["part"]>
    composites: {}
  }

  type PartGetPayload<S extends boolean | null | undefined | PartDefaultArgs> = $Result.GetResult<Prisma.$PartPayload, S>

  type PartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartCountAggregateInputType | true
    }

  export interface PartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Part'], meta: { name: 'Part' } }
    /**
     * Find zero or one Part that matches the filter.
     * @param {PartFindUniqueArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartFindUniqueArgs>(args: SelectSubset<T, PartFindUniqueArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Part that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartFindUniqueOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartFindUniqueOrThrowArgs>(args: SelectSubset<T, PartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Part that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartFindFirstArgs>(args?: SelectSubset<T, PartFindFirstArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Part that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartFindFirstOrThrowArgs>(args?: SelectSubset<T, PartFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parts
     * const parts = await prisma.part.findMany()
     * 
     * // Get first 10 Parts
     * const parts = await prisma.part.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partWithIdOnly = await prisma.part.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartFindManyArgs>(args?: SelectSubset<T, PartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Part.
     * @param {PartCreateArgs} args - Arguments to create a Part.
     * @example
     * // Create one Part
     * const Part = await prisma.part.create({
     *   data: {
     *     // ... data to create a Part
     *   }
     * })
     * 
     */
    create<T extends PartCreateArgs>(args: SelectSubset<T, PartCreateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parts.
     * @param {PartCreateManyArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartCreateManyArgs>(args?: SelectSubset<T, PartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Part.
     * @param {PartDeleteArgs} args - Arguments to delete one Part.
     * @example
     * // Delete one Part
     * const Part = await prisma.part.delete({
     *   where: {
     *     // ... filter to delete one Part
     *   }
     * })
     * 
     */
    delete<T extends PartDeleteArgs>(args: SelectSubset<T, PartDeleteArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Part.
     * @param {PartUpdateArgs} args - Arguments to update one Part.
     * @example
     * // Update one Part
     * const part = await prisma.part.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartUpdateArgs>(args: SelectSubset<T, PartUpdateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parts.
     * @param {PartDeleteManyArgs} args - Arguments to filter Parts to delete.
     * @example
     * // Delete a few Parts
     * const { count } = await prisma.part.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartDeleteManyArgs>(args?: SelectSubset<T, PartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartUpdateManyArgs>(args: SelectSubset<T, PartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Part.
     * @param {PartUpsertArgs} args - Arguments to update or create a Part.
     * @example
     * // Update or create a Part
     * const part = await prisma.part.upsert({
     *   create: {
     *     // ... data to create a Part
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Part we want to update
     *   }
     * })
     */
    upsert<T extends PartUpsertArgs>(args: SelectSubset<T, PartUpsertArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCountArgs} args - Arguments to filter Parts to count.
     * @example
     * // Count the number of Parts
     * const count = await prisma.part.count({
     *   where: {
     *     // ... the filter for the Parts we want to count
     *   }
     * })
    **/
    count<T extends PartCountArgs>(
      args?: Subset<T, PartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartAggregateArgs>(args: Subset<T, PartAggregateArgs>): Prisma.PrismaPromise<GetPartAggregateType<T>>

    /**
     * Group by Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartGroupByArgs['orderBy'] }
        : { orderBy?: PartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Part model
   */
  readonly fields: PartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Part.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends PartCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartCategoryDefaultArgs<ExtArgs>>): Prisma__PartCategoryClient<$Result.GetResult<Prisma.$PartCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workOrderParts<T extends Part$workOrderPartsArgs<ExtArgs> = {}>(args?: Subset<T, Part$workOrderPartsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    toolLoans<T extends Part$toolLoansArgs<ExtArgs> = {}>(args?: Subset<T, Part$toolLoansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Part model
   */
  interface PartFieldRefs {
    readonly id: FieldRef<"Part", 'String'>
    readonly categoryId: FieldRef<"Part", 'String'>
    readonly name: FieldRef<"Part", 'String'>
    readonly stockQuantity: FieldRef<"Part", 'Int'>
    readonly reorderPoint: FieldRef<"Part", 'Int'>
    readonly unitPrice: FieldRef<"Part", 'Decimal'>
    readonly qrCode: FieldRef<"Part", 'String'>
    readonly isActive: FieldRef<"Part", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Part findUnique
   */
  export type PartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findUniqueOrThrow
   */
  export type PartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findFirst
   */
  export type PartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findFirstOrThrow
   */
  export type PartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findMany
   */
  export type PartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Parts to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part create
   */
  export type PartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to create a Part.
     */
    data: XOR<PartCreateInput, PartUncheckedCreateInput>
  }

  /**
   * Part createMany
   */
  export type PartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Part update
   */
  export type PartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to update a Part.
     */
    data: XOR<PartUpdateInput, PartUncheckedUpdateInput>
    /**
     * Choose, which Part to update.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part updateMany
   */
  export type PartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to update.
     */
    limit?: number
  }

  /**
   * Part upsert
   */
  export type PartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The filter to search for the Part to update in case it exists.
     */
    where: PartWhereUniqueInput
    /**
     * In case the Part found by the `where` argument doesn't exist, create a new Part with this data.
     */
    create: XOR<PartCreateInput, PartUncheckedCreateInput>
    /**
     * In case the Part was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartUpdateInput, PartUncheckedUpdateInput>
  }

  /**
   * Part delete
   */
  export type PartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter which Part to delete.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part deleteMany
   */
  export type PartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parts to delete
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to delete.
     */
    limit?: number
  }

  /**
   * Part.workOrderParts
   */
  export type Part$workOrderPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    where?: WorkOrderPartWhereInput
    orderBy?: WorkOrderPartOrderByWithRelationInput | WorkOrderPartOrderByWithRelationInput[]
    cursor?: WorkOrderPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkOrderPartScalarFieldEnum | WorkOrderPartScalarFieldEnum[]
  }

  /**
   * Part.toolLoans
   */
  export type Part$toolLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    where?: ToolLoanWhereInput
    orderBy?: ToolLoanOrderByWithRelationInput | ToolLoanOrderByWithRelationInput[]
    cursor?: ToolLoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ToolLoanScalarFieldEnum | ToolLoanScalarFieldEnum[]
  }

  /**
   * Part without action
   */
  export type PartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
  }


  /**
   * Model WorkOrderPart
   */

  export type AggregateWorkOrderPart = {
    _count: WorkOrderPartCountAggregateOutputType | null
    _avg: WorkOrderPartAvgAggregateOutputType | null
    _sum: WorkOrderPartSumAggregateOutputType | null
    _min: WorkOrderPartMinAggregateOutputType | null
    _max: WorkOrderPartMaxAggregateOutputType | null
  }

  export type WorkOrderPartAvgAggregateOutputType = {
    quantity: number | null
  }

  export type WorkOrderPartSumAggregateOutputType = {
    quantity: number | null
  }

  export type WorkOrderPartMinAggregateOutputType = {
    id: string | null
    workOrderId: string | null
    partId: string | null
    quantity: number | null
  }

  export type WorkOrderPartMaxAggregateOutputType = {
    id: string | null
    workOrderId: string | null
    partId: string | null
    quantity: number | null
  }

  export type WorkOrderPartCountAggregateOutputType = {
    id: number
    workOrderId: number
    partId: number
    quantity: number
    _all: number
  }


  export type WorkOrderPartAvgAggregateInputType = {
    quantity?: true
  }

  export type WorkOrderPartSumAggregateInputType = {
    quantity?: true
  }

  export type WorkOrderPartMinAggregateInputType = {
    id?: true
    workOrderId?: true
    partId?: true
    quantity?: true
  }

  export type WorkOrderPartMaxAggregateInputType = {
    id?: true
    workOrderId?: true
    partId?: true
    quantity?: true
  }

  export type WorkOrderPartCountAggregateInputType = {
    id?: true
    workOrderId?: true
    partId?: true
    quantity?: true
    _all?: true
  }

  export type WorkOrderPartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrderPart to aggregate.
     */
    where?: WorkOrderPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrderParts to fetch.
     */
    orderBy?: WorkOrderPartOrderByWithRelationInput | WorkOrderPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkOrderPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrderParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrderParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkOrderParts
    **/
    _count?: true | WorkOrderPartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkOrderPartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkOrderPartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkOrderPartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkOrderPartMaxAggregateInputType
  }

  export type GetWorkOrderPartAggregateType<T extends WorkOrderPartAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkOrderPart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkOrderPart[P]>
      : GetScalarType<T[P], AggregateWorkOrderPart[P]>
  }




  export type WorkOrderPartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkOrderPartWhereInput
    orderBy?: WorkOrderPartOrderByWithAggregationInput | WorkOrderPartOrderByWithAggregationInput[]
    by: WorkOrderPartScalarFieldEnum[] | WorkOrderPartScalarFieldEnum
    having?: WorkOrderPartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkOrderPartCountAggregateInputType | true
    _avg?: WorkOrderPartAvgAggregateInputType
    _sum?: WorkOrderPartSumAggregateInputType
    _min?: WorkOrderPartMinAggregateInputType
    _max?: WorkOrderPartMaxAggregateInputType
  }

  export type WorkOrderPartGroupByOutputType = {
    id: string
    workOrderId: string
    partId: string
    quantity: number
    _count: WorkOrderPartCountAggregateOutputType | null
    _avg: WorkOrderPartAvgAggregateOutputType | null
    _sum: WorkOrderPartSumAggregateOutputType | null
    _min: WorkOrderPartMinAggregateOutputType | null
    _max: WorkOrderPartMaxAggregateOutputType | null
  }

  type GetWorkOrderPartGroupByPayload<T extends WorkOrderPartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkOrderPartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkOrderPartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkOrderPartGroupByOutputType[P]>
            : GetScalarType<T[P], WorkOrderPartGroupByOutputType[P]>
        }
      >
    >


  export type WorkOrderPartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workOrderId?: boolean
    partId?: boolean
    quantity?: boolean
    workOrder?: boolean | WorkOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workOrderPart"]>



  export type WorkOrderPartSelectScalar = {
    id?: boolean
    workOrderId?: boolean
    partId?: boolean
    quantity?: boolean
  }

  export type WorkOrderPartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workOrderId" | "partId" | "quantity", ExtArgs["result"]["workOrderPart"]>
  export type WorkOrderPartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workOrder?: boolean | WorkOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }

  export type $WorkOrderPartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkOrderPart"
    objects: {
      workOrder: Prisma.$WorkOrderPayload<ExtArgs>
      part: Prisma.$PartPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workOrderId: string
      partId: string
      quantity: number
    }, ExtArgs["result"]["workOrderPart"]>
    composites: {}
  }

  type WorkOrderPartGetPayload<S extends boolean | null | undefined | WorkOrderPartDefaultArgs> = $Result.GetResult<Prisma.$WorkOrderPartPayload, S>

  type WorkOrderPartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkOrderPartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkOrderPartCountAggregateInputType | true
    }

  export interface WorkOrderPartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkOrderPart'], meta: { name: 'WorkOrderPart' } }
    /**
     * Find zero or one WorkOrderPart that matches the filter.
     * @param {WorkOrderPartFindUniqueArgs} args - Arguments to find a WorkOrderPart
     * @example
     * // Get one WorkOrderPart
     * const workOrderPart = await prisma.workOrderPart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkOrderPartFindUniqueArgs>(args: SelectSubset<T, WorkOrderPartFindUniqueArgs<ExtArgs>>): Prisma__WorkOrderPartClient<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkOrderPart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkOrderPartFindUniqueOrThrowArgs} args - Arguments to find a WorkOrderPart
     * @example
     * // Get one WorkOrderPart
     * const workOrderPart = await prisma.workOrderPart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkOrderPartFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkOrderPartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkOrderPartClient<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkOrderPart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderPartFindFirstArgs} args - Arguments to find a WorkOrderPart
     * @example
     * // Get one WorkOrderPart
     * const workOrderPart = await prisma.workOrderPart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkOrderPartFindFirstArgs>(args?: SelectSubset<T, WorkOrderPartFindFirstArgs<ExtArgs>>): Prisma__WorkOrderPartClient<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkOrderPart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderPartFindFirstOrThrowArgs} args - Arguments to find a WorkOrderPart
     * @example
     * // Get one WorkOrderPart
     * const workOrderPart = await prisma.workOrderPart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkOrderPartFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkOrderPartFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkOrderPartClient<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkOrderParts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderPartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkOrderParts
     * const workOrderParts = await prisma.workOrderPart.findMany()
     * 
     * // Get first 10 WorkOrderParts
     * const workOrderParts = await prisma.workOrderPart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workOrderPartWithIdOnly = await prisma.workOrderPart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkOrderPartFindManyArgs>(args?: SelectSubset<T, WorkOrderPartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkOrderPart.
     * @param {WorkOrderPartCreateArgs} args - Arguments to create a WorkOrderPart.
     * @example
     * // Create one WorkOrderPart
     * const WorkOrderPart = await prisma.workOrderPart.create({
     *   data: {
     *     // ... data to create a WorkOrderPart
     *   }
     * })
     * 
     */
    create<T extends WorkOrderPartCreateArgs>(args: SelectSubset<T, WorkOrderPartCreateArgs<ExtArgs>>): Prisma__WorkOrderPartClient<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkOrderParts.
     * @param {WorkOrderPartCreateManyArgs} args - Arguments to create many WorkOrderParts.
     * @example
     * // Create many WorkOrderParts
     * const workOrderPart = await prisma.workOrderPart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkOrderPartCreateManyArgs>(args?: SelectSubset<T, WorkOrderPartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WorkOrderPart.
     * @param {WorkOrderPartDeleteArgs} args - Arguments to delete one WorkOrderPart.
     * @example
     * // Delete one WorkOrderPart
     * const WorkOrderPart = await prisma.workOrderPart.delete({
     *   where: {
     *     // ... filter to delete one WorkOrderPart
     *   }
     * })
     * 
     */
    delete<T extends WorkOrderPartDeleteArgs>(args: SelectSubset<T, WorkOrderPartDeleteArgs<ExtArgs>>): Prisma__WorkOrderPartClient<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkOrderPart.
     * @param {WorkOrderPartUpdateArgs} args - Arguments to update one WorkOrderPart.
     * @example
     * // Update one WorkOrderPart
     * const workOrderPart = await prisma.workOrderPart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkOrderPartUpdateArgs>(args: SelectSubset<T, WorkOrderPartUpdateArgs<ExtArgs>>): Prisma__WorkOrderPartClient<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkOrderParts.
     * @param {WorkOrderPartDeleteManyArgs} args - Arguments to filter WorkOrderParts to delete.
     * @example
     * // Delete a few WorkOrderParts
     * const { count } = await prisma.workOrderPart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkOrderPartDeleteManyArgs>(args?: SelectSubset<T, WorkOrderPartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkOrderParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderPartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkOrderParts
     * const workOrderPart = await prisma.workOrderPart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkOrderPartUpdateManyArgs>(args: SelectSubset<T, WorkOrderPartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkOrderPart.
     * @param {WorkOrderPartUpsertArgs} args - Arguments to update or create a WorkOrderPart.
     * @example
     * // Update or create a WorkOrderPart
     * const workOrderPart = await prisma.workOrderPart.upsert({
     *   create: {
     *     // ... data to create a WorkOrderPart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkOrderPart we want to update
     *   }
     * })
     */
    upsert<T extends WorkOrderPartUpsertArgs>(args: SelectSubset<T, WorkOrderPartUpsertArgs<ExtArgs>>): Prisma__WorkOrderPartClient<$Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkOrderParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderPartCountArgs} args - Arguments to filter WorkOrderParts to count.
     * @example
     * // Count the number of WorkOrderParts
     * const count = await prisma.workOrderPart.count({
     *   where: {
     *     // ... the filter for the WorkOrderParts we want to count
     *   }
     * })
    **/
    count<T extends WorkOrderPartCountArgs>(
      args?: Subset<T, WorkOrderPartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkOrderPartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkOrderPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderPartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkOrderPartAggregateArgs>(args: Subset<T, WorkOrderPartAggregateArgs>): Prisma.PrismaPromise<GetWorkOrderPartAggregateType<T>>

    /**
     * Group by WorkOrderPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderPartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkOrderPartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkOrderPartGroupByArgs['orderBy'] }
        : { orderBy?: WorkOrderPartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkOrderPartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkOrderPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkOrderPart model
   */
  readonly fields: WorkOrderPartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkOrderPart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkOrderPartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workOrder<T extends WorkOrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkOrderDefaultArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    part<T extends PartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartDefaultArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkOrderPart model
   */
  interface WorkOrderPartFieldRefs {
    readonly id: FieldRef<"WorkOrderPart", 'String'>
    readonly workOrderId: FieldRef<"WorkOrderPart", 'String'>
    readonly partId: FieldRef<"WorkOrderPart", 'String'>
    readonly quantity: FieldRef<"WorkOrderPart", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * WorkOrderPart findUnique
   */
  export type WorkOrderPartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrderPart to fetch.
     */
    where: WorkOrderPartWhereUniqueInput
  }

  /**
   * WorkOrderPart findUniqueOrThrow
   */
  export type WorkOrderPartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrderPart to fetch.
     */
    where: WorkOrderPartWhereUniqueInput
  }

  /**
   * WorkOrderPart findFirst
   */
  export type WorkOrderPartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrderPart to fetch.
     */
    where?: WorkOrderPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrderParts to fetch.
     */
    orderBy?: WorkOrderPartOrderByWithRelationInput | WorkOrderPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkOrderParts.
     */
    cursor?: WorkOrderPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrderParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrderParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrderParts.
     */
    distinct?: WorkOrderPartScalarFieldEnum | WorkOrderPartScalarFieldEnum[]
  }

  /**
   * WorkOrderPart findFirstOrThrow
   */
  export type WorkOrderPartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrderPart to fetch.
     */
    where?: WorkOrderPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrderParts to fetch.
     */
    orderBy?: WorkOrderPartOrderByWithRelationInput | WorkOrderPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkOrderParts.
     */
    cursor?: WorkOrderPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrderParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrderParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrderParts.
     */
    distinct?: WorkOrderPartScalarFieldEnum | WorkOrderPartScalarFieldEnum[]
  }

  /**
   * WorkOrderPart findMany
   */
  export type WorkOrderPartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    /**
     * Filter, which WorkOrderParts to fetch.
     */
    where?: WorkOrderPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkOrderParts to fetch.
     */
    orderBy?: WorkOrderPartOrderByWithRelationInput | WorkOrderPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkOrderParts.
     */
    cursor?: WorkOrderPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkOrderParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkOrderParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkOrderParts.
     */
    distinct?: WorkOrderPartScalarFieldEnum | WorkOrderPartScalarFieldEnum[]
  }

  /**
   * WorkOrderPart create
   */
  export type WorkOrderPartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkOrderPart.
     */
    data: XOR<WorkOrderPartCreateInput, WorkOrderPartUncheckedCreateInput>
  }

  /**
   * WorkOrderPart createMany
   */
  export type WorkOrderPartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkOrderParts.
     */
    data: WorkOrderPartCreateManyInput | WorkOrderPartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkOrderPart update
   */
  export type WorkOrderPartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkOrderPart.
     */
    data: XOR<WorkOrderPartUpdateInput, WorkOrderPartUncheckedUpdateInput>
    /**
     * Choose, which WorkOrderPart to update.
     */
    where: WorkOrderPartWhereUniqueInput
  }

  /**
   * WorkOrderPart updateMany
   */
  export type WorkOrderPartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkOrderParts.
     */
    data: XOR<WorkOrderPartUpdateManyMutationInput, WorkOrderPartUncheckedUpdateManyInput>
    /**
     * Filter which WorkOrderParts to update
     */
    where?: WorkOrderPartWhereInput
    /**
     * Limit how many WorkOrderParts to update.
     */
    limit?: number
  }

  /**
   * WorkOrderPart upsert
   */
  export type WorkOrderPartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkOrderPart to update in case it exists.
     */
    where: WorkOrderPartWhereUniqueInput
    /**
     * In case the WorkOrderPart found by the `where` argument doesn't exist, create a new WorkOrderPart with this data.
     */
    create: XOR<WorkOrderPartCreateInput, WorkOrderPartUncheckedCreateInput>
    /**
     * In case the WorkOrderPart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkOrderPartUpdateInput, WorkOrderPartUncheckedUpdateInput>
  }

  /**
   * WorkOrderPart delete
   */
  export type WorkOrderPartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
    /**
     * Filter which WorkOrderPart to delete.
     */
    where: WorkOrderPartWhereUniqueInput
  }

  /**
   * WorkOrderPart deleteMany
   */
  export type WorkOrderPartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrderParts to delete
     */
    where?: WorkOrderPartWhereInput
    /**
     * Limit how many WorkOrderParts to delete.
     */
    limit?: number
  }

  /**
   * WorkOrderPart without action
   */
  export type WorkOrderPartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: WorkOrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: WorkOrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderPartInclude<ExtArgs> | null
  }


  /**
   * Model ToolLoan
   */

  export type AggregateToolLoan = {
    _count: ToolLoanCountAggregateOutputType | null
    _min: ToolLoanMinAggregateOutputType | null
    _max: ToolLoanMaxAggregateOutputType | null
  }

  export type ToolLoanMinAggregateOutputType = {
    id: string | null
    partId: string | null
    userId: string | null
    workOrderId: string | null
    loanedAt: Date | null
    returnedAt: Date | null
  }

  export type ToolLoanMaxAggregateOutputType = {
    id: string | null
    partId: string | null
    userId: string | null
    workOrderId: string | null
    loanedAt: Date | null
    returnedAt: Date | null
  }

  export type ToolLoanCountAggregateOutputType = {
    id: number
    partId: number
    userId: number
    workOrderId: number
    loanedAt: number
    returnedAt: number
    _all: number
  }


  export type ToolLoanMinAggregateInputType = {
    id?: true
    partId?: true
    userId?: true
    workOrderId?: true
    loanedAt?: true
    returnedAt?: true
  }

  export type ToolLoanMaxAggregateInputType = {
    id?: true
    partId?: true
    userId?: true
    workOrderId?: true
    loanedAt?: true
    returnedAt?: true
  }

  export type ToolLoanCountAggregateInputType = {
    id?: true
    partId?: true
    userId?: true
    workOrderId?: true
    loanedAt?: true
    returnedAt?: true
    _all?: true
  }

  export type ToolLoanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ToolLoan to aggregate.
     */
    where?: ToolLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolLoans to fetch.
     */
    orderBy?: ToolLoanOrderByWithRelationInput | ToolLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ToolLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ToolLoans
    **/
    _count?: true | ToolLoanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ToolLoanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ToolLoanMaxAggregateInputType
  }

  export type GetToolLoanAggregateType<T extends ToolLoanAggregateArgs> = {
        [P in keyof T & keyof AggregateToolLoan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToolLoan[P]>
      : GetScalarType<T[P], AggregateToolLoan[P]>
  }




  export type ToolLoanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToolLoanWhereInput
    orderBy?: ToolLoanOrderByWithAggregationInput | ToolLoanOrderByWithAggregationInput[]
    by: ToolLoanScalarFieldEnum[] | ToolLoanScalarFieldEnum
    having?: ToolLoanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ToolLoanCountAggregateInputType | true
    _min?: ToolLoanMinAggregateInputType
    _max?: ToolLoanMaxAggregateInputType
  }

  export type ToolLoanGroupByOutputType = {
    id: string
    partId: string
    userId: string
    workOrderId: string | null
    loanedAt: Date
    returnedAt: Date | null
    _count: ToolLoanCountAggregateOutputType | null
    _min: ToolLoanMinAggregateOutputType | null
    _max: ToolLoanMaxAggregateOutputType | null
  }

  type GetToolLoanGroupByPayload<T extends ToolLoanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ToolLoanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ToolLoanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ToolLoanGroupByOutputType[P]>
            : GetScalarType<T[P], ToolLoanGroupByOutputType[P]>
        }
      >
    >


  export type ToolLoanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partId?: boolean
    userId?: boolean
    workOrderId?: boolean
    loanedAt?: boolean
    returnedAt?: boolean
    part?: boolean | PartDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    workOrder?: boolean | ToolLoan$workOrderArgs<ExtArgs>
  }, ExtArgs["result"]["toolLoan"]>



  export type ToolLoanSelectScalar = {
    id?: boolean
    partId?: boolean
    userId?: boolean
    workOrderId?: boolean
    loanedAt?: boolean
    returnedAt?: boolean
  }

  export type ToolLoanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "partId" | "userId" | "workOrderId" | "loanedAt" | "returnedAt", ExtArgs["result"]["toolLoan"]>
  export type ToolLoanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    part?: boolean | PartDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    workOrder?: boolean | ToolLoan$workOrderArgs<ExtArgs>
  }

  export type $ToolLoanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ToolLoan"
    objects: {
      part: Prisma.$PartPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      workOrder: Prisma.$WorkOrderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      partId: string
      userId: string
      workOrderId: string | null
      loanedAt: Date
      returnedAt: Date | null
    }, ExtArgs["result"]["toolLoan"]>
    composites: {}
  }

  type ToolLoanGetPayload<S extends boolean | null | undefined | ToolLoanDefaultArgs> = $Result.GetResult<Prisma.$ToolLoanPayload, S>

  type ToolLoanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ToolLoanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ToolLoanCountAggregateInputType | true
    }

  export interface ToolLoanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ToolLoan'], meta: { name: 'ToolLoan' } }
    /**
     * Find zero or one ToolLoan that matches the filter.
     * @param {ToolLoanFindUniqueArgs} args - Arguments to find a ToolLoan
     * @example
     * // Get one ToolLoan
     * const toolLoan = await prisma.toolLoan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ToolLoanFindUniqueArgs>(args: SelectSubset<T, ToolLoanFindUniqueArgs<ExtArgs>>): Prisma__ToolLoanClient<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ToolLoan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ToolLoanFindUniqueOrThrowArgs} args - Arguments to find a ToolLoan
     * @example
     * // Get one ToolLoan
     * const toolLoan = await prisma.toolLoan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ToolLoanFindUniqueOrThrowArgs>(args: SelectSubset<T, ToolLoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ToolLoanClient<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ToolLoan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolLoanFindFirstArgs} args - Arguments to find a ToolLoan
     * @example
     * // Get one ToolLoan
     * const toolLoan = await prisma.toolLoan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ToolLoanFindFirstArgs>(args?: SelectSubset<T, ToolLoanFindFirstArgs<ExtArgs>>): Prisma__ToolLoanClient<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ToolLoan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolLoanFindFirstOrThrowArgs} args - Arguments to find a ToolLoan
     * @example
     * // Get one ToolLoan
     * const toolLoan = await prisma.toolLoan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ToolLoanFindFirstOrThrowArgs>(args?: SelectSubset<T, ToolLoanFindFirstOrThrowArgs<ExtArgs>>): Prisma__ToolLoanClient<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ToolLoans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolLoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ToolLoans
     * const toolLoans = await prisma.toolLoan.findMany()
     * 
     * // Get first 10 ToolLoans
     * const toolLoans = await prisma.toolLoan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const toolLoanWithIdOnly = await prisma.toolLoan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ToolLoanFindManyArgs>(args?: SelectSubset<T, ToolLoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ToolLoan.
     * @param {ToolLoanCreateArgs} args - Arguments to create a ToolLoan.
     * @example
     * // Create one ToolLoan
     * const ToolLoan = await prisma.toolLoan.create({
     *   data: {
     *     // ... data to create a ToolLoan
     *   }
     * })
     * 
     */
    create<T extends ToolLoanCreateArgs>(args: SelectSubset<T, ToolLoanCreateArgs<ExtArgs>>): Prisma__ToolLoanClient<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ToolLoans.
     * @param {ToolLoanCreateManyArgs} args - Arguments to create many ToolLoans.
     * @example
     * // Create many ToolLoans
     * const toolLoan = await prisma.toolLoan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ToolLoanCreateManyArgs>(args?: SelectSubset<T, ToolLoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ToolLoan.
     * @param {ToolLoanDeleteArgs} args - Arguments to delete one ToolLoan.
     * @example
     * // Delete one ToolLoan
     * const ToolLoan = await prisma.toolLoan.delete({
     *   where: {
     *     // ... filter to delete one ToolLoan
     *   }
     * })
     * 
     */
    delete<T extends ToolLoanDeleteArgs>(args: SelectSubset<T, ToolLoanDeleteArgs<ExtArgs>>): Prisma__ToolLoanClient<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ToolLoan.
     * @param {ToolLoanUpdateArgs} args - Arguments to update one ToolLoan.
     * @example
     * // Update one ToolLoan
     * const toolLoan = await prisma.toolLoan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ToolLoanUpdateArgs>(args: SelectSubset<T, ToolLoanUpdateArgs<ExtArgs>>): Prisma__ToolLoanClient<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ToolLoans.
     * @param {ToolLoanDeleteManyArgs} args - Arguments to filter ToolLoans to delete.
     * @example
     * // Delete a few ToolLoans
     * const { count } = await prisma.toolLoan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ToolLoanDeleteManyArgs>(args?: SelectSubset<T, ToolLoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ToolLoans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolLoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ToolLoans
     * const toolLoan = await prisma.toolLoan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ToolLoanUpdateManyArgs>(args: SelectSubset<T, ToolLoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ToolLoan.
     * @param {ToolLoanUpsertArgs} args - Arguments to update or create a ToolLoan.
     * @example
     * // Update or create a ToolLoan
     * const toolLoan = await prisma.toolLoan.upsert({
     *   create: {
     *     // ... data to create a ToolLoan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ToolLoan we want to update
     *   }
     * })
     */
    upsert<T extends ToolLoanUpsertArgs>(args: SelectSubset<T, ToolLoanUpsertArgs<ExtArgs>>): Prisma__ToolLoanClient<$Result.GetResult<Prisma.$ToolLoanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ToolLoans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolLoanCountArgs} args - Arguments to filter ToolLoans to count.
     * @example
     * // Count the number of ToolLoans
     * const count = await prisma.toolLoan.count({
     *   where: {
     *     // ... the filter for the ToolLoans we want to count
     *   }
     * })
    **/
    count<T extends ToolLoanCountArgs>(
      args?: Subset<T, ToolLoanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ToolLoanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ToolLoan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolLoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ToolLoanAggregateArgs>(args: Subset<T, ToolLoanAggregateArgs>): Prisma.PrismaPromise<GetToolLoanAggregateType<T>>

    /**
     * Group by ToolLoan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolLoanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ToolLoanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ToolLoanGroupByArgs['orderBy'] }
        : { orderBy?: ToolLoanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ToolLoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetToolLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ToolLoan model
   */
  readonly fields: ToolLoanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ToolLoan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ToolLoanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    part<T extends PartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartDefaultArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workOrder<T extends ToolLoan$workOrderArgs<ExtArgs> = {}>(args?: Subset<T, ToolLoan$workOrderArgs<ExtArgs>>): Prisma__WorkOrderClient<$Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ToolLoan model
   */
  interface ToolLoanFieldRefs {
    readonly id: FieldRef<"ToolLoan", 'String'>
    readonly partId: FieldRef<"ToolLoan", 'String'>
    readonly userId: FieldRef<"ToolLoan", 'String'>
    readonly workOrderId: FieldRef<"ToolLoan", 'String'>
    readonly loanedAt: FieldRef<"ToolLoan", 'DateTime'>
    readonly returnedAt: FieldRef<"ToolLoan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ToolLoan findUnique
   */
  export type ToolLoanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    /**
     * Filter, which ToolLoan to fetch.
     */
    where: ToolLoanWhereUniqueInput
  }

  /**
   * ToolLoan findUniqueOrThrow
   */
  export type ToolLoanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    /**
     * Filter, which ToolLoan to fetch.
     */
    where: ToolLoanWhereUniqueInput
  }

  /**
   * ToolLoan findFirst
   */
  export type ToolLoanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    /**
     * Filter, which ToolLoan to fetch.
     */
    where?: ToolLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolLoans to fetch.
     */
    orderBy?: ToolLoanOrderByWithRelationInput | ToolLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ToolLoans.
     */
    cursor?: ToolLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ToolLoans.
     */
    distinct?: ToolLoanScalarFieldEnum | ToolLoanScalarFieldEnum[]
  }

  /**
   * ToolLoan findFirstOrThrow
   */
  export type ToolLoanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    /**
     * Filter, which ToolLoan to fetch.
     */
    where?: ToolLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolLoans to fetch.
     */
    orderBy?: ToolLoanOrderByWithRelationInput | ToolLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ToolLoans.
     */
    cursor?: ToolLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ToolLoans.
     */
    distinct?: ToolLoanScalarFieldEnum | ToolLoanScalarFieldEnum[]
  }

  /**
   * ToolLoan findMany
   */
  export type ToolLoanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    /**
     * Filter, which ToolLoans to fetch.
     */
    where?: ToolLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToolLoans to fetch.
     */
    orderBy?: ToolLoanOrderByWithRelationInput | ToolLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ToolLoans.
     */
    cursor?: ToolLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToolLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToolLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ToolLoans.
     */
    distinct?: ToolLoanScalarFieldEnum | ToolLoanScalarFieldEnum[]
  }

  /**
   * ToolLoan create
   */
  export type ToolLoanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    /**
     * The data needed to create a ToolLoan.
     */
    data: XOR<ToolLoanCreateInput, ToolLoanUncheckedCreateInput>
  }

  /**
   * ToolLoan createMany
   */
  export type ToolLoanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ToolLoans.
     */
    data: ToolLoanCreateManyInput | ToolLoanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ToolLoan update
   */
  export type ToolLoanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    /**
     * The data needed to update a ToolLoan.
     */
    data: XOR<ToolLoanUpdateInput, ToolLoanUncheckedUpdateInput>
    /**
     * Choose, which ToolLoan to update.
     */
    where: ToolLoanWhereUniqueInput
  }

  /**
   * ToolLoan updateMany
   */
  export type ToolLoanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ToolLoans.
     */
    data: XOR<ToolLoanUpdateManyMutationInput, ToolLoanUncheckedUpdateManyInput>
    /**
     * Filter which ToolLoans to update
     */
    where?: ToolLoanWhereInput
    /**
     * Limit how many ToolLoans to update.
     */
    limit?: number
  }

  /**
   * ToolLoan upsert
   */
  export type ToolLoanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    /**
     * The filter to search for the ToolLoan to update in case it exists.
     */
    where: ToolLoanWhereUniqueInput
    /**
     * In case the ToolLoan found by the `where` argument doesn't exist, create a new ToolLoan with this data.
     */
    create: XOR<ToolLoanCreateInput, ToolLoanUncheckedCreateInput>
    /**
     * In case the ToolLoan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ToolLoanUpdateInput, ToolLoanUncheckedUpdateInput>
  }

  /**
   * ToolLoan delete
   */
  export type ToolLoanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
    /**
     * Filter which ToolLoan to delete.
     */
    where: ToolLoanWhereUniqueInput
  }

  /**
   * ToolLoan deleteMany
   */
  export type ToolLoanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ToolLoans to delete
     */
    where?: ToolLoanWhereInput
    /**
     * Limit how many ToolLoans to delete.
     */
    limit?: number
  }

  /**
   * ToolLoan.workOrder
   */
  export type ToolLoan$workOrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: WorkOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: WorkOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkOrderInclude<ExtArgs> | null
    where?: WorkOrderWhereInput
  }

  /**
   * ToolLoan without action
   */
  export type ToolLoanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToolLoan
     */
    select?: ToolLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToolLoan
     */
    omit?: ToolLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolLoanInclude<ExtArgs> | null
  }


  /**
   * Model PreventivePlan
   */

  export type AggregatePreventivePlan = {
    _count: PreventivePlanCountAggregateOutputType | null
    _avg: PreventivePlanAvgAggregateOutputType | null
    _sum: PreventivePlanSumAggregateOutputType | null
    _min: PreventivePlanMinAggregateOutputType | null
    _max: PreventivePlanMaxAggregateOutputType | null
  }

  export type PreventivePlanAvgAggregateOutputType = {
    intervalHours: number | null
    intervalDays: number | null
    advanceDays: number | null
  }

  export type PreventivePlanSumAggregateOutputType = {
    intervalHours: number | null
    intervalDays: number | null
    advanceDays: number | null
  }

  export type PreventivePlanMinAggregateOutputType = {
    id: string | null
    machineId: string | null
    name: string | null
    intervalHours: number | null
    intervalDays: number | null
    advanceDays: number | null
    isActive: boolean | null
    lastRunAt: Date | null
    nextRunAt: Date | null
    createdAt: Date | null
  }

  export type PreventivePlanMaxAggregateOutputType = {
    id: string | null
    machineId: string | null
    name: string | null
    intervalHours: number | null
    intervalDays: number | null
    advanceDays: number | null
    isActive: boolean | null
    lastRunAt: Date | null
    nextRunAt: Date | null
    createdAt: Date | null
  }

  export type PreventivePlanCountAggregateOutputType = {
    id: number
    machineId: number
    name: number
    intervalHours: number
    intervalDays: number
    advanceDays: number
    checklist: number
    isActive: number
    lastRunAt: number
    nextRunAt: number
    createdAt: number
    _all: number
  }


  export type PreventivePlanAvgAggregateInputType = {
    intervalHours?: true
    intervalDays?: true
    advanceDays?: true
  }

  export type PreventivePlanSumAggregateInputType = {
    intervalHours?: true
    intervalDays?: true
    advanceDays?: true
  }

  export type PreventivePlanMinAggregateInputType = {
    id?: true
    machineId?: true
    name?: true
    intervalHours?: true
    intervalDays?: true
    advanceDays?: true
    isActive?: true
    lastRunAt?: true
    nextRunAt?: true
    createdAt?: true
  }

  export type PreventivePlanMaxAggregateInputType = {
    id?: true
    machineId?: true
    name?: true
    intervalHours?: true
    intervalDays?: true
    advanceDays?: true
    isActive?: true
    lastRunAt?: true
    nextRunAt?: true
    createdAt?: true
  }

  export type PreventivePlanCountAggregateInputType = {
    id?: true
    machineId?: true
    name?: true
    intervalHours?: true
    intervalDays?: true
    advanceDays?: true
    checklist?: true
    isActive?: true
    lastRunAt?: true
    nextRunAt?: true
    createdAt?: true
    _all?: true
  }

  export type PreventivePlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreventivePlan to aggregate.
     */
    where?: PreventivePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivePlans to fetch.
     */
    orderBy?: PreventivePlanOrderByWithRelationInput | PreventivePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreventivePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreventivePlans
    **/
    _count?: true | PreventivePlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreventivePlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreventivePlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreventivePlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreventivePlanMaxAggregateInputType
  }

  export type GetPreventivePlanAggregateType<T extends PreventivePlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePreventivePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreventivePlan[P]>
      : GetScalarType<T[P], AggregatePreventivePlan[P]>
  }




  export type PreventivePlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreventivePlanWhereInput
    orderBy?: PreventivePlanOrderByWithAggregationInput | PreventivePlanOrderByWithAggregationInput[]
    by: PreventivePlanScalarFieldEnum[] | PreventivePlanScalarFieldEnum
    having?: PreventivePlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreventivePlanCountAggregateInputType | true
    _avg?: PreventivePlanAvgAggregateInputType
    _sum?: PreventivePlanSumAggregateInputType
    _min?: PreventivePlanMinAggregateInputType
    _max?: PreventivePlanMaxAggregateInputType
  }

  export type PreventivePlanGroupByOutputType = {
    id: string
    machineId: string
    name: string
    intervalHours: number | null
    intervalDays: number | null
    advanceDays: number
    checklist: JsonValue
    isActive: boolean
    lastRunAt: Date | null
    nextRunAt: Date | null
    createdAt: Date
    _count: PreventivePlanCountAggregateOutputType | null
    _avg: PreventivePlanAvgAggregateOutputType | null
    _sum: PreventivePlanSumAggregateOutputType | null
    _min: PreventivePlanMinAggregateOutputType | null
    _max: PreventivePlanMaxAggregateOutputType | null
  }

  type GetPreventivePlanGroupByPayload<T extends PreventivePlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreventivePlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreventivePlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreventivePlanGroupByOutputType[P]>
            : GetScalarType<T[P], PreventivePlanGroupByOutputType[P]>
        }
      >
    >


  export type PreventivePlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    machineId?: boolean
    name?: boolean
    intervalHours?: boolean
    intervalDays?: boolean
    advanceDays?: boolean
    checklist?: boolean
    isActive?: boolean
    lastRunAt?: boolean
    nextRunAt?: boolean
    createdAt?: boolean
    machine?: boolean | MachineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preventivePlan"]>



  export type PreventivePlanSelectScalar = {
    id?: boolean
    machineId?: boolean
    name?: boolean
    intervalHours?: boolean
    intervalDays?: boolean
    advanceDays?: boolean
    checklist?: boolean
    isActive?: boolean
    lastRunAt?: boolean
    nextRunAt?: boolean
    createdAt?: boolean
  }

  export type PreventivePlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "machineId" | "name" | "intervalHours" | "intervalDays" | "advanceDays" | "checklist" | "isActive" | "lastRunAt" | "nextRunAt" | "createdAt", ExtArgs["result"]["preventivePlan"]>
  export type PreventivePlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    machine?: boolean | MachineDefaultArgs<ExtArgs>
  }

  export type $PreventivePlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PreventivePlan"
    objects: {
      machine: Prisma.$MachinePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      machineId: string
      name: string
      intervalHours: number | null
      intervalDays: number | null
      advanceDays: number
      checklist: Prisma.JsonValue
      isActive: boolean
      lastRunAt: Date | null
      nextRunAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["preventivePlan"]>
    composites: {}
  }

  type PreventivePlanGetPayload<S extends boolean | null | undefined | PreventivePlanDefaultArgs> = $Result.GetResult<Prisma.$PreventivePlanPayload, S>

  type PreventivePlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreventivePlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreventivePlanCountAggregateInputType | true
    }

  export interface PreventivePlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PreventivePlan'], meta: { name: 'PreventivePlan' } }
    /**
     * Find zero or one PreventivePlan that matches the filter.
     * @param {PreventivePlanFindUniqueArgs} args - Arguments to find a PreventivePlan
     * @example
     * // Get one PreventivePlan
     * const preventivePlan = await prisma.preventivePlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreventivePlanFindUniqueArgs>(args: SelectSubset<T, PreventivePlanFindUniqueArgs<ExtArgs>>): Prisma__PreventivePlanClient<$Result.GetResult<Prisma.$PreventivePlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PreventivePlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreventivePlanFindUniqueOrThrowArgs} args - Arguments to find a PreventivePlan
     * @example
     * // Get one PreventivePlan
     * const preventivePlan = await prisma.preventivePlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreventivePlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PreventivePlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreventivePlanClient<$Result.GetResult<Prisma.$PreventivePlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreventivePlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivePlanFindFirstArgs} args - Arguments to find a PreventivePlan
     * @example
     * // Get one PreventivePlan
     * const preventivePlan = await prisma.preventivePlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreventivePlanFindFirstArgs>(args?: SelectSubset<T, PreventivePlanFindFirstArgs<ExtArgs>>): Prisma__PreventivePlanClient<$Result.GetResult<Prisma.$PreventivePlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreventivePlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivePlanFindFirstOrThrowArgs} args - Arguments to find a PreventivePlan
     * @example
     * // Get one PreventivePlan
     * const preventivePlan = await prisma.preventivePlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreventivePlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PreventivePlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreventivePlanClient<$Result.GetResult<Prisma.$PreventivePlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PreventivePlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivePlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreventivePlans
     * const preventivePlans = await prisma.preventivePlan.findMany()
     * 
     * // Get first 10 PreventivePlans
     * const preventivePlans = await prisma.preventivePlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preventivePlanWithIdOnly = await prisma.preventivePlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreventivePlanFindManyArgs>(args?: SelectSubset<T, PreventivePlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivePlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PreventivePlan.
     * @param {PreventivePlanCreateArgs} args - Arguments to create a PreventivePlan.
     * @example
     * // Create one PreventivePlan
     * const PreventivePlan = await prisma.preventivePlan.create({
     *   data: {
     *     // ... data to create a PreventivePlan
     *   }
     * })
     * 
     */
    create<T extends PreventivePlanCreateArgs>(args: SelectSubset<T, PreventivePlanCreateArgs<ExtArgs>>): Prisma__PreventivePlanClient<$Result.GetResult<Prisma.$PreventivePlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PreventivePlans.
     * @param {PreventivePlanCreateManyArgs} args - Arguments to create many PreventivePlans.
     * @example
     * // Create many PreventivePlans
     * const preventivePlan = await prisma.preventivePlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreventivePlanCreateManyArgs>(args?: SelectSubset<T, PreventivePlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PreventivePlan.
     * @param {PreventivePlanDeleteArgs} args - Arguments to delete one PreventivePlan.
     * @example
     * // Delete one PreventivePlan
     * const PreventivePlan = await prisma.preventivePlan.delete({
     *   where: {
     *     // ... filter to delete one PreventivePlan
     *   }
     * })
     * 
     */
    delete<T extends PreventivePlanDeleteArgs>(args: SelectSubset<T, PreventivePlanDeleteArgs<ExtArgs>>): Prisma__PreventivePlanClient<$Result.GetResult<Prisma.$PreventivePlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PreventivePlan.
     * @param {PreventivePlanUpdateArgs} args - Arguments to update one PreventivePlan.
     * @example
     * // Update one PreventivePlan
     * const preventivePlan = await prisma.preventivePlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreventivePlanUpdateArgs>(args: SelectSubset<T, PreventivePlanUpdateArgs<ExtArgs>>): Prisma__PreventivePlanClient<$Result.GetResult<Prisma.$PreventivePlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PreventivePlans.
     * @param {PreventivePlanDeleteManyArgs} args - Arguments to filter PreventivePlans to delete.
     * @example
     * // Delete a few PreventivePlans
     * const { count } = await prisma.preventivePlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreventivePlanDeleteManyArgs>(args?: SelectSubset<T, PreventivePlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreventivePlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivePlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreventivePlans
     * const preventivePlan = await prisma.preventivePlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreventivePlanUpdateManyArgs>(args: SelectSubset<T, PreventivePlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PreventivePlan.
     * @param {PreventivePlanUpsertArgs} args - Arguments to update or create a PreventivePlan.
     * @example
     * // Update or create a PreventivePlan
     * const preventivePlan = await prisma.preventivePlan.upsert({
     *   create: {
     *     // ... data to create a PreventivePlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreventivePlan we want to update
     *   }
     * })
     */
    upsert<T extends PreventivePlanUpsertArgs>(args: SelectSubset<T, PreventivePlanUpsertArgs<ExtArgs>>): Prisma__PreventivePlanClient<$Result.GetResult<Prisma.$PreventivePlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PreventivePlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivePlanCountArgs} args - Arguments to filter PreventivePlans to count.
     * @example
     * // Count the number of PreventivePlans
     * const count = await prisma.preventivePlan.count({
     *   where: {
     *     // ... the filter for the PreventivePlans we want to count
     *   }
     * })
    **/
    count<T extends PreventivePlanCountArgs>(
      args?: Subset<T, PreventivePlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreventivePlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreventivePlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivePlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreventivePlanAggregateArgs>(args: Subset<T, PreventivePlanAggregateArgs>): Prisma.PrismaPromise<GetPreventivePlanAggregateType<T>>

    /**
     * Group by PreventivePlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivePlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreventivePlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreventivePlanGroupByArgs['orderBy'] }
        : { orderBy?: PreventivePlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreventivePlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreventivePlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PreventivePlan model
   */
  readonly fields: PreventivePlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PreventivePlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreventivePlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    machine<T extends MachineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MachineDefaultArgs<ExtArgs>>): Prisma__MachineClient<$Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PreventivePlan model
   */
  interface PreventivePlanFieldRefs {
    readonly id: FieldRef<"PreventivePlan", 'String'>
    readonly machineId: FieldRef<"PreventivePlan", 'String'>
    readonly name: FieldRef<"PreventivePlan", 'String'>
    readonly intervalHours: FieldRef<"PreventivePlan", 'Int'>
    readonly intervalDays: FieldRef<"PreventivePlan", 'Int'>
    readonly advanceDays: FieldRef<"PreventivePlan", 'Int'>
    readonly checklist: FieldRef<"PreventivePlan", 'Json'>
    readonly isActive: FieldRef<"PreventivePlan", 'Boolean'>
    readonly lastRunAt: FieldRef<"PreventivePlan", 'DateTime'>
    readonly nextRunAt: FieldRef<"PreventivePlan", 'DateTime'>
    readonly createdAt: FieldRef<"PreventivePlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PreventivePlan findUnique
   */
  export type PreventivePlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
    /**
     * Filter, which PreventivePlan to fetch.
     */
    where: PreventivePlanWhereUniqueInput
  }

  /**
   * PreventivePlan findUniqueOrThrow
   */
  export type PreventivePlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
    /**
     * Filter, which PreventivePlan to fetch.
     */
    where: PreventivePlanWhereUniqueInput
  }

  /**
   * PreventivePlan findFirst
   */
  export type PreventivePlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
    /**
     * Filter, which PreventivePlan to fetch.
     */
    where?: PreventivePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivePlans to fetch.
     */
    orderBy?: PreventivePlanOrderByWithRelationInput | PreventivePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventivePlans.
     */
    cursor?: PreventivePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventivePlans.
     */
    distinct?: PreventivePlanScalarFieldEnum | PreventivePlanScalarFieldEnum[]
  }

  /**
   * PreventivePlan findFirstOrThrow
   */
  export type PreventivePlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
    /**
     * Filter, which PreventivePlan to fetch.
     */
    where?: PreventivePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivePlans to fetch.
     */
    orderBy?: PreventivePlanOrderByWithRelationInput | PreventivePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventivePlans.
     */
    cursor?: PreventivePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventivePlans.
     */
    distinct?: PreventivePlanScalarFieldEnum | PreventivePlanScalarFieldEnum[]
  }

  /**
   * PreventivePlan findMany
   */
  export type PreventivePlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
    /**
     * Filter, which PreventivePlans to fetch.
     */
    where?: PreventivePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivePlans to fetch.
     */
    orderBy?: PreventivePlanOrderByWithRelationInput | PreventivePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreventivePlans.
     */
    cursor?: PreventivePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventivePlans.
     */
    distinct?: PreventivePlanScalarFieldEnum | PreventivePlanScalarFieldEnum[]
  }

  /**
   * PreventivePlan create
   */
  export type PreventivePlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
    /**
     * The data needed to create a PreventivePlan.
     */
    data: XOR<PreventivePlanCreateInput, PreventivePlanUncheckedCreateInput>
  }

  /**
   * PreventivePlan createMany
   */
  export type PreventivePlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PreventivePlans.
     */
    data: PreventivePlanCreateManyInput | PreventivePlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PreventivePlan update
   */
  export type PreventivePlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
    /**
     * The data needed to update a PreventivePlan.
     */
    data: XOR<PreventivePlanUpdateInput, PreventivePlanUncheckedUpdateInput>
    /**
     * Choose, which PreventivePlan to update.
     */
    where: PreventivePlanWhereUniqueInput
  }

  /**
   * PreventivePlan updateMany
   */
  export type PreventivePlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PreventivePlans.
     */
    data: XOR<PreventivePlanUpdateManyMutationInput, PreventivePlanUncheckedUpdateManyInput>
    /**
     * Filter which PreventivePlans to update
     */
    where?: PreventivePlanWhereInput
    /**
     * Limit how many PreventivePlans to update.
     */
    limit?: number
  }

  /**
   * PreventivePlan upsert
   */
  export type PreventivePlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
    /**
     * The filter to search for the PreventivePlan to update in case it exists.
     */
    where: PreventivePlanWhereUniqueInput
    /**
     * In case the PreventivePlan found by the `where` argument doesn't exist, create a new PreventivePlan with this data.
     */
    create: XOR<PreventivePlanCreateInput, PreventivePlanUncheckedCreateInput>
    /**
     * In case the PreventivePlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreventivePlanUpdateInput, PreventivePlanUncheckedUpdateInput>
  }

  /**
   * PreventivePlan delete
   */
  export type PreventivePlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
    /**
     * Filter which PreventivePlan to delete.
     */
    where: PreventivePlanWhereUniqueInput
  }

  /**
   * PreventivePlan deleteMany
   */
  export type PreventivePlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreventivePlans to delete
     */
    where?: PreventivePlanWhereInput
    /**
     * Limit how many PreventivePlans to delete.
     */
    limit?: number
  }

  /**
   * PreventivePlan without action
   */
  export type PreventivePlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivePlan
     */
    select?: PreventivePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivePlan
     */
    omit?: PreventivePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivePlanInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.NotificationType | null
    title: string | null
    message: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.NotificationType | null
    title: string | null
    message: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    title: number
    message: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.NotificationType
    title: string
    message: string
    isRead: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>



  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "title" | "message" | "isRead" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.NotificationType
      title: string
      message: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model EventLog
   */

  export type AggregateEventLog = {
    _count: EventLogCountAggregateOutputType | null
    _min: EventLogMinAggregateOutputType | null
    _max: EventLogMaxAggregateOutputType | null
  }

  export type EventLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    occurredAt: Date | null
  }

  export type EventLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    occurredAt: Date | null
  }

  export type EventLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    entityType: number
    entityId: number
    metadata: number
    occurredAt: number
    _all: number
  }


  export type EventLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    occurredAt?: true
  }

  export type EventLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    occurredAt?: true
  }

  export type EventLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    metadata?: true
    occurredAt?: true
    _all?: true
  }

  export type EventLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventLog to aggregate.
     */
    where?: EventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLogs to fetch.
     */
    orderBy?: EventLogOrderByWithRelationInput | EventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventLogs
    **/
    _count?: true | EventLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventLogMaxAggregateInputType
  }

  export type GetEventLogAggregateType<T extends EventLogAggregateArgs> = {
        [P in keyof T & keyof AggregateEventLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventLog[P]>
      : GetScalarType<T[P], AggregateEventLog[P]>
  }




  export type EventLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventLogWhereInput
    orderBy?: EventLogOrderByWithAggregationInput | EventLogOrderByWithAggregationInput[]
    by: EventLogScalarFieldEnum[] | EventLogScalarFieldEnum
    having?: EventLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventLogCountAggregateInputType | true
    _min?: EventLogMinAggregateInputType
    _max?: EventLogMaxAggregateInputType
  }

  export type EventLogGroupByOutputType = {
    id: string
    userId: string | null
    action: string
    entityType: string | null
    entityId: string | null
    metadata: JsonValue | null
    occurredAt: Date
    _count: EventLogCountAggregateOutputType | null
    _min: EventLogMinAggregateOutputType | null
    _max: EventLogMaxAggregateOutputType | null
  }

  type GetEventLogGroupByPayload<T extends EventLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventLogGroupByOutputType[P]>
            : GetScalarType<T[P], EventLogGroupByOutputType[P]>
        }
      >
    >


  export type EventLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    occurredAt?: boolean
    user?: boolean | EventLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["eventLog"]>



  export type EventLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    occurredAt?: boolean
  }

  export type EventLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "entityType" | "entityId" | "metadata" | "occurredAt", ExtArgs["result"]["eventLog"]>
  export type EventLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | EventLog$userArgs<ExtArgs>
  }

  export type $EventLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      action: string
      entityType: string | null
      entityId: string | null
      metadata: Prisma.JsonValue | null
      occurredAt: Date
    }, ExtArgs["result"]["eventLog"]>
    composites: {}
  }

  type EventLogGetPayload<S extends boolean | null | undefined | EventLogDefaultArgs> = $Result.GetResult<Prisma.$EventLogPayload, S>

  type EventLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventLogCountAggregateInputType | true
    }

  export interface EventLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventLog'], meta: { name: 'EventLog' } }
    /**
     * Find zero or one EventLog that matches the filter.
     * @param {EventLogFindUniqueArgs} args - Arguments to find a EventLog
     * @example
     * // Get one EventLog
     * const eventLog = await prisma.eventLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventLogFindUniqueArgs>(args: SelectSubset<T, EventLogFindUniqueArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventLogFindUniqueOrThrowArgs} args - Arguments to find a EventLog
     * @example
     * // Get one EventLog
     * const eventLog = await prisma.eventLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventLogFindUniqueOrThrowArgs>(args: SelectSubset<T, EventLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogFindFirstArgs} args - Arguments to find a EventLog
     * @example
     * // Get one EventLog
     * const eventLog = await prisma.eventLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventLogFindFirstArgs>(args?: SelectSubset<T, EventLogFindFirstArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogFindFirstOrThrowArgs} args - Arguments to find a EventLog
     * @example
     * // Get one EventLog
     * const eventLog = await prisma.eventLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventLogFindFirstOrThrowArgs>(args?: SelectSubset<T, EventLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventLogs
     * const eventLogs = await prisma.eventLog.findMany()
     * 
     * // Get first 10 EventLogs
     * const eventLogs = await prisma.eventLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventLogWithIdOnly = await prisma.eventLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventLogFindManyArgs>(args?: SelectSubset<T, EventLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventLog.
     * @param {EventLogCreateArgs} args - Arguments to create a EventLog.
     * @example
     * // Create one EventLog
     * const EventLog = await prisma.eventLog.create({
     *   data: {
     *     // ... data to create a EventLog
     *   }
     * })
     * 
     */
    create<T extends EventLogCreateArgs>(args: SelectSubset<T, EventLogCreateArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventLogs.
     * @param {EventLogCreateManyArgs} args - Arguments to create many EventLogs.
     * @example
     * // Create many EventLogs
     * const eventLog = await prisma.eventLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventLogCreateManyArgs>(args?: SelectSubset<T, EventLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EventLog.
     * @param {EventLogDeleteArgs} args - Arguments to delete one EventLog.
     * @example
     * // Delete one EventLog
     * const EventLog = await prisma.eventLog.delete({
     *   where: {
     *     // ... filter to delete one EventLog
     *   }
     * })
     * 
     */
    delete<T extends EventLogDeleteArgs>(args: SelectSubset<T, EventLogDeleteArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventLog.
     * @param {EventLogUpdateArgs} args - Arguments to update one EventLog.
     * @example
     * // Update one EventLog
     * const eventLog = await prisma.eventLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventLogUpdateArgs>(args: SelectSubset<T, EventLogUpdateArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventLogs.
     * @param {EventLogDeleteManyArgs} args - Arguments to filter EventLogs to delete.
     * @example
     * // Delete a few EventLogs
     * const { count } = await prisma.eventLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventLogDeleteManyArgs>(args?: SelectSubset<T, EventLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventLogs
     * const eventLog = await prisma.eventLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventLogUpdateManyArgs>(args: SelectSubset<T, EventLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EventLog.
     * @param {EventLogUpsertArgs} args - Arguments to update or create a EventLog.
     * @example
     * // Update or create a EventLog
     * const eventLog = await prisma.eventLog.upsert({
     *   create: {
     *     // ... data to create a EventLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventLog we want to update
     *   }
     * })
     */
    upsert<T extends EventLogUpsertArgs>(args: SelectSubset<T, EventLogUpsertArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogCountArgs} args - Arguments to filter EventLogs to count.
     * @example
     * // Count the number of EventLogs
     * const count = await prisma.eventLog.count({
     *   where: {
     *     // ... the filter for the EventLogs we want to count
     *   }
     * })
    **/
    count<T extends EventLogCountArgs>(
      args?: Subset<T, EventLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventLogAggregateArgs>(args: Subset<T, EventLogAggregateArgs>): Prisma.PrismaPromise<GetEventLogAggregateType<T>>

    /**
     * Group by EventLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventLogGroupByArgs['orderBy'] }
        : { orderBy?: EventLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventLog model
   */
  readonly fields: EventLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends EventLog$userArgs<ExtArgs> = {}>(args?: Subset<T, EventLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EventLog model
   */
  interface EventLogFieldRefs {
    readonly id: FieldRef<"EventLog", 'String'>
    readonly userId: FieldRef<"EventLog", 'String'>
    readonly action: FieldRef<"EventLog", 'String'>
    readonly entityType: FieldRef<"EventLog", 'String'>
    readonly entityId: FieldRef<"EventLog", 'String'>
    readonly metadata: FieldRef<"EventLog", 'Json'>
    readonly occurredAt: FieldRef<"EventLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventLog findUnique
   */
  export type EventLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
    /**
     * Filter, which EventLog to fetch.
     */
    where: EventLogWhereUniqueInput
  }

  /**
   * EventLog findUniqueOrThrow
   */
  export type EventLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
    /**
     * Filter, which EventLog to fetch.
     */
    where: EventLogWhereUniqueInput
  }

  /**
   * EventLog findFirst
   */
  export type EventLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
    /**
     * Filter, which EventLog to fetch.
     */
    where?: EventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLogs to fetch.
     */
    orderBy?: EventLogOrderByWithRelationInput | EventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventLogs.
     */
    cursor?: EventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventLogs.
     */
    distinct?: EventLogScalarFieldEnum | EventLogScalarFieldEnum[]
  }

  /**
   * EventLog findFirstOrThrow
   */
  export type EventLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
    /**
     * Filter, which EventLog to fetch.
     */
    where?: EventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLogs to fetch.
     */
    orderBy?: EventLogOrderByWithRelationInput | EventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventLogs.
     */
    cursor?: EventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventLogs.
     */
    distinct?: EventLogScalarFieldEnum | EventLogScalarFieldEnum[]
  }

  /**
   * EventLog findMany
   */
  export type EventLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
    /**
     * Filter, which EventLogs to fetch.
     */
    where?: EventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLogs to fetch.
     */
    orderBy?: EventLogOrderByWithRelationInput | EventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventLogs.
     */
    cursor?: EventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventLogs.
     */
    distinct?: EventLogScalarFieldEnum | EventLogScalarFieldEnum[]
  }

  /**
   * EventLog create
   */
  export type EventLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
    /**
     * The data needed to create a EventLog.
     */
    data: XOR<EventLogCreateInput, EventLogUncheckedCreateInput>
  }

  /**
   * EventLog createMany
   */
  export type EventLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventLogs.
     */
    data: EventLogCreateManyInput | EventLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventLog update
   */
  export type EventLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
    /**
     * The data needed to update a EventLog.
     */
    data: XOR<EventLogUpdateInput, EventLogUncheckedUpdateInput>
    /**
     * Choose, which EventLog to update.
     */
    where: EventLogWhereUniqueInput
  }

  /**
   * EventLog updateMany
   */
  export type EventLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventLogs.
     */
    data: XOR<EventLogUpdateManyMutationInput, EventLogUncheckedUpdateManyInput>
    /**
     * Filter which EventLogs to update
     */
    where?: EventLogWhereInput
    /**
     * Limit how many EventLogs to update.
     */
    limit?: number
  }

  /**
   * EventLog upsert
   */
  export type EventLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
    /**
     * The filter to search for the EventLog to update in case it exists.
     */
    where: EventLogWhereUniqueInput
    /**
     * In case the EventLog found by the `where` argument doesn't exist, create a new EventLog with this data.
     */
    create: XOR<EventLogCreateInput, EventLogUncheckedCreateInput>
    /**
     * In case the EventLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventLogUpdateInput, EventLogUncheckedUpdateInput>
  }

  /**
   * EventLog delete
   */
  export type EventLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
    /**
     * Filter which EventLog to delete.
     */
    where: EventLogWhereUniqueInput
  }

  /**
   * EventLog deleteMany
   */
  export type EventLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventLogs to delete
     */
    where?: EventLogWhereInput
    /**
     * Limit how many EventLogs to delete.
     */
    limit?: number
  }

  /**
   * EventLog.user
   */
  export type EventLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * EventLog without action
   */
  export type EventLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CertificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    issuedAt: 'issuedAt',
    expiresAt: 'expiresAt',
    isValid: 'isValid',
    createdAt: 'createdAt'
  };

  export type CertificationScalarFieldEnum = (typeof CertificationScalarFieldEnum)[keyof typeof CertificationScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    parentId: 'parentId'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const MachineScalarFieldEnum: {
    id: 'id',
    name: 'name',
    serialNumber: 'serialNumber',
    locationId: 'locationId',
    operatingHours: 'operatingHours',
    purchaseDate: 'purchaseDate',
    purchasePrice: 'purchasePrice',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MachineScalarFieldEnum = (typeof MachineScalarFieldEnum)[keyof typeof MachineScalarFieldEnum]


  export const MachineDocumentScalarFieldEnum: {
    id: 'id',
    machineId: 'machineId',
    uploadedById: 'uploadedById',
    filename: 'filename',
    filePath: 'filePath',
    version: 'version',
    isLatest: 'isLatest',
    uploadedAt: 'uploadedAt'
  };

  export type MachineDocumentScalarFieldEnum = (typeof MachineDocumentScalarFieldEnum)[keyof typeof MachineDocumentScalarFieldEnum]


  export const WorkOrderScalarFieldEnum: {
    id: 'id',
    machineId: 'machineId',
    reportedById: 'reportedById',
    assignedToId: 'assignedToId',
    status: 'status',
    priority: 'priority',
    title: 'title',
    description: 'description',
    bhpConfirmed: 'bhpConfirmed',
    laborCost: 'laborCost',
    partsCost: 'partsCost',
    createdAt: 'createdAt',
    startedAt: 'startedAt',
    closedAt: 'closedAt',
    updatedAt: 'updatedAt'
  };

  export type WorkOrderScalarFieldEnum = (typeof WorkOrderScalarFieldEnum)[keyof typeof WorkOrderScalarFieldEnum]


  export const WorkOrderMessageScalarFieldEnum: {
    id: 'id',
    workOrderId: 'workOrderId',
    userId: 'userId',
    content: 'content',
    sentAt: 'sentAt'
  };

  export type WorkOrderMessageScalarFieldEnum = (typeof WorkOrderMessageScalarFieldEnum)[keyof typeof WorkOrderMessageScalarFieldEnum]


  export const PartCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type PartCategoryScalarFieldEnum = (typeof PartCategoryScalarFieldEnum)[keyof typeof PartCategoryScalarFieldEnum]


  export const PartScalarFieldEnum: {
    id: 'id',
    categoryId: 'categoryId',
    name: 'name',
    stockQuantity: 'stockQuantity',
    reorderPoint: 'reorderPoint',
    unitPrice: 'unitPrice',
    qrCode: 'qrCode',
    isActive: 'isActive'
  };

  export type PartScalarFieldEnum = (typeof PartScalarFieldEnum)[keyof typeof PartScalarFieldEnum]


  export const WorkOrderPartScalarFieldEnum: {
    id: 'id',
    workOrderId: 'workOrderId',
    partId: 'partId',
    quantity: 'quantity'
  };

  export type WorkOrderPartScalarFieldEnum = (typeof WorkOrderPartScalarFieldEnum)[keyof typeof WorkOrderPartScalarFieldEnum]


  export const ToolLoanScalarFieldEnum: {
    id: 'id',
    partId: 'partId',
    userId: 'userId',
    workOrderId: 'workOrderId',
    loanedAt: 'loanedAt',
    returnedAt: 'returnedAt'
  };

  export type ToolLoanScalarFieldEnum = (typeof ToolLoanScalarFieldEnum)[keyof typeof ToolLoanScalarFieldEnum]


  export const PreventivePlanScalarFieldEnum: {
    id: 'id',
    machineId: 'machineId',
    name: 'name',
    intervalHours: 'intervalHours',
    intervalDays: 'intervalDays',
    advanceDays: 'advanceDays',
    checklist: 'checklist',
    isActive: 'isActive',
    lastRunAt: 'lastRunAt',
    nextRunAt: 'nextRunAt',
    createdAt: 'createdAt'
  };

  export type PreventivePlanScalarFieldEnum = (typeof PreventivePlanScalarFieldEnum)[keyof typeof PreventivePlanScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    message: 'message',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const EventLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    metadata: 'metadata',
    occurredAt: 'occurredAt'
  };

  export type EventLogScalarFieldEnum = (typeof EventLogScalarFieldEnum)[keyof typeof EventLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const CertificationOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId'
  };

  export type CertificationOrderByRelevanceFieldEnum = (typeof CertificationOrderByRelevanceFieldEnum)[keyof typeof CertificationOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const LocationOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    parentId: 'parentId'
  };

  export type LocationOrderByRelevanceFieldEnum = (typeof LocationOrderByRelevanceFieldEnum)[keyof typeof LocationOrderByRelevanceFieldEnum]


  export const MachineOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    serialNumber: 'serialNumber',
    locationId: 'locationId'
  };

  export type MachineOrderByRelevanceFieldEnum = (typeof MachineOrderByRelevanceFieldEnum)[keyof typeof MachineOrderByRelevanceFieldEnum]


  export const MachineDocumentOrderByRelevanceFieldEnum: {
    id: 'id',
    machineId: 'machineId',
    uploadedById: 'uploadedById',
    filename: 'filename',
    filePath: 'filePath'
  };

  export type MachineDocumentOrderByRelevanceFieldEnum = (typeof MachineDocumentOrderByRelevanceFieldEnum)[keyof typeof MachineDocumentOrderByRelevanceFieldEnum]


  export const WorkOrderOrderByRelevanceFieldEnum: {
    id: 'id',
    machineId: 'machineId',
    reportedById: 'reportedById',
    assignedToId: 'assignedToId',
    title: 'title',
    description: 'description'
  };

  export type WorkOrderOrderByRelevanceFieldEnum = (typeof WorkOrderOrderByRelevanceFieldEnum)[keyof typeof WorkOrderOrderByRelevanceFieldEnum]


  export const WorkOrderMessageOrderByRelevanceFieldEnum: {
    id: 'id',
    workOrderId: 'workOrderId',
    userId: 'userId',
    content: 'content'
  };

  export type WorkOrderMessageOrderByRelevanceFieldEnum = (typeof WorkOrderMessageOrderByRelevanceFieldEnum)[keyof typeof WorkOrderMessageOrderByRelevanceFieldEnum]


  export const PartCategoryOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type PartCategoryOrderByRelevanceFieldEnum = (typeof PartCategoryOrderByRelevanceFieldEnum)[keyof typeof PartCategoryOrderByRelevanceFieldEnum]


  export const PartOrderByRelevanceFieldEnum: {
    id: 'id',
    categoryId: 'categoryId',
    name: 'name',
    qrCode: 'qrCode'
  };

  export type PartOrderByRelevanceFieldEnum = (typeof PartOrderByRelevanceFieldEnum)[keyof typeof PartOrderByRelevanceFieldEnum]


  export const WorkOrderPartOrderByRelevanceFieldEnum: {
    id: 'id',
    workOrderId: 'workOrderId',
    partId: 'partId'
  };

  export type WorkOrderPartOrderByRelevanceFieldEnum = (typeof WorkOrderPartOrderByRelevanceFieldEnum)[keyof typeof WorkOrderPartOrderByRelevanceFieldEnum]


  export const ToolLoanOrderByRelevanceFieldEnum: {
    id: 'id',
    partId: 'partId',
    userId: 'userId',
    workOrderId: 'workOrderId'
  };

  export type ToolLoanOrderByRelevanceFieldEnum = (typeof ToolLoanOrderByRelevanceFieldEnum)[keyof typeof ToolLoanOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const PreventivePlanOrderByRelevanceFieldEnum: {
    id: 'id',
    machineId: 'machineId',
    name: 'name'
  };

  export type PreventivePlanOrderByRelevanceFieldEnum = (typeof PreventivePlanOrderByRelevanceFieldEnum)[keyof typeof PreventivePlanOrderByRelevanceFieldEnum]


  export const NotificationOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message'
  };

  export type NotificationOrderByRelevanceFieldEnum = (typeof NotificationOrderByRelevanceFieldEnum)[keyof typeof NotificationOrderByRelevanceFieldEnum]


  export const EventLogOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId'
  };

  export type EventLogOrderByRelevanceFieldEnum = (typeof EventLogOrderByRelevanceFieldEnum)[keyof typeof EventLogOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'CertificationType'
   */
  export type EnumCertificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CertificationType'>
    


  /**
   * Reference to a field of type 'LocationType'
   */
  export type EnumLocationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LocationType'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'WorkOrderStatus'
   */
  export type EnumWorkOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkOrderStatus'>
    


  /**
   * Reference to a field of type 'Priority'
   */
  export type EnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    certifications?: CertificationListRelationFilter
    reportedOrders?: WorkOrderListRelationFilter
    assignedOrders?: WorkOrderListRelationFilter
    messages?: WorkOrderMessageListRelationFilter
    toolLoans?: ToolLoanListRelationFilter
    notifications?: NotificationListRelationFilter
    uploadedDocuments?: MachineDocumentListRelationFilter
    eventLogs?: EventLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    certifications?: CertificationOrderByRelationAggregateInput
    reportedOrders?: WorkOrderOrderByRelationAggregateInput
    assignedOrders?: WorkOrderOrderByRelationAggregateInput
    messages?: WorkOrderMessageOrderByRelationAggregateInput
    toolLoans?: ToolLoanOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    uploadedDocuments?: MachineDocumentOrderByRelationAggregateInput
    eventLogs?: EventLogOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    certifications?: CertificationListRelationFilter
    reportedOrders?: WorkOrderListRelationFilter
    assignedOrders?: WorkOrderListRelationFilter
    messages?: WorkOrderMessageListRelationFilter
    toolLoans?: ToolLoanListRelationFilter
    notifications?: NotificationListRelationFilter
    uploadedDocuments?: MachineDocumentListRelationFilter
    eventLogs?: EventLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CertificationWhereInput = {
    AND?: CertificationWhereInput | CertificationWhereInput[]
    OR?: CertificationWhereInput[]
    NOT?: CertificationWhereInput | CertificationWhereInput[]
    id?: StringFilter<"Certification"> | string
    userId?: StringFilter<"Certification"> | string
    type?: EnumCertificationTypeFilter<"Certification"> | $Enums.CertificationType
    issuedAt?: DateTimeFilter<"Certification"> | Date | string
    expiresAt?: DateTimeFilter<"Certification"> | Date | string
    isValid?: BoolFilter<"Certification"> | boolean
    createdAt?: DateTimeFilter<"Certification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CertificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    isValid?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: CertificationOrderByRelevanceInput
  }

  export type CertificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CertificationWhereInput | CertificationWhereInput[]
    OR?: CertificationWhereInput[]
    NOT?: CertificationWhereInput | CertificationWhereInput[]
    userId?: StringFilter<"Certification"> | string
    type?: EnumCertificationTypeFilter<"Certification"> | $Enums.CertificationType
    issuedAt?: DateTimeFilter<"Certification"> | Date | string
    expiresAt?: DateTimeFilter<"Certification"> | Date | string
    isValid?: BoolFilter<"Certification"> | boolean
    createdAt?: DateTimeFilter<"Certification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CertificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    isValid?: SortOrder
    createdAt?: SortOrder
    _count?: CertificationCountOrderByAggregateInput
    _max?: CertificationMaxOrderByAggregateInput
    _min?: CertificationMinOrderByAggregateInput
  }

  export type CertificationScalarWhereWithAggregatesInput = {
    AND?: CertificationScalarWhereWithAggregatesInput | CertificationScalarWhereWithAggregatesInput[]
    OR?: CertificationScalarWhereWithAggregatesInput[]
    NOT?: CertificationScalarWhereWithAggregatesInput | CertificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Certification"> | string
    userId?: StringWithAggregatesFilter<"Certification"> | string
    type?: EnumCertificationTypeWithAggregatesFilter<"Certification"> | $Enums.CertificationType
    issuedAt?: DateTimeWithAggregatesFilter<"Certification"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Certification"> | Date | string
    isValid?: BoolWithAggregatesFilter<"Certification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Certification"> | Date | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: StringFilter<"Location"> | string
    name?: StringFilter<"Location"> | string
    type?: EnumLocationTypeFilter<"Location"> | $Enums.LocationType
    parentId?: StringNullableFilter<"Location"> | string | null
    parent?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    children?: LocationListRelationFilter
    machines?: MachineListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parentId?: SortOrderInput | SortOrder
    parent?: LocationOrderByWithRelationInput
    children?: LocationOrderByRelationAggregateInput
    machines?: MachineOrderByRelationAggregateInput
    _relevance?: LocationOrderByRelevanceInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    name?: StringFilter<"Location"> | string
    type?: EnumLocationTypeFilter<"Location"> | $Enums.LocationType
    parentId?: StringNullableFilter<"Location"> | string | null
    parent?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    children?: LocationListRelationFilter
    machines?: MachineListRelationFilter
  }, "id">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parentId?: SortOrderInput | SortOrder
    _count?: LocationCountOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Location"> | string
    name?: StringWithAggregatesFilter<"Location"> | string
    type?: EnumLocationTypeWithAggregatesFilter<"Location"> | $Enums.LocationType
    parentId?: StringNullableWithAggregatesFilter<"Location"> | string | null
  }

  export type MachineWhereInput = {
    AND?: MachineWhereInput | MachineWhereInput[]
    OR?: MachineWhereInput[]
    NOT?: MachineWhereInput | MachineWhereInput[]
    id?: StringFilter<"Machine"> | string
    name?: StringFilter<"Machine"> | string
    serialNumber?: StringFilter<"Machine"> | string
    locationId?: StringFilter<"Machine"> | string
    operatingHours?: FloatFilter<"Machine"> | number
    purchaseDate?: DateTimeFilter<"Machine"> | Date | string
    purchasePrice?: DecimalFilter<"Machine"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"Machine"> | boolean
    createdAt?: DateTimeFilter<"Machine"> | Date | string
    updatedAt?: DateTimeFilter<"Machine"> | Date | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    documents?: MachineDocumentListRelationFilter
    workOrders?: WorkOrderListRelationFilter
    preventivePlans?: PreventivePlanListRelationFilter
  }

  export type MachineOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    serialNumber?: SortOrder
    locationId?: SortOrder
    operatingHours?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: LocationOrderByWithRelationInput
    documents?: MachineDocumentOrderByRelationAggregateInput
    workOrders?: WorkOrderOrderByRelationAggregateInput
    preventivePlans?: PreventivePlanOrderByRelationAggregateInput
    _relevance?: MachineOrderByRelevanceInput
  }

  export type MachineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    serialNumber?: string
    AND?: MachineWhereInput | MachineWhereInput[]
    OR?: MachineWhereInput[]
    NOT?: MachineWhereInput | MachineWhereInput[]
    name?: StringFilter<"Machine"> | string
    locationId?: StringFilter<"Machine"> | string
    operatingHours?: FloatFilter<"Machine"> | number
    purchaseDate?: DateTimeFilter<"Machine"> | Date | string
    purchasePrice?: DecimalFilter<"Machine"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"Machine"> | boolean
    createdAt?: DateTimeFilter<"Machine"> | Date | string
    updatedAt?: DateTimeFilter<"Machine"> | Date | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    documents?: MachineDocumentListRelationFilter
    workOrders?: WorkOrderListRelationFilter
    preventivePlans?: PreventivePlanListRelationFilter
  }, "id" | "serialNumber">

  export type MachineOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    serialNumber?: SortOrder
    locationId?: SortOrder
    operatingHours?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MachineCountOrderByAggregateInput
    _avg?: MachineAvgOrderByAggregateInput
    _max?: MachineMaxOrderByAggregateInput
    _min?: MachineMinOrderByAggregateInput
    _sum?: MachineSumOrderByAggregateInput
  }

  export type MachineScalarWhereWithAggregatesInput = {
    AND?: MachineScalarWhereWithAggregatesInput | MachineScalarWhereWithAggregatesInput[]
    OR?: MachineScalarWhereWithAggregatesInput[]
    NOT?: MachineScalarWhereWithAggregatesInput | MachineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Machine"> | string
    name?: StringWithAggregatesFilter<"Machine"> | string
    serialNumber?: StringWithAggregatesFilter<"Machine"> | string
    locationId?: StringWithAggregatesFilter<"Machine"> | string
    operatingHours?: FloatWithAggregatesFilter<"Machine"> | number
    purchaseDate?: DateTimeWithAggregatesFilter<"Machine"> | Date | string
    purchasePrice?: DecimalWithAggregatesFilter<"Machine"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolWithAggregatesFilter<"Machine"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Machine"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Machine"> | Date | string
  }

  export type MachineDocumentWhereInput = {
    AND?: MachineDocumentWhereInput | MachineDocumentWhereInput[]
    OR?: MachineDocumentWhereInput[]
    NOT?: MachineDocumentWhereInput | MachineDocumentWhereInput[]
    id?: StringFilter<"MachineDocument"> | string
    machineId?: StringFilter<"MachineDocument"> | string
    uploadedById?: StringFilter<"MachineDocument"> | string
    filename?: StringFilter<"MachineDocument"> | string
    filePath?: StringFilter<"MachineDocument"> | string
    version?: IntFilter<"MachineDocument"> | number
    isLatest?: BoolFilter<"MachineDocument"> | boolean
    uploadedAt?: DateTimeFilter<"MachineDocument"> | Date | string
    machine?: XOR<MachineScalarRelationFilter, MachineWhereInput>
    uploadedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MachineDocumentOrderByWithRelationInput = {
    id?: SortOrder
    machineId?: SortOrder
    uploadedById?: SortOrder
    filename?: SortOrder
    filePath?: SortOrder
    version?: SortOrder
    isLatest?: SortOrder
    uploadedAt?: SortOrder
    machine?: MachineOrderByWithRelationInput
    uploadedBy?: UserOrderByWithRelationInput
    _relevance?: MachineDocumentOrderByRelevanceInput
  }

  export type MachineDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MachineDocumentWhereInput | MachineDocumentWhereInput[]
    OR?: MachineDocumentWhereInput[]
    NOT?: MachineDocumentWhereInput | MachineDocumentWhereInput[]
    machineId?: StringFilter<"MachineDocument"> | string
    uploadedById?: StringFilter<"MachineDocument"> | string
    filename?: StringFilter<"MachineDocument"> | string
    filePath?: StringFilter<"MachineDocument"> | string
    version?: IntFilter<"MachineDocument"> | number
    isLatest?: BoolFilter<"MachineDocument"> | boolean
    uploadedAt?: DateTimeFilter<"MachineDocument"> | Date | string
    machine?: XOR<MachineScalarRelationFilter, MachineWhereInput>
    uploadedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MachineDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    machineId?: SortOrder
    uploadedById?: SortOrder
    filename?: SortOrder
    filePath?: SortOrder
    version?: SortOrder
    isLatest?: SortOrder
    uploadedAt?: SortOrder
    _count?: MachineDocumentCountOrderByAggregateInput
    _avg?: MachineDocumentAvgOrderByAggregateInput
    _max?: MachineDocumentMaxOrderByAggregateInput
    _min?: MachineDocumentMinOrderByAggregateInput
    _sum?: MachineDocumentSumOrderByAggregateInput
  }

  export type MachineDocumentScalarWhereWithAggregatesInput = {
    AND?: MachineDocumentScalarWhereWithAggregatesInput | MachineDocumentScalarWhereWithAggregatesInput[]
    OR?: MachineDocumentScalarWhereWithAggregatesInput[]
    NOT?: MachineDocumentScalarWhereWithAggregatesInput | MachineDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MachineDocument"> | string
    machineId?: StringWithAggregatesFilter<"MachineDocument"> | string
    uploadedById?: StringWithAggregatesFilter<"MachineDocument"> | string
    filename?: StringWithAggregatesFilter<"MachineDocument"> | string
    filePath?: StringWithAggregatesFilter<"MachineDocument"> | string
    version?: IntWithAggregatesFilter<"MachineDocument"> | number
    isLatest?: BoolWithAggregatesFilter<"MachineDocument"> | boolean
    uploadedAt?: DateTimeWithAggregatesFilter<"MachineDocument"> | Date | string
  }

  export type WorkOrderWhereInput = {
    AND?: WorkOrderWhereInput | WorkOrderWhereInput[]
    OR?: WorkOrderWhereInput[]
    NOT?: WorkOrderWhereInput | WorkOrderWhereInput[]
    id?: StringFilter<"WorkOrder"> | string
    machineId?: StringFilter<"WorkOrder"> | string
    reportedById?: StringFilter<"WorkOrder"> | string
    assignedToId?: StringNullableFilter<"WorkOrder"> | string | null
    status?: EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus
    priority?: EnumPriorityFilter<"WorkOrder"> | $Enums.Priority
    title?: StringFilter<"WorkOrder"> | string
    description?: StringFilter<"WorkOrder"> | string
    bhpConfirmed?: BoolFilter<"WorkOrder"> | boolean
    laborCost?: DecimalFilter<"WorkOrder"> | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFilter<"WorkOrder"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"WorkOrder"> | Date | string
    startedAt?: DateTimeNullableFilter<"WorkOrder"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"WorkOrder"> | Date | string | null
    updatedAt?: DateTimeFilter<"WorkOrder"> | Date | string
    machine?: XOR<MachineScalarRelationFilter, MachineWhereInput>
    reportedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    messages?: WorkOrderMessageListRelationFilter
    parts?: WorkOrderPartListRelationFilter
    toolLoans?: ToolLoanListRelationFilter
  }

  export type WorkOrderOrderByWithRelationInput = {
    id?: SortOrder
    machineId?: SortOrder
    reportedById?: SortOrder
    assignedToId?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    title?: SortOrder
    description?: SortOrder
    bhpConfirmed?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    closedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    machine?: MachineOrderByWithRelationInput
    reportedBy?: UserOrderByWithRelationInput
    assignedTo?: UserOrderByWithRelationInput
    messages?: WorkOrderMessageOrderByRelationAggregateInput
    parts?: WorkOrderPartOrderByRelationAggregateInput
    toolLoans?: ToolLoanOrderByRelationAggregateInput
    _relevance?: WorkOrderOrderByRelevanceInput
  }

  export type WorkOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkOrderWhereInput | WorkOrderWhereInput[]
    OR?: WorkOrderWhereInput[]
    NOT?: WorkOrderWhereInput | WorkOrderWhereInput[]
    machineId?: StringFilter<"WorkOrder"> | string
    reportedById?: StringFilter<"WorkOrder"> | string
    assignedToId?: StringNullableFilter<"WorkOrder"> | string | null
    status?: EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus
    priority?: EnumPriorityFilter<"WorkOrder"> | $Enums.Priority
    title?: StringFilter<"WorkOrder"> | string
    description?: StringFilter<"WorkOrder"> | string
    bhpConfirmed?: BoolFilter<"WorkOrder"> | boolean
    laborCost?: DecimalFilter<"WorkOrder"> | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFilter<"WorkOrder"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"WorkOrder"> | Date | string
    startedAt?: DateTimeNullableFilter<"WorkOrder"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"WorkOrder"> | Date | string | null
    updatedAt?: DateTimeFilter<"WorkOrder"> | Date | string
    machine?: XOR<MachineScalarRelationFilter, MachineWhereInput>
    reportedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    messages?: WorkOrderMessageListRelationFilter
    parts?: WorkOrderPartListRelationFilter
    toolLoans?: ToolLoanListRelationFilter
  }, "id">

  export type WorkOrderOrderByWithAggregationInput = {
    id?: SortOrder
    machineId?: SortOrder
    reportedById?: SortOrder
    assignedToId?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    title?: SortOrder
    description?: SortOrder
    bhpConfirmed?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    closedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: WorkOrderCountOrderByAggregateInput
    _avg?: WorkOrderAvgOrderByAggregateInput
    _max?: WorkOrderMaxOrderByAggregateInput
    _min?: WorkOrderMinOrderByAggregateInput
    _sum?: WorkOrderSumOrderByAggregateInput
  }

  export type WorkOrderScalarWhereWithAggregatesInput = {
    AND?: WorkOrderScalarWhereWithAggregatesInput | WorkOrderScalarWhereWithAggregatesInput[]
    OR?: WorkOrderScalarWhereWithAggregatesInput[]
    NOT?: WorkOrderScalarWhereWithAggregatesInput | WorkOrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkOrder"> | string
    machineId?: StringWithAggregatesFilter<"WorkOrder"> | string
    reportedById?: StringWithAggregatesFilter<"WorkOrder"> | string
    assignedToId?: StringNullableWithAggregatesFilter<"WorkOrder"> | string | null
    status?: EnumWorkOrderStatusWithAggregatesFilter<"WorkOrder"> | $Enums.WorkOrderStatus
    priority?: EnumPriorityWithAggregatesFilter<"WorkOrder"> | $Enums.Priority
    title?: StringWithAggregatesFilter<"WorkOrder"> | string
    description?: StringWithAggregatesFilter<"WorkOrder"> | string
    bhpConfirmed?: BoolWithAggregatesFilter<"WorkOrder"> | boolean
    laborCost?: DecimalWithAggregatesFilter<"WorkOrder"> | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalWithAggregatesFilter<"WorkOrder"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"WorkOrder"> | Date | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null
    closedAt?: DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"WorkOrder"> | Date | string
  }

  export type WorkOrderMessageWhereInput = {
    AND?: WorkOrderMessageWhereInput | WorkOrderMessageWhereInput[]
    OR?: WorkOrderMessageWhereInput[]
    NOT?: WorkOrderMessageWhereInput | WorkOrderMessageWhereInput[]
    id?: StringFilter<"WorkOrderMessage"> | string
    workOrderId?: StringFilter<"WorkOrderMessage"> | string
    userId?: StringFilter<"WorkOrderMessage"> | string
    content?: StringFilter<"WorkOrderMessage"> | string
    sentAt?: DateTimeFilter<"WorkOrderMessage"> | Date | string
    workOrder?: XOR<WorkOrderScalarRelationFilter, WorkOrderWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WorkOrderMessageOrderByWithRelationInput = {
    id?: SortOrder
    workOrderId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    sentAt?: SortOrder
    workOrder?: WorkOrderOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    _relevance?: WorkOrderMessageOrderByRelevanceInput
  }

  export type WorkOrderMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkOrderMessageWhereInput | WorkOrderMessageWhereInput[]
    OR?: WorkOrderMessageWhereInput[]
    NOT?: WorkOrderMessageWhereInput | WorkOrderMessageWhereInput[]
    workOrderId?: StringFilter<"WorkOrderMessage"> | string
    userId?: StringFilter<"WorkOrderMessage"> | string
    content?: StringFilter<"WorkOrderMessage"> | string
    sentAt?: DateTimeFilter<"WorkOrderMessage"> | Date | string
    workOrder?: XOR<WorkOrderScalarRelationFilter, WorkOrderWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type WorkOrderMessageOrderByWithAggregationInput = {
    id?: SortOrder
    workOrderId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    sentAt?: SortOrder
    _count?: WorkOrderMessageCountOrderByAggregateInput
    _max?: WorkOrderMessageMaxOrderByAggregateInput
    _min?: WorkOrderMessageMinOrderByAggregateInput
  }

  export type WorkOrderMessageScalarWhereWithAggregatesInput = {
    AND?: WorkOrderMessageScalarWhereWithAggregatesInput | WorkOrderMessageScalarWhereWithAggregatesInput[]
    OR?: WorkOrderMessageScalarWhereWithAggregatesInput[]
    NOT?: WorkOrderMessageScalarWhereWithAggregatesInput | WorkOrderMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkOrderMessage"> | string
    workOrderId?: StringWithAggregatesFilter<"WorkOrderMessage"> | string
    userId?: StringWithAggregatesFilter<"WorkOrderMessage"> | string
    content?: StringWithAggregatesFilter<"WorkOrderMessage"> | string
    sentAt?: DateTimeWithAggregatesFilter<"WorkOrderMessage"> | Date | string
  }

  export type PartCategoryWhereInput = {
    AND?: PartCategoryWhereInput | PartCategoryWhereInput[]
    OR?: PartCategoryWhereInput[]
    NOT?: PartCategoryWhereInput | PartCategoryWhereInput[]
    id?: StringFilter<"PartCategory"> | string
    name?: StringFilter<"PartCategory"> | string
    parts?: PartListRelationFilter
  }

  export type PartCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    parts?: PartOrderByRelationAggregateInput
    _relevance?: PartCategoryOrderByRelevanceInput
  }

  export type PartCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PartCategoryWhereInput | PartCategoryWhereInput[]
    OR?: PartCategoryWhereInput[]
    NOT?: PartCategoryWhereInput | PartCategoryWhereInput[]
    parts?: PartListRelationFilter
  }, "id" | "name">

  export type PartCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: PartCategoryCountOrderByAggregateInput
    _max?: PartCategoryMaxOrderByAggregateInput
    _min?: PartCategoryMinOrderByAggregateInput
  }

  export type PartCategoryScalarWhereWithAggregatesInput = {
    AND?: PartCategoryScalarWhereWithAggregatesInput | PartCategoryScalarWhereWithAggregatesInput[]
    OR?: PartCategoryScalarWhereWithAggregatesInput[]
    NOT?: PartCategoryScalarWhereWithAggregatesInput | PartCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PartCategory"> | string
    name?: StringWithAggregatesFilter<"PartCategory"> | string
  }

  export type PartWhereInput = {
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    id?: StringFilter<"Part"> | string
    categoryId?: StringFilter<"Part"> | string
    name?: StringFilter<"Part"> | string
    stockQuantity?: IntFilter<"Part"> | number
    reorderPoint?: IntFilter<"Part"> | number
    unitPrice?: DecimalFilter<"Part"> | Decimal | DecimalJsLike | number | string
    qrCode?: StringNullableFilter<"Part"> | string | null
    isActive?: BoolFilter<"Part"> | boolean
    category?: XOR<PartCategoryScalarRelationFilter, PartCategoryWhereInput>
    workOrderParts?: WorkOrderPartListRelationFilter
    toolLoans?: ToolLoanListRelationFilter
  }

  export type PartOrderByWithRelationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    stockQuantity?: SortOrder
    reorderPoint?: SortOrder
    unitPrice?: SortOrder
    qrCode?: SortOrderInput | SortOrder
    isActive?: SortOrder
    category?: PartCategoryOrderByWithRelationInput
    workOrderParts?: WorkOrderPartOrderByRelationAggregateInput
    toolLoans?: ToolLoanOrderByRelationAggregateInput
    _relevance?: PartOrderByRelevanceInput
  }

  export type PartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    qrCode?: string
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    categoryId?: StringFilter<"Part"> | string
    name?: StringFilter<"Part"> | string
    stockQuantity?: IntFilter<"Part"> | number
    reorderPoint?: IntFilter<"Part"> | number
    unitPrice?: DecimalFilter<"Part"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"Part"> | boolean
    category?: XOR<PartCategoryScalarRelationFilter, PartCategoryWhereInput>
    workOrderParts?: WorkOrderPartListRelationFilter
    toolLoans?: ToolLoanListRelationFilter
  }, "id" | "qrCode">

  export type PartOrderByWithAggregationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    stockQuantity?: SortOrder
    reorderPoint?: SortOrder
    unitPrice?: SortOrder
    qrCode?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: PartCountOrderByAggregateInput
    _avg?: PartAvgOrderByAggregateInput
    _max?: PartMaxOrderByAggregateInput
    _min?: PartMinOrderByAggregateInput
    _sum?: PartSumOrderByAggregateInput
  }

  export type PartScalarWhereWithAggregatesInput = {
    AND?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    OR?: PartScalarWhereWithAggregatesInput[]
    NOT?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Part"> | string
    categoryId?: StringWithAggregatesFilter<"Part"> | string
    name?: StringWithAggregatesFilter<"Part"> | string
    stockQuantity?: IntWithAggregatesFilter<"Part"> | number
    reorderPoint?: IntWithAggregatesFilter<"Part"> | number
    unitPrice?: DecimalWithAggregatesFilter<"Part"> | Decimal | DecimalJsLike | number | string
    qrCode?: StringNullableWithAggregatesFilter<"Part"> | string | null
    isActive?: BoolWithAggregatesFilter<"Part"> | boolean
  }

  export type WorkOrderPartWhereInput = {
    AND?: WorkOrderPartWhereInput | WorkOrderPartWhereInput[]
    OR?: WorkOrderPartWhereInput[]
    NOT?: WorkOrderPartWhereInput | WorkOrderPartWhereInput[]
    id?: StringFilter<"WorkOrderPart"> | string
    workOrderId?: StringFilter<"WorkOrderPart"> | string
    partId?: StringFilter<"WorkOrderPart"> | string
    quantity?: IntFilter<"WorkOrderPart"> | number
    workOrder?: XOR<WorkOrderScalarRelationFilter, WorkOrderWhereInput>
    part?: XOR<PartScalarRelationFilter, PartWhereInput>
  }

  export type WorkOrderPartOrderByWithRelationInput = {
    id?: SortOrder
    workOrderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    workOrder?: WorkOrderOrderByWithRelationInput
    part?: PartOrderByWithRelationInput
    _relevance?: WorkOrderPartOrderByRelevanceInput
  }

  export type WorkOrderPartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    workOrderId_partId?: WorkOrderPartWorkOrderIdPartIdCompoundUniqueInput
    AND?: WorkOrderPartWhereInput | WorkOrderPartWhereInput[]
    OR?: WorkOrderPartWhereInput[]
    NOT?: WorkOrderPartWhereInput | WorkOrderPartWhereInput[]
    workOrderId?: StringFilter<"WorkOrderPart"> | string
    partId?: StringFilter<"WorkOrderPart"> | string
    quantity?: IntFilter<"WorkOrderPart"> | number
    workOrder?: XOR<WorkOrderScalarRelationFilter, WorkOrderWhereInput>
    part?: XOR<PartScalarRelationFilter, PartWhereInput>
  }, "id" | "workOrderId_partId">

  export type WorkOrderPartOrderByWithAggregationInput = {
    id?: SortOrder
    workOrderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    _count?: WorkOrderPartCountOrderByAggregateInput
    _avg?: WorkOrderPartAvgOrderByAggregateInput
    _max?: WorkOrderPartMaxOrderByAggregateInput
    _min?: WorkOrderPartMinOrderByAggregateInput
    _sum?: WorkOrderPartSumOrderByAggregateInput
  }

  export type WorkOrderPartScalarWhereWithAggregatesInput = {
    AND?: WorkOrderPartScalarWhereWithAggregatesInput | WorkOrderPartScalarWhereWithAggregatesInput[]
    OR?: WorkOrderPartScalarWhereWithAggregatesInput[]
    NOT?: WorkOrderPartScalarWhereWithAggregatesInput | WorkOrderPartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkOrderPart"> | string
    workOrderId?: StringWithAggregatesFilter<"WorkOrderPart"> | string
    partId?: StringWithAggregatesFilter<"WorkOrderPart"> | string
    quantity?: IntWithAggregatesFilter<"WorkOrderPart"> | number
  }

  export type ToolLoanWhereInput = {
    AND?: ToolLoanWhereInput | ToolLoanWhereInput[]
    OR?: ToolLoanWhereInput[]
    NOT?: ToolLoanWhereInput | ToolLoanWhereInput[]
    id?: StringFilter<"ToolLoan"> | string
    partId?: StringFilter<"ToolLoan"> | string
    userId?: StringFilter<"ToolLoan"> | string
    workOrderId?: StringNullableFilter<"ToolLoan"> | string | null
    loanedAt?: DateTimeFilter<"ToolLoan"> | Date | string
    returnedAt?: DateTimeNullableFilter<"ToolLoan"> | Date | string | null
    part?: XOR<PartScalarRelationFilter, PartWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workOrder?: XOR<WorkOrderNullableScalarRelationFilter, WorkOrderWhereInput> | null
  }

  export type ToolLoanOrderByWithRelationInput = {
    id?: SortOrder
    partId?: SortOrder
    userId?: SortOrder
    workOrderId?: SortOrderInput | SortOrder
    loanedAt?: SortOrder
    returnedAt?: SortOrderInput | SortOrder
    part?: PartOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    workOrder?: WorkOrderOrderByWithRelationInput
    _relevance?: ToolLoanOrderByRelevanceInput
  }

  export type ToolLoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ToolLoanWhereInput | ToolLoanWhereInput[]
    OR?: ToolLoanWhereInput[]
    NOT?: ToolLoanWhereInput | ToolLoanWhereInput[]
    partId?: StringFilter<"ToolLoan"> | string
    userId?: StringFilter<"ToolLoan"> | string
    workOrderId?: StringNullableFilter<"ToolLoan"> | string | null
    loanedAt?: DateTimeFilter<"ToolLoan"> | Date | string
    returnedAt?: DateTimeNullableFilter<"ToolLoan"> | Date | string | null
    part?: XOR<PartScalarRelationFilter, PartWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workOrder?: XOR<WorkOrderNullableScalarRelationFilter, WorkOrderWhereInput> | null
  }, "id">

  export type ToolLoanOrderByWithAggregationInput = {
    id?: SortOrder
    partId?: SortOrder
    userId?: SortOrder
    workOrderId?: SortOrderInput | SortOrder
    loanedAt?: SortOrder
    returnedAt?: SortOrderInput | SortOrder
    _count?: ToolLoanCountOrderByAggregateInput
    _max?: ToolLoanMaxOrderByAggregateInput
    _min?: ToolLoanMinOrderByAggregateInput
  }

  export type ToolLoanScalarWhereWithAggregatesInput = {
    AND?: ToolLoanScalarWhereWithAggregatesInput | ToolLoanScalarWhereWithAggregatesInput[]
    OR?: ToolLoanScalarWhereWithAggregatesInput[]
    NOT?: ToolLoanScalarWhereWithAggregatesInput | ToolLoanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ToolLoan"> | string
    partId?: StringWithAggregatesFilter<"ToolLoan"> | string
    userId?: StringWithAggregatesFilter<"ToolLoan"> | string
    workOrderId?: StringNullableWithAggregatesFilter<"ToolLoan"> | string | null
    loanedAt?: DateTimeWithAggregatesFilter<"ToolLoan"> | Date | string
    returnedAt?: DateTimeNullableWithAggregatesFilter<"ToolLoan"> | Date | string | null
  }

  export type PreventivePlanWhereInput = {
    AND?: PreventivePlanWhereInput | PreventivePlanWhereInput[]
    OR?: PreventivePlanWhereInput[]
    NOT?: PreventivePlanWhereInput | PreventivePlanWhereInput[]
    id?: StringFilter<"PreventivePlan"> | string
    machineId?: StringFilter<"PreventivePlan"> | string
    name?: StringFilter<"PreventivePlan"> | string
    intervalHours?: IntNullableFilter<"PreventivePlan"> | number | null
    intervalDays?: IntNullableFilter<"PreventivePlan"> | number | null
    advanceDays?: IntFilter<"PreventivePlan"> | number
    checklist?: JsonFilter<"PreventivePlan">
    isActive?: BoolFilter<"PreventivePlan"> | boolean
    lastRunAt?: DateTimeNullableFilter<"PreventivePlan"> | Date | string | null
    nextRunAt?: DateTimeNullableFilter<"PreventivePlan"> | Date | string | null
    createdAt?: DateTimeFilter<"PreventivePlan"> | Date | string
    machine?: XOR<MachineScalarRelationFilter, MachineWhereInput>
  }

  export type PreventivePlanOrderByWithRelationInput = {
    id?: SortOrder
    machineId?: SortOrder
    name?: SortOrder
    intervalHours?: SortOrderInput | SortOrder
    intervalDays?: SortOrderInput | SortOrder
    advanceDays?: SortOrder
    checklist?: SortOrder
    isActive?: SortOrder
    lastRunAt?: SortOrderInput | SortOrder
    nextRunAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    machine?: MachineOrderByWithRelationInput
    _relevance?: PreventivePlanOrderByRelevanceInput
  }

  export type PreventivePlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PreventivePlanWhereInput | PreventivePlanWhereInput[]
    OR?: PreventivePlanWhereInput[]
    NOT?: PreventivePlanWhereInput | PreventivePlanWhereInput[]
    machineId?: StringFilter<"PreventivePlan"> | string
    name?: StringFilter<"PreventivePlan"> | string
    intervalHours?: IntNullableFilter<"PreventivePlan"> | number | null
    intervalDays?: IntNullableFilter<"PreventivePlan"> | number | null
    advanceDays?: IntFilter<"PreventivePlan"> | number
    checklist?: JsonFilter<"PreventivePlan">
    isActive?: BoolFilter<"PreventivePlan"> | boolean
    lastRunAt?: DateTimeNullableFilter<"PreventivePlan"> | Date | string | null
    nextRunAt?: DateTimeNullableFilter<"PreventivePlan"> | Date | string | null
    createdAt?: DateTimeFilter<"PreventivePlan"> | Date | string
    machine?: XOR<MachineScalarRelationFilter, MachineWhereInput>
  }, "id">

  export type PreventivePlanOrderByWithAggregationInput = {
    id?: SortOrder
    machineId?: SortOrder
    name?: SortOrder
    intervalHours?: SortOrderInput | SortOrder
    intervalDays?: SortOrderInput | SortOrder
    advanceDays?: SortOrder
    checklist?: SortOrder
    isActive?: SortOrder
    lastRunAt?: SortOrderInput | SortOrder
    nextRunAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PreventivePlanCountOrderByAggregateInput
    _avg?: PreventivePlanAvgOrderByAggregateInput
    _max?: PreventivePlanMaxOrderByAggregateInput
    _min?: PreventivePlanMinOrderByAggregateInput
    _sum?: PreventivePlanSumOrderByAggregateInput
  }

  export type PreventivePlanScalarWhereWithAggregatesInput = {
    AND?: PreventivePlanScalarWhereWithAggregatesInput | PreventivePlanScalarWhereWithAggregatesInput[]
    OR?: PreventivePlanScalarWhereWithAggregatesInput[]
    NOT?: PreventivePlanScalarWhereWithAggregatesInput | PreventivePlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PreventivePlan"> | string
    machineId?: StringWithAggregatesFilter<"PreventivePlan"> | string
    name?: StringWithAggregatesFilter<"PreventivePlan"> | string
    intervalHours?: IntNullableWithAggregatesFilter<"PreventivePlan"> | number | null
    intervalDays?: IntNullableWithAggregatesFilter<"PreventivePlan"> | number | null
    advanceDays?: IntWithAggregatesFilter<"PreventivePlan"> | number
    checklist?: JsonWithAggregatesFilter<"PreventivePlan">
    isActive?: BoolWithAggregatesFilter<"PreventivePlan"> | boolean
    lastRunAt?: DateTimeNullableWithAggregatesFilter<"PreventivePlan"> | Date | string | null
    nextRunAt?: DateTimeNullableWithAggregatesFilter<"PreventivePlan"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PreventivePlan"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: NotificationOrderByRelevanceInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type EventLogWhereInput = {
    AND?: EventLogWhereInput | EventLogWhereInput[]
    OR?: EventLogWhereInput[]
    NOT?: EventLogWhereInput | EventLogWhereInput[]
    id?: StringFilter<"EventLog"> | string
    userId?: StringNullableFilter<"EventLog"> | string | null
    action?: StringFilter<"EventLog"> | string
    entityType?: StringNullableFilter<"EventLog"> | string | null
    entityId?: StringNullableFilter<"EventLog"> | string | null
    metadata?: JsonNullableFilter<"EventLog">
    occurredAt?: DateTimeFilter<"EventLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type EventLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: EventLogOrderByRelevanceInput
  }

  export type EventLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventLogWhereInput | EventLogWhereInput[]
    OR?: EventLogWhereInput[]
    NOT?: EventLogWhereInput | EventLogWhereInput[]
    userId?: StringNullableFilter<"EventLog"> | string | null
    action?: StringFilter<"EventLog"> | string
    entityType?: StringNullableFilter<"EventLog"> | string | null
    entityId?: StringNullableFilter<"EventLog"> | string | null
    metadata?: JsonNullableFilter<"EventLog">
    occurredAt?: DateTimeFilter<"EventLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type EventLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    _count?: EventLogCountOrderByAggregateInput
    _max?: EventLogMaxOrderByAggregateInput
    _min?: EventLogMinOrderByAggregateInput
  }

  export type EventLogScalarWhereWithAggregatesInput = {
    AND?: EventLogScalarWhereWithAggregatesInput | EventLogScalarWhereWithAggregatesInput[]
    OR?: EventLogScalarWhereWithAggregatesInput[]
    NOT?: EventLogScalarWhereWithAggregatesInput | EventLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EventLog"> | string
    userId?: StringNullableWithAggregatesFilter<"EventLog"> | string | null
    action?: StringWithAggregatesFilter<"EventLog"> | string
    entityType?: StringNullableWithAggregatesFilter<"EventLog"> | string | null
    entityId?: StringNullableWithAggregatesFilter<"EventLog"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"EventLog">
    occurredAt?: DateTimeWithAggregatesFilter<"EventLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationUncheckedCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderUncheckedCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentUncheckedCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUncheckedUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUncheckedUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificationCreateInput = {
    id?: string
    type: $Enums.CertificationType
    issuedAt: Date | string
    expiresAt: Date | string
    isValid?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCertificationsInput
  }

  export type CertificationUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.CertificationType
    issuedAt: Date | string
    expiresAt: Date | string
    isValid?: boolean
    createdAt?: Date | string
  }

  export type CertificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCertificationsNestedInput
  }

  export type CertificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificationCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.CertificationType
    issuedAt: Date | string
    expiresAt: Date | string
    isValid?: boolean
    createdAt?: Date | string
  }

  export type CertificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateInput = {
    id?: string
    name: string
    type: $Enums.LocationType
    parent?: LocationCreateNestedOneWithoutChildrenInput
    children?: LocationCreateNestedManyWithoutParentInput
    machines?: MachineCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.LocationType
    parentId?: string | null
    children?: LocationUncheckedCreateNestedManyWithoutParentInput
    machines?: MachineUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    parent?: LocationUpdateOneWithoutChildrenNestedInput
    children?: LocationUpdateManyWithoutParentNestedInput
    machines?: MachineUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: LocationUncheckedUpdateManyWithoutParentNestedInput
    machines?: MachineUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationCreateManyInput = {
    id?: string
    name: string
    type: $Enums.LocationType
    parentId?: string | null
  }

  export type LocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MachineCreateInput = {
    id?: string
    name: string
    serialNumber: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutMachinesInput
    documents?: MachineDocumentCreateNestedManyWithoutMachineInput
    workOrders?: WorkOrderCreateNestedManyWithoutMachineInput
    preventivePlans?: PreventivePlanCreateNestedManyWithoutMachineInput
  }

  export type MachineUncheckedCreateInput = {
    id?: string
    name: string
    serialNumber: string
    locationId: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: MachineDocumentUncheckedCreateNestedManyWithoutMachineInput
    workOrders?: WorkOrderUncheckedCreateNestedManyWithoutMachineInput
    preventivePlans?: PreventivePlanUncheckedCreateNestedManyWithoutMachineInput
  }

  export type MachineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutMachinesNestedInput
    documents?: MachineDocumentUpdateManyWithoutMachineNestedInput
    workOrders?: WorkOrderUpdateManyWithoutMachineNestedInput
    preventivePlans?: PreventivePlanUpdateManyWithoutMachineNestedInput
  }

  export type MachineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: MachineDocumentUncheckedUpdateManyWithoutMachineNestedInput
    workOrders?: WorkOrderUncheckedUpdateManyWithoutMachineNestedInput
    preventivePlans?: PreventivePlanUncheckedUpdateManyWithoutMachineNestedInput
  }

  export type MachineCreateManyInput = {
    id?: string
    name: string
    serialNumber: string
    locationId: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MachineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MachineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MachineDocumentCreateInput = {
    id?: string
    filename: string
    filePath: string
    version?: number
    isLatest?: boolean
    uploadedAt?: Date | string
    machine: MachineCreateNestedOneWithoutDocumentsInput
    uploadedBy: UserCreateNestedOneWithoutUploadedDocumentsInput
  }

  export type MachineDocumentUncheckedCreateInput = {
    id?: string
    machineId: string
    uploadedById: string
    filename: string
    filePath: string
    version?: number
    isLatest?: boolean
    uploadedAt?: Date | string
  }

  export type MachineDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    machine?: MachineUpdateOneRequiredWithoutDocumentsNestedInput
    uploadedBy?: UserUpdateOneRequiredWithoutUploadedDocumentsNestedInput
  }

  export type MachineDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MachineDocumentCreateManyInput = {
    id?: string
    machineId: string
    uploadedById: string
    filename: string
    filePath: string
    version?: number
    isLatest?: boolean
    uploadedAt?: Date | string
  }

  export type MachineDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MachineDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderCreateInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    machine: MachineCreateNestedOneWithoutWorkOrdersInput
    reportedBy: UserCreateNestedOneWithoutReportedOrdersInput
    assignedTo?: UserCreateNestedOneWithoutAssignedOrdersInput
    messages?: WorkOrderMessageCreateNestedManyWithoutWorkOrderInput
    parts?: WorkOrderPartCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderUncheckedCreateInput = {
    id?: string
    machineId: string
    reportedById: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutWorkOrderInput
    parts?: WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    machine?: MachineUpdateOneRequiredWithoutWorkOrdersNestedInput
    reportedBy?: UserUpdateOneRequiredWithoutReportedOrdersNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedOrdersNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutWorkOrderNestedInput
    parts?: WorkOrderPartUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutWorkOrderNestedInput
    parts?: WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderCreateManyInput = {
    id?: string
    machineId: string
    reportedById: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type WorkOrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderMessageCreateInput = {
    id?: string
    content: string
    sentAt?: Date | string
    workOrder: WorkOrderCreateNestedOneWithoutMessagesInput
    user: UserCreateNestedOneWithoutMessagesInput
  }

  export type WorkOrderMessageUncheckedCreateInput = {
    id?: string
    workOrderId: string
    userId: string
    content: string
    sentAt?: Date | string
  }

  export type WorkOrderMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workOrder?: WorkOrderUpdateOneRequiredWithoutMessagesNestedInput
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type WorkOrderMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workOrderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderMessageCreateManyInput = {
    id?: string
    workOrderId: string
    userId: string
    content: string
    sentAt?: Date | string
  }

  export type WorkOrderMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workOrderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartCategoryCreateInput = {
    id?: string
    name: string
    parts?: PartCreateNestedManyWithoutCategoryInput
  }

  export type PartCategoryUncheckedCreateInput = {
    id?: string
    name: string
    parts?: PartUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type PartCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parts?: PartUpdateManyWithoutCategoryNestedInput
  }

  export type PartCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parts?: PartUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type PartCategoryCreateManyInput = {
    id?: string
    name: string
  }

  export type PartCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PartCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PartCreateInput = {
    id?: string
    name: string
    stockQuantity?: number
    reorderPoint?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    qrCode?: string | null
    isActive?: boolean
    category: PartCategoryCreateNestedOneWithoutPartsInput
    workOrderParts?: WorkOrderPartCreateNestedManyWithoutPartInput
    toolLoans?: ToolLoanCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateInput = {
    id?: string
    categoryId: string
    name: string
    stockQuantity?: number
    reorderPoint?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    qrCode?: string | null
    isActive?: boolean
    workOrderParts?: WorkOrderPartUncheckedCreateNestedManyWithoutPartInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    category?: PartCategoryUpdateOneRequiredWithoutPartsNestedInput
    workOrderParts?: WorkOrderPartUpdateManyWithoutPartNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    workOrderParts?: WorkOrderPartUncheckedUpdateManyWithoutPartNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutPartNestedInput
  }

  export type PartCreateManyInput = {
    id?: string
    categoryId: string
    name: string
    stockQuantity?: number
    reorderPoint?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    qrCode?: string | null
    isActive?: boolean
  }

  export type PartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WorkOrderPartCreateInput = {
    id?: string
    quantity: number
    workOrder: WorkOrderCreateNestedOneWithoutPartsInput
    part: PartCreateNestedOneWithoutWorkOrderPartsInput
  }

  export type WorkOrderPartUncheckedCreateInput = {
    id?: string
    workOrderId: string
    partId: string
    quantity: number
  }

  export type WorkOrderPartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    workOrder?: WorkOrderUpdateOneRequiredWithoutPartsNestedInput
    part?: PartUpdateOneRequiredWithoutWorkOrderPartsNestedInput
  }

  export type WorkOrderPartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workOrderId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type WorkOrderPartCreateManyInput = {
    id?: string
    workOrderId: string
    partId: string
    quantity: number
  }

  export type WorkOrderPartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type WorkOrderPartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workOrderId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type ToolLoanCreateInput = {
    id?: string
    loanedAt?: Date | string
    returnedAt?: Date | string | null
    part: PartCreateNestedOneWithoutToolLoansInput
    user: UserCreateNestedOneWithoutToolLoansInput
    workOrder?: WorkOrderCreateNestedOneWithoutToolLoansInput
  }

  export type ToolLoanUncheckedCreateInput = {
    id?: string
    partId: string
    userId: string
    workOrderId?: string | null
    loanedAt?: Date | string
    returnedAt?: Date | string | null
  }

  export type ToolLoanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    part?: PartUpdateOneRequiredWithoutToolLoansNestedInput
    user?: UserUpdateOneRequiredWithoutToolLoansNestedInput
    workOrder?: WorkOrderUpdateOneWithoutToolLoansNestedInput
  }

  export type ToolLoanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ToolLoanCreateManyInput = {
    id?: string
    partId: string
    userId: string
    workOrderId?: string | null
    loanedAt?: Date | string
    returnedAt?: Date | string | null
  }

  export type ToolLoanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ToolLoanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PreventivePlanCreateInput = {
    id?: string
    name: string
    intervalHours?: number | null
    intervalDays?: number | null
    advanceDays?: number
    checklist: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    createdAt?: Date | string
    machine: MachineCreateNestedOneWithoutPreventivePlansInput
  }

  export type PreventivePlanUncheckedCreateInput = {
    id?: string
    machineId: string
    name: string
    intervalHours?: number | null
    intervalDays?: number | null
    advanceDays?: number
    checklist: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PreventivePlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    intervalHours?: NullableIntFieldUpdateOperationsInput | number | null
    intervalDays?: NullableIntFieldUpdateOperationsInput | number | null
    advanceDays?: IntFieldUpdateOperationsInput | number
    checklist?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    machine?: MachineUpdateOneRequiredWithoutPreventivePlansNestedInput
  }

  export type PreventivePlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    intervalHours?: NullableIntFieldUpdateOperationsInput | number | null
    intervalDays?: NullableIntFieldUpdateOperationsInput | number | null
    advanceDays?: IntFieldUpdateOperationsInput | number
    checklist?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreventivePlanCreateManyInput = {
    id?: string
    machineId: string
    name: string
    intervalHours?: number | null
    intervalDays?: number | null
    advanceDays?: number
    checklist: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PreventivePlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    intervalHours?: NullableIntFieldUpdateOperationsInput | number | null
    intervalDays?: NullableIntFieldUpdateOperationsInput | number | null
    advanceDays?: IntFieldUpdateOperationsInput | number
    checklist?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreventivePlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    intervalHours?: NullableIntFieldUpdateOperationsInput | number | null
    intervalDays?: NullableIntFieldUpdateOperationsInput | number | null
    advanceDays?: IntFieldUpdateOperationsInput | number
    checklist?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    type: $Enums.NotificationType
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.NotificationType
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.NotificationType
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventLogCreateInput = {
    id?: string
    action: string
    entityType?: string | null
    entityId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    user?: UserCreateNestedOneWithoutEventLogsInput
  }

  export type EventLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    action: string
    entityType?: string | null
    entityId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type EventLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutEventLogsNestedInput
  }

  export type EventLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventLogCreateManyInput = {
    id?: string
    userId?: string | null
    action: string
    entityType?: string | null
    entityId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type EventLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CertificationListRelationFilter = {
    every?: CertificationWhereInput
    some?: CertificationWhereInput
    none?: CertificationWhereInput
  }

  export type WorkOrderListRelationFilter = {
    every?: WorkOrderWhereInput
    some?: WorkOrderWhereInput
    none?: WorkOrderWhereInput
  }

  export type WorkOrderMessageListRelationFilter = {
    every?: WorkOrderMessageWhereInput
    some?: WorkOrderMessageWhereInput
    none?: WorkOrderMessageWhereInput
  }

  export type ToolLoanListRelationFilter = {
    every?: ToolLoanWhereInput
    some?: ToolLoanWhereInput
    none?: ToolLoanWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type MachineDocumentListRelationFilter = {
    every?: MachineDocumentWhereInput
    some?: MachineDocumentWhereInput
    none?: MachineDocumentWhereInput
  }

  export type EventLogListRelationFilter = {
    every?: EventLogWhereInput
    some?: EventLogWhereInput
    none?: EventLogWhereInput
  }

  export type CertificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkOrderMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ToolLoanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MachineDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumCertificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationType | EnumCertificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CertificationType[]
    notIn?: $Enums.CertificationType[]
    not?: NestedEnumCertificationTypeFilter<$PrismaModel> | $Enums.CertificationType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CertificationOrderByRelevanceInput = {
    fields: CertificationOrderByRelevanceFieldEnum | CertificationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CertificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    isValid?: SortOrder
    createdAt?: SortOrder
  }

  export type CertificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    isValid?: SortOrder
    createdAt?: SortOrder
  }

  export type CertificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    isValid?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumCertificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationType | EnumCertificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CertificationType[]
    notIn?: $Enums.CertificationType[]
    not?: NestedEnumCertificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.CertificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCertificationTypeFilter<$PrismaModel>
    _max?: NestedEnumCertificationTypeFilter<$PrismaModel>
  }

  export type EnumLocationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationType | EnumLocationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocationType[]
    notIn?: $Enums.LocationType[]
    not?: NestedEnumLocationTypeFilter<$PrismaModel> | $Enums.LocationType
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type LocationNullableScalarRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type LocationListRelationFilter = {
    every?: LocationWhereInput
    some?: LocationWhereInput
    none?: LocationWhereInput
  }

  export type MachineListRelationFilter = {
    every?: MachineWhereInput
    some?: MachineWhereInput
    none?: MachineWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MachineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LocationOrderByRelevanceInput = {
    fields: LocationOrderByRelevanceFieldEnum | LocationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parentId?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parentId?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parentId?: SortOrder
  }

  export type EnumLocationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationType | EnumLocationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocationType[]
    notIn?: $Enums.LocationType[]
    not?: NestedEnumLocationTypeWithAggregatesFilter<$PrismaModel> | $Enums.LocationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocationTypeFilter<$PrismaModel>
    _max?: NestedEnumLocationTypeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type LocationScalarRelationFilter = {
    is?: LocationWhereInput
    isNot?: LocationWhereInput
  }

  export type PreventivePlanListRelationFilter = {
    every?: PreventivePlanWhereInput
    some?: PreventivePlanWhereInput
    none?: PreventivePlanWhereInput
  }

  export type PreventivePlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MachineOrderByRelevanceInput = {
    fields: MachineOrderByRelevanceFieldEnum | MachineOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MachineCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serialNumber?: SortOrder
    locationId?: SortOrder
    operatingHours?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MachineAvgOrderByAggregateInput = {
    operatingHours?: SortOrder
    purchasePrice?: SortOrder
  }

  export type MachineMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serialNumber?: SortOrder
    locationId?: SortOrder
    operatingHours?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MachineMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    serialNumber?: SortOrder
    locationId?: SortOrder
    operatingHours?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MachineSumOrderByAggregateInput = {
    operatingHours?: SortOrder
    purchasePrice?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MachineScalarRelationFilter = {
    is?: MachineWhereInput
    isNot?: MachineWhereInput
  }

  export type MachineDocumentOrderByRelevanceInput = {
    fields: MachineDocumentOrderByRelevanceFieldEnum | MachineDocumentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MachineDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    uploadedById?: SortOrder
    filename?: SortOrder
    filePath?: SortOrder
    version?: SortOrder
    isLatest?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MachineDocumentAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type MachineDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    uploadedById?: SortOrder
    filename?: SortOrder
    filePath?: SortOrder
    version?: SortOrder
    isLatest?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MachineDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    uploadedById?: SortOrder
    filename?: SortOrder
    filePath?: SortOrder
    version?: SortOrder
    isLatest?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MachineDocumentSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumWorkOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | EnumWorkOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkOrderStatus[]
    notIn?: $Enums.WorkOrderStatus[]
    not?: NestedEnumWorkOrderStatusFilter<$PrismaModel> | $Enums.WorkOrderStatus
  }

  export type EnumPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[]
    notIn?: $Enums.Priority[]
    not?: NestedEnumPriorityFilter<$PrismaModel> | $Enums.Priority
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type WorkOrderPartListRelationFilter = {
    every?: WorkOrderPartWhereInput
    some?: WorkOrderPartWhereInput
    none?: WorkOrderPartWhereInput
  }

  export type WorkOrderPartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkOrderOrderByRelevanceInput = {
    fields: WorkOrderOrderByRelevanceFieldEnum | WorkOrderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type WorkOrderCountOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    reportedById?: SortOrder
    assignedToId?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    title?: SortOrder
    description?: SortOrder
    bhpConfirmed?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    closedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkOrderAvgOrderByAggregateInput = {
    laborCost?: SortOrder
    partsCost?: SortOrder
  }

  export type WorkOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    reportedById?: SortOrder
    assignedToId?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    title?: SortOrder
    description?: SortOrder
    bhpConfirmed?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    closedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkOrderMinOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    reportedById?: SortOrder
    assignedToId?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    title?: SortOrder
    description?: SortOrder
    bhpConfirmed?: SortOrder
    laborCost?: SortOrder
    partsCost?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    closedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkOrderSumOrderByAggregateInput = {
    laborCost?: SortOrder
    partsCost?: SortOrder
  }

  export type EnumWorkOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | EnumWorkOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkOrderStatus[]
    notIn?: $Enums.WorkOrderStatus[]
    not?: NestedEnumWorkOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkOrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumWorkOrderStatusFilter<$PrismaModel>
  }

  export type EnumPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[]
    notIn?: $Enums.Priority[]
    not?: NestedEnumPriorityWithAggregatesFilter<$PrismaModel> | $Enums.Priority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityFilter<$PrismaModel>
    _max?: NestedEnumPriorityFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type WorkOrderScalarRelationFilter = {
    is?: WorkOrderWhereInput
    isNot?: WorkOrderWhereInput
  }

  export type WorkOrderMessageOrderByRelevanceInput = {
    fields: WorkOrderMessageOrderByRelevanceFieldEnum | WorkOrderMessageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type WorkOrderMessageCountOrderByAggregateInput = {
    id?: SortOrder
    workOrderId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    sentAt?: SortOrder
  }

  export type WorkOrderMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    workOrderId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    sentAt?: SortOrder
  }

  export type WorkOrderMessageMinOrderByAggregateInput = {
    id?: SortOrder
    workOrderId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    sentAt?: SortOrder
  }

  export type PartListRelationFilter = {
    every?: PartWhereInput
    some?: PartWhereInput
    none?: PartWhereInput
  }

  export type PartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PartCategoryOrderByRelevanceInput = {
    fields: PartCategoryOrderByRelevanceFieldEnum | PartCategoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PartCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type PartCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type PartCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type PartCategoryScalarRelationFilter = {
    is?: PartCategoryWhereInput
    isNot?: PartCategoryWhereInput
  }

  export type PartOrderByRelevanceInput = {
    fields: PartOrderByRelevanceFieldEnum | PartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PartCountOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    stockQuantity?: SortOrder
    reorderPoint?: SortOrder
    unitPrice?: SortOrder
    qrCode?: SortOrder
    isActive?: SortOrder
  }

  export type PartAvgOrderByAggregateInput = {
    stockQuantity?: SortOrder
    reorderPoint?: SortOrder
    unitPrice?: SortOrder
  }

  export type PartMaxOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    stockQuantity?: SortOrder
    reorderPoint?: SortOrder
    unitPrice?: SortOrder
    qrCode?: SortOrder
    isActive?: SortOrder
  }

  export type PartMinOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    stockQuantity?: SortOrder
    reorderPoint?: SortOrder
    unitPrice?: SortOrder
    qrCode?: SortOrder
    isActive?: SortOrder
  }

  export type PartSumOrderByAggregateInput = {
    stockQuantity?: SortOrder
    reorderPoint?: SortOrder
    unitPrice?: SortOrder
  }

  export type PartScalarRelationFilter = {
    is?: PartWhereInput
    isNot?: PartWhereInput
  }

  export type WorkOrderPartOrderByRelevanceInput = {
    fields: WorkOrderPartOrderByRelevanceFieldEnum | WorkOrderPartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type WorkOrderPartWorkOrderIdPartIdCompoundUniqueInput = {
    workOrderId: string
    partId: string
  }

  export type WorkOrderPartCountOrderByAggregateInput = {
    id?: SortOrder
    workOrderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
  }

  export type WorkOrderPartAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type WorkOrderPartMaxOrderByAggregateInput = {
    id?: SortOrder
    workOrderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
  }

  export type WorkOrderPartMinOrderByAggregateInput = {
    id?: SortOrder
    workOrderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
  }

  export type WorkOrderPartSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type WorkOrderNullableScalarRelationFilter = {
    is?: WorkOrderWhereInput | null
    isNot?: WorkOrderWhereInput | null
  }

  export type ToolLoanOrderByRelevanceInput = {
    fields: ToolLoanOrderByRelevanceFieldEnum | ToolLoanOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ToolLoanCountOrderByAggregateInput = {
    id?: SortOrder
    partId?: SortOrder
    userId?: SortOrder
    workOrderId?: SortOrder
    loanedAt?: SortOrder
    returnedAt?: SortOrder
  }

  export type ToolLoanMaxOrderByAggregateInput = {
    id?: SortOrder
    partId?: SortOrder
    userId?: SortOrder
    workOrderId?: SortOrder
    loanedAt?: SortOrder
    returnedAt?: SortOrder
  }

  export type ToolLoanMinOrderByAggregateInput = {
    id?: SortOrder
    partId?: SortOrder
    userId?: SortOrder
    workOrderId?: SortOrder
    loanedAt?: SortOrder
    returnedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PreventivePlanOrderByRelevanceInput = {
    fields: PreventivePlanOrderByRelevanceFieldEnum | PreventivePlanOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PreventivePlanCountOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    name?: SortOrder
    intervalHours?: SortOrder
    intervalDays?: SortOrder
    advanceDays?: SortOrder
    checklist?: SortOrder
    isActive?: SortOrder
    lastRunAt?: SortOrder
    nextRunAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PreventivePlanAvgOrderByAggregateInput = {
    intervalHours?: SortOrder
    intervalDays?: SortOrder
    advanceDays?: SortOrder
  }

  export type PreventivePlanMaxOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    name?: SortOrder
    intervalHours?: SortOrder
    intervalDays?: SortOrder
    advanceDays?: SortOrder
    isActive?: SortOrder
    lastRunAt?: SortOrder
    nextRunAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PreventivePlanMinOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    name?: SortOrder
    intervalHours?: SortOrder
    intervalDays?: SortOrder
    advanceDays?: SortOrder
    isActive?: SortOrder
    lastRunAt?: SortOrder
    nextRunAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PreventivePlanSumOrderByAggregateInput = {
    intervalHours?: SortOrder
    intervalDays?: SortOrder
    advanceDays?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[]
    notIn?: $Enums.NotificationType[]
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NotificationOrderByRelevanceInput = {
    fields: NotificationOrderByRelevanceFieldEnum | NotificationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[]
    notIn?: $Enums.NotificationType[]
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EventLogOrderByRelevanceInput = {
    fields: EventLogOrderByRelevanceFieldEnum | EventLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EventLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrder
    occurredAt?: SortOrder
  }

  export type EventLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    occurredAt?: SortOrder
  }

  export type EventLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    occurredAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type CertificationCreateNestedManyWithoutUserInput = {
    create?: XOR<CertificationCreateWithoutUserInput, CertificationUncheckedCreateWithoutUserInput> | CertificationCreateWithoutUserInput[] | CertificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CertificationCreateOrConnectWithoutUserInput | CertificationCreateOrConnectWithoutUserInput[]
    createMany?: CertificationCreateManyUserInputEnvelope
    connect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
  }

  export type WorkOrderCreateNestedManyWithoutReportedByInput = {
    create?: XOR<WorkOrderCreateWithoutReportedByInput, WorkOrderUncheckedCreateWithoutReportedByInput> | WorkOrderCreateWithoutReportedByInput[] | WorkOrderUncheckedCreateWithoutReportedByInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutReportedByInput | WorkOrderCreateOrConnectWithoutReportedByInput[]
    createMany?: WorkOrderCreateManyReportedByInputEnvelope
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
  }

  export type WorkOrderCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput> | WorkOrderCreateWithoutAssignedToInput[] | WorkOrderUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedToInput | WorkOrderCreateOrConnectWithoutAssignedToInput[]
    createMany?: WorkOrderCreateManyAssignedToInputEnvelope
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
  }

  export type WorkOrderMessageCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkOrderMessageCreateWithoutUserInput, WorkOrderMessageUncheckedCreateWithoutUserInput> | WorkOrderMessageCreateWithoutUserInput[] | WorkOrderMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkOrderMessageCreateOrConnectWithoutUserInput | WorkOrderMessageCreateOrConnectWithoutUserInput[]
    createMany?: WorkOrderMessageCreateManyUserInputEnvelope
    connect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
  }

  export type ToolLoanCreateNestedManyWithoutUserInput = {
    create?: XOR<ToolLoanCreateWithoutUserInput, ToolLoanUncheckedCreateWithoutUserInput> | ToolLoanCreateWithoutUserInput[] | ToolLoanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutUserInput | ToolLoanCreateOrConnectWithoutUserInput[]
    createMany?: ToolLoanCreateManyUserInputEnvelope
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type MachineDocumentCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<MachineDocumentCreateWithoutUploadedByInput, MachineDocumentUncheckedCreateWithoutUploadedByInput> | MachineDocumentCreateWithoutUploadedByInput[] | MachineDocumentUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: MachineDocumentCreateOrConnectWithoutUploadedByInput | MachineDocumentCreateOrConnectWithoutUploadedByInput[]
    createMany?: MachineDocumentCreateManyUploadedByInputEnvelope
    connect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
  }

  export type EventLogCreateNestedManyWithoutUserInput = {
    create?: XOR<EventLogCreateWithoutUserInput, EventLogUncheckedCreateWithoutUserInput> | EventLogCreateWithoutUserInput[] | EventLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventLogCreateOrConnectWithoutUserInput | EventLogCreateOrConnectWithoutUserInput[]
    createMany?: EventLogCreateManyUserInputEnvelope
    connect?: EventLogWhereUniqueInput | EventLogWhereUniqueInput[]
  }

  export type CertificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CertificationCreateWithoutUserInput, CertificationUncheckedCreateWithoutUserInput> | CertificationCreateWithoutUserInput[] | CertificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CertificationCreateOrConnectWithoutUserInput | CertificationCreateOrConnectWithoutUserInput[]
    createMany?: CertificationCreateManyUserInputEnvelope
    connect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
  }

  export type WorkOrderUncheckedCreateNestedManyWithoutReportedByInput = {
    create?: XOR<WorkOrderCreateWithoutReportedByInput, WorkOrderUncheckedCreateWithoutReportedByInput> | WorkOrderCreateWithoutReportedByInput[] | WorkOrderUncheckedCreateWithoutReportedByInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutReportedByInput | WorkOrderCreateOrConnectWithoutReportedByInput[]
    createMany?: WorkOrderCreateManyReportedByInputEnvelope
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
  }

  export type WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput> | WorkOrderCreateWithoutAssignedToInput[] | WorkOrderUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedToInput | WorkOrderCreateOrConnectWithoutAssignedToInput[]
    createMany?: WorkOrderCreateManyAssignedToInputEnvelope
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
  }

  export type WorkOrderMessageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkOrderMessageCreateWithoutUserInput, WorkOrderMessageUncheckedCreateWithoutUserInput> | WorkOrderMessageCreateWithoutUserInput[] | WorkOrderMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkOrderMessageCreateOrConnectWithoutUserInput | WorkOrderMessageCreateOrConnectWithoutUserInput[]
    createMany?: WorkOrderMessageCreateManyUserInputEnvelope
    connect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
  }

  export type ToolLoanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ToolLoanCreateWithoutUserInput, ToolLoanUncheckedCreateWithoutUserInput> | ToolLoanCreateWithoutUserInput[] | ToolLoanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutUserInput | ToolLoanCreateOrConnectWithoutUserInput[]
    createMany?: ToolLoanCreateManyUserInputEnvelope
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type MachineDocumentUncheckedCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<MachineDocumentCreateWithoutUploadedByInput, MachineDocumentUncheckedCreateWithoutUploadedByInput> | MachineDocumentCreateWithoutUploadedByInput[] | MachineDocumentUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: MachineDocumentCreateOrConnectWithoutUploadedByInput | MachineDocumentCreateOrConnectWithoutUploadedByInput[]
    createMany?: MachineDocumentCreateManyUploadedByInputEnvelope
    connect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
  }

  export type EventLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EventLogCreateWithoutUserInput, EventLogUncheckedCreateWithoutUserInput> | EventLogCreateWithoutUserInput[] | EventLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventLogCreateOrConnectWithoutUserInput | EventLogCreateOrConnectWithoutUserInput[]
    createMany?: EventLogCreateManyUserInputEnvelope
    connect?: EventLogWhereUniqueInput | EventLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CertificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<CertificationCreateWithoutUserInput, CertificationUncheckedCreateWithoutUserInput> | CertificationCreateWithoutUserInput[] | CertificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CertificationCreateOrConnectWithoutUserInput | CertificationCreateOrConnectWithoutUserInput[]
    upsert?: CertificationUpsertWithWhereUniqueWithoutUserInput | CertificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CertificationCreateManyUserInputEnvelope
    set?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    disconnect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    delete?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    connect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    update?: CertificationUpdateWithWhereUniqueWithoutUserInput | CertificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CertificationUpdateManyWithWhereWithoutUserInput | CertificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CertificationScalarWhereInput | CertificationScalarWhereInput[]
  }

  export type WorkOrderUpdateManyWithoutReportedByNestedInput = {
    create?: XOR<WorkOrderCreateWithoutReportedByInput, WorkOrderUncheckedCreateWithoutReportedByInput> | WorkOrderCreateWithoutReportedByInput[] | WorkOrderUncheckedCreateWithoutReportedByInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutReportedByInput | WorkOrderCreateOrConnectWithoutReportedByInput[]
    upsert?: WorkOrderUpsertWithWhereUniqueWithoutReportedByInput | WorkOrderUpsertWithWhereUniqueWithoutReportedByInput[]
    createMany?: WorkOrderCreateManyReportedByInputEnvelope
    set?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    disconnect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    delete?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    update?: WorkOrderUpdateWithWhereUniqueWithoutReportedByInput | WorkOrderUpdateWithWhereUniqueWithoutReportedByInput[]
    updateMany?: WorkOrderUpdateManyWithWhereWithoutReportedByInput | WorkOrderUpdateManyWithWhereWithoutReportedByInput[]
    deleteMany?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
  }

  export type WorkOrderUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput> | WorkOrderCreateWithoutAssignedToInput[] | WorkOrderUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedToInput | WorkOrderCreateOrConnectWithoutAssignedToInput[]
    upsert?: WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput | WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: WorkOrderCreateManyAssignedToInputEnvelope
    set?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    disconnect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    delete?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    update?: WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput | WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: WorkOrderUpdateManyWithWhereWithoutAssignedToInput | WorkOrderUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
  }

  export type WorkOrderMessageUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkOrderMessageCreateWithoutUserInput, WorkOrderMessageUncheckedCreateWithoutUserInput> | WorkOrderMessageCreateWithoutUserInput[] | WorkOrderMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkOrderMessageCreateOrConnectWithoutUserInput | WorkOrderMessageCreateOrConnectWithoutUserInput[]
    upsert?: WorkOrderMessageUpsertWithWhereUniqueWithoutUserInput | WorkOrderMessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkOrderMessageCreateManyUserInputEnvelope
    set?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    disconnect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    delete?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    connect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    update?: WorkOrderMessageUpdateWithWhereUniqueWithoutUserInput | WorkOrderMessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkOrderMessageUpdateManyWithWhereWithoutUserInput | WorkOrderMessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkOrderMessageScalarWhereInput | WorkOrderMessageScalarWhereInput[]
  }

  export type ToolLoanUpdateManyWithoutUserNestedInput = {
    create?: XOR<ToolLoanCreateWithoutUserInput, ToolLoanUncheckedCreateWithoutUserInput> | ToolLoanCreateWithoutUserInput[] | ToolLoanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutUserInput | ToolLoanCreateOrConnectWithoutUserInput[]
    upsert?: ToolLoanUpsertWithWhereUniqueWithoutUserInput | ToolLoanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ToolLoanCreateManyUserInputEnvelope
    set?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    disconnect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    delete?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    update?: ToolLoanUpdateWithWhereUniqueWithoutUserInput | ToolLoanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ToolLoanUpdateManyWithWhereWithoutUserInput | ToolLoanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ToolLoanScalarWhereInput | ToolLoanScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type MachineDocumentUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<MachineDocumentCreateWithoutUploadedByInput, MachineDocumentUncheckedCreateWithoutUploadedByInput> | MachineDocumentCreateWithoutUploadedByInput[] | MachineDocumentUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: MachineDocumentCreateOrConnectWithoutUploadedByInput | MachineDocumentCreateOrConnectWithoutUploadedByInput[]
    upsert?: MachineDocumentUpsertWithWhereUniqueWithoutUploadedByInput | MachineDocumentUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: MachineDocumentCreateManyUploadedByInputEnvelope
    set?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    disconnect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    delete?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    connect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    update?: MachineDocumentUpdateWithWhereUniqueWithoutUploadedByInput | MachineDocumentUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: MachineDocumentUpdateManyWithWhereWithoutUploadedByInput | MachineDocumentUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: MachineDocumentScalarWhereInput | MachineDocumentScalarWhereInput[]
  }

  export type EventLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventLogCreateWithoutUserInput, EventLogUncheckedCreateWithoutUserInput> | EventLogCreateWithoutUserInput[] | EventLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventLogCreateOrConnectWithoutUserInput | EventLogCreateOrConnectWithoutUserInput[]
    upsert?: EventLogUpsertWithWhereUniqueWithoutUserInput | EventLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventLogCreateManyUserInputEnvelope
    set?: EventLogWhereUniqueInput | EventLogWhereUniqueInput[]
    disconnect?: EventLogWhereUniqueInput | EventLogWhereUniqueInput[]
    delete?: EventLogWhereUniqueInput | EventLogWhereUniqueInput[]
    connect?: EventLogWhereUniqueInput | EventLogWhereUniqueInput[]
    update?: EventLogUpdateWithWhereUniqueWithoutUserInput | EventLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventLogUpdateManyWithWhereWithoutUserInput | EventLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventLogScalarWhereInput | EventLogScalarWhereInput[]
  }

  export type CertificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CertificationCreateWithoutUserInput, CertificationUncheckedCreateWithoutUserInput> | CertificationCreateWithoutUserInput[] | CertificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CertificationCreateOrConnectWithoutUserInput | CertificationCreateOrConnectWithoutUserInput[]
    upsert?: CertificationUpsertWithWhereUniqueWithoutUserInput | CertificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CertificationCreateManyUserInputEnvelope
    set?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    disconnect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    delete?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    connect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    update?: CertificationUpdateWithWhereUniqueWithoutUserInput | CertificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CertificationUpdateManyWithWhereWithoutUserInput | CertificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CertificationScalarWhereInput | CertificationScalarWhereInput[]
  }

  export type WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput = {
    create?: XOR<WorkOrderCreateWithoutReportedByInput, WorkOrderUncheckedCreateWithoutReportedByInput> | WorkOrderCreateWithoutReportedByInput[] | WorkOrderUncheckedCreateWithoutReportedByInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutReportedByInput | WorkOrderCreateOrConnectWithoutReportedByInput[]
    upsert?: WorkOrderUpsertWithWhereUniqueWithoutReportedByInput | WorkOrderUpsertWithWhereUniqueWithoutReportedByInput[]
    createMany?: WorkOrderCreateManyReportedByInputEnvelope
    set?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    disconnect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    delete?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    update?: WorkOrderUpdateWithWhereUniqueWithoutReportedByInput | WorkOrderUpdateWithWhereUniqueWithoutReportedByInput[]
    updateMany?: WorkOrderUpdateManyWithWhereWithoutReportedByInput | WorkOrderUpdateManyWithWhereWithoutReportedByInput[]
    deleteMany?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
  }

  export type WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput> | WorkOrderCreateWithoutAssignedToInput[] | WorkOrderUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutAssignedToInput | WorkOrderCreateOrConnectWithoutAssignedToInput[]
    upsert?: WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput | WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: WorkOrderCreateManyAssignedToInputEnvelope
    set?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    disconnect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    delete?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    update?: WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput | WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: WorkOrderUpdateManyWithWhereWithoutAssignedToInput | WorkOrderUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
  }

  export type WorkOrderMessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkOrderMessageCreateWithoutUserInput, WorkOrderMessageUncheckedCreateWithoutUserInput> | WorkOrderMessageCreateWithoutUserInput[] | WorkOrderMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkOrderMessageCreateOrConnectWithoutUserInput | WorkOrderMessageCreateOrConnectWithoutUserInput[]
    upsert?: WorkOrderMessageUpsertWithWhereUniqueWithoutUserInput | WorkOrderMessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkOrderMessageCreateManyUserInputEnvelope
    set?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    disconnect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    delete?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    connect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    update?: WorkOrderMessageUpdateWithWhereUniqueWithoutUserInput | WorkOrderMessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkOrderMessageUpdateManyWithWhereWithoutUserInput | WorkOrderMessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkOrderMessageScalarWhereInput | WorkOrderMessageScalarWhereInput[]
  }

  export type ToolLoanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ToolLoanCreateWithoutUserInput, ToolLoanUncheckedCreateWithoutUserInput> | ToolLoanCreateWithoutUserInput[] | ToolLoanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutUserInput | ToolLoanCreateOrConnectWithoutUserInput[]
    upsert?: ToolLoanUpsertWithWhereUniqueWithoutUserInput | ToolLoanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ToolLoanCreateManyUserInputEnvelope
    set?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    disconnect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    delete?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    update?: ToolLoanUpdateWithWhereUniqueWithoutUserInput | ToolLoanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ToolLoanUpdateManyWithWhereWithoutUserInput | ToolLoanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ToolLoanScalarWhereInput | ToolLoanScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type MachineDocumentUncheckedUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<MachineDocumentCreateWithoutUploadedByInput, MachineDocumentUncheckedCreateWithoutUploadedByInput> | MachineDocumentCreateWithoutUploadedByInput[] | MachineDocumentUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: MachineDocumentCreateOrConnectWithoutUploadedByInput | MachineDocumentCreateOrConnectWithoutUploadedByInput[]
    upsert?: MachineDocumentUpsertWithWhereUniqueWithoutUploadedByInput | MachineDocumentUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: MachineDocumentCreateManyUploadedByInputEnvelope
    set?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    disconnect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    delete?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    connect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    update?: MachineDocumentUpdateWithWhereUniqueWithoutUploadedByInput | MachineDocumentUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: MachineDocumentUpdateManyWithWhereWithoutUploadedByInput | MachineDocumentUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: MachineDocumentScalarWhereInput | MachineDocumentScalarWhereInput[]
  }

  export type EventLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventLogCreateWithoutUserInput, EventLogUncheckedCreateWithoutUserInput> | EventLogCreateWithoutUserInput[] | EventLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventLogCreateOrConnectWithoutUserInput | EventLogCreateOrConnectWithoutUserInput[]
    upsert?: EventLogUpsertWithWhereUniqueWithoutUserInput | EventLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventLogCreateManyUserInputEnvelope
    set?: EventLogWhereUniqueInput | EventLogWhereUniqueInput[]
    disconnect?: EventLogWhereUniqueInput | EventLogWhereUniqueInput[]
    delete?: EventLogWhereUniqueInput | EventLogWhereUniqueInput[]
    connect?: EventLogWhereUniqueInput | EventLogWhereUniqueInput[]
    update?: EventLogUpdateWithWhereUniqueWithoutUserInput | EventLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventLogUpdateManyWithWhereWithoutUserInput | EventLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventLogScalarWhereInput | EventLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCertificationsInput = {
    create?: XOR<UserCreateWithoutCertificationsInput, UserUncheckedCreateWithoutCertificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCertificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumCertificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.CertificationType
  }

  export type UserUpdateOneRequiredWithoutCertificationsNestedInput = {
    create?: XOR<UserCreateWithoutCertificationsInput, UserUncheckedCreateWithoutCertificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCertificationsInput
    upsert?: UserUpsertWithoutCertificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCertificationsInput, UserUpdateWithoutCertificationsInput>, UserUncheckedUpdateWithoutCertificationsInput>
  }

  export type LocationCreateNestedOneWithoutChildrenInput = {
    create?: XOR<LocationCreateWithoutChildrenInput, LocationUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: LocationCreateOrConnectWithoutChildrenInput
    connect?: LocationWhereUniqueInput
  }

  export type LocationCreateNestedManyWithoutParentInput = {
    create?: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput> | LocationCreateWithoutParentInput[] | LocationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutParentInput | LocationCreateOrConnectWithoutParentInput[]
    createMany?: LocationCreateManyParentInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type MachineCreateNestedManyWithoutLocationInput = {
    create?: XOR<MachineCreateWithoutLocationInput, MachineUncheckedCreateWithoutLocationInput> | MachineCreateWithoutLocationInput[] | MachineUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: MachineCreateOrConnectWithoutLocationInput | MachineCreateOrConnectWithoutLocationInput[]
    createMany?: MachineCreateManyLocationInputEnvelope
    connect?: MachineWhereUniqueInput | MachineWhereUniqueInput[]
  }

  export type LocationUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput> | LocationCreateWithoutParentInput[] | LocationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutParentInput | LocationCreateOrConnectWithoutParentInput[]
    createMany?: LocationCreateManyParentInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type MachineUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<MachineCreateWithoutLocationInput, MachineUncheckedCreateWithoutLocationInput> | MachineCreateWithoutLocationInput[] | MachineUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: MachineCreateOrConnectWithoutLocationInput | MachineCreateOrConnectWithoutLocationInput[]
    createMany?: MachineCreateManyLocationInputEnvelope
    connect?: MachineWhereUniqueInput | MachineWhereUniqueInput[]
  }

  export type EnumLocationTypeFieldUpdateOperationsInput = {
    set?: $Enums.LocationType
  }

  export type LocationUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<LocationCreateWithoutChildrenInput, LocationUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: LocationCreateOrConnectWithoutChildrenInput
    upsert?: LocationUpsertWithoutChildrenInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutChildrenInput, LocationUpdateWithoutChildrenInput>, LocationUncheckedUpdateWithoutChildrenInput>
  }

  export type LocationUpdateManyWithoutParentNestedInput = {
    create?: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput> | LocationCreateWithoutParentInput[] | LocationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutParentInput | LocationCreateOrConnectWithoutParentInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutParentInput | LocationUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: LocationCreateManyParentInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutParentInput | LocationUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutParentInput | LocationUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type MachineUpdateManyWithoutLocationNestedInput = {
    create?: XOR<MachineCreateWithoutLocationInput, MachineUncheckedCreateWithoutLocationInput> | MachineCreateWithoutLocationInput[] | MachineUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: MachineCreateOrConnectWithoutLocationInput | MachineCreateOrConnectWithoutLocationInput[]
    upsert?: MachineUpsertWithWhereUniqueWithoutLocationInput | MachineUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: MachineCreateManyLocationInputEnvelope
    set?: MachineWhereUniqueInput | MachineWhereUniqueInput[]
    disconnect?: MachineWhereUniqueInput | MachineWhereUniqueInput[]
    delete?: MachineWhereUniqueInput | MachineWhereUniqueInput[]
    connect?: MachineWhereUniqueInput | MachineWhereUniqueInput[]
    update?: MachineUpdateWithWhereUniqueWithoutLocationInput | MachineUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: MachineUpdateManyWithWhereWithoutLocationInput | MachineUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: MachineScalarWhereInput | MachineScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type LocationUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput> | LocationCreateWithoutParentInput[] | LocationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutParentInput | LocationCreateOrConnectWithoutParentInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutParentInput | LocationUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: LocationCreateManyParentInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutParentInput | LocationUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutParentInput | LocationUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type MachineUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<MachineCreateWithoutLocationInput, MachineUncheckedCreateWithoutLocationInput> | MachineCreateWithoutLocationInput[] | MachineUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: MachineCreateOrConnectWithoutLocationInput | MachineCreateOrConnectWithoutLocationInput[]
    upsert?: MachineUpsertWithWhereUniqueWithoutLocationInput | MachineUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: MachineCreateManyLocationInputEnvelope
    set?: MachineWhereUniqueInput | MachineWhereUniqueInput[]
    disconnect?: MachineWhereUniqueInput | MachineWhereUniqueInput[]
    delete?: MachineWhereUniqueInput | MachineWhereUniqueInput[]
    connect?: MachineWhereUniqueInput | MachineWhereUniqueInput[]
    update?: MachineUpdateWithWhereUniqueWithoutLocationInput | MachineUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: MachineUpdateManyWithWhereWithoutLocationInput | MachineUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: MachineScalarWhereInput | MachineScalarWhereInput[]
  }

  export type LocationCreateNestedOneWithoutMachinesInput = {
    create?: XOR<LocationCreateWithoutMachinesInput, LocationUncheckedCreateWithoutMachinesInput>
    connectOrCreate?: LocationCreateOrConnectWithoutMachinesInput
    connect?: LocationWhereUniqueInput
  }

  export type MachineDocumentCreateNestedManyWithoutMachineInput = {
    create?: XOR<MachineDocumentCreateWithoutMachineInput, MachineDocumentUncheckedCreateWithoutMachineInput> | MachineDocumentCreateWithoutMachineInput[] | MachineDocumentUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: MachineDocumentCreateOrConnectWithoutMachineInput | MachineDocumentCreateOrConnectWithoutMachineInput[]
    createMany?: MachineDocumentCreateManyMachineInputEnvelope
    connect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
  }

  export type WorkOrderCreateNestedManyWithoutMachineInput = {
    create?: XOR<WorkOrderCreateWithoutMachineInput, WorkOrderUncheckedCreateWithoutMachineInput> | WorkOrderCreateWithoutMachineInput[] | WorkOrderUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutMachineInput | WorkOrderCreateOrConnectWithoutMachineInput[]
    createMany?: WorkOrderCreateManyMachineInputEnvelope
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
  }

  export type PreventivePlanCreateNestedManyWithoutMachineInput = {
    create?: XOR<PreventivePlanCreateWithoutMachineInput, PreventivePlanUncheckedCreateWithoutMachineInput> | PreventivePlanCreateWithoutMachineInput[] | PreventivePlanUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: PreventivePlanCreateOrConnectWithoutMachineInput | PreventivePlanCreateOrConnectWithoutMachineInput[]
    createMany?: PreventivePlanCreateManyMachineInputEnvelope
    connect?: PreventivePlanWhereUniqueInput | PreventivePlanWhereUniqueInput[]
  }

  export type MachineDocumentUncheckedCreateNestedManyWithoutMachineInput = {
    create?: XOR<MachineDocumentCreateWithoutMachineInput, MachineDocumentUncheckedCreateWithoutMachineInput> | MachineDocumentCreateWithoutMachineInput[] | MachineDocumentUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: MachineDocumentCreateOrConnectWithoutMachineInput | MachineDocumentCreateOrConnectWithoutMachineInput[]
    createMany?: MachineDocumentCreateManyMachineInputEnvelope
    connect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
  }

  export type WorkOrderUncheckedCreateNestedManyWithoutMachineInput = {
    create?: XOR<WorkOrderCreateWithoutMachineInput, WorkOrderUncheckedCreateWithoutMachineInput> | WorkOrderCreateWithoutMachineInput[] | WorkOrderUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutMachineInput | WorkOrderCreateOrConnectWithoutMachineInput[]
    createMany?: WorkOrderCreateManyMachineInputEnvelope
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
  }

  export type PreventivePlanUncheckedCreateNestedManyWithoutMachineInput = {
    create?: XOR<PreventivePlanCreateWithoutMachineInput, PreventivePlanUncheckedCreateWithoutMachineInput> | PreventivePlanCreateWithoutMachineInput[] | PreventivePlanUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: PreventivePlanCreateOrConnectWithoutMachineInput | PreventivePlanCreateOrConnectWithoutMachineInput[]
    createMany?: PreventivePlanCreateManyMachineInputEnvelope
    connect?: PreventivePlanWhereUniqueInput | PreventivePlanWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type LocationUpdateOneRequiredWithoutMachinesNestedInput = {
    create?: XOR<LocationCreateWithoutMachinesInput, LocationUncheckedCreateWithoutMachinesInput>
    connectOrCreate?: LocationCreateOrConnectWithoutMachinesInput
    upsert?: LocationUpsertWithoutMachinesInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutMachinesInput, LocationUpdateWithoutMachinesInput>, LocationUncheckedUpdateWithoutMachinesInput>
  }

  export type MachineDocumentUpdateManyWithoutMachineNestedInput = {
    create?: XOR<MachineDocumentCreateWithoutMachineInput, MachineDocumentUncheckedCreateWithoutMachineInput> | MachineDocumentCreateWithoutMachineInput[] | MachineDocumentUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: MachineDocumentCreateOrConnectWithoutMachineInput | MachineDocumentCreateOrConnectWithoutMachineInput[]
    upsert?: MachineDocumentUpsertWithWhereUniqueWithoutMachineInput | MachineDocumentUpsertWithWhereUniqueWithoutMachineInput[]
    createMany?: MachineDocumentCreateManyMachineInputEnvelope
    set?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    disconnect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    delete?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    connect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    update?: MachineDocumentUpdateWithWhereUniqueWithoutMachineInput | MachineDocumentUpdateWithWhereUniqueWithoutMachineInput[]
    updateMany?: MachineDocumentUpdateManyWithWhereWithoutMachineInput | MachineDocumentUpdateManyWithWhereWithoutMachineInput[]
    deleteMany?: MachineDocumentScalarWhereInput | MachineDocumentScalarWhereInput[]
  }

  export type WorkOrderUpdateManyWithoutMachineNestedInput = {
    create?: XOR<WorkOrderCreateWithoutMachineInput, WorkOrderUncheckedCreateWithoutMachineInput> | WorkOrderCreateWithoutMachineInput[] | WorkOrderUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutMachineInput | WorkOrderCreateOrConnectWithoutMachineInput[]
    upsert?: WorkOrderUpsertWithWhereUniqueWithoutMachineInput | WorkOrderUpsertWithWhereUniqueWithoutMachineInput[]
    createMany?: WorkOrderCreateManyMachineInputEnvelope
    set?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    disconnect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    delete?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    update?: WorkOrderUpdateWithWhereUniqueWithoutMachineInput | WorkOrderUpdateWithWhereUniqueWithoutMachineInput[]
    updateMany?: WorkOrderUpdateManyWithWhereWithoutMachineInput | WorkOrderUpdateManyWithWhereWithoutMachineInput[]
    deleteMany?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
  }

  export type PreventivePlanUpdateManyWithoutMachineNestedInput = {
    create?: XOR<PreventivePlanCreateWithoutMachineInput, PreventivePlanUncheckedCreateWithoutMachineInput> | PreventivePlanCreateWithoutMachineInput[] | PreventivePlanUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: PreventivePlanCreateOrConnectWithoutMachineInput | PreventivePlanCreateOrConnectWithoutMachineInput[]
    upsert?: PreventivePlanUpsertWithWhereUniqueWithoutMachineInput | PreventivePlanUpsertWithWhereUniqueWithoutMachineInput[]
    createMany?: PreventivePlanCreateManyMachineInputEnvelope
    set?: PreventivePlanWhereUniqueInput | PreventivePlanWhereUniqueInput[]
    disconnect?: PreventivePlanWhereUniqueInput | PreventivePlanWhereUniqueInput[]
    delete?: PreventivePlanWhereUniqueInput | PreventivePlanWhereUniqueInput[]
    connect?: PreventivePlanWhereUniqueInput | PreventivePlanWhereUniqueInput[]
    update?: PreventivePlanUpdateWithWhereUniqueWithoutMachineInput | PreventivePlanUpdateWithWhereUniqueWithoutMachineInput[]
    updateMany?: PreventivePlanUpdateManyWithWhereWithoutMachineInput | PreventivePlanUpdateManyWithWhereWithoutMachineInput[]
    deleteMany?: PreventivePlanScalarWhereInput | PreventivePlanScalarWhereInput[]
  }

  export type MachineDocumentUncheckedUpdateManyWithoutMachineNestedInput = {
    create?: XOR<MachineDocumentCreateWithoutMachineInput, MachineDocumentUncheckedCreateWithoutMachineInput> | MachineDocumentCreateWithoutMachineInput[] | MachineDocumentUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: MachineDocumentCreateOrConnectWithoutMachineInput | MachineDocumentCreateOrConnectWithoutMachineInput[]
    upsert?: MachineDocumentUpsertWithWhereUniqueWithoutMachineInput | MachineDocumentUpsertWithWhereUniqueWithoutMachineInput[]
    createMany?: MachineDocumentCreateManyMachineInputEnvelope
    set?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    disconnect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    delete?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    connect?: MachineDocumentWhereUniqueInput | MachineDocumentWhereUniqueInput[]
    update?: MachineDocumentUpdateWithWhereUniqueWithoutMachineInput | MachineDocumentUpdateWithWhereUniqueWithoutMachineInput[]
    updateMany?: MachineDocumentUpdateManyWithWhereWithoutMachineInput | MachineDocumentUpdateManyWithWhereWithoutMachineInput[]
    deleteMany?: MachineDocumentScalarWhereInput | MachineDocumentScalarWhereInput[]
  }

  export type WorkOrderUncheckedUpdateManyWithoutMachineNestedInput = {
    create?: XOR<WorkOrderCreateWithoutMachineInput, WorkOrderUncheckedCreateWithoutMachineInput> | WorkOrderCreateWithoutMachineInput[] | WorkOrderUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: WorkOrderCreateOrConnectWithoutMachineInput | WorkOrderCreateOrConnectWithoutMachineInput[]
    upsert?: WorkOrderUpsertWithWhereUniqueWithoutMachineInput | WorkOrderUpsertWithWhereUniqueWithoutMachineInput[]
    createMany?: WorkOrderCreateManyMachineInputEnvelope
    set?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    disconnect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    delete?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    connect?: WorkOrderWhereUniqueInput | WorkOrderWhereUniqueInput[]
    update?: WorkOrderUpdateWithWhereUniqueWithoutMachineInput | WorkOrderUpdateWithWhereUniqueWithoutMachineInput[]
    updateMany?: WorkOrderUpdateManyWithWhereWithoutMachineInput | WorkOrderUpdateManyWithWhereWithoutMachineInput[]
    deleteMany?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
  }

  export type PreventivePlanUncheckedUpdateManyWithoutMachineNestedInput = {
    create?: XOR<PreventivePlanCreateWithoutMachineInput, PreventivePlanUncheckedCreateWithoutMachineInput> | PreventivePlanCreateWithoutMachineInput[] | PreventivePlanUncheckedCreateWithoutMachineInput[]
    connectOrCreate?: PreventivePlanCreateOrConnectWithoutMachineInput | PreventivePlanCreateOrConnectWithoutMachineInput[]
    upsert?: PreventivePlanUpsertWithWhereUniqueWithoutMachineInput | PreventivePlanUpsertWithWhereUniqueWithoutMachineInput[]
    createMany?: PreventivePlanCreateManyMachineInputEnvelope
    set?: PreventivePlanWhereUniqueInput | PreventivePlanWhereUniqueInput[]
    disconnect?: PreventivePlanWhereUniqueInput | PreventivePlanWhereUniqueInput[]
    delete?: PreventivePlanWhereUniqueInput | PreventivePlanWhereUniqueInput[]
    connect?: PreventivePlanWhereUniqueInput | PreventivePlanWhereUniqueInput[]
    update?: PreventivePlanUpdateWithWhereUniqueWithoutMachineInput | PreventivePlanUpdateWithWhereUniqueWithoutMachineInput[]
    updateMany?: PreventivePlanUpdateManyWithWhereWithoutMachineInput | PreventivePlanUpdateManyWithWhereWithoutMachineInput[]
    deleteMany?: PreventivePlanScalarWhereInput | PreventivePlanScalarWhereInput[]
  }

  export type MachineCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<MachineCreateWithoutDocumentsInput, MachineUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: MachineCreateOrConnectWithoutDocumentsInput
    connect?: MachineWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUploadedDocumentsInput = {
    create?: XOR<UserCreateWithoutUploadedDocumentsInput, UserUncheckedCreateWithoutUploadedDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MachineUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<MachineCreateWithoutDocumentsInput, MachineUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: MachineCreateOrConnectWithoutDocumentsInput
    upsert?: MachineUpsertWithoutDocumentsInput
    connect?: MachineWhereUniqueInput
    update?: XOR<XOR<MachineUpdateToOneWithWhereWithoutDocumentsInput, MachineUpdateWithoutDocumentsInput>, MachineUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateOneRequiredWithoutUploadedDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutUploadedDocumentsInput, UserUncheckedCreateWithoutUploadedDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedDocumentsInput
    upsert?: UserUpsertWithoutUploadedDocumentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUploadedDocumentsInput, UserUpdateWithoutUploadedDocumentsInput>, UserUncheckedUpdateWithoutUploadedDocumentsInput>
  }

  export type MachineCreateNestedOneWithoutWorkOrdersInput = {
    create?: XOR<MachineCreateWithoutWorkOrdersInput, MachineUncheckedCreateWithoutWorkOrdersInput>
    connectOrCreate?: MachineCreateOrConnectWithoutWorkOrdersInput
    connect?: MachineWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReportedOrdersInput = {
    create?: XOR<UserCreateWithoutReportedOrdersInput, UserUncheckedCreateWithoutReportedOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportedOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedOrdersInput = {
    create?: XOR<UserCreateWithoutAssignedOrdersInput, UserUncheckedCreateWithoutAssignedOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type WorkOrderMessageCreateNestedManyWithoutWorkOrderInput = {
    create?: XOR<WorkOrderMessageCreateWithoutWorkOrderInput, WorkOrderMessageUncheckedCreateWithoutWorkOrderInput> | WorkOrderMessageCreateWithoutWorkOrderInput[] | WorkOrderMessageUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: WorkOrderMessageCreateOrConnectWithoutWorkOrderInput | WorkOrderMessageCreateOrConnectWithoutWorkOrderInput[]
    createMany?: WorkOrderMessageCreateManyWorkOrderInputEnvelope
    connect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
  }

  export type WorkOrderPartCreateNestedManyWithoutWorkOrderInput = {
    create?: XOR<WorkOrderPartCreateWithoutWorkOrderInput, WorkOrderPartUncheckedCreateWithoutWorkOrderInput> | WorkOrderPartCreateWithoutWorkOrderInput[] | WorkOrderPartUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: WorkOrderPartCreateOrConnectWithoutWorkOrderInput | WorkOrderPartCreateOrConnectWithoutWorkOrderInput[]
    createMany?: WorkOrderPartCreateManyWorkOrderInputEnvelope
    connect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
  }

  export type ToolLoanCreateNestedManyWithoutWorkOrderInput = {
    create?: XOR<ToolLoanCreateWithoutWorkOrderInput, ToolLoanUncheckedCreateWithoutWorkOrderInput> | ToolLoanCreateWithoutWorkOrderInput[] | ToolLoanUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutWorkOrderInput | ToolLoanCreateOrConnectWithoutWorkOrderInput[]
    createMany?: ToolLoanCreateManyWorkOrderInputEnvelope
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
  }

  export type WorkOrderMessageUncheckedCreateNestedManyWithoutWorkOrderInput = {
    create?: XOR<WorkOrderMessageCreateWithoutWorkOrderInput, WorkOrderMessageUncheckedCreateWithoutWorkOrderInput> | WorkOrderMessageCreateWithoutWorkOrderInput[] | WorkOrderMessageUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: WorkOrderMessageCreateOrConnectWithoutWorkOrderInput | WorkOrderMessageCreateOrConnectWithoutWorkOrderInput[]
    createMany?: WorkOrderMessageCreateManyWorkOrderInputEnvelope
    connect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
  }

  export type WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput = {
    create?: XOR<WorkOrderPartCreateWithoutWorkOrderInput, WorkOrderPartUncheckedCreateWithoutWorkOrderInput> | WorkOrderPartCreateWithoutWorkOrderInput[] | WorkOrderPartUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: WorkOrderPartCreateOrConnectWithoutWorkOrderInput | WorkOrderPartCreateOrConnectWithoutWorkOrderInput[]
    createMany?: WorkOrderPartCreateManyWorkOrderInputEnvelope
    connect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
  }

  export type ToolLoanUncheckedCreateNestedManyWithoutWorkOrderInput = {
    create?: XOR<ToolLoanCreateWithoutWorkOrderInput, ToolLoanUncheckedCreateWithoutWorkOrderInput> | ToolLoanCreateWithoutWorkOrderInput[] | ToolLoanUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutWorkOrderInput | ToolLoanCreateOrConnectWithoutWorkOrderInput[]
    createMany?: ToolLoanCreateManyWorkOrderInputEnvelope
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
  }

  export type EnumWorkOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkOrderStatus
  }

  export type EnumPriorityFieldUpdateOperationsInput = {
    set?: $Enums.Priority
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type MachineUpdateOneRequiredWithoutWorkOrdersNestedInput = {
    create?: XOR<MachineCreateWithoutWorkOrdersInput, MachineUncheckedCreateWithoutWorkOrdersInput>
    connectOrCreate?: MachineCreateOrConnectWithoutWorkOrdersInput
    upsert?: MachineUpsertWithoutWorkOrdersInput
    connect?: MachineWhereUniqueInput
    update?: XOR<XOR<MachineUpdateToOneWithWhereWithoutWorkOrdersInput, MachineUpdateWithoutWorkOrdersInput>, MachineUncheckedUpdateWithoutWorkOrdersInput>
  }

  export type UserUpdateOneRequiredWithoutReportedOrdersNestedInput = {
    create?: XOR<UserCreateWithoutReportedOrdersInput, UserUncheckedCreateWithoutReportedOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportedOrdersInput
    upsert?: UserUpsertWithoutReportedOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReportedOrdersInput, UserUpdateWithoutReportedOrdersInput>, UserUncheckedUpdateWithoutReportedOrdersInput>
  }

  export type UserUpdateOneWithoutAssignedOrdersNestedInput = {
    create?: XOR<UserCreateWithoutAssignedOrdersInput, UserUncheckedCreateWithoutAssignedOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedOrdersInput
    upsert?: UserUpsertWithoutAssignedOrdersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedOrdersInput, UserUpdateWithoutAssignedOrdersInput>, UserUncheckedUpdateWithoutAssignedOrdersInput>
  }

  export type WorkOrderMessageUpdateManyWithoutWorkOrderNestedInput = {
    create?: XOR<WorkOrderMessageCreateWithoutWorkOrderInput, WorkOrderMessageUncheckedCreateWithoutWorkOrderInput> | WorkOrderMessageCreateWithoutWorkOrderInput[] | WorkOrderMessageUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: WorkOrderMessageCreateOrConnectWithoutWorkOrderInput | WorkOrderMessageCreateOrConnectWithoutWorkOrderInput[]
    upsert?: WorkOrderMessageUpsertWithWhereUniqueWithoutWorkOrderInput | WorkOrderMessageUpsertWithWhereUniqueWithoutWorkOrderInput[]
    createMany?: WorkOrderMessageCreateManyWorkOrderInputEnvelope
    set?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    disconnect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    delete?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    connect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    update?: WorkOrderMessageUpdateWithWhereUniqueWithoutWorkOrderInput | WorkOrderMessageUpdateWithWhereUniqueWithoutWorkOrderInput[]
    updateMany?: WorkOrderMessageUpdateManyWithWhereWithoutWorkOrderInput | WorkOrderMessageUpdateManyWithWhereWithoutWorkOrderInput[]
    deleteMany?: WorkOrderMessageScalarWhereInput | WorkOrderMessageScalarWhereInput[]
  }

  export type WorkOrderPartUpdateManyWithoutWorkOrderNestedInput = {
    create?: XOR<WorkOrderPartCreateWithoutWorkOrderInput, WorkOrderPartUncheckedCreateWithoutWorkOrderInput> | WorkOrderPartCreateWithoutWorkOrderInput[] | WorkOrderPartUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: WorkOrderPartCreateOrConnectWithoutWorkOrderInput | WorkOrderPartCreateOrConnectWithoutWorkOrderInput[]
    upsert?: WorkOrderPartUpsertWithWhereUniqueWithoutWorkOrderInput | WorkOrderPartUpsertWithWhereUniqueWithoutWorkOrderInput[]
    createMany?: WorkOrderPartCreateManyWorkOrderInputEnvelope
    set?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    disconnect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    delete?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    connect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    update?: WorkOrderPartUpdateWithWhereUniqueWithoutWorkOrderInput | WorkOrderPartUpdateWithWhereUniqueWithoutWorkOrderInput[]
    updateMany?: WorkOrderPartUpdateManyWithWhereWithoutWorkOrderInput | WorkOrderPartUpdateManyWithWhereWithoutWorkOrderInput[]
    deleteMany?: WorkOrderPartScalarWhereInput | WorkOrderPartScalarWhereInput[]
  }

  export type ToolLoanUpdateManyWithoutWorkOrderNestedInput = {
    create?: XOR<ToolLoanCreateWithoutWorkOrderInput, ToolLoanUncheckedCreateWithoutWorkOrderInput> | ToolLoanCreateWithoutWorkOrderInput[] | ToolLoanUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutWorkOrderInput | ToolLoanCreateOrConnectWithoutWorkOrderInput[]
    upsert?: ToolLoanUpsertWithWhereUniqueWithoutWorkOrderInput | ToolLoanUpsertWithWhereUniqueWithoutWorkOrderInput[]
    createMany?: ToolLoanCreateManyWorkOrderInputEnvelope
    set?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    disconnect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    delete?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    update?: ToolLoanUpdateWithWhereUniqueWithoutWorkOrderInput | ToolLoanUpdateWithWhereUniqueWithoutWorkOrderInput[]
    updateMany?: ToolLoanUpdateManyWithWhereWithoutWorkOrderInput | ToolLoanUpdateManyWithWhereWithoutWorkOrderInput[]
    deleteMany?: ToolLoanScalarWhereInput | ToolLoanScalarWhereInput[]
  }

  export type WorkOrderMessageUncheckedUpdateManyWithoutWorkOrderNestedInput = {
    create?: XOR<WorkOrderMessageCreateWithoutWorkOrderInput, WorkOrderMessageUncheckedCreateWithoutWorkOrderInput> | WorkOrderMessageCreateWithoutWorkOrderInput[] | WorkOrderMessageUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: WorkOrderMessageCreateOrConnectWithoutWorkOrderInput | WorkOrderMessageCreateOrConnectWithoutWorkOrderInput[]
    upsert?: WorkOrderMessageUpsertWithWhereUniqueWithoutWorkOrderInput | WorkOrderMessageUpsertWithWhereUniqueWithoutWorkOrderInput[]
    createMany?: WorkOrderMessageCreateManyWorkOrderInputEnvelope
    set?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    disconnect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    delete?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    connect?: WorkOrderMessageWhereUniqueInput | WorkOrderMessageWhereUniqueInput[]
    update?: WorkOrderMessageUpdateWithWhereUniqueWithoutWorkOrderInput | WorkOrderMessageUpdateWithWhereUniqueWithoutWorkOrderInput[]
    updateMany?: WorkOrderMessageUpdateManyWithWhereWithoutWorkOrderInput | WorkOrderMessageUpdateManyWithWhereWithoutWorkOrderInput[]
    deleteMany?: WorkOrderMessageScalarWhereInput | WorkOrderMessageScalarWhereInput[]
  }

  export type WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput = {
    create?: XOR<WorkOrderPartCreateWithoutWorkOrderInput, WorkOrderPartUncheckedCreateWithoutWorkOrderInput> | WorkOrderPartCreateWithoutWorkOrderInput[] | WorkOrderPartUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: WorkOrderPartCreateOrConnectWithoutWorkOrderInput | WorkOrderPartCreateOrConnectWithoutWorkOrderInput[]
    upsert?: WorkOrderPartUpsertWithWhereUniqueWithoutWorkOrderInput | WorkOrderPartUpsertWithWhereUniqueWithoutWorkOrderInput[]
    createMany?: WorkOrderPartCreateManyWorkOrderInputEnvelope
    set?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    disconnect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    delete?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    connect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    update?: WorkOrderPartUpdateWithWhereUniqueWithoutWorkOrderInput | WorkOrderPartUpdateWithWhereUniqueWithoutWorkOrderInput[]
    updateMany?: WorkOrderPartUpdateManyWithWhereWithoutWorkOrderInput | WorkOrderPartUpdateManyWithWhereWithoutWorkOrderInput[]
    deleteMany?: WorkOrderPartScalarWhereInput | WorkOrderPartScalarWhereInput[]
  }

  export type ToolLoanUncheckedUpdateManyWithoutWorkOrderNestedInput = {
    create?: XOR<ToolLoanCreateWithoutWorkOrderInput, ToolLoanUncheckedCreateWithoutWorkOrderInput> | ToolLoanCreateWithoutWorkOrderInput[] | ToolLoanUncheckedCreateWithoutWorkOrderInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutWorkOrderInput | ToolLoanCreateOrConnectWithoutWorkOrderInput[]
    upsert?: ToolLoanUpsertWithWhereUniqueWithoutWorkOrderInput | ToolLoanUpsertWithWhereUniqueWithoutWorkOrderInput[]
    createMany?: ToolLoanCreateManyWorkOrderInputEnvelope
    set?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    disconnect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    delete?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    update?: ToolLoanUpdateWithWhereUniqueWithoutWorkOrderInput | ToolLoanUpdateWithWhereUniqueWithoutWorkOrderInput[]
    updateMany?: ToolLoanUpdateManyWithWhereWithoutWorkOrderInput | ToolLoanUpdateManyWithWhereWithoutWorkOrderInput[]
    deleteMany?: ToolLoanScalarWhereInput | ToolLoanScalarWhereInput[]
  }

  export type WorkOrderCreateNestedOneWithoutMessagesInput = {
    create?: XOR<WorkOrderCreateWithoutMessagesInput, WorkOrderUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: WorkOrderCreateOrConnectWithoutMessagesInput
    connect?: WorkOrderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type WorkOrderUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<WorkOrderCreateWithoutMessagesInput, WorkOrderUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: WorkOrderCreateOrConnectWithoutMessagesInput
    upsert?: WorkOrderUpsertWithoutMessagesInput
    connect?: WorkOrderWhereUniqueInput
    update?: XOR<XOR<WorkOrderUpdateToOneWithWhereWithoutMessagesInput, WorkOrderUpdateWithoutMessagesInput>, WorkOrderUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type PartCreateNestedManyWithoutCategoryInput = {
    create?: XOR<PartCreateWithoutCategoryInput, PartUncheckedCreateWithoutCategoryInput> | PartCreateWithoutCategoryInput[] | PartUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PartCreateOrConnectWithoutCategoryInput | PartCreateOrConnectWithoutCategoryInput[]
    createMany?: PartCreateManyCategoryInputEnvelope
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type PartUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<PartCreateWithoutCategoryInput, PartUncheckedCreateWithoutCategoryInput> | PartCreateWithoutCategoryInput[] | PartUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PartCreateOrConnectWithoutCategoryInput | PartCreateOrConnectWithoutCategoryInput[]
    createMany?: PartCreateManyCategoryInputEnvelope
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type PartUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<PartCreateWithoutCategoryInput, PartUncheckedCreateWithoutCategoryInput> | PartCreateWithoutCategoryInput[] | PartUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PartCreateOrConnectWithoutCategoryInput | PartCreateOrConnectWithoutCategoryInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutCategoryInput | PartUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: PartCreateManyCategoryInputEnvelope
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutCategoryInput | PartUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: PartUpdateManyWithWhereWithoutCategoryInput | PartUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type PartUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<PartCreateWithoutCategoryInput, PartUncheckedCreateWithoutCategoryInput> | PartCreateWithoutCategoryInput[] | PartUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PartCreateOrConnectWithoutCategoryInput | PartCreateOrConnectWithoutCategoryInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutCategoryInput | PartUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: PartCreateManyCategoryInputEnvelope
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutCategoryInput | PartUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: PartUpdateManyWithWhereWithoutCategoryInput | PartUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type PartCategoryCreateNestedOneWithoutPartsInput = {
    create?: XOR<PartCategoryCreateWithoutPartsInput, PartCategoryUncheckedCreateWithoutPartsInput>
    connectOrCreate?: PartCategoryCreateOrConnectWithoutPartsInput
    connect?: PartCategoryWhereUniqueInput
  }

  export type WorkOrderPartCreateNestedManyWithoutPartInput = {
    create?: XOR<WorkOrderPartCreateWithoutPartInput, WorkOrderPartUncheckedCreateWithoutPartInput> | WorkOrderPartCreateWithoutPartInput[] | WorkOrderPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: WorkOrderPartCreateOrConnectWithoutPartInput | WorkOrderPartCreateOrConnectWithoutPartInput[]
    createMany?: WorkOrderPartCreateManyPartInputEnvelope
    connect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
  }

  export type ToolLoanCreateNestedManyWithoutPartInput = {
    create?: XOR<ToolLoanCreateWithoutPartInput, ToolLoanUncheckedCreateWithoutPartInput> | ToolLoanCreateWithoutPartInput[] | ToolLoanUncheckedCreateWithoutPartInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutPartInput | ToolLoanCreateOrConnectWithoutPartInput[]
    createMany?: ToolLoanCreateManyPartInputEnvelope
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
  }

  export type WorkOrderPartUncheckedCreateNestedManyWithoutPartInput = {
    create?: XOR<WorkOrderPartCreateWithoutPartInput, WorkOrderPartUncheckedCreateWithoutPartInput> | WorkOrderPartCreateWithoutPartInput[] | WorkOrderPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: WorkOrderPartCreateOrConnectWithoutPartInput | WorkOrderPartCreateOrConnectWithoutPartInput[]
    createMany?: WorkOrderPartCreateManyPartInputEnvelope
    connect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
  }

  export type ToolLoanUncheckedCreateNestedManyWithoutPartInput = {
    create?: XOR<ToolLoanCreateWithoutPartInput, ToolLoanUncheckedCreateWithoutPartInput> | ToolLoanCreateWithoutPartInput[] | ToolLoanUncheckedCreateWithoutPartInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutPartInput | ToolLoanCreateOrConnectWithoutPartInput[]
    createMany?: ToolLoanCreateManyPartInputEnvelope
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
  }

  export type PartCategoryUpdateOneRequiredWithoutPartsNestedInput = {
    create?: XOR<PartCategoryCreateWithoutPartsInput, PartCategoryUncheckedCreateWithoutPartsInput>
    connectOrCreate?: PartCategoryCreateOrConnectWithoutPartsInput
    upsert?: PartCategoryUpsertWithoutPartsInput
    connect?: PartCategoryWhereUniqueInput
    update?: XOR<XOR<PartCategoryUpdateToOneWithWhereWithoutPartsInput, PartCategoryUpdateWithoutPartsInput>, PartCategoryUncheckedUpdateWithoutPartsInput>
  }

  export type WorkOrderPartUpdateManyWithoutPartNestedInput = {
    create?: XOR<WorkOrderPartCreateWithoutPartInput, WorkOrderPartUncheckedCreateWithoutPartInput> | WorkOrderPartCreateWithoutPartInput[] | WorkOrderPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: WorkOrderPartCreateOrConnectWithoutPartInput | WorkOrderPartCreateOrConnectWithoutPartInput[]
    upsert?: WorkOrderPartUpsertWithWhereUniqueWithoutPartInput | WorkOrderPartUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: WorkOrderPartCreateManyPartInputEnvelope
    set?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    disconnect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    delete?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    connect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    update?: WorkOrderPartUpdateWithWhereUniqueWithoutPartInput | WorkOrderPartUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: WorkOrderPartUpdateManyWithWhereWithoutPartInput | WorkOrderPartUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: WorkOrderPartScalarWhereInput | WorkOrderPartScalarWhereInput[]
  }

  export type ToolLoanUpdateManyWithoutPartNestedInput = {
    create?: XOR<ToolLoanCreateWithoutPartInput, ToolLoanUncheckedCreateWithoutPartInput> | ToolLoanCreateWithoutPartInput[] | ToolLoanUncheckedCreateWithoutPartInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutPartInput | ToolLoanCreateOrConnectWithoutPartInput[]
    upsert?: ToolLoanUpsertWithWhereUniqueWithoutPartInput | ToolLoanUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: ToolLoanCreateManyPartInputEnvelope
    set?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    disconnect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    delete?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    update?: ToolLoanUpdateWithWhereUniqueWithoutPartInput | ToolLoanUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: ToolLoanUpdateManyWithWhereWithoutPartInput | ToolLoanUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: ToolLoanScalarWhereInput | ToolLoanScalarWhereInput[]
  }

  export type WorkOrderPartUncheckedUpdateManyWithoutPartNestedInput = {
    create?: XOR<WorkOrderPartCreateWithoutPartInput, WorkOrderPartUncheckedCreateWithoutPartInput> | WorkOrderPartCreateWithoutPartInput[] | WorkOrderPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: WorkOrderPartCreateOrConnectWithoutPartInput | WorkOrderPartCreateOrConnectWithoutPartInput[]
    upsert?: WorkOrderPartUpsertWithWhereUniqueWithoutPartInput | WorkOrderPartUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: WorkOrderPartCreateManyPartInputEnvelope
    set?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    disconnect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    delete?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    connect?: WorkOrderPartWhereUniqueInput | WorkOrderPartWhereUniqueInput[]
    update?: WorkOrderPartUpdateWithWhereUniqueWithoutPartInput | WorkOrderPartUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: WorkOrderPartUpdateManyWithWhereWithoutPartInput | WorkOrderPartUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: WorkOrderPartScalarWhereInput | WorkOrderPartScalarWhereInput[]
  }

  export type ToolLoanUncheckedUpdateManyWithoutPartNestedInput = {
    create?: XOR<ToolLoanCreateWithoutPartInput, ToolLoanUncheckedCreateWithoutPartInput> | ToolLoanCreateWithoutPartInput[] | ToolLoanUncheckedCreateWithoutPartInput[]
    connectOrCreate?: ToolLoanCreateOrConnectWithoutPartInput | ToolLoanCreateOrConnectWithoutPartInput[]
    upsert?: ToolLoanUpsertWithWhereUniqueWithoutPartInput | ToolLoanUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: ToolLoanCreateManyPartInputEnvelope
    set?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    disconnect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    delete?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    connect?: ToolLoanWhereUniqueInput | ToolLoanWhereUniqueInput[]
    update?: ToolLoanUpdateWithWhereUniqueWithoutPartInput | ToolLoanUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: ToolLoanUpdateManyWithWhereWithoutPartInput | ToolLoanUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: ToolLoanScalarWhereInput | ToolLoanScalarWhereInput[]
  }

  export type WorkOrderCreateNestedOneWithoutPartsInput = {
    create?: XOR<WorkOrderCreateWithoutPartsInput, WorkOrderUncheckedCreateWithoutPartsInput>
    connectOrCreate?: WorkOrderCreateOrConnectWithoutPartsInput
    connect?: WorkOrderWhereUniqueInput
  }

  export type PartCreateNestedOneWithoutWorkOrderPartsInput = {
    create?: XOR<PartCreateWithoutWorkOrderPartsInput, PartUncheckedCreateWithoutWorkOrderPartsInput>
    connectOrCreate?: PartCreateOrConnectWithoutWorkOrderPartsInput
    connect?: PartWhereUniqueInput
  }

  export type WorkOrderUpdateOneRequiredWithoutPartsNestedInput = {
    create?: XOR<WorkOrderCreateWithoutPartsInput, WorkOrderUncheckedCreateWithoutPartsInput>
    connectOrCreate?: WorkOrderCreateOrConnectWithoutPartsInput
    upsert?: WorkOrderUpsertWithoutPartsInput
    connect?: WorkOrderWhereUniqueInput
    update?: XOR<XOR<WorkOrderUpdateToOneWithWhereWithoutPartsInput, WorkOrderUpdateWithoutPartsInput>, WorkOrderUncheckedUpdateWithoutPartsInput>
  }

  export type PartUpdateOneRequiredWithoutWorkOrderPartsNestedInput = {
    create?: XOR<PartCreateWithoutWorkOrderPartsInput, PartUncheckedCreateWithoutWorkOrderPartsInput>
    connectOrCreate?: PartCreateOrConnectWithoutWorkOrderPartsInput
    upsert?: PartUpsertWithoutWorkOrderPartsInput
    connect?: PartWhereUniqueInput
    update?: XOR<XOR<PartUpdateToOneWithWhereWithoutWorkOrderPartsInput, PartUpdateWithoutWorkOrderPartsInput>, PartUncheckedUpdateWithoutWorkOrderPartsInput>
  }

  export type PartCreateNestedOneWithoutToolLoansInput = {
    create?: XOR<PartCreateWithoutToolLoansInput, PartUncheckedCreateWithoutToolLoansInput>
    connectOrCreate?: PartCreateOrConnectWithoutToolLoansInput
    connect?: PartWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutToolLoansInput = {
    create?: XOR<UserCreateWithoutToolLoansInput, UserUncheckedCreateWithoutToolLoansInput>
    connectOrCreate?: UserCreateOrConnectWithoutToolLoansInput
    connect?: UserWhereUniqueInput
  }

  export type WorkOrderCreateNestedOneWithoutToolLoansInput = {
    create?: XOR<WorkOrderCreateWithoutToolLoansInput, WorkOrderUncheckedCreateWithoutToolLoansInput>
    connectOrCreate?: WorkOrderCreateOrConnectWithoutToolLoansInput
    connect?: WorkOrderWhereUniqueInput
  }

  export type PartUpdateOneRequiredWithoutToolLoansNestedInput = {
    create?: XOR<PartCreateWithoutToolLoansInput, PartUncheckedCreateWithoutToolLoansInput>
    connectOrCreate?: PartCreateOrConnectWithoutToolLoansInput
    upsert?: PartUpsertWithoutToolLoansInput
    connect?: PartWhereUniqueInput
    update?: XOR<XOR<PartUpdateToOneWithWhereWithoutToolLoansInput, PartUpdateWithoutToolLoansInput>, PartUncheckedUpdateWithoutToolLoansInput>
  }

  export type UserUpdateOneRequiredWithoutToolLoansNestedInput = {
    create?: XOR<UserCreateWithoutToolLoansInput, UserUncheckedCreateWithoutToolLoansInput>
    connectOrCreate?: UserCreateOrConnectWithoutToolLoansInput
    upsert?: UserUpsertWithoutToolLoansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutToolLoansInput, UserUpdateWithoutToolLoansInput>, UserUncheckedUpdateWithoutToolLoansInput>
  }

  export type WorkOrderUpdateOneWithoutToolLoansNestedInput = {
    create?: XOR<WorkOrderCreateWithoutToolLoansInput, WorkOrderUncheckedCreateWithoutToolLoansInput>
    connectOrCreate?: WorkOrderCreateOrConnectWithoutToolLoansInput
    upsert?: WorkOrderUpsertWithoutToolLoansInput
    disconnect?: WorkOrderWhereInput | boolean
    delete?: WorkOrderWhereInput | boolean
    connect?: WorkOrderWhereUniqueInput
    update?: XOR<XOR<WorkOrderUpdateToOneWithWhereWithoutToolLoansInput, WorkOrderUpdateWithoutToolLoansInput>, WorkOrderUncheckedUpdateWithoutToolLoansInput>
  }

  export type MachineCreateNestedOneWithoutPreventivePlansInput = {
    create?: XOR<MachineCreateWithoutPreventivePlansInput, MachineUncheckedCreateWithoutPreventivePlansInput>
    connectOrCreate?: MachineCreateOrConnectWithoutPreventivePlansInput
    connect?: MachineWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MachineUpdateOneRequiredWithoutPreventivePlansNestedInput = {
    create?: XOR<MachineCreateWithoutPreventivePlansInput, MachineUncheckedCreateWithoutPreventivePlansInput>
    connectOrCreate?: MachineCreateOrConnectWithoutPreventivePlansInput
    upsert?: MachineUpsertWithoutPreventivePlansInput
    connect?: MachineWhereUniqueInput
    update?: XOR<XOR<MachineUpdateToOneWithWhereWithoutPreventivePlansInput, MachineUpdateWithoutPreventivePlansInput>, MachineUncheckedUpdateWithoutPreventivePlansInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutEventLogsInput = {
    create?: XOR<UserCreateWithoutEventLogsInput, UserUncheckedCreateWithoutEventLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutEventLogsNestedInput = {
    create?: XOR<UserCreateWithoutEventLogsInput, UserUncheckedCreateWithoutEventLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventLogsInput
    upsert?: UserUpsertWithoutEventLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventLogsInput, UserUpdateWithoutEventLogsInput>, UserUncheckedUpdateWithoutEventLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCertificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationType | EnumCertificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CertificationType[]
    notIn?: $Enums.CertificationType[]
    not?: NestedEnumCertificationTypeFilter<$PrismaModel> | $Enums.CertificationType
  }

  export type NestedEnumCertificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationType | EnumCertificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CertificationType[]
    notIn?: $Enums.CertificationType[]
    not?: NestedEnumCertificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.CertificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCertificationTypeFilter<$PrismaModel>
    _max?: NestedEnumCertificationTypeFilter<$PrismaModel>
  }

  export type NestedEnumLocationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationType | EnumLocationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocationType[]
    notIn?: $Enums.LocationType[]
    not?: NestedEnumLocationTypeFilter<$PrismaModel> | $Enums.LocationType
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumLocationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationType | EnumLocationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocationType[]
    notIn?: $Enums.LocationType[]
    not?: NestedEnumLocationTypeWithAggregatesFilter<$PrismaModel> | $Enums.LocationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocationTypeFilter<$PrismaModel>
    _max?: NestedEnumLocationTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumWorkOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | EnumWorkOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkOrderStatus[]
    notIn?: $Enums.WorkOrderStatus[]
    not?: NestedEnumWorkOrderStatusFilter<$PrismaModel> | $Enums.WorkOrderStatus
  }

  export type NestedEnumPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[]
    notIn?: $Enums.Priority[]
    not?: NestedEnumPriorityFilter<$PrismaModel> | $Enums.Priority
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumWorkOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | EnumWorkOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkOrderStatus[]
    notIn?: $Enums.WorkOrderStatus[]
    not?: NestedEnumWorkOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkOrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumWorkOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[]
    notIn?: $Enums.Priority[]
    not?: NestedEnumPriorityWithAggregatesFilter<$PrismaModel> | $Enums.Priority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityFilter<$PrismaModel>
    _max?: NestedEnumPriorityFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[]
    notIn?: $Enums.NotificationType[]
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[]
    notIn?: $Enums.NotificationType[]
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CertificationCreateWithoutUserInput = {
    id?: string
    type: $Enums.CertificationType
    issuedAt: Date | string
    expiresAt: Date | string
    isValid?: boolean
    createdAt?: Date | string
  }

  export type CertificationUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.CertificationType
    issuedAt: Date | string
    expiresAt: Date | string
    isValid?: boolean
    createdAt?: Date | string
  }

  export type CertificationCreateOrConnectWithoutUserInput = {
    where: CertificationWhereUniqueInput
    create: XOR<CertificationCreateWithoutUserInput, CertificationUncheckedCreateWithoutUserInput>
  }

  export type CertificationCreateManyUserInputEnvelope = {
    data: CertificationCreateManyUserInput | CertificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WorkOrderCreateWithoutReportedByInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    machine: MachineCreateNestedOneWithoutWorkOrdersInput
    assignedTo?: UserCreateNestedOneWithoutAssignedOrdersInput
    messages?: WorkOrderMessageCreateNestedManyWithoutWorkOrderInput
    parts?: WorkOrderPartCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderUncheckedCreateWithoutReportedByInput = {
    id?: string
    machineId: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutWorkOrderInput
    parts?: WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderCreateOrConnectWithoutReportedByInput = {
    where: WorkOrderWhereUniqueInput
    create: XOR<WorkOrderCreateWithoutReportedByInput, WorkOrderUncheckedCreateWithoutReportedByInput>
  }

  export type WorkOrderCreateManyReportedByInputEnvelope = {
    data: WorkOrderCreateManyReportedByInput | WorkOrderCreateManyReportedByInput[]
    skipDuplicates?: boolean
  }

  export type WorkOrderCreateWithoutAssignedToInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    machine: MachineCreateNestedOneWithoutWorkOrdersInput
    reportedBy: UserCreateNestedOneWithoutReportedOrdersInput
    messages?: WorkOrderMessageCreateNestedManyWithoutWorkOrderInput
    parts?: WorkOrderPartCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderUncheckedCreateWithoutAssignedToInput = {
    id?: string
    machineId: string
    reportedById: string
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutWorkOrderInput
    parts?: WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderCreateOrConnectWithoutAssignedToInput = {
    where: WorkOrderWhereUniqueInput
    create: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput>
  }

  export type WorkOrderCreateManyAssignedToInputEnvelope = {
    data: WorkOrderCreateManyAssignedToInput | WorkOrderCreateManyAssignedToInput[]
    skipDuplicates?: boolean
  }

  export type WorkOrderMessageCreateWithoutUserInput = {
    id?: string
    content: string
    sentAt?: Date | string
    workOrder: WorkOrderCreateNestedOneWithoutMessagesInput
  }

  export type WorkOrderMessageUncheckedCreateWithoutUserInput = {
    id?: string
    workOrderId: string
    content: string
    sentAt?: Date | string
  }

  export type WorkOrderMessageCreateOrConnectWithoutUserInput = {
    where: WorkOrderMessageWhereUniqueInput
    create: XOR<WorkOrderMessageCreateWithoutUserInput, WorkOrderMessageUncheckedCreateWithoutUserInput>
  }

  export type WorkOrderMessageCreateManyUserInputEnvelope = {
    data: WorkOrderMessageCreateManyUserInput | WorkOrderMessageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ToolLoanCreateWithoutUserInput = {
    id?: string
    loanedAt?: Date | string
    returnedAt?: Date | string | null
    part: PartCreateNestedOneWithoutToolLoansInput
    workOrder?: WorkOrderCreateNestedOneWithoutToolLoansInput
  }

  export type ToolLoanUncheckedCreateWithoutUserInput = {
    id?: string
    partId: string
    workOrderId?: string | null
    loanedAt?: Date | string
    returnedAt?: Date | string | null
  }

  export type ToolLoanCreateOrConnectWithoutUserInput = {
    where: ToolLoanWhereUniqueInput
    create: XOR<ToolLoanCreateWithoutUserInput, ToolLoanUncheckedCreateWithoutUserInput>
  }

  export type ToolLoanCreateManyUserInputEnvelope = {
    data: ToolLoanCreateManyUserInput | ToolLoanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    type: $Enums.NotificationType
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.NotificationType
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MachineDocumentCreateWithoutUploadedByInput = {
    id?: string
    filename: string
    filePath: string
    version?: number
    isLatest?: boolean
    uploadedAt?: Date | string
    machine: MachineCreateNestedOneWithoutDocumentsInput
  }

  export type MachineDocumentUncheckedCreateWithoutUploadedByInput = {
    id?: string
    machineId: string
    filename: string
    filePath: string
    version?: number
    isLatest?: boolean
    uploadedAt?: Date | string
  }

  export type MachineDocumentCreateOrConnectWithoutUploadedByInput = {
    where: MachineDocumentWhereUniqueInput
    create: XOR<MachineDocumentCreateWithoutUploadedByInput, MachineDocumentUncheckedCreateWithoutUploadedByInput>
  }

  export type MachineDocumentCreateManyUploadedByInputEnvelope = {
    data: MachineDocumentCreateManyUploadedByInput | MachineDocumentCreateManyUploadedByInput[]
    skipDuplicates?: boolean
  }

  export type EventLogCreateWithoutUserInput = {
    id?: string
    action: string
    entityType?: string | null
    entityId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type EventLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    entityType?: string | null
    entityId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type EventLogCreateOrConnectWithoutUserInput = {
    where: EventLogWhereUniqueInput
    create: XOR<EventLogCreateWithoutUserInput, EventLogUncheckedCreateWithoutUserInput>
  }

  export type EventLogCreateManyUserInputEnvelope = {
    data: EventLogCreateManyUserInput | EventLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CertificationUpsertWithWhereUniqueWithoutUserInput = {
    where: CertificationWhereUniqueInput
    update: XOR<CertificationUpdateWithoutUserInput, CertificationUncheckedUpdateWithoutUserInput>
    create: XOR<CertificationCreateWithoutUserInput, CertificationUncheckedCreateWithoutUserInput>
  }

  export type CertificationUpdateWithWhereUniqueWithoutUserInput = {
    where: CertificationWhereUniqueInput
    data: XOR<CertificationUpdateWithoutUserInput, CertificationUncheckedUpdateWithoutUserInput>
  }

  export type CertificationUpdateManyWithWhereWithoutUserInput = {
    where: CertificationScalarWhereInput
    data: XOR<CertificationUpdateManyMutationInput, CertificationUncheckedUpdateManyWithoutUserInput>
  }

  export type CertificationScalarWhereInput = {
    AND?: CertificationScalarWhereInput | CertificationScalarWhereInput[]
    OR?: CertificationScalarWhereInput[]
    NOT?: CertificationScalarWhereInput | CertificationScalarWhereInput[]
    id?: StringFilter<"Certification"> | string
    userId?: StringFilter<"Certification"> | string
    type?: EnumCertificationTypeFilter<"Certification"> | $Enums.CertificationType
    issuedAt?: DateTimeFilter<"Certification"> | Date | string
    expiresAt?: DateTimeFilter<"Certification"> | Date | string
    isValid?: BoolFilter<"Certification"> | boolean
    createdAt?: DateTimeFilter<"Certification"> | Date | string
  }

  export type WorkOrderUpsertWithWhereUniqueWithoutReportedByInput = {
    where: WorkOrderWhereUniqueInput
    update: XOR<WorkOrderUpdateWithoutReportedByInput, WorkOrderUncheckedUpdateWithoutReportedByInput>
    create: XOR<WorkOrderCreateWithoutReportedByInput, WorkOrderUncheckedCreateWithoutReportedByInput>
  }

  export type WorkOrderUpdateWithWhereUniqueWithoutReportedByInput = {
    where: WorkOrderWhereUniqueInput
    data: XOR<WorkOrderUpdateWithoutReportedByInput, WorkOrderUncheckedUpdateWithoutReportedByInput>
  }

  export type WorkOrderUpdateManyWithWhereWithoutReportedByInput = {
    where: WorkOrderScalarWhereInput
    data: XOR<WorkOrderUpdateManyMutationInput, WorkOrderUncheckedUpdateManyWithoutReportedByInput>
  }

  export type WorkOrderScalarWhereInput = {
    AND?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
    OR?: WorkOrderScalarWhereInput[]
    NOT?: WorkOrderScalarWhereInput | WorkOrderScalarWhereInput[]
    id?: StringFilter<"WorkOrder"> | string
    machineId?: StringFilter<"WorkOrder"> | string
    reportedById?: StringFilter<"WorkOrder"> | string
    assignedToId?: StringNullableFilter<"WorkOrder"> | string | null
    status?: EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus
    priority?: EnumPriorityFilter<"WorkOrder"> | $Enums.Priority
    title?: StringFilter<"WorkOrder"> | string
    description?: StringFilter<"WorkOrder"> | string
    bhpConfirmed?: BoolFilter<"WorkOrder"> | boolean
    laborCost?: DecimalFilter<"WorkOrder"> | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFilter<"WorkOrder"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"WorkOrder"> | Date | string
    startedAt?: DateTimeNullableFilter<"WorkOrder"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"WorkOrder"> | Date | string | null
    updatedAt?: DateTimeFilter<"WorkOrder"> | Date | string
  }

  export type WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: WorkOrderWhereUniqueInput
    update: XOR<WorkOrderUpdateWithoutAssignedToInput, WorkOrderUncheckedUpdateWithoutAssignedToInput>
    create: XOR<WorkOrderCreateWithoutAssignedToInput, WorkOrderUncheckedCreateWithoutAssignedToInput>
  }

  export type WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: WorkOrderWhereUniqueInput
    data: XOR<WorkOrderUpdateWithoutAssignedToInput, WorkOrderUncheckedUpdateWithoutAssignedToInput>
  }

  export type WorkOrderUpdateManyWithWhereWithoutAssignedToInput = {
    where: WorkOrderScalarWhereInput
    data: XOR<WorkOrderUpdateManyMutationInput, WorkOrderUncheckedUpdateManyWithoutAssignedToInput>
  }

  export type WorkOrderMessageUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkOrderMessageWhereUniqueInput
    update: XOR<WorkOrderMessageUpdateWithoutUserInput, WorkOrderMessageUncheckedUpdateWithoutUserInput>
    create: XOR<WorkOrderMessageCreateWithoutUserInput, WorkOrderMessageUncheckedCreateWithoutUserInput>
  }

  export type WorkOrderMessageUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkOrderMessageWhereUniqueInput
    data: XOR<WorkOrderMessageUpdateWithoutUserInput, WorkOrderMessageUncheckedUpdateWithoutUserInput>
  }

  export type WorkOrderMessageUpdateManyWithWhereWithoutUserInput = {
    where: WorkOrderMessageScalarWhereInput
    data: XOR<WorkOrderMessageUpdateManyMutationInput, WorkOrderMessageUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkOrderMessageScalarWhereInput = {
    AND?: WorkOrderMessageScalarWhereInput | WorkOrderMessageScalarWhereInput[]
    OR?: WorkOrderMessageScalarWhereInput[]
    NOT?: WorkOrderMessageScalarWhereInput | WorkOrderMessageScalarWhereInput[]
    id?: StringFilter<"WorkOrderMessage"> | string
    workOrderId?: StringFilter<"WorkOrderMessage"> | string
    userId?: StringFilter<"WorkOrderMessage"> | string
    content?: StringFilter<"WorkOrderMessage"> | string
    sentAt?: DateTimeFilter<"WorkOrderMessage"> | Date | string
  }

  export type ToolLoanUpsertWithWhereUniqueWithoutUserInput = {
    where: ToolLoanWhereUniqueInput
    update: XOR<ToolLoanUpdateWithoutUserInput, ToolLoanUncheckedUpdateWithoutUserInput>
    create: XOR<ToolLoanCreateWithoutUserInput, ToolLoanUncheckedCreateWithoutUserInput>
  }

  export type ToolLoanUpdateWithWhereUniqueWithoutUserInput = {
    where: ToolLoanWhereUniqueInput
    data: XOR<ToolLoanUpdateWithoutUserInput, ToolLoanUncheckedUpdateWithoutUserInput>
  }

  export type ToolLoanUpdateManyWithWhereWithoutUserInput = {
    where: ToolLoanScalarWhereInput
    data: XOR<ToolLoanUpdateManyMutationInput, ToolLoanUncheckedUpdateManyWithoutUserInput>
  }

  export type ToolLoanScalarWhereInput = {
    AND?: ToolLoanScalarWhereInput | ToolLoanScalarWhereInput[]
    OR?: ToolLoanScalarWhereInput[]
    NOT?: ToolLoanScalarWhereInput | ToolLoanScalarWhereInput[]
    id?: StringFilter<"ToolLoan"> | string
    partId?: StringFilter<"ToolLoan"> | string
    userId?: StringFilter<"ToolLoan"> | string
    workOrderId?: StringNullableFilter<"ToolLoan"> | string | null
    loanedAt?: DateTimeFilter<"ToolLoan"> | Date | string
    returnedAt?: DateTimeNullableFilter<"ToolLoan"> | Date | string | null
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type MachineDocumentUpsertWithWhereUniqueWithoutUploadedByInput = {
    where: MachineDocumentWhereUniqueInput
    update: XOR<MachineDocumentUpdateWithoutUploadedByInput, MachineDocumentUncheckedUpdateWithoutUploadedByInput>
    create: XOR<MachineDocumentCreateWithoutUploadedByInput, MachineDocumentUncheckedCreateWithoutUploadedByInput>
  }

  export type MachineDocumentUpdateWithWhereUniqueWithoutUploadedByInput = {
    where: MachineDocumentWhereUniqueInput
    data: XOR<MachineDocumentUpdateWithoutUploadedByInput, MachineDocumentUncheckedUpdateWithoutUploadedByInput>
  }

  export type MachineDocumentUpdateManyWithWhereWithoutUploadedByInput = {
    where: MachineDocumentScalarWhereInput
    data: XOR<MachineDocumentUpdateManyMutationInput, MachineDocumentUncheckedUpdateManyWithoutUploadedByInput>
  }

  export type MachineDocumentScalarWhereInput = {
    AND?: MachineDocumentScalarWhereInput | MachineDocumentScalarWhereInput[]
    OR?: MachineDocumentScalarWhereInput[]
    NOT?: MachineDocumentScalarWhereInput | MachineDocumentScalarWhereInput[]
    id?: StringFilter<"MachineDocument"> | string
    machineId?: StringFilter<"MachineDocument"> | string
    uploadedById?: StringFilter<"MachineDocument"> | string
    filename?: StringFilter<"MachineDocument"> | string
    filePath?: StringFilter<"MachineDocument"> | string
    version?: IntFilter<"MachineDocument"> | number
    isLatest?: BoolFilter<"MachineDocument"> | boolean
    uploadedAt?: DateTimeFilter<"MachineDocument"> | Date | string
  }

  export type EventLogUpsertWithWhereUniqueWithoutUserInput = {
    where: EventLogWhereUniqueInput
    update: XOR<EventLogUpdateWithoutUserInput, EventLogUncheckedUpdateWithoutUserInput>
    create: XOR<EventLogCreateWithoutUserInput, EventLogUncheckedCreateWithoutUserInput>
  }

  export type EventLogUpdateWithWhereUniqueWithoutUserInput = {
    where: EventLogWhereUniqueInput
    data: XOR<EventLogUpdateWithoutUserInput, EventLogUncheckedUpdateWithoutUserInput>
  }

  export type EventLogUpdateManyWithWhereWithoutUserInput = {
    where: EventLogScalarWhereInput
    data: XOR<EventLogUpdateManyMutationInput, EventLogUncheckedUpdateManyWithoutUserInput>
  }

  export type EventLogScalarWhereInput = {
    AND?: EventLogScalarWhereInput | EventLogScalarWhereInput[]
    OR?: EventLogScalarWhereInput[]
    NOT?: EventLogScalarWhereInput | EventLogScalarWhereInput[]
    id?: StringFilter<"EventLog"> | string
    userId?: StringNullableFilter<"EventLog"> | string | null
    action?: StringFilter<"EventLog"> | string
    entityType?: StringNullableFilter<"EventLog"> | string | null
    entityId?: StringNullableFilter<"EventLog"> | string | null
    metadata?: JsonNullableFilter<"EventLog">
    occurredAt?: DateTimeFilter<"EventLog"> | Date | string
  }

  export type UserCreateWithoutCertificationsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reportedOrders?: WorkOrderCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCertificationsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reportedOrders?: WorkOrderUncheckedCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentUncheckedCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCertificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCertificationsInput, UserUncheckedCreateWithoutCertificationsInput>
  }

  export type UserUpsertWithoutCertificationsInput = {
    update: XOR<UserUpdateWithoutCertificationsInput, UserUncheckedUpdateWithoutCertificationsInput>
    create: XOR<UserCreateWithoutCertificationsInput, UserUncheckedCreateWithoutCertificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCertificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCertificationsInput, UserUncheckedUpdateWithoutCertificationsInput>
  }

  export type UserUpdateWithoutCertificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportedOrders?: WorkOrderUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCertificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportedOrders?: WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUncheckedUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LocationCreateWithoutChildrenInput = {
    id?: string
    name: string
    type: $Enums.LocationType
    parent?: LocationCreateNestedOneWithoutChildrenInput
    machines?: MachineCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    type: $Enums.LocationType
    parentId?: string | null
    machines?: MachineUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutChildrenInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutChildrenInput, LocationUncheckedCreateWithoutChildrenInput>
  }

  export type LocationCreateWithoutParentInput = {
    id?: string
    name: string
    type: $Enums.LocationType
    children?: LocationCreateNestedManyWithoutParentInput
    machines?: MachineCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutParentInput = {
    id?: string
    name: string
    type: $Enums.LocationType
    children?: LocationUncheckedCreateNestedManyWithoutParentInput
    machines?: MachineUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutParentInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput>
  }

  export type LocationCreateManyParentInputEnvelope = {
    data: LocationCreateManyParentInput | LocationCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type MachineCreateWithoutLocationInput = {
    id?: string
    name: string
    serialNumber: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: MachineDocumentCreateNestedManyWithoutMachineInput
    workOrders?: WorkOrderCreateNestedManyWithoutMachineInput
    preventivePlans?: PreventivePlanCreateNestedManyWithoutMachineInput
  }

  export type MachineUncheckedCreateWithoutLocationInput = {
    id?: string
    name: string
    serialNumber: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: MachineDocumentUncheckedCreateNestedManyWithoutMachineInput
    workOrders?: WorkOrderUncheckedCreateNestedManyWithoutMachineInput
    preventivePlans?: PreventivePlanUncheckedCreateNestedManyWithoutMachineInput
  }

  export type MachineCreateOrConnectWithoutLocationInput = {
    where: MachineWhereUniqueInput
    create: XOR<MachineCreateWithoutLocationInput, MachineUncheckedCreateWithoutLocationInput>
  }

  export type MachineCreateManyLocationInputEnvelope = {
    data: MachineCreateManyLocationInput | MachineCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type LocationUpsertWithoutChildrenInput = {
    update: XOR<LocationUpdateWithoutChildrenInput, LocationUncheckedUpdateWithoutChildrenInput>
    create: XOR<LocationCreateWithoutChildrenInput, LocationUncheckedCreateWithoutChildrenInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutChildrenInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutChildrenInput, LocationUncheckedUpdateWithoutChildrenInput>
  }

  export type LocationUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    parent?: LocationUpdateOneWithoutChildrenNestedInput
    machines?: MachineUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    machines?: MachineUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationUpsertWithWhereUniqueWithoutParentInput = {
    where: LocationWhereUniqueInput
    update: XOR<LocationUpdateWithoutParentInput, LocationUncheckedUpdateWithoutParentInput>
    create: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput>
  }

  export type LocationUpdateWithWhereUniqueWithoutParentInput = {
    where: LocationWhereUniqueInput
    data: XOR<LocationUpdateWithoutParentInput, LocationUncheckedUpdateWithoutParentInput>
  }

  export type LocationUpdateManyWithWhereWithoutParentInput = {
    where: LocationScalarWhereInput
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyWithoutParentInput>
  }

  export type LocationScalarWhereInput = {
    AND?: LocationScalarWhereInput | LocationScalarWhereInput[]
    OR?: LocationScalarWhereInput[]
    NOT?: LocationScalarWhereInput | LocationScalarWhereInput[]
    id?: StringFilter<"Location"> | string
    name?: StringFilter<"Location"> | string
    type?: EnumLocationTypeFilter<"Location"> | $Enums.LocationType
    parentId?: StringNullableFilter<"Location"> | string | null
  }

  export type MachineUpsertWithWhereUniqueWithoutLocationInput = {
    where: MachineWhereUniqueInput
    update: XOR<MachineUpdateWithoutLocationInput, MachineUncheckedUpdateWithoutLocationInput>
    create: XOR<MachineCreateWithoutLocationInput, MachineUncheckedCreateWithoutLocationInput>
  }

  export type MachineUpdateWithWhereUniqueWithoutLocationInput = {
    where: MachineWhereUniqueInput
    data: XOR<MachineUpdateWithoutLocationInput, MachineUncheckedUpdateWithoutLocationInput>
  }

  export type MachineUpdateManyWithWhereWithoutLocationInput = {
    where: MachineScalarWhereInput
    data: XOR<MachineUpdateManyMutationInput, MachineUncheckedUpdateManyWithoutLocationInput>
  }

  export type MachineScalarWhereInput = {
    AND?: MachineScalarWhereInput | MachineScalarWhereInput[]
    OR?: MachineScalarWhereInput[]
    NOT?: MachineScalarWhereInput | MachineScalarWhereInput[]
    id?: StringFilter<"Machine"> | string
    name?: StringFilter<"Machine"> | string
    serialNumber?: StringFilter<"Machine"> | string
    locationId?: StringFilter<"Machine"> | string
    operatingHours?: FloatFilter<"Machine"> | number
    purchaseDate?: DateTimeFilter<"Machine"> | Date | string
    purchasePrice?: DecimalFilter<"Machine"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"Machine"> | boolean
    createdAt?: DateTimeFilter<"Machine"> | Date | string
    updatedAt?: DateTimeFilter<"Machine"> | Date | string
  }

  export type LocationCreateWithoutMachinesInput = {
    id?: string
    name: string
    type: $Enums.LocationType
    parent?: LocationCreateNestedOneWithoutChildrenInput
    children?: LocationCreateNestedManyWithoutParentInput
  }

  export type LocationUncheckedCreateWithoutMachinesInput = {
    id?: string
    name: string
    type: $Enums.LocationType
    parentId?: string | null
    children?: LocationUncheckedCreateNestedManyWithoutParentInput
  }

  export type LocationCreateOrConnectWithoutMachinesInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutMachinesInput, LocationUncheckedCreateWithoutMachinesInput>
  }

  export type MachineDocumentCreateWithoutMachineInput = {
    id?: string
    filename: string
    filePath: string
    version?: number
    isLatest?: boolean
    uploadedAt?: Date | string
    uploadedBy: UserCreateNestedOneWithoutUploadedDocumentsInput
  }

  export type MachineDocumentUncheckedCreateWithoutMachineInput = {
    id?: string
    uploadedById: string
    filename: string
    filePath: string
    version?: number
    isLatest?: boolean
    uploadedAt?: Date | string
  }

  export type MachineDocumentCreateOrConnectWithoutMachineInput = {
    where: MachineDocumentWhereUniqueInput
    create: XOR<MachineDocumentCreateWithoutMachineInput, MachineDocumentUncheckedCreateWithoutMachineInput>
  }

  export type MachineDocumentCreateManyMachineInputEnvelope = {
    data: MachineDocumentCreateManyMachineInput | MachineDocumentCreateManyMachineInput[]
    skipDuplicates?: boolean
  }

  export type WorkOrderCreateWithoutMachineInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    reportedBy: UserCreateNestedOneWithoutReportedOrdersInput
    assignedTo?: UserCreateNestedOneWithoutAssignedOrdersInput
    messages?: WorkOrderMessageCreateNestedManyWithoutWorkOrderInput
    parts?: WorkOrderPartCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderUncheckedCreateWithoutMachineInput = {
    id?: string
    reportedById: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutWorkOrderInput
    parts?: WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderCreateOrConnectWithoutMachineInput = {
    where: WorkOrderWhereUniqueInput
    create: XOR<WorkOrderCreateWithoutMachineInput, WorkOrderUncheckedCreateWithoutMachineInput>
  }

  export type WorkOrderCreateManyMachineInputEnvelope = {
    data: WorkOrderCreateManyMachineInput | WorkOrderCreateManyMachineInput[]
    skipDuplicates?: boolean
  }

  export type PreventivePlanCreateWithoutMachineInput = {
    id?: string
    name: string
    intervalHours?: number | null
    intervalDays?: number | null
    advanceDays?: number
    checklist: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PreventivePlanUncheckedCreateWithoutMachineInput = {
    id?: string
    name: string
    intervalHours?: number | null
    intervalDays?: number | null
    advanceDays?: number
    checklist: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PreventivePlanCreateOrConnectWithoutMachineInput = {
    where: PreventivePlanWhereUniqueInput
    create: XOR<PreventivePlanCreateWithoutMachineInput, PreventivePlanUncheckedCreateWithoutMachineInput>
  }

  export type PreventivePlanCreateManyMachineInputEnvelope = {
    data: PreventivePlanCreateManyMachineInput | PreventivePlanCreateManyMachineInput[]
    skipDuplicates?: boolean
  }

  export type LocationUpsertWithoutMachinesInput = {
    update: XOR<LocationUpdateWithoutMachinesInput, LocationUncheckedUpdateWithoutMachinesInput>
    create: XOR<LocationCreateWithoutMachinesInput, LocationUncheckedCreateWithoutMachinesInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutMachinesInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutMachinesInput, LocationUncheckedUpdateWithoutMachinesInput>
  }

  export type LocationUpdateWithoutMachinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    parent?: LocationUpdateOneWithoutChildrenNestedInput
    children?: LocationUpdateManyWithoutParentNestedInput
  }

  export type LocationUncheckedUpdateWithoutMachinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: LocationUncheckedUpdateManyWithoutParentNestedInput
  }

  export type MachineDocumentUpsertWithWhereUniqueWithoutMachineInput = {
    where: MachineDocumentWhereUniqueInput
    update: XOR<MachineDocumentUpdateWithoutMachineInput, MachineDocumentUncheckedUpdateWithoutMachineInput>
    create: XOR<MachineDocumentCreateWithoutMachineInput, MachineDocumentUncheckedCreateWithoutMachineInput>
  }

  export type MachineDocumentUpdateWithWhereUniqueWithoutMachineInput = {
    where: MachineDocumentWhereUniqueInput
    data: XOR<MachineDocumentUpdateWithoutMachineInput, MachineDocumentUncheckedUpdateWithoutMachineInput>
  }

  export type MachineDocumentUpdateManyWithWhereWithoutMachineInput = {
    where: MachineDocumentScalarWhereInput
    data: XOR<MachineDocumentUpdateManyMutationInput, MachineDocumentUncheckedUpdateManyWithoutMachineInput>
  }

  export type WorkOrderUpsertWithWhereUniqueWithoutMachineInput = {
    where: WorkOrderWhereUniqueInput
    update: XOR<WorkOrderUpdateWithoutMachineInput, WorkOrderUncheckedUpdateWithoutMachineInput>
    create: XOR<WorkOrderCreateWithoutMachineInput, WorkOrderUncheckedCreateWithoutMachineInput>
  }

  export type WorkOrderUpdateWithWhereUniqueWithoutMachineInput = {
    where: WorkOrderWhereUniqueInput
    data: XOR<WorkOrderUpdateWithoutMachineInput, WorkOrderUncheckedUpdateWithoutMachineInput>
  }

  export type WorkOrderUpdateManyWithWhereWithoutMachineInput = {
    where: WorkOrderScalarWhereInput
    data: XOR<WorkOrderUpdateManyMutationInput, WorkOrderUncheckedUpdateManyWithoutMachineInput>
  }

  export type PreventivePlanUpsertWithWhereUniqueWithoutMachineInput = {
    where: PreventivePlanWhereUniqueInput
    update: XOR<PreventivePlanUpdateWithoutMachineInput, PreventivePlanUncheckedUpdateWithoutMachineInput>
    create: XOR<PreventivePlanCreateWithoutMachineInput, PreventivePlanUncheckedCreateWithoutMachineInput>
  }

  export type PreventivePlanUpdateWithWhereUniqueWithoutMachineInput = {
    where: PreventivePlanWhereUniqueInput
    data: XOR<PreventivePlanUpdateWithoutMachineInput, PreventivePlanUncheckedUpdateWithoutMachineInput>
  }

  export type PreventivePlanUpdateManyWithWhereWithoutMachineInput = {
    where: PreventivePlanScalarWhereInput
    data: XOR<PreventivePlanUpdateManyMutationInput, PreventivePlanUncheckedUpdateManyWithoutMachineInput>
  }

  export type PreventivePlanScalarWhereInput = {
    AND?: PreventivePlanScalarWhereInput | PreventivePlanScalarWhereInput[]
    OR?: PreventivePlanScalarWhereInput[]
    NOT?: PreventivePlanScalarWhereInput | PreventivePlanScalarWhereInput[]
    id?: StringFilter<"PreventivePlan"> | string
    machineId?: StringFilter<"PreventivePlan"> | string
    name?: StringFilter<"PreventivePlan"> | string
    intervalHours?: IntNullableFilter<"PreventivePlan"> | number | null
    intervalDays?: IntNullableFilter<"PreventivePlan"> | number | null
    advanceDays?: IntFilter<"PreventivePlan"> | number
    checklist?: JsonFilter<"PreventivePlan">
    isActive?: BoolFilter<"PreventivePlan"> | boolean
    lastRunAt?: DateTimeNullableFilter<"PreventivePlan"> | Date | string | null
    nextRunAt?: DateTimeNullableFilter<"PreventivePlan"> | Date | string | null
    createdAt?: DateTimeFilter<"PreventivePlan"> | Date | string
  }

  export type MachineCreateWithoutDocumentsInput = {
    id?: string
    name: string
    serialNumber: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutMachinesInput
    workOrders?: WorkOrderCreateNestedManyWithoutMachineInput
    preventivePlans?: PreventivePlanCreateNestedManyWithoutMachineInput
  }

  export type MachineUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    serialNumber: string
    locationId: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workOrders?: WorkOrderUncheckedCreateNestedManyWithoutMachineInput
    preventivePlans?: PreventivePlanUncheckedCreateNestedManyWithoutMachineInput
  }

  export type MachineCreateOrConnectWithoutDocumentsInput = {
    where: MachineWhereUniqueInput
    create: XOR<MachineCreateWithoutDocumentsInput, MachineUncheckedCreateWithoutDocumentsInput>
  }

  export type UserCreateWithoutUploadedDocumentsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    eventLogs?: EventLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUploadedDocumentsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationUncheckedCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderUncheckedCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    eventLogs?: EventLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUploadedDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUploadedDocumentsInput, UserUncheckedCreateWithoutUploadedDocumentsInput>
  }

  export type MachineUpsertWithoutDocumentsInput = {
    update: XOR<MachineUpdateWithoutDocumentsInput, MachineUncheckedUpdateWithoutDocumentsInput>
    create: XOR<MachineCreateWithoutDocumentsInput, MachineUncheckedCreateWithoutDocumentsInput>
    where?: MachineWhereInput
  }

  export type MachineUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: MachineWhereInput
    data: XOR<MachineUpdateWithoutDocumentsInput, MachineUncheckedUpdateWithoutDocumentsInput>
  }

  export type MachineUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutMachinesNestedInput
    workOrders?: WorkOrderUpdateManyWithoutMachineNestedInput
    preventivePlans?: PreventivePlanUpdateManyWithoutMachineNestedInput
  }

  export type MachineUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workOrders?: WorkOrderUncheckedUpdateManyWithoutMachineNestedInput
    preventivePlans?: PreventivePlanUncheckedUpdateManyWithoutMachineNestedInput
  }

  export type UserUpsertWithoutUploadedDocumentsInput = {
    update: XOR<UserUpdateWithoutUploadedDocumentsInput, UserUncheckedUpdateWithoutUploadedDocumentsInput>
    create: XOR<UserCreateWithoutUploadedDocumentsInput, UserUncheckedCreateWithoutUploadedDocumentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUploadedDocumentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUploadedDocumentsInput, UserUncheckedUpdateWithoutUploadedDocumentsInput>
  }

  export type UserUpdateWithoutUploadedDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    eventLogs?: EventLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUploadedDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUncheckedUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    eventLogs?: EventLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MachineCreateWithoutWorkOrdersInput = {
    id?: string
    name: string
    serialNumber: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutMachinesInput
    documents?: MachineDocumentCreateNestedManyWithoutMachineInput
    preventivePlans?: PreventivePlanCreateNestedManyWithoutMachineInput
  }

  export type MachineUncheckedCreateWithoutWorkOrdersInput = {
    id?: string
    name: string
    serialNumber: string
    locationId: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: MachineDocumentUncheckedCreateNestedManyWithoutMachineInput
    preventivePlans?: PreventivePlanUncheckedCreateNestedManyWithoutMachineInput
  }

  export type MachineCreateOrConnectWithoutWorkOrdersInput = {
    where: MachineWhereUniqueInput
    create: XOR<MachineCreateWithoutWorkOrdersInput, MachineUncheckedCreateWithoutWorkOrdersInput>
  }

  export type UserCreateWithoutReportedOrdersInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationCreateNestedManyWithoutUserInput
    assignedOrders?: WorkOrderCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReportedOrdersInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationUncheckedCreateNestedManyWithoutUserInput
    assignedOrders?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentUncheckedCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReportedOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportedOrdersInput, UserUncheckedCreateWithoutReportedOrdersInput>
  }

  export type UserCreateWithoutAssignedOrdersInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderCreateNestedManyWithoutReportedByInput
    messages?: WorkOrderMessageCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAssignedOrdersInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationUncheckedCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderUncheckedCreateNestedManyWithoutReportedByInput
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentUncheckedCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssignedOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedOrdersInput, UserUncheckedCreateWithoutAssignedOrdersInput>
  }

  export type WorkOrderMessageCreateWithoutWorkOrderInput = {
    id?: string
    content: string
    sentAt?: Date | string
    user: UserCreateNestedOneWithoutMessagesInput
  }

  export type WorkOrderMessageUncheckedCreateWithoutWorkOrderInput = {
    id?: string
    userId: string
    content: string
    sentAt?: Date | string
  }

  export type WorkOrderMessageCreateOrConnectWithoutWorkOrderInput = {
    where: WorkOrderMessageWhereUniqueInput
    create: XOR<WorkOrderMessageCreateWithoutWorkOrderInput, WorkOrderMessageUncheckedCreateWithoutWorkOrderInput>
  }

  export type WorkOrderMessageCreateManyWorkOrderInputEnvelope = {
    data: WorkOrderMessageCreateManyWorkOrderInput | WorkOrderMessageCreateManyWorkOrderInput[]
    skipDuplicates?: boolean
  }

  export type WorkOrderPartCreateWithoutWorkOrderInput = {
    id?: string
    quantity: number
    part: PartCreateNestedOneWithoutWorkOrderPartsInput
  }

  export type WorkOrderPartUncheckedCreateWithoutWorkOrderInput = {
    id?: string
    partId: string
    quantity: number
  }

  export type WorkOrderPartCreateOrConnectWithoutWorkOrderInput = {
    where: WorkOrderPartWhereUniqueInput
    create: XOR<WorkOrderPartCreateWithoutWorkOrderInput, WorkOrderPartUncheckedCreateWithoutWorkOrderInput>
  }

  export type WorkOrderPartCreateManyWorkOrderInputEnvelope = {
    data: WorkOrderPartCreateManyWorkOrderInput | WorkOrderPartCreateManyWorkOrderInput[]
    skipDuplicates?: boolean
  }

  export type ToolLoanCreateWithoutWorkOrderInput = {
    id?: string
    loanedAt?: Date | string
    returnedAt?: Date | string | null
    part: PartCreateNestedOneWithoutToolLoansInput
    user: UserCreateNestedOneWithoutToolLoansInput
  }

  export type ToolLoanUncheckedCreateWithoutWorkOrderInput = {
    id?: string
    partId: string
    userId: string
    loanedAt?: Date | string
    returnedAt?: Date | string | null
  }

  export type ToolLoanCreateOrConnectWithoutWorkOrderInput = {
    where: ToolLoanWhereUniqueInput
    create: XOR<ToolLoanCreateWithoutWorkOrderInput, ToolLoanUncheckedCreateWithoutWorkOrderInput>
  }

  export type ToolLoanCreateManyWorkOrderInputEnvelope = {
    data: ToolLoanCreateManyWorkOrderInput | ToolLoanCreateManyWorkOrderInput[]
    skipDuplicates?: boolean
  }

  export type MachineUpsertWithoutWorkOrdersInput = {
    update: XOR<MachineUpdateWithoutWorkOrdersInput, MachineUncheckedUpdateWithoutWorkOrdersInput>
    create: XOR<MachineCreateWithoutWorkOrdersInput, MachineUncheckedCreateWithoutWorkOrdersInput>
    where?: MachineWhereInput
  }

  export type MachineUpdateToOneWithWhereWithoutWorkOrdersInput = {
    where?: MachineWhereInput
    data: XOR<MachineUpdateWithoutWorkOrdersInput, MachineUncheckedUpdateWithoutWorkOrdersInput>
  }

  export type MachineUpdateWithoutWorkOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutMachinesNestedInput
    documents?: MachineDocumentUpdateManyWithoutMachineNestedInput
    preventivePlans?: PreventivePlanUpdateManyWithoutMachineNestedInput
  }

  export type MachineUncheckedUpdateWithoutWorkOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: MachineDocumentUncheckedUpdateManyWithoutMachineNestedInput
    preventivePlans?: PreventivePlanUncheckedUpdateManyWithoutMachineNestedInput
  }

  export type UserUpsertWithoutReportedOrdersInput = {
    update: XOR<UserUpdateWithoutReportedOrdersInput, UserUncheckedUpdateWithoutReportedOrdersInput>
    create: XOR<UserCreateWithoutReportedOrdersInput, UserUncheckedCreateWithoutReportedOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReportedOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReportedOrdersInput, UserUncheckedUpdateWithoutReportedOrdersInput>
  }

  export type UserUpdateWithoutReportedOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUpdateManyWithoutUserNestedInput
    assignedOrders?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReportedOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUncheckedUpdateManyWithoutUserNestedInput
    assignedOrders?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUncheckedUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutAssignedOrdersInput = {
    update: XOR<UserUpdateWithoutAssignedOrdersInput, UserUncheckedUpdateWithoutAssignedOrdersInput>
    create: XOR<UserCreateWithoutAssignedOrdersInput, UserUncheckedCreateWithoutAssignedOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedOrdersInput, UserUncheckedUpdateWithoutAssignedOrdersInput>
  }

  export type UserUpdateWithoutAssignedOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUpdateManyWithoutReportedByNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUncheckedUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUncheckedUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkOrderMessageUpsertWithWhereUniqueWithoutWorkOrderInput = {
    where: WorkOrderMessageWhereUniqueInput
    update: XOR<WorkOrderMessageUpdateWithoutWorkOrderInput, WorkOrderMessageUncheckedUpdateWithoutWorkOrderInput>
    create: XOR<WorkOrderMessageCreateWithoutWorkOrderInput, WorkOrderMessageUncheckedCreateWithoutWorkOrderInput>
  }

  export type WorkOrderMessageUpdateWithWhereUniqueWithoutWorkOrderInput = {
    where: WorkOrderMessageWhereUniqueInput
    data: XOR<WorkOrderMessageUpdateWithoutWorkOrderInput, WorkOrderMessageUncheckedUpdateWithoutWorkOrderInput>
  }

  export type WorkOrderMessageUpdateManyWithWhereWithoutWorkOrderInput = {
    where: WorkOrderMessageScalarWhereInput
    data: XOR<WorkOrderMessageUpdateManyMutationInput, WorkOrderMessageUncheckedUpdateManyWithoutWorkOrderInput>
  }

  export type WorkOrderPartUpsertWithWhereUniqueWithoutWorkOrderInput = {
    where: WorkOrderPartWhereUniqueInput
    update: XOR<WorkOrderPartUpdateWithoutWorkOrderInput, WorkOrderPartUncheckedUpdateWithoutWorkOrderInput>
    create: XOR<WorkOrderPartCreateWithoutWorkOrderInput, WorkOrderPartUncheckedCreateWithoutWorkOrderInput>
  }

  export type WorkOrderPartUpdateWithWhereUniqueWithoutWorkOrderInput = {
    where: WorkOrderPartWhereUniqueInput
    data: XOR<WorkOrderPartUpdateWithoutWorkOrderInput, WorkOrderPartUncheckedUpdateWithoutWorkOrderInput>
  }

  export type WorkOrderPartUpdateManyWithWhereWithoutWorkOrderInput = {
    where: WorkOrderPartScalarWhereInput
    data: XOR<WorkOrderPartUpdateManyMutationInput, WorkOrderPartUncheckedUpdateManyWithoutWorkOrderInput>
  }

  export type WorkOrderPartScalarWhereInput = {
    AND?: WorkOrderPartScalarWhereInput | WorkOrderPartScalarWhereInput[]
    OR?: WorkOrderPartScalarWhereInput[]
    NOT?: WorkOrderPartScalarWhereInput | WorkOrderPartScalarWhereInput[]
    id?: StringFilter<"WorkOrderPart"> | string
    workOrderId?: StringFilter<"WorkOrderPart"> | string
    partId?: StringFilter<"WorkOrderPart"> | string
    quantity?: IntFilter<"WorkOrderPart"> | number
  }

  export type ToolLoanUpsertWithWhereUniqueWithoutWorkOrderInput = {
    where: ToolLoanWhereUniqueInput
    update: XOR<ToolLoanUpdateWithoutWorkOrderInput, ToolLoanUncheckedUpdateWithoutWorkOrderInput>
    create: XOR<ToolLoanCreateWithoutWorkOrderInput, ToolLoanUncheckedCreateWithoutWorkOrderInput>
  }

  export type ToolLoanUpdateWithWhereUniqueWithoutWorkOrderInput = {
    where: ToolLoanWhereUniqueInput
    data: XOR<ToolLoanUpdateWithoutWorkOrderInput, ToolLoanUncheckedUpdateWithoutWorkOrderInput>
  }

  export type ToolLoanUpdateManyWithWhereWithoutWorkOrderInput = {
    where: ToolLoanScalarWhereInput
    data: XOR<ToolLoanUpdateManyMutationInput, ToolLoanUncheckedUpdateManyWithoutWorkOrderInput>
  }

  export type WorkOrderCreateWithoutMessagesInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    machine: MachineCreateNestedOneWithoutWorkOrdersInput
    reportedBy: UserCreateNestedOneWithoutReportedOrdersInput
    assignedTo?: UserCreateNestedOneWithoutAssignedOrdersInput
    parts?: WorkOrderPartCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderUncheckedCreateWithoutMessagesInput = {
    id?: string
    machineId: string
    reportedById: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    parts?: WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderCreateOrConnectWithoutMessagesInput = {
    where: WorkOrderWhereUniqueInput
    create: XOR<WorkOrderCreateWithoutMessagesInput, WorkOrderUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutMessagesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderCreateNestedManyWithoutAssignedToInput
    toolLoans?: ToolLoanCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationUncheckedCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderUncheckedCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentUncheckedCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type WorkOrderUpsertWithoutMessagesInput = {
    update: XOR<WorkOrderUpdateWithoutMessagesInput, WorkOrderUncheckedUpdateWithoutMessagesInput>
    create: XOR<WorkOrderCreateWithoutMessagesInput, WorkOrderUncheckedCreateWithoutMessagesInput>
    where?: WorkOrderWhereInput
  }

  export type WorkOrderUpdateToOneWithWhereWithoutMessagesInput = {
    where?: WorkOrderWhereInput
    data: XOR<WorkOrderUpdateWithoutMessagesInput, WorkOrderUncheckedUpdateWithoutMessagesInput>
  }

  export type WorkOrderUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    machine?: MachineUpdateOneRequiredWithoutWorkOrdersNestedInput
    reportedBy?: UserUpdateOneRequiredWithoutReportedOrdersNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedOrdersNestedInput
    parts?: WorkOrderPartUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parts?: WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutWorkOrderNestedInput
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUncheckedUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUncheckedUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PartCreateWithoutCategoryInput = {
    id?: string
    name: string
    stockQuantity?: number
    reorderPoint?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    qrCode?: string | null
    isActive?: boolean
    workOrderParts?: WorkOrderPartCreateNestedManyWithoutPartInput
    toolLoans?: ToolLoanCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    stockQuantity?: number
    reorderPoint?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    qrCode?: string | null
    isActive?: boolean
    workOrderParts?: WorkOrderPartUncheckedCreateNestedManyWithoutPartInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartCreateOrConnectWithoutCategoryInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutCategoryInput, PartUncheckedCreateWithoutCategoryInput>
  }

  export type PartCreateManyCategoryInputEnvelope = {
    data: PartCreateManyCategoryInput | PartCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type PartUpsertWithWhereUniqueWithoutCategoryInput = {
    where: PartWhereUniqueInput
    update: XOR<PartUpdateWithoutCategoryInput, PartUncheckedUpdateWithoutCategoryInput>
    create: XOR<PartCreateWithoutCategoryInput, PartUncheckedCreateWithoutCategoryInput>
  }

  export type PartUpdateWithWhereUniqueWithoutCategoryInput = {
    where: PartWhereUniqueInput
    data: XOR<PartUpdateWithoutCategoryInput, PartUncheckedUpdateWithoutCategoryInput>
  }

  export type PartUpdateManyWithWhereWithoutCategoryInput = {
    where: PartScalarWhereInput
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyWithoutCategoryInput>
  }

  export type PartScalarWhereInput = {
    AND?: PartScalarWhereInput | PartScalarWhereInput[]
    OR?: PartScalarWhereInput[]
    NOT?: PartScalarWhereInput | PartScalarWhereInput[]
    id?: StringFilter<"Part"> | string
    categoryId?: StringFilter<"Part"> | string
    name?: StringFilter<"Part"> | string
    stockQuantity?: IntFilter<"Part"> | number
    reorderPoint?: IntFilter<"Part"> | number
    unitPrice?: DecimalFilter<"Part"> | Decimal | DecimalJsLike | number | string
    qrCode?: StringNullableFilter<"Part"> | string | null
    isActive?: BoolFilter<"Part"> | boolean
  }

  export type PartCategoryCreateWithoutPartsInput = {
    id?: string
    name: string
  }

  export type PartCategoryUncheckedCreateWithoutPartsInput = {
    id?: string
    name: string
  }

  export type PartCategoryCreateOrConnectWithoutPartsInput = {
    where: PartCategoryWhereUniqueInput
    create: XOR<PartCategoryCreateWithoutPartsInput, PartCategoryUncheckedCreateWithoutPartsInput>
  }

  export type WorkOrderPartCreateWithoutPartInput = {
    id?: string
    quantity: number
    workOrder: WorkOrderCreateNestedOneWithoutPartsInput
  }

  export type WorkOrderPartUncheckedCreateWithoutPartInput = {
    id?: string
    workOrderId: string
    quantity: number
  }

  export type WorkOrderPartCreateOrConnectWithoutPartInput = {
    where: WorkOrderPartWhereUniqueInput
    create: XOR<WorkOrderPartCreateWithoutPartInput, WorkOrderPartUncheckedCreateWithoutPartInput>
  }

  export type WorkOrderPartCreateManyPartInputEnvelope = {
    data: WorkOrderPartCreateManyPartInput | WorkOrderPartCreateManyPartInput[]
    skipDuplicates?: boolean
  }

  export type ToolLoanCreateWithoutPartInput = {
    id?: string
    loanedAt?: Date | string
    returnedAt?: Date | string | null
    user: UserCreateNestedOneWithoutToolLoansInput
    workOrder?: WorkOrderCreateNestedOneWithoutToolLoansInput
  }

  export type ToolLoanUncheckedCreateWithoutPartInput = {
    id?: string
    userId: string
    workOrderId?: string | null
    loanedAt?: Date | string
    returnedAt?: Date | string | null
  }

  export type ToolLoanCreateOrConnectWithoutPartInput = {
    where: ToolLoanWhereUniqueInput
    create: XOR<ToolLoanCreateWithoutPartInput, ToolLoanUncheckedCreateWithoutPartInput>
  }

  export type ToolLoanCreateManyPartInputEnvelope = {
    data: ToolLoanCreateManyPartInput | ToolLoanCreateManyPartInput[]
    skipDuplicates?: boolean
  }

  export type PartCategoryUpsertWithoutPartsInput = {
    update: XOR<PartCategoryUpdateWithoutPartsInput, PartCategoryUncheckedUpdateWithoutPartsInput>
    create: XOR<PartCategoryCreateWithoutPartsInput, PartCategoryUncheckedCreateWithoutPartsInput>
    where?: PartCategoryWhereInput
  }

  export type PartCategoryUpdateToOneWithWhereWithoutPartsInput = {
    where?: PartCategoryWhereInput
    data: XOR<PartCategoryUpdateWithoutPartsInput, PartCategoryUncheckedUpdateWithoutPartsInput>
  }

  export type PartCategoryUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PartCategoryUncheckedUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type WorkOrderPartUpsertWithWhereUniqueWithoutPartInput = {
    where: WorkOrderPartWhereUniqueInput
    update: XOR<WorkOrderPartUpdateWithoutPartInput, WorkOrderPartUncheckedUpdateWithoutPartInput>
    create: XOR<WorkOrderPartCreateWithoutPartInput, WorkOrderPartUncheckedCreateWithoutPartInput>
  }

  export type WorkOrderPartUpdateWithWhereUniqueWithoutPartInput = {
    where: WorkOrderPartWhereUniqueInput
    data: XOR<WorkOrderPartUpdateWithoutPartInput, WorkOrderPartUncheckedUpdateWithoutPartInput>
  }

  export type WorkOrderPartUpdateManyWithWhereWithoutPartInput = {
    where: WorkOrderPartScalarWhereInput
    data: XOR<WorkOrderPartUpdateManyMutationInput, WorkOrderPartUncheckedUpdateManyWithoutPartInput>
  }

  export type ToolLoanUpsertWithWhereUniqueWithoutPartInput = {
    where: ToolLoanWhereUniqueInput
    update: XOR<ToolLoanUpdateWithoutPartInput, ToolLoanUncheckedUpdateWithoutPartInput>
    create: XOR<ToolLoanCreateWithoutPartInput, ToolLoanUncheckedCreateWithoutPartInput>
  }

  export type ToolLoanUpdateWithWhereUniqueWithoutPartInput = {
    where: ToolLoanWhereUniqueInput
    data: XOR<ToolLoanUpdateWithoutPartInput, ToolLoanUncheckedUpdateWithoutPartInput>
  }

  export type ToolLoanUpdateManyWithWhereWithoutPartInput = {
    where: ToolLoanScalarWhereInput
    data: XOR<ToolLoanUpdateManyMutationInput, ToolLoanUncheckedUpdateManyWithoutPartInput>
  }

  export type WorkOrderCreateWithoutPartsInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    machine: MachineCreateNestedOneWithoutWorkOrdersInput
    reportedBy: UserCreateNestedOneWithoutReportedOrdersInput
    assignedTo?: UserCreateNestedOneWithoutAssignedOrdersInput
    messages?: WorkOrderMessageCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderUncheckedCreateWithoutPartsInput = {
    id?: string
    machineId: string
    reportedById: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutWorkOrderInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderCreateOrConnectWithoutPartsInput = {
    where: WorkOrderWhereUniqueInput
    create: XOR<WorkOrderCreateWithoutPartsInput, WorkOrderUncheckedCreateWithoutPartsInput>
  }

  export type PartCreateWithoutWorkOrderPartsInput = {
    id?: string
    name: string
    stockQuantity?: number
    reorderPoint?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    qrCode?: string | null
    isActive?: boolean
    category: PartCategoryCreateNestedOneWithoutPartsInput
    toolLoans?: ToolLoanCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateWithoutWorkOrderPartsInput = {
    id?: string
    categoryId: string
    name: string
    stockQuantity?: number
    reorderPoint?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    qrCode?: string | null
    isActive?: boolean
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartCreateOrConnectWithoutWorkOrderPartsInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutWorkOrderPartsInput, PartUncheckedCreateWithoutWorkOrderPartsInput>
  }

  export type WorkOrderUpsertWithoutPartsInput = {
    update: XOR<WorkOrderUpdateWithoutPartsInput, WorkOrderUncheckedUpdateWithoutPartsInput>
    create: XOR<WorkOrderCreateWithoutPartsInput, WorkOrderUncheckedCreateWithoutPartsInput>
    where?: WorkOrderWhereInput
  }

  export type WorkOrderUpdateToOneWithWhereWithoutPartsInput = {
    where?: WorkOrderWhereInput
    data: XOR<WorkOrderUpdateWithoutPartsInput, WorkOrderUncheckedUpdateWithoutPartsInput>
  }

  export type WorkOrderUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    machine?: MachineUpdateOneRequiredWithoutWorkOrdersNestedInput
    reportedBy?: UserUpdateOneRequiredWithoutReportedOrdersNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedOrdersNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderUncheckedUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutWorkOrderNestedInput
  }

  export type PartUpsertWithoutWorkOrderPartsInput = {
    update: XOR<PartUpdateWithoutWorkOrderPartsInput, PartUncheckedUpdateWithoutWorkOrderPartsInput>
    create: XOR<PartCreateWithoutWorkOrderPartsInput, PartUncheckedCreateWithoutWorkOrderPartsInput>
    where?: PartWhereInput
  }

  export type PartUpdateToOneWithWhereWithoutWorkOrderPartsInput = {
    where?: PartWhereInput
    data: XOR<PartUpdateWithoutWorkOrderPartsInput, PartUncheckedUpdateWithoutWorkOrderPartsInput>
  }

  export type PartUpdateWithoutWorkOrderPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    category?: PartCategoryUpdateOneRequiredWithoutPartsNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateWithoutWorkOrderPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutPartNestedInput
  }

  export type PartCreateWithoutToolLoansInput = {
    id?: string
    name: string
    stockQuantity?: number
    reorderPoint?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    qrCode?: string | null
    isActive?: boolean
    category: PartCategoryCreateNestedOneWithoutPartsInput
    workOrderParts?: WorkOrderPartCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateWithoutToolLoansInput = {
    id?: string
    categoryId: string
    name: string
    stockQuantity?: number
    reorderPoint?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    qrCode?: string | null
    isActive?: boolean
    workOrderParts?: WorkOrderPartUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartCreateOrConnectWithoutToolLoansInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutToolLoansInput, PartUncheckedCreateWithoutToolLoansInput>
  }

  export type UserCreateWithoutToolLoansInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutToolLoansInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationUncheckedCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderUncheckedCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentUncheckedCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutToolLoansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutToolLoansInput, UserUncheckedCreateWithoutToolLoansInput>
  }

  export type WorkOrderCreateWithoutToolLoansInput = {
    id?: string
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    machine: MachineCreateNestedOneWithoutWorkOrdersInput
    reportedBy: UserCreateNestedOneWithoutReportedOrdersInput
    assignedTo?: UserCreateNestedOneWithoutAssignedOrdersInput
    messages?: WorkOrderMessageCreateNestedManyWithoutWorkOrderInput
    parts?: WorkOrderPartCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderUncheckedCreateWithoutToolLoansInput = {
    id?: string
    machineId: string
    reportedById: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutWorkOrderInput
    parts?: WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput
  }

  export type WorkOrderCreateOrConnectWithoutToolLoansInput = {
    where: WorkOrderWhereUniqueInput
    create: XOR<WorkOrderCreateWithoutToolLoansInput, WorkOrderUncheckedCreateWithoutToolLoansInput>
  }

  export type PartUpsertWithoutToolLoansInput = {
    update: XOR<PartUpdateWithoutToolLoansInput, PartUncheckedUpdateWithoutToolLoansInput>
    create: XOR<PartCreateWithoutToolLoansInput, PartUncheckedCreateWithoutToolLoansInput>
    where?: PartWhereInput
  }

  export type PartUpdateToOneWithWhereWithoutToolLoansInput = {
    where?: PartWhereInput
    data: XOR<PartUpdateWithoutToolLoansInput, PartUncheckedUpdateWithoutToolLoansInput>
  }

  export type PartUpdateWithoutToolLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    category?: PartCategoryUpdateOneRequiredWithoutPartsNestedInput
    workOrderParts?: WorkOrderPartUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateWithoutToolLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    workOrderParts?: WorkOrderPartUncheckedUpdateManyWithoutPartNestedInput
  }

  export type UserUpsertWithoutToolLoansInput = {
    update: XOR<UserUpdateWithoutToolLoansInput, UserUncheckedUpdateWithoutToolLoansInput>
    create: XOR<UserCreateWithoutToolLoansInput, UserUncheckedCreateWithoutToolLoansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutToolLoansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutToolLoansInput, UserUncheckedUpdateWithoutToolLoansInput>
  }

  export type UserUpdateWithoutToolLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutToolLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUncheckedUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUncheckedUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkOrderUpsertWithoutToolLoansInput = {
    update: XOR<WorkOrderUpdateWithoutToolLoansInput, WorkOrderUncheckedUpdateWithoutToolLoansInput>
    create: XOR<WorkOrderCreateWithoutToolLoansInput, WorkOrderUncheckedCreateWithoutToolLoansInput>
    where?: WorkOrderWhereInput
  }

  export type WorkOrderUpdateToOneWithWhereWithoutToolLoansInput = {
    where?: WorkOrderWhereInput
    data: XOR<WorkOrderUpdateWithoutToolLoansInput, WorkOrderUncheckedUpdateWithoutToolLoansInput>
  }

  export type WorkOrderUpdateWithoutToolLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    machine?: MachineUpdateOneRequiredWithoutWorkOrdersNestedInput
    reportedBy?: UserUpdateOneRequiredWithoutReportedOrdersNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedOrdersNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutWorkOrderNestedInput
    parts?: WorkOrderPartUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderUncheckedUpdateWithoutToolLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutWorkOrderNestedInput
    parts?: WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput
  }

  export type MachineCreateWithoutPreventivePlansInput = {
    id?: string
    name: string
    serialNumber: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutMachinesInput
    documents?: MachineDocumentCreateNestedManyWithoutMachineInput
    workOrders?: WorkOrderCreateNestedManyWithoutMachineInput
  }

  export type MachineUncheckedCreateWithoutPreventivePlansInput = {
    id?: string
    name: string
    serialNumber: string
    locationId: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: MachineDocumentUncheckedCreateNestedManyWithoutMachineInput
    workOrders?: WorkOrderUncheckedCreateNestedManyWithoutMachineInput
  }

  export type MachineCreateOrConnectWithoutPreventivePlansInput = {
    where: MachineWhereUniqueInput
    create: XOR<MachineCreateWithoutPreventivePlansInput, MachineUncheckedCreateWithoutPreventivePlansInput>
  }

  export type MachineUpsertWithoutPreventivePlansInput = {
    update: XOR<MachineUpdateWithoutPreventivePlansInput, MachineUncheckedUpdateWithoutPreventivePlansInput>
    create: XOR<MachineCreateWithoutPreventivePlansInput, MachineUncheckedCreateWithoutPreventivePlansInput>
    where?: MachineWhereInput
  }

  export type MachineUpdateToOneWithWhereWithoutPreventivePlansInput = {
    where?: MachineWhereInput
    data: XOR<MachineUpdateWithoutPreventivePlansInput, MachineUncheckedUpdateWithoutPreventivePlansInput>
  }

  export type MachineUpdateWithoutPreventivePlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutMachinesNestedInput
    documents?: MachineDocumentUpdateManyWithoutMachineNestedInput
    workOrders?: WorkOrderUpdateManyWithoutMachineNestedInput
  }

  export type MachineUncheckedUpdateWithoutPreventivePlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: MachineDocumentUncheckedUpdateManyWithoutMachineNestedInput
    workOrders?: WorkOrderUncheckedUpdateManyWithoutMachineNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationUncheckedCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderUncheckedCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentUncheckedCreateNestedManyWithoutUploadedByInput
    eventLogs?: EventLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUncheckedUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUncheckedUpdateManyWithoutUploadedByNestedInput
    eventLogs?: EventLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEventLogsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentCreateNestedManyWithoutUploadedByInput
  }

  export type UserUncheckedCreateWithoutEventLogsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: CertificationUncheckedCreateNestedManyWithoutUserInput
    reportedOrders?: WorkOrderUncheckedCreateNestedManyWithoutReportedByInput
    assignedOrders?: WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput
    messages?: WorkOrderMessageUncheckedCreateNestedManyWithoutUserInput
    toolLoans?: ToolLoanUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    uploadedDocuments?: MachineDocumentUncheckedCreateNestedManyWithoutUploadedByInput
  }

  export type UserCreateOrConnectWithoutEventLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventLogsInput, UserUncheckedCreateWithoutEventLogsInput>
  }

  export type UserUpsertWithoutEventLogsInput = {
    update: XOR<UserUpdateWithoutEventLogsInput, UserUncheckedUpdateWithoutEventLogsInput>
    create: XOR<UserCreateWithoutEventLogsInput, UserUncheckedCreateWithoutEventLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventLogsInput, UserUncheckedUpdateWithoutEventLogsInput>
  }

  export type UserUpdateWithoutEventLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUpdateManyWithoutUploadedByNestedInput
  }

  export type UserUncheckedUpdateWithoutEventLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: CertificationUncheckedUpdateManyWithoutUserNestedInput
    reportedOrders?: WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput
    assignedOrders?: WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutUserNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    uploadedDocuments?: MachineDocumentUncheckedUpdateManyWithoutUploadedByNestedInput
  }

  export type CertificationCreateManyUserInput = {
    id?: string
    type: $Enums.CertificationType
    issuedAt: Date | string
    expiresAt: Date | string
    isValid?: boolean
    createdAt?: Date | string
  }

  export type WorkOrderCreateManyReportedByInput = {
    id?: string
    machineId: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type WorkOrderCreateManyAssignedToInput = {
    id?: string
    machineId: string
    reportedById: string
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type WorkOrderMessageCreateManyUserInput = {
    id?: string
    workOrderId: string
    content: string
    sentAt?: Date | string
  }

  export type ToolLoanCreateManyUserInput = {
    id?: string
    partId: string
    workOrderId?: string | null
    loanedAt?: Date | string
    returnedAt?: Date | string | null
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    type: $Enums.NotificationType
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MachineDocumentCreateManyUploadedByInput = {
    id?: string
    machineId: string
    filename: string
    filePath: string
    version?: number
    isLatest?: boolean
    uploadedAt?: Date | string
  }

  export type EventLogCreateManyUserInput = {
    id?: string
    action: string
    entityType?: string | null
    entityId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type CertificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderUpdateWithoutReportedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    machine?: MachineUpdateOneRequiredWithoutWorkOrdersNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedOrdersNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutWorkOrderNestedInput
    parts?: WorkOrderPartUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderUncheckedUpdateWithoutReportedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutWorkOrderNestedInput
    parts?: WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderUncheckedUpdateManyWithoutReportedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    machine?: MachineUpdateOneRequiredWithoutWorkOrdersNestedInput
    reportedBy?: UserUpdateOneRequiredWithoutReportedOrdersNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutWorkOrderNestedInput
    parts?: WorkOrderPartUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderUncheckedUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutWorkOrderNestedInput
    parts?: WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderUncheckedUpdateManyWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderMessageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workOrder?: WorkOrderUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type WorkOrderMessageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    workOrderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderMessageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    workOrderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ToolLoanUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    part?: PartUpdateOneRequiredWithoutToolLoansNestedInput
    workOrder?: WorkOrderUpdateOneWithoutToolLoansNestedInput
  }

  export type ToolLoanUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    workOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ToolLoanUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    workOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MachineDocumentUpdateWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    machine?: MachineUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type MachineDocumentUncheckedUpdateWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MachineDocumentUncheckedUpdateManyWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    machineId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateManyParentInput = {
    id?: string
    name: string
    type: $Enums.LocationType
  }

  export type MachineCreateManyLocationInput = {
    id?: string
    name: string
    serialNumber: string
    operatingHours?: number
    purchaseDate: Date | string
    purchasePrice: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    children?: LocationUpdateManyWithoutParentNestedInput
    machines?: MachineUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    children?: LocationUncheckedUpdateManyWithoutParentNestedInput
    machines?: MachineUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
  }

  export type MachineUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: MachineDocumentUpdateManyWithoutMachineNestedInput
    workOrders?: WorkOrderUpdateManyWithoutMachineNestedInput
    preventivePlans?: PreventivePlanUpdateManyWithoutMachineNestedInput
  }

  export type MachineUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: MachineDocumentUncheckedUpdateManyWithoutMachineNestedInput
    workOrders?: WorkOrderUncheckedUpdateManyWithoutMachineNestedInput
    preventivePlans?: PreventivePlanUncheckedUpdateManyWithoutMachineNestedInput
  }

  export type MachineUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    operatingHours?: FloatFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MachineDocumentCreateManyMachineInput = {
    id?: string
    uploadedById: string
    filename: string
    filePath: string
    version?: number
    isLatest?: boolean
    uploadedAt?: Date | string
  }

  export type WorkOrderCreateManyMachineInput = {
    id?: string
    reportedById: string
    assignedToId?: string | null
    status?: $Enums.WorkOrderStatus
    priority?: $Enums.Priority
    title: string
    description: string
    bhpConfirmed?: boolean
    laborCost?: Decimal | DecimalJsLike | number | string
    partsCost?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    startedAt?: Date | string | null
    closedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type PreventivePlanCreateManyMachineInput = {
    id?: string
    name: string
    intervalHours?: number | null
    intervalDays?: number | null
    advanceDays?: number
    checklist: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    createdAt?: Date | string
  }

  export type MachineDocumentUpdateWithoutMachineInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: UserUpdateOneRequiredWithoutUploadedDocumentsNestedInput
  }

  export type MachineDocumentUncheckedUpdateWithoutMachineInput = {
    id?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MachineDocumentUncheckedUpdateManyWithoutMachineInput = {
    id?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderUpdateWithoutMachineInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportedBy?: UserUpdateOneRequiredWithoutReportedOrdersNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedOrdersNestedInput
    messages?: WorkOrderMessageUpdateManyWithoutWorkOrderNestedInput
    parts?: WorkOrderPartUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderUncheckedUpdateWithoutMachineInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: WorkOrderMessageUncheckedUpdateManyWithoutWorkOrderNestedInput
    parts?: WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutWorkOrderNestedInput
  }

  export type WorkOrderUncheckedUpdateManyWithoutMachineInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportedById?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    bhpConfirmed?: BoolFieldUpdateOperationsInput | boolean
    laborCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    partsCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreventivePlanUpdateWithoutMachineInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    intervalHours?: NullableIntFieldUpdateOperationsInput | number | null
    intervalDays?: NullableIntFieldUpdateOperationsInput | number | null
    advanceDays?: IntFieldUpdateOperationsInput | number
    checklist?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreventivePlanUncheckedUpdateWithoutMachineInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    intervalHours?: NullableIntFieldUpdateOperationsInput | number | null
    intervalDays?: NullableIntFieldUpdateOperationsInput | number | null
    advanceDays?: IntFieldUpdateOperationsInput | number
    checklist?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreventivePlanUncheckedUpdateManyWithoutMachineInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    intervalHours?: NullableIntFieldUpdateOperationsInput | number | null
    intervalDays?: NullableIntFieldUpdateOperationsInput | number | null
    advanceDays?: IntFieldUpdateOperationsInput | number
    checklist?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderMessageCreateManyWorkOrderInput = {
    id?: string
    userId: string
    content: string
    sentAt?: Date | string
  }

  export type WorkOrderPartCreateManyWorkOrderInput = {
    id?: string
    partId: string
    quantity: number
  }

  export type ToolLoanCreateManyWorkOrderInput = {
    id?: string
    partId: string
    userId: string
    loanedAt?: Date | string
    returnedAt?: Date | string | null
  }

  export type WorkOrderMessageUpdateWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type WorkOrderMessageUncheckedUpdateWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderMessageUncheckedUpdateManyWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkOrderPartUpdateWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    part?: PartUpdateOneRequiredWithoutWorkOrderPartsNestedInput
  }

  export type WorkOrderPartUncheckedUpdateWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type WorkOrderPartUncheckedUpdateManyWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type ToolLoanUpdateWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    part?: PartUpdateOneRequiredWithoutToolLoansNestedInput
    user?: UserUpdateOneRequiredWithoutToolLoansNestedInput
  }

  export type ToolLoanUncheckedUpdateWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ToolLoanUncheckedUpdateManyWithoutWorkOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PartCreateManyCategoryInput = {
    id?: string
    name: string
    stockQuantity?: number
    reorderPoint?: number
    unitPrice: Decimal | DecimalJsLike | number | string
    qrCode?: string | null
    isActive?: boolean
  }

  export type PartUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    workOrderParts?: WorkOrderPartUpdateManyWithoutPartNestedInput
    toolLoans?: ToolLoanUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    workOrderParts?: WorkOrderPartUncheckedUpdateManyWithoutPartNestedInput
    toolLoans?: ToolLoanUncheckedUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    reorderPoint?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WorkOrderPartCreateManyPartInput = {
    id?: string
    workOrderId: string
    quantity: number
  }

  export type ToolLoanCreateManyPartInput = {
    id?: string
    userId: string
    workOrderId?: string | null
    loanedAt?: Date | string
    returnedAt?: Date | string | null
  }

  export type WorkOrderPartUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    workOrder?: WorkOrderUpdateOneRequiredWithoutPartsNestedInput
  }

  export type WorkOrderPartUncheckedUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    workOrderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type WorkOrderPartUncheckedUpdateManyWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    workOrderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type ToolLoanUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutToolLoansNestedInput
    workOrder?: WorkOrderUpdateOneWithoutToolLoansNestedInput
  }

  export type ToolLoanUncheckedUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ToolLoanUncheckedUpdateManyWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    loanedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}