import { Layout as AntdLayout } from 'antd';
import React from 'react';

import Header from 'app/header';

import styles from './styles.module.css';

const { Content } = AntdLayout;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <AntdLayout>
        <div className={styles.content}>
          <Content>{children}</Content>
        </div>
      </AntdLayout>
    </>
  );
};

export default Layout;
