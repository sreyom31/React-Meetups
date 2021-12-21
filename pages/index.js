import { MongoClient } from "mongodb";
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 5, 12345 Some City',
        description: 'This is a first meetup!'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 10, 12345 Some City',
        description: 'This is a second meetup!'
    }
];

function HomePage(props) {
    return <MeetupList meetups={props.meetups} />
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//
//     // fetch data from api
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect(`mongodb+srv://admin-sreyom:${process.env.MONGO_PASS}@cluster0.8fstb.mongodb.net/meetups?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray();
    client.close()

    return {
        props: {
            meetups: meetups.map((meetup) => {
                return {
                    title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    id: meetup._id.toString(),
                }
            })
        },
        revalidate: 10 // regenerates the page in every 10 seconds.
    };
}

export default HomePage;