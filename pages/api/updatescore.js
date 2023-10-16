import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res){
    if(req.method === 'POST'){
        const cdata = req.body
        console.log(cdata.email);
        const user = await prisma.user.update({
            where:{
                email: cdata.email
            },
            data: {
                score : cdata.score,
            }
        })
        if(user){
            return res.status(200).json(user)
        }
    }
}