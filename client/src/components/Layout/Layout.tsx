import { ReactNode, useEffect } from 'react'
import styles from './Layout.module.css';
import { PiHamburgerDuotone } from 'react-icons/pi'
import { IconContext } from 'react-icons';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { useGetUserQuery } from '../../services/User/UserService';
import { setUsername } from '../../app/features/User/userSlice';

type Props = {
    children: ReactNode
}

const Layout = (props: Props) => {
  const {data, isLoading, isSuccess, isUninitialized} = useGetUserQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!isSuccess) return;
    const { userName } = data;
    dispatch(setUsername(userName));
  }, [isLoading])

  const username = useSelector((state:RootState) => state.user.username);
  return (
    <section className={styles.layout}>
        <header className={styles.header}>Hello {username}</header>
        <nav className={styles.nav}>
          <IconContext.Provider value={{size: "2em"}}>
            <PiHamburgerDuotone/>
          </IconContext.Provider>
        </nav>
        <main className={styles.main}>
            {props.children}
        </main>
        <footer className={styles.footer}>Footer</footer>
    </section>
  )
}

export default Layout