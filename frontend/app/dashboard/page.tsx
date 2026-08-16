'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
    DashboardBrowsingIcon,
    User03Icon,
    BanknoteIcon,
    SecurityIcon,
    CustomerSupportIcon
} from '@hugeicons/core-free-icons';
import { useState } from 'react';

import styles from './Dashboard.module.css';

import Avatar from '../components/dashboard/Avatar/Avatar';
import ButtonLeftbar from '../components/dashboard/ButtonLeftbar/ButtonLeftbar';
import DashboardPage from '../components/dashboard/DashboardPage/DashboardPage';
import ButtonAuthorize from '../components/dashboard/ButtonAuthorize/ButtonAuthorize';

import SlideUp from '../components/animations/SlideUp/SlideUp';

export default function Dashboard() {
    const [activePage, setActivePage] = useState('Главная');

    function setPage(label: string) {
        setActivePage(label);
    }

    const leftbarButtons = [
        {
            label: 'Главная',
            icon:
            <HugeiconsIcon
                icon={DashboardBrowsingIcon}
                size={24}
                color='#FFFFFF'
                strokeWidth={1.5}
            />
        },
        {
            label: 'Уч. запись',
            icon:
            <HugeiconsIcon
                icon={User03Icon}
                size={24}
                color='#FFFFFF'
                strokeWidth={1.5}
            />
        },
        {
            label: 'Оплата',
            icon:
            <HugeiconsIcon
                icon={BanknoteIcon}
                size={24}
                color='#FFFFFF'
                strokeWidth={1.5}
            />
        },
        {
            label: 'Безопасность',
            icon:
            <HugeiconsIcon
                icon={SecurityIcon}
                size={24}
                color='#FFFFFF'
                strokeWidth={1.5}
            />
        },
        {
            label: 'Поддержка',
            icon:
            <HugeiconsIcon
                icon={CustomerSupportIcon}
                size={24}
                color='#FFFFFF'
                strokeWidth={1.5}
            />
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.leftbar}>
                    <Avatar />
                    <div className={styles.leftbarButtons}>
                        {
                            leftbarButtons.map((button, index) => (
                                <SlideUp key={index} duration={(((index + 1) * 0.1).toString() + 's')}>
                                    <ButtonLeftbar
                                        key={index}
                                        label={button.label}
                                        active={button.label === activePage}
                                        setpage={setPage}
                                    >
                                        {button.icon}
                                    </ButtonLeftbar>
                                </SlideUp>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.content}>
                    {
                        (activePage == 'Главная') && (
                            <DashboardPage title='Stargem. Добро пожаловать, Никита.'>
                                <ButtonAuthorize onclick={() => {}} />
                            </DashboardPage>
                        )
                    }
                </div>
            </div>
        </div>
    );
}