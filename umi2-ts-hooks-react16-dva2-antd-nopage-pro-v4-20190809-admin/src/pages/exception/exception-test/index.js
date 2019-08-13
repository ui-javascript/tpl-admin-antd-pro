import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Result, Button } from 'antd';

const Exception500 = () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle="页面出现了问题"
    extra={
      <Link to="/">
        <Button type="primary">
          {formatMessage({ id: 'exception-500.exception.back', defaultMessage: 'Back Home' })}
        </Button>
      </Link>
    }
  />
);

export default Exception500;
