import { IPagination } from './pagination';
import { IAnyRelation } from './relations';

export type IParser<CompleteType, QueriedType> = CompleteType extends Array<infer A>
  ? IPagination<IIParser<A, QueriedType>>
  : IIParser<CompleteType, QueriedType>;

type IIParser<CompleteType, QueriedType> = {
  [K in keyof QueriedType]: K extends keyof CompleteType
    ? CompleteType[K] extends IAnyRelation<any, any>
      ? IIParser<CompleteType[K], QueriedType[K]>
      : CompleteType[K]
    : never;
};
