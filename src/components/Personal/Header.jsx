import styled from "styled-components";
import { useContext } from "react";
import Context from "../../context/Context";
import Avatar from "../../assets/img/avatar.jpg";

const Header = () => {
  const { data } = useContext(Context);
  return (
    <Container>
      <div className="profile">
        <img className="profile-img" src={Avatar} alt="" />
        <div className="title">{data?.person?.fullName}</div>
      </div>

      <div className="sec" style={{ marginTop: 0 }}>
        <div className="sec-title">Bio</div>
        <div className="sec-list">
          {data?.person?.bio?.map((item) => (
            <span key={~~Math.floor(Math.random() * 99999)}>{item}</span>
          ))}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .profile {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 11px 10px;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    @media (min-width: 475px) {
      width: 475px;
      margin: 0 auto;
    }
  }

  .title {
    font-size: 1rem;
    font-family: sans-serif;
    line-height: 23px;
    color: #d5d5d5;
    text-align: left;
  }

  .profile-img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-bottom: 15px;
  }
  .names {
  }
`;

export default Header;
