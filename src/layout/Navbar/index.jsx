import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { useNavigate } from "react-router-dom"
function AppRouter() {
  const navigate = useNavigate()
  const item = [
    { key: "1", icon: <MailOutlined />, label: "视频预览", path: "/preview" },
    { key: "2", icon: <AppstoreOutlined />, label: "视频分割", path: "/divide" },
    { key: "3", icon: <SettingOutlined />, label: "删除片段", path: "/delete" },
    { key: "4", icon: <MailOutlined />, label: "添加贴图", path: "/picture" },
    { key: "5", icon: <AppstoreOutlined />, label: "文字水印", path: "/text" },
    { key: "6", icon: <SettingOutlined />, label: "添加字幕", path: "/subtitle" }
  ]
  const onClick = e => {
    console.log(e)
    navigate(e.item.props.path)
  }
  return <Menu defaultSelectedKeys={["1"]} onClick={onClick} style={{ width: 256 }} mode="vertical" items={item} />
}
export default AppRouter
