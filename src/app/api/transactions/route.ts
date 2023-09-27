import { container } from "@/server/container";
import GetAllTransactionsController from "@/server/controllers/GetAllTransactionsController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { transactionRepository } = container();
    const getAllTransactionsController = new GetAllTransactionsController({ transactionRepository });
    const transactions = await getAllTransactionsController.execute();
    return NextResponse.json({ success: true, transactions }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
