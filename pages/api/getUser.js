import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res){
    if(req.method === 'POST'){
        const cdata = req.body
        const user = await prisma.user.findUnique({
            where : {
                email: cdata.email
            }
        })
        if(user){
            return res.status(200).json(user.score)
        }
    }
}