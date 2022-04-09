import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Taskly</Link>
      </div>
      <Menu theme="dark" mode="horizontal" className={styles.menu} selectedKeys={[]}>
        <Menu.Item key="1">
          <Link to="/about">About</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
