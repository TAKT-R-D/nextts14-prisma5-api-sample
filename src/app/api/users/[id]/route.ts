import { prisma } from '@/lib/Prisma';
import { NextResponse } from 'next/server';
import type { UserType, ErrorType } from '@/types';

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params: { id } }: Props) {
  let statusCode = 200;
  const res = await prisma.user
    .findUnique({
      where: {
        id: +id,
      },
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

  return NextResponse.json(res, { status: statusCode });
}

export async function PUT(request: Request, { params: { id } }: Props) {
  const { userName, imageUrl }: Partial<UserType> = await request.json();
  let statusCode = 200;

  if (!userName && !imageUrl) {
    return NextResponse.json(
      { message: 'Missing required data' },
      { status: 400 }
    );
  }

  let data = {};
  if (userName) data = { ...data, userName };
  if (imageUrl) data = { ...data, imageUrl };

  const res = await prisma.user
    .update({
      where: {
        id: +id,
      },
      data,
    })
    .catch((err) => {
      console.error(err);
      statusCode = err.status | 500;
      return { error: 'Failed to fetch' };
    });

  return NextResponse.json(res, { status: statusCode });
}
