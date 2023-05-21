import { useMediaQuery, Box, Drawer } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import SidebarItemsShipResistance from './SidebarShipResistance/SidebarItems';
import RenderIf from '../../../components/container/RenderIf';
import { useEffect } from 'react';

interface ItemType {
  isMobileSidebarOpen:  boolean;
  onSidebarClose:  (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
  type?: string;
}

const Sidebar = ({isMobileSidebarOpen, onSidebarClose, isSidebarOpen, type }: ItemType) => {

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const sidebarWidth = '270px';

  useEffect(() => {
    console.log("tipe", type);
  }, [])

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: '100%',
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={3}>
              <Logo height={105} width={200} />
            </Box>
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <RenderIf condition={type === undefined}>
                <SidebarItems />
              </RenderIf>
              <RenderIf condition={type === "ShipResistance"}>
                <SidebarItemsShipResistance />
              </RenderIf>
            </Box>
            
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <RenderIf condition={type === undefined}>
          <SidebarItems />
      </RenderIf>
      <RenderIf condition={type === "ShipResistance"}>
          <SidebarItemsShipResistance />
      </RenderIf>
    </Drawer>
  );
};

export default Sidebar;
