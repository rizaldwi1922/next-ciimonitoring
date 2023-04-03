import {
  IconAperture, 
  IconCopy, 
  IconLayoutDashboard, 
  IconLogin, 
  IconMoodHappy, 
  IconTypography, 
  IconUserPlus, 
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
  {
    id: uniqueId(),
    title: 'Ship Voyage',
    icon: IconShip,
    href: '/dashboard/ship-voyage',
  },
  {
    id: uniqueId(),
    title: 'Ship Tracker Position',
    icon: IconLocation,
    href: '/dashboard/ship-tracker-position'
  },
  {
    navlabel: true,
    subheader: 'CII Monitoring',
  },
  {
    id: uniqueId(),
    title: 'Weather Condition',
    icon: IconSunWind,
    href: '/dashboard/weather-condition'
  },
  {
    id: uniqueId(),
    title: 'Ship Resistance',
    icon: IconSpeedboat,
    href: ''
  },
  {
    id: uniqueId(),
    title: 'Fuel Oil Consumption',
    icon: LocalGasStationOutlinedIcon,
    href: ''
  },
  {
    id: uniqueId(),
    title: 'CO2 Emision',
    icon: Co2Icon,
    href: ''
  },
  {
    id: uniqueId(),
    title: 'CII Result',
    icon: IconReport,
    href: ''
  },
  {
    navlabel: true,
    subheader: 'Report',
  },
  {
    id: uniqueId(),
    title: 'Report',
    icon: IconReport,
    href: ''
  },

];

export default Menuitems;
