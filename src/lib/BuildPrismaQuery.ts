import { getCommonQuery } from './CommonQueryHandler';
import { isEmptyObject } from './Utils';

function _mergeQuery(orgQuery: Object, key: string, value: Object): Object {
  if (!isEmptyObject(value)) {
    return { ...orgQuery, [key]: value };
  } else {
    return orgQuery;
  }
}

export async function getPrismaFindUniqueQuery(
  select: Object,
  include: Object
): Promise<Object> {
  let findQuery = {};

  // select, include
  findQuery = _mergeQuery(findQuery, 'select', select);
  findQuery = _mergeQuery(findQuery, 'include', include);

  return findQuery;
}

export async function getPrismaFindManyQuery(
  select: Object,
  include: Object,
  searchParams: URLSearchParams
): Promise<Object> {
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
