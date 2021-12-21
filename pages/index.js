import { MongoClient } from "mongodb";
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';
import Head from 'next/head';

function HomePage(props) {
    return (
    <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta
                name='description'
                content='Browse a huge list of highly active React meetups!'
            />
        </Head>
        <MeetupList meetups={props.meetups} />;
    </Fragment>
    )
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