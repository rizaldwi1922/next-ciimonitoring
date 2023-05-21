import {
    IconLayoutDashboard, 
    IconShip, 
    IconLocation,
    IconSunWind,
    IconSpeedboat,
    IconReport,
    IconLogout
  } from '@tabler/icons-react';
  import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
  import Co2Icon from '@mui/icons-material/Co2';
  
  import { uniqueId } from 'lodash';
  
  const Menuitems = [
    {
      navlabel: true,
      subheader: 'Home',
    },
  
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconLayoutDashboard,
      href: '/dashboard',
    },
    {
      navlabel: true,
      subheader: 'Ship Management',
    },
  
  ];
  
  export default Menuitems;
  