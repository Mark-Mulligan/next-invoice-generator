// Next
import Head from 'next/head';
import type { NextPage } from 'next';

// Libraries
import axios from 'axios';
import { useSession } from 'next-auth/react';

// MUI
import Typography from '@mui/material/Typography';

// Components
import Navbar from '../components/Navbar';

const Dashboard: NextPage = () => {
  const { status } = useSession({ required: true });

  const handleGetStudents = async () => {
    try {
      const { data } = await axios.get('/api/students');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Typography variant="h1">Students</Typography>
    </div>
  );
};

export default Dashboard;
