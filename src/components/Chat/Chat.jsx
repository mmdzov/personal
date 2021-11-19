import { useContext, useState } from "react";
import Context from "../../context/Context";
import { Container } from "./Chat.styled";
import { Input, Button } from "antd";
import { IoSend } from "react-icons/io5";
import { IoReturnUpForward } from "react-icons/io5";
const { TextArea } = Input;

const Chat = () => {
  const { user } = useContext(Context);
  const [value, setValue] = useState("");

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
  };

  return (
    <Container>
      <div className="header">
        <div className="">
          <img src={user.avatar} alt="" />
          <div className="username">{user.username}</div>
        </div>

        {/* //! need admin access to show blow button */}
        <div className="chatlistIcon">
          <IoReturnUpForward />
        </div>

      </div>
      <div className="content"></div>
      <form className="chat">
        <TextArea
          value={value}
          onChange={handleChange}
          placeholder="please type..."
          id="textarea"
          autoSize={{ minRows: 1, maxRows: 3 }}
        />
        <Button type="primary">
          <IoSend />
        </Button>
      </form>
    </Container>
  );
};

export default Chat;
