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
      href: '/dashboard/ship-voyage',
    },
    {
      navlabel: true,
      subheader: 'Input',
    },
    {
      id: uniqueId(),
      title: 'Form',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance',
    },
    {
      navlabel: true,
      subheader: 'Holtrop',
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
      subheader: 'TOTAL RESISTANCE',
    },
    {
      id: uniqueId(),
      title: 'Efek Draft',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/stawave/efek-draft',
    },
    {
      id: uniqueId(),
      title: 'Efek Angin',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/stawave/efek-angin',
    },
    {
      id: uniqueId(),
      title: 'Efek Suhu dan Garam',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/stawave/efek-suhu-dan-garam',
    },
    {
      id: uniqueId(),
      title: 'Efek Gelombang',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/stawave/efek-gelombang',
    },
    {
      id: uniqueId(),
      title: 'Stawave Method',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/stawave/stawave-method',
    },
    // {
    //   id: uniqueId(),
    //   title: 'Corrective Resistance',
    //   icon: IconCircleDot,
    //   href: '/dashboard/ship-resistance/stawave/corrective-resistance',
    // },
    // {
    //   id: uniqueId(),
    //   title: 'Daya Corrective',
    //   icon: IconCircleDot,
    //   href: '/dashboard/ship-resistance/holtrop/TahananKapal',
    // },
    {
      navlabel: true,
      subheader: 'Power and Fuel',
    },
    {
      id: uniqueId(),
      title: 'Power',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/power-and-fuel/power',
    },
    {
      id: uniqueId(),
      title: 'FOC',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/power-and-fuel/foc',
    },
    {
      id: uniqueId(),
      title: 'CII',
      icon: IconCircleDot,
      href: '/dashboard/ship-resistance/power-and-fuel/CII',
    },
  
  ];
  
  export default Menuitems;
  