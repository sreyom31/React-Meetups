import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if(req.method === 'POST') {
        const { title, image, address, description } = req.body
        const client = await MongoClient.connect(`mongodb+srv://admin-sreyom:${process.env.MONGO_PASS}@cluster0.8fstb.mongodb.net/meetups?retryWrites=true&w=majority`)
        const db = client.db()
        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(req.body)
        console.log(result)
        client.close()
        res.status(201).json({message: 'Meetup Inserted'})
    }
}

export default handler