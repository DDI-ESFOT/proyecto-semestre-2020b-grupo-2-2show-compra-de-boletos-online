import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import Routes from "../constants/routes";

function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo siento, esta página no existe dentro de 2Show."
      extra={
        <Button type="primary">
          <Link to={Routes.HOME}>Ir a Home</Link>
        </Button>
      }
    />
  );
}
export default NotFoundPage;
