import { PrismaClient, Role } from "@prisma/client";

export async function GET (req: Request, params: { patientId: number}) {
    try {
        const prisma = new PrismaClient()
        const patient = await prisma.patient.findFirst({
            where: {
                patientId: params.patientId,
            }
        })
        return Response.json(patient, { status: 200})
    } catch (error) {
        console.log("patient | GET :", error)
        return new Response("Internal Server error", {status: 500})
    }
    
}

export async function PATCH (req: Request, params: { patientId: number}) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const patient = await prisma.patient.update({
            where: {
                patientId: params.patientId,
            },
            data: {
                ...data
            }
        })
        return Response.json(patient, { status: 200})
    } catch (error) {
        console.log("patient | PATCH :", error)
        return new Response("Internal Server error", {status: 500})
    }  
}

export async function DELETE (req: Request, params: { patientId: number}) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const patient = await prisma.patient.delete({
            where: {
                patientId: params.patientId,
                ...data
            },
        })
        return Response.json(patient, { status: 200})
    } catch (error) {
        console.log("patient | DELETE :", error)
        return new Response("Internal Server error", {status: 500})
    }  
}