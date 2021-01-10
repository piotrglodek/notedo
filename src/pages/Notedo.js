import { CreateNote, NoteList } from '../components';
// framer
import { motion, AnimateSharedLayout } from 'framer-motion';

export const Notedo = () => {
  return (
    <AnimateSharedLayout>
      <motion.div layout>
        <CreateNote />
        <NoteList />
      </motion.div>
    </AnimateSharedLayout>
  );
};
