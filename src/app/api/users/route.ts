import { container } from "@/server/container";
import GetAllUsersController from "@/server/controllers/GetAllUsersController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userRepository } = container();
    const getAllUsersController = new GetAllUsersController({ userRepository });
    const users = await getAllUsersController.execute();
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
