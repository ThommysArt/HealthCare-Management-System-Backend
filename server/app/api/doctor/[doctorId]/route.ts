import { PrismaClient, Role } from "@prisma/client";

export async function GET (req: Request, params: { doctorId: number}) {
    try {
        const prisma = new PrismaClient()
        const doctor = await prisma.doctor.findFirst({
            where: {
                doctorId: params.doctorId,
            }
        })
        return Response.json(doctor, { status: 200})
    } catch (error) {
        console.log("DOCTOR | GET :", error)
        return new Response("Internal Server error", {status: 500})
    }
    
}


export async function DELETE (req: Request, params: { doctorId: number}) {
    try {
        const prisma = new PrismaClient()
        const doctor = await prisma.doctor.delete({
            where: {
                doctorId: params.doctorId,
            },
        })
        return Response.json(doctor, { status: 200})
    } catch (error) {
        console.log("DOCTOR | DELETE :", error)
        return new Response("Internal Server error", {status: 500})
    }  
}