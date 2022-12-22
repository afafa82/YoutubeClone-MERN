// rfce ES7 React Snippets 를 이용하면 빠르게 form만들 수 있음.
// cd client 폴더로 이동해서
// npm install react-dropzone --save 해준다
// npm install --save @ant-design/icons
import React, { useState } from "react";
import Auth from "../../../hoc/auth";
import { Typography, Button, Form, message, Input } from "antd";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
// import {} from 'antd/lib/icon'
function VideoUploadPage(props) {
  const { Title } = Typography;
  const { TextArea } = Input;

  //Select Options => Map method를 이용하기 위해 리스트 만듦.
  const VideoPrivate = [
    { value: 0, label: "Private" },
    {
      value: 1,
      label: "Public",
    },
  ];

  //Select Options => Map method를 이용하기 위해 리스트 만듦.
  const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
  ];

  //uses 라고 치면 자동으로 템플릿을 보여준다.
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0); //private이면 0, public이면 1
  const [Category, setCategory] = useState("Film & Animation");

  const onVideoTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };
  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };
  const onCategoryChange = (e) => {
    setCategory(e.cuurentTarget.value);
  };

  //서버에 request 를 보낼건데, axios를 이용해서 formdata를 함께 보낸다.
  //근데, header에 content-type을 해줘야 에러를 막을 수 있음.
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    //아래 코드가 실행될 수 있게 server(backend)쪽으로 가서 post router 만들어준다.
    axios.post("/api/video/uploadfiles", formData, config).then(response => {
      if(response.data.success){
        console.log(response.data)
      }else{
        alert("Video Upload Failed");
      }
    });
    console.log(files);
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Drop Zone */}
          {/* 동영상 하나만 올릴 때는 multiple 을 false 로 설정 */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>
          {/* Thumbnail */}
          <div>
            <img src="" />
          </div>
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onVideoTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />
        <br />
        <br />
        <select onChange={onPrivateChange}>
          {VideoPrivate.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Auth(VideoUploadPage, true);
