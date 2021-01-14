import { useState, useEffect } from 'react';
// components
import { CreateNote, NoteList, Toast } from '../components';
// framer
import { motion, AnimateSharedLayout } from 'framer-motion';
// redux
import { useDispatch } from 'react-redux';
import { changeTheme } from '../store/reducers/themeSlice';
// firebase
import { db, auth } from '../firebase';

export const Notedo = () => {
  const [toastList, setToastList] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchThemeMode = db
      .collection('users')
      .doc(auth.currentUser.uid)
      .onSnapshot(doc => {
        const data = doc.data();
        dispatch(changeTheme(data.theme));
      });

    return () => fetchThemeMode();
  }, [dispatch]);

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
