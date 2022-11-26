import { useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import { Tabs, Alert } from "antd";

const TabPane = Tabs.TabPane;

function Notifications() {
  const { readNotifications, unreadNotifications } = useSelector(
    (state) => state.notifications
  );

  return (
    <div>
      <PageTitle title="Notifications" />

      <Tabs defaultActiveKey="1">
        <TabPane tab="Unread" key="1">
          {unreadNotifications.map((notification, index) => {
            return (
              <Alert
                key={index}
                message={
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                      <span>{notification.title}</span>
                      <span>{notification.createdAt}</span>
                    </div>
                    <span className="underline">Mark as read</span>
                  </div>
                }
              />
            );
          })}
        </TabPane>
        <TabPane tab="Read" key="2">
          {readNotifications.map((notification, index) => {
            return (
              <Alert
                key={index}
                message={
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                      <span>{notification.title}</span>
                      <span>{notification.createdAt}</span>
                    </div>
                    <span className="underline">Mark as unread</span>
                  </div>
                }
              />
            );
          })}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Notifications;
