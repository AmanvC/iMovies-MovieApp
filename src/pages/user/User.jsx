import { Outlet } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const User = () => {
  return (
    <div style={{paddingTop: 100}}>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </div>
  )
}

export default User;