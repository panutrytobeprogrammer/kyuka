import { NextResponse } from "next/server";

export interface Response<T>
  extends NextResponse<{ code: number; message: string; data: T }> {}

export const successResponse = <T>(data: T): Response<T> => {
  return NextResponse.json({
    code: 0,
    message: "success",
    data,
  });
};

export const errorResponse = <T>(data: T): Response<T> => {
  return NextResponse.json(
    {
      code: 1,
      message: "error",
      data,
    },
    { status: 500 }
  );
};

export const notFoundResponse = <T>(data: T): Response<T> => {
  return NextResponse.json(
    {
      code: 2,
      message: "not found",
      data,
    },
    { status: 404 }
  );
};

export const badRequestResponse = <T>(data: T): Response<T> => {
  return NextResponse.json(
    {
      code: 3,
      message: "bad request",
      data,
    },
    { status: 400 }
  );
};

export const unauthorizedResponse = <T>(data: T): Response<T> => {
  return NextResponse.json(
    {
      code: 4,
      message: "unauthorized",
      data,
    },
    { status: 401 }
  );
};
