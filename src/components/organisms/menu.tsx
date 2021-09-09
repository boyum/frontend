import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useState,
} from "react";
import { Link, LinkProps, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faChartLine,
  faHamburger,
  faSignOutAlt,
  faTachometerAlt,
  faTimes,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";

type MenuLink = Omit<LinkProps, "icon"> & {
  icon: IconDefinition;
  to: string;
  activeOnlyWhenExact?: boolean;
  expanded: boolean;
};

const MenuLink = ({
  children,
  icon,
  to,
  activeOnlyWhenExact = false,
  expanded,
  ...props
}: MenuLink) => {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <Link
      to={to}
      display="flex"
      flex="row"
      w="full"
      h="10"
      justify="items-start"
      align="items-center"
      p="x-4 y-2"
      m="b-2"
      animate="hover:pulse focus:pulse"
      outline="focus:none"
      text="gray-300 no-underline focus:green-300"
      bg={match ? "dark-400" : ""}
      border={`l-2 ${match ? "green-300" : "transparent"}`}
      {...props}
    >
      <div display="flex" w="4" justify="center">
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>
      {expanded && (
        <div w="full" display="flex" flex="row" justify="start" m="l-4">
          {children}
        </div>
      )}
    </Link>
  );
};

type MenuButton = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "icon"
> & {
  icon: IconDefinition;
  expandedIcon?: IconDefinition;
  expanded: boolean;
};

const MenuButton = ({
  children,
  icon,
  expandedIcon = icon,
  expanded,
  onClick,
  ...props
}: MenuButton) => {
  return (
    <button
      onClick={onClick}
      display="flex"
      flex="row"
      w="full"
      h="10"
      justify="items-start"
      align="items-center"
      p="x-4 y-2"
      animate="hover:pulse focus:pulse"
      outline="focus:none"
      text="gray-300 no-underline focus:green-300"
      border="l-2 transparent"
      {...props}
    >
      <div display="flex" w="4" justify="center">
        <FontAwesomeIcon icon={expanded ? expandedIcon : icon} size="lg" />
      </div>
      {expanded && (
        <div w="full" display="flex" flex="row" justify="start" m="l-4">
          {children}
        </div>
      )}
    </button>
  );
};

export const MainMenu = () => {
  const [expanded, setExpanded] = useState(false);
  const { logout } = useAuth0();
  return (
    <nav
      h="screen"
      display="flex"
      flex="col"
      justify="items-start"
      align="items-start"
      text="gray-300"
      w={expanded ? "max-full" : "min-12"}
      bg="dark-600"
      border="r-2 dark-400"
      p=""
    >
      <button h="4" m="b-4" p="x-2" w="full" text="right" animate="wobble duration-1000" onClick={() => setExpanded(!expanded)}>
        <FontAwesomeIcon icon={expanded ? faTimes : faArrowRight} size="xs" />
      </button>

      <MenuLink
        to="/dashboard"
        title={!expanded ? "Dashboard" : ""}
        icon={faTachometerAlt}
        expanded={expanded}
      >
        Dashboard
      </MenuLink>

      <MenuLink
        to="/calendar"
        title={!expanded ? "Calendar" : ""}
        icon={faCalendar}
        expanded={expanded}
      >
        Calendar
      </MenuLink>

      <MenuLink
        to="/statistics"
        title={!expanded ? "Statistics" : ""}
        icon={faChartLine}
        expanded={expanded}
      >
        Statistics
      </MenuLink>

      <MenuButton
        expanded={expanded}
        onClick={() => logout()}
        icon={faSignOutAlt}
        title={!expanded ? "Sign out" : ""}
      >
        Sign out
      </MenuButton>
    </nav>
  );
};
