import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { menus } from '@/constants/menus';
import { pocaMenus } from '@/constants/poca-menus';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@mui/material/styles';

function Sidebar() {
  const { userEmail } = useAuth();
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>(
    {},
  );
  const theme = useTheme();

  const handleClick = (text: string) => {
    setOpenMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const showPocaMenus =
    userEmail === 'rudghksldl@gmail.com' || userEmail === 'kurare@naver.com';

  const renderMenus = (menuList: any[]) =>
    menuList.map((menu, idx) => {
      if (menu.href) {
        return (
          <ListItem key={menu.text + idx} disablePadding>
            <Link href={menu.href} passHref legacyBehavior>
              <ListItemButton
                component="a"
                sx={{
                  color: theme.palette.text.primary,
                  borderRadius: theme.shape.borderRadius,
                  mx: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[200],
                    color: theme.palette.common.black,
                  },
                  '&.Mui-selected, &.Mui-selected:hover': {
                    backgroundColor: theme.palette.grey[900],
                    color: theme.palette.common.white,
                  },
                }}
              >
                <ListItemText primary={menu.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        );
      }
      if (menu.subMenus && menu.subMenus.length > 0) {
        return (
          <React.Fragment key={menu.text + idx}>
            <ListItemButton
              onClick={() => handleClick(menu.text)}
              sx={{
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
                mx: 1,
                '&:hover': {
                  backgroundColor: theme.palette.grey[200],
                  color: theme.palette.common.black,
                },
                '&.Mui-selected, &.Mui-selected:hover': {
                  backgroundColor: theme.palette.grey[900],
                  color: theme.palette.common.white,
                },
              }}
            >
              <ListItemText primary={menu.text} />
              {openMenus[menu.text] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMenus[menu.text]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menu.subMenus.map((sub: any, subIdx: number) => (
                  <ListItem
                    key={sub.text + subIdx}
                    sx={{ pl: 4 }}
                    disablePadding
                  >
                    <Link href={sub.href} passHref legacyBehavior>
                      <ListItemButton
                        component="a"
                        sx={{
                          color: theme.palette.text.secondary,
                          borderRadius: theme.shape.borderRadius,
                          mx: 1,
                          '&:hover': {
                            backgroundColor: theme.palette.grey[800],
                            color: theme.palette.common.white,
                          },
                          '&.Mui-selected, &.Mui-selected:hover': {
                            backgroundColor: theme.palette.common.black,
                            color: theme.palette.common.white,
                          },
                        }}
                      >
                        <ListItemText primary={sub.text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }
      return null;
    });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 200,
          boxSizing: 'border-box',
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <List>
        {renderMenus(menus)}
        {showPocaMenus && renderMenus(pocaMenus)}
      </List>
    </Drawer>
  );
}

export default Sidebar;
