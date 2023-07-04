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
    subheader: 'Ship Management',
  },
  {
    id: uniqueId(),
    title: 'Ship Voyage',
    icon: IconShip,
    href: '/dashboard/ship-voyage',
  },
  {
    navlabel: true,
    subheader: 'Validation',
  },
  {
    id: uniqueId(),
    title: 'FOC & CII Validation',
    icon: IconSpeedboat,
    href: '/dashboard/ship-resistance'
  },
  {
    navlabel: true,
    subheader: 'Realtime Monitoring',
  },
  {
    id: uniqueId(),
    title: 'Ship Tracker Position',
    icon: IconLocation,
    href: '/dashboard/ship-tracker-position'
  },
  // {
  //   id: uniqueId(),
  //   title: 'Ship',
  //   icon: IconShip,
  //   href: '/dashboard/master-ship'
  // },
 

];

export default Menuitems;
