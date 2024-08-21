import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST (req: NextRequest) {
    const prisma = new PrismaClient()
    const data = await req.json()
    const user = prisma.user.create({
        data: {...data}
    })
    return user
}