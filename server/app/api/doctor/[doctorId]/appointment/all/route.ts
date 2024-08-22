import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const prisma = new PrismaClient();
        const appointments = await prisma.appointment.findMany();
        await prisma.$disconnect();
        return NextResponse.json(appointments, { status: 200 });
    } catch (error) {
        console.log("Error fetching appointment:", error);
        return NextResponse.json({ error: "Failed to fetch appointment" }, { status: 500 });
    }
}