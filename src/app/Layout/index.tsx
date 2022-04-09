import { Layout as AntdLayout } from 'antd';
import React from 'react';

import Header from 'app/Header';

import styles from './Layout.module.css';

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
