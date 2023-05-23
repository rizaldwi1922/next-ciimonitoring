import {
    IconCircleDot,
    IconArrowLeft
  } from '@tabler/icons-react';
  
  import { uniqueId } from 'lodash';
  
  const Menuitems = [
    {
      id: uniqueId(),
      title: 'Kembali',
      icon: IconArrowLeft,
      href: '/dashboard',
    },
    {
      navlabel: true,
      subheader: 'Holtrop',
    },
  
    {
      id: uniqueId(),
      title: 'Form',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance',
    },
    {
      id: uniqueId(),
      title: 'Metode Holtrop',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/ParameterMetodeHoltrop',
    },
    {
      id: uniqueId(),
      title: 'Tahanan Gesek',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/PerhitunganTahanan',
    },
    {
      id: uniqueId(),
      title: 'Form Factor',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/FormFactor',
    },
    {
      id: uniqueId(),
      title: 'Tahanan Tambahan',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/TambahanTahanan',
    },
    {
      id: uniqueId(),
      title: 'Tahanan Gelombang',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/TahananGelombang',
    },
    {
      id: uniqueId(),
      title: 'Bulbouse Bow',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/TahananBulbousBow',
    },
    {
      id: uniqueId(),
      title: 'Immersed Transform',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/ImmersedTransform',
    },
    {
      id: uniqueId(),
      title: 'Korelasi Kapal',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/TahananKorelasiModelKapal',
    },
    {
      id: uniqueId(),
      title: 'Hull Roughness',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/HullRoughness',
    },
    {
      id: uniqueId(),
      title: 'Tahanan Total',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/TahananTotal',
    },
    {
      id: uniqueId(),
      title: 'Tahanan Kapal',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/holtrop/TahananKapal',
    },
    {
      navlabel: true,
      subheader: 'Stawave',
    },
    {
      navlabel: true,
      subheader: 'Power and Fuel',
    },
  
  ];
  
  export default Menuitems;
  