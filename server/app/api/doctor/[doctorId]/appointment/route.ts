import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Create Appointment
export async function POST(req: NextRequest) {
    try {
        const prisma = new PrismaClient();
        const data = await req.json();
        const newAppointment = await prisma.appointment.create({
            data: { ...data }
        });
        await prisma.$disconnect();
        return NextResponse.json(newAppointment, { status: 201 });
    } catch (error) {
        console.log("Error creating appointment:", error);
        return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
    }
}

// View Appointment
export async function PATCH(req: NextRequest) {
    try {
        const prisma = new PrismaClient();
        const data = await req.json();
        const appointment = await prisma.appointment.findFirst({
            where: { ...data }
        });
        await prisma.$disconnect();
        return NextResponse.json(appointment, { status: 200 });
    } catch (error) {
        console.log("Error fetching appointment:", error);
        return NextResponse.json({ error: "Failed to fetch appointment" }, { status: 500 });
    }
}