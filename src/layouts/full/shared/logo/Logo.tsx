import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  // height: "70px",
  // width: "180px",
  // overflow: "hidden",
  // display: "block",
  // borderColor: "red",
  // borderWidth: "1px"
}));

const Logo = (props: any) => {
  return (
    <LinkStyled href="/">
      <Image src="/images/logos/logo.png" alt="logo" height={props.height} width={props.width} priority/>
    </LinkStyled>
  );
};

export default Logo;
