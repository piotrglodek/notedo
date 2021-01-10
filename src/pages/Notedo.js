import { useState } from 'react';
// components
import { CreateNote, NoteList, Toast } from '../components';
// framer
import { motion, AnimateSharedLayout } from 'framer-motion';

export const Notedo = () => {
  const [toastList, setToastList] = useState([]);
  return (
    <>
      <AnimateSharedLayout>
        <motion.div layout>
          <CreateNote setToastList={setToastList} />
          <NoteList setToastList={setToastList} />
        </motion.div>
      </AnimateSharedLayout>
      <Toast toastList={toastList} setToastList={setToastList} autoDelete />
    </>
  );
};
