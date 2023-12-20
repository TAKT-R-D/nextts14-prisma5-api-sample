// handle request query: page, limit, orderby
export async function getCommonQuery(searchParams: URLSearchParams) {
  let commonQueries = {};
  // limit
  const limit: number =
    searchParams.get('limit') && !isNaN(Number(searchParams.get('limit')))
      ? Number(searchParams.get('limit'))
      : 100;
  commonQueries = { ...commonQueries, take: limit };

  // page
  const page = searchParams.get('page');
  if (page && !isNaN(Number(page))) {
    const offset = limit * (Number(page) - 1);
    commonQueries = { ...commonQueries, skip: offset };
  }

  // orderby ex orderby=createdAt:desc,updatedAt:asc
  const orderby = searchParams.get('orderby');
  if (orderby) {
    const orderbys = orderby.split(',');
    const orderBy = orderbys.map((o) => {
      const [key, order] = o.split(':');
      return { [key]: order };
    });
    commonQueries = { ...commonQueries, orderBy };
  }

  return commonQueries;
}
