import { NextResponse } from 'next/server';
import { prisma } from '@/lib/Prisma';
import type { UserType, ErrorType } from '@/types';

export async function GET(request: Request) {
  // TODO: query parameter の取得と、validation

  let statusCode = 200;
  // TODO: type の指定
  // TODO: Prisma Query の build
  const res = await prisma.user
    .findMany({
      include: {
        posts: {
          orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
          select: {
            id: true,
            title: true,
            createdAt: true,
          },
        },
        bookmarks: {
          select: { postId: true },
        },
        _count: {
          select: {
            posts: true,
            bookmarks: true,
          },
        },
      },
    })
    .catch((err) => {
      console.error(err);
      // TODO: Prisma Error handling
      statusCode = err.status | 500;
      return { error: 'Failed to fetch' };
    });
  const totalCount = await prisma.user.aggregate({ _count: true });

  return NextResponse.json(res, {
    headers: {
      'x-total-count': String(totalCount._count),
    },
    status: statusCode,
  });
}

export async function POST(request: Request) {
  const { userName, imageUrl }: Partial<UserType> = await request.json();

  if (!userName)
    return NextResponse.json(
      { message: 'Missing required data' },
      { status: 400 }
    );
  let statusCode = 200;

  const res = await prisma.user
    .create({
      data: {
        userName,
        imageUrl: imageUrl || null,
      },
    })
    .catch((err) => {
      console.error(err);
      // TODO: Prisma Error handling
      statusCode = err.status | 500;
      return { error: 'Failed to fetch' };
    });

  return NextResponse.json(res, { status: statusCode });
}

export async function DELETE(request: Request) {
  const { id }: Partial<UserType> = await request.json();

  if (!id)
    return NextResponse.json(
      { message: 'Missing required data' },
      { status: 400 }
    );
  let statusCode = 204;

  const res = await prisma.user
    .delete({
      where: {
        id,
      },
    })
    .then(() => {
      return null;
    })
    .catch((err) => {
      console.error(err);
      // TODO: Prisma Error handling
      statusCode = err.status | 500;
      return { error: 'Failed to fetch' };
    });

  if (statusCode === 204) {
    return new Response(null, { status: 204 });
  } else {
    return NextResponse.json(res, { status: statusCode });
  }
}
