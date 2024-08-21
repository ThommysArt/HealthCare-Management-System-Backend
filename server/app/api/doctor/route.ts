import { PrismaClient, Role } from "@prisma/client";
import { saltAndHashPassword } from "@/lib/password";
import bcrypt from "bcrypt";

export async function PATCH (req: Request) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const user = await prisma.user.findFirst({
            where: {
                email: data.email,
            }
        })

        if (user && bcrypt.compareSync(data.password, user.password)) {
            const doctor = await prisma.doctor.findFirst({
                where: {
                    userId: user.userId,
                }
            })
            return Response.json(doctor, { status: 200})
        } else {
            return Response.json({ message: "Invalid email or password" }, { status: 401 })
        }
    } catch (error) {
        console.log("DOCTOR | GET :", error)
        return new Response("Internal Server error", {status: 500})
    }
}



export async function POST (req: Request) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const user = await prisma.user.create({
            data: {
                ...data,
                role: Role.DOCTOR,
                password: await saltAndHashPassword(data.password),
            }
        })
        const doctor = await prisma.doctor.create({
            data: {
                userId: user.userId
            }
        })
        return Response.json(doctor, { status: 201})
    } catch (error) {
        console.log("DOCTOR | POST :", error)
        return new Response("Internal Server error", {status: 500})
    }
}
