import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Add Team',
    path: '/addteam',
    icon: <FiIcons.FiUserPlus />,
    cName: 'nav-text'
  },
  {
    title: 'All Team',
    path: '/allteam',
    icon: <HiIcons.HiUserGroup />,
    cName: 'nav-text'
  },
  {
    title: 'Update Team',
    path: '/putteam',
    icon: <HiIcons.HiUpload />,
    cName: 'nav-text'
  },
  {
    title: 'Delete Team',
    path: '/delteam',
    icon: <HiIcons.HiOutlineUserRemove />,
    cName: 'nav-text'
  }
];