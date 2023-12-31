import { getCommonQuery } from './CommonQueryHandler';
import { isEmptyObject } from './Utils';

function _mergeQuery(orgQuery: object, key: string, value: object): object {
  if (!isEmptyObject(value)) {
    return { ...orgQuery, [key]: value };
  } else {
    return orgQuery;
  }
}

export async function getPrismaFindUniqueQuery(
  select: object,
  include: object
): Promise<object> {
  let findQuery = {};

  // select, include
  findQuery = _mergeQuery(findQuery, 'select', select);
  findQuery = _mergeQuery(findQuery, 'include', include);

  return findQuery;
}

export async function getPrismaFindManyQuery(
  select: object,
  include: object,
  searchParams: URLSearchParams
): Promise<object> {
  let findQuery = {};

  // select, include
  findQuery = await getPrismaFindUniqueQuery(select, include);

  // skip, take, orderBy
  const commonQueries = await getCommonQuery(searchParams);
  if (!isEmptyObject(commonQueries)) {
    findQuery = { ...findQuery, ...commonQueries };
  }

  // TODO: where

  return findQuery;
}
