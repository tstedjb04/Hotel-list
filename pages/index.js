import React, { useState } from 'react';
import styled from 'styled-components';
import { message, Table, Menu, Dropdown } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CSVReader from 'react-csv-reader';

import { Layout } from '../components/Layout/';

const Home = () => {
  const [data, setData] = useState([]);

  const onFileLoadedSuccess = (fileData, fileinfo) => {
    const temp = fileData
      .map((item, index) => {
        if (index > 0) {
          const _temp = fileData[0].reduce((prev, cur, idx) => {
            prev[cur] = item[idx];
            return prev;
          }, {});
          return _temp;
        }
      })
      .filter((item) => item);
    setData(temp);
    message
      .loading('Action in progress..', 1.5)
      .then(() => message.success('Loading finished', 2))
      .then(() =>
        message.info(`${fileinfo.name} file uploaded successfully`, 2),
      );
  };

  const onFileLoadedError = () => {
    message
      .loading('Action in progress..', 1)
      .then(() => message.error('File upload failed.', 2.5));
  };

  const columns = [
    {
      title: '',
      fixed: 'left',
      key: 'i',
    },
    {
      title: '',
      width: 75,
      align: 'center',
      dataIndex: [
        'id',
        'condo_name-EN',
        'rent_price',
        'sale_price',
        'bedroom',
        'bath',
        'size (sq.m)',
        'floor',
        'agent_post',
        'accept_agent',
        'photo1',
        'title',
        'description',
      ],
      key: 'number',
      render: (text, record) =>
        (record['condo_name-EN'] &&
          record['rent_price'] &&
          record['sale_price'] &&
          record['bedroom'] &&
          record['bath'] &&
          record['size (sq.m)'] &&
          record['floor'] &&
          record['agent_post'] &&
          record['accept_agent'] &&
          record['photo1'] &&
          record['title'] &&
          record['description']) == '' ? (
          <Warning>{record.id}</Warning>
        ) : (
          <p>{record.id}</p>
        ),
    },
    {
      title: 'CONDO NAME',
      width: 265,
      dataIndex: 'condo_name-EN',
      key: 'condo name',
      ellipsis: true,
      render: (text) =>
        text === '' ? <p style={{ color: '#EB5757' }}>not found</p> : text,
    },
    {
      title: 'RENT PRICE (Baht)',
      width: 155,
      dataIndex: 'rent_price',
      key: 'rent price',
      render: (text) =>
        text === '' ? (
          <p style={{ color: '#EB5757' }}>not found</p>
        ) : text === '0' ? (
          <></>
        ) : (
          <p>
            {text}
            <span style={{ color: '#a6aab4' }}>/month</span>
          </p>
        ),
    },
    {
      title: 'SELL PRICE (Baht)',
      width: 140,
      dataIndex: 'sale_price',
      key: 'sell price',
      render: (text) =>
        text === '' ? (
          <p style={{ color: '#EB5757' }}>not found</p>
        ) : text === '0' ? (
          <></>
        ) : (
          text
        ),
    },
    {
      title: 'BEDROOM',
      width: 75,
      dataIndex: 'bedroom',
      key: 'bedroom',
      render: (text) =>
        text === '' ? <p style={{ color: '#EB5757' }}>not found</p> : text,
    },
    {
      title: 'BATHROOM',
      width: 75,
      dataIndex: 'bath',
      key: 'bathroom',
      render: (text) =>
        text === '' ? <p style={{ color: '#EB5757' }}>not found</p> : text,
    },
    {
      title: 'SIZE (sqm.)',
      width: 75,
      dataIndex: 'size (sq.m)',
      key: 'size',
      render: (text) =>
        text === '' ? <p style={{ color: '#EB5757' }}>not found</p> : text,
    },
    {
      title: 'FLOOR',
      width: 75,
      dataIndex: 'floor',
      key: 'floor',
      render: (text) =>
        text === '' ? <p style={{ color: '#EB5757' }}>not found</p> : text,
    },
    {
      title: 'STATUS',
      width: 215,
      key: 'status',
      dataIndex: ['agent_post', 'accept_agent'],
      render: (text, record) => (
        <>
          {record.agent_post.toLowerCase() === 'true' ? (
            <Tag type="agent-post" style={{ marginRight: '8px' }}>
              Agent post
            </Tag>
          ) : (
            <></>
          )}
          {record.accept_agent.toLowerCase() === 'true' ? (
            <Tag>รับ Co-Agent</Tag>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: 'PHOTO',
      width: 195,
      dataIndex: 'photo1',
      key: 'photo',
      render: (text) =>
        text === '' ? (
          <p style={{ color: '#EB5757' }}>not found</p>
        ) : (
          <img
            src={text}
            style={{ width: '24px', height: '24px', borderRadius: '6px' }}
          />
        ),
    },
    {
      title: 'TITLE',
      width: 155,
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text) =>
        text === '' ? <p style={{ color: '#EB5757' }}>not found</p> : text,
    },
    {
      title: 'DESCRIPTION',
      width: 155,
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (text) =>
        text === '' ? <p style={{ color: '#EB5757' }}>not found</p> : text,
    },
    {
      title: 'BENEFIT',
      width: 135,
      dataIndex: 'benefit',
      key: 'benefit',
      ellipsis: true,
    },
    {
      title: 'Amenities',
      width: 75,
      dataIndex: 'Furniture',
      key: 'amenities',
      render: (text, record) => renderDropdown(record),
    },
  ];

  const renderDropdown = (record) => {
    const temp_record = [
      { Aircon: record['Aircon'] },
      { 'Bath tub': record['Bath tub'] },
      { 'Electric stove': record['Electric stove'] },
      { Furniture: record['Furniture'] },
      { 'Gas stove': record['Gas stove'] },
      { Refrigerator: record['Refrigerator'] },
      { 'Washing machine': record['Washing machine'] },
      { 'Water heater': record['Water heater'] },
    ];

    const temp_data = temp_record
      .map((item) => {
        if (Object.values(item)[0].toLowerCase() === 'true')
          return Object.keys(item)[0];
      })
      .filter((item) => item);

    const menu = (
      <CustomMenu>
        <Menu.Item style={{ textAlign: 'center' }}>Amenities</Menu.Item>
        <Menu.Divider />
        {temp_data.map((item, index) => {
          return <Menu.Item key={index}>{item}</Menu.Item>;
        })}
      </CustomMenu>
    );

    return temp_data.length > 0 ? (
      <Dropdown overlay={menu}>
        <a style={{ color: 'rgba(0,0,0,0.65)' }}>
          {temp_data.length}
          <img src="/static/arrow_down.png" style={{ marginLeft: '4px' }} />
        </a>
      </Dropdown>
    ) : (
      temp_data.length
    );
  };

  return (
    <Layout>
      <Container>
        {data.length > 0 ? (
          <>
            <ListHeader>
              <div className="number">38</div>
              <div className="layout">
                <p>listings successfully and Ready to published</p>
                <div className="action">
                  <div style={{ marginRight: '80px', color: '#0089FF' }}>
                    <img
                      src="/static/update.png"
                      style={{ marginRight: '12px' }}
                    />
                    Update data
                  </div>
                  <div>
                    <img
                      src="/static/published.png"
                      style={{ marginRight: '12px' }}
                    />
                    Published
                  </div>
                </div>
              </div>
            </ListHeader>
            <CustomTable
              columns={columns}
              dataSource={data}
              scroll={{ x: '100vw' }}
              pagination={false}
            />
          </>
        ) : (
          <UploadCard>
            <div className="heading">
              <p className="title">Bulk Upload form</p>
              <p className="description">
                You haven't upload any bulk data yet
              </p>
            </div>
            <div className="body">
              <p className="title">Choose an input medthod</p>
              <CustomUpload>
                <label>
                  <CSVReader
                    onFileLoaded={(data, fileInfo) =>
                      onFileLoadedSuccess(data, fileInfo)
                    }
                    onError={(error) => onFileLoadedError(data)}
                  />
                  <UploadBtn>
                    <UploadOutlined
                      style={{ fontSize: '56px', marginRight: '24px' }}
                    />
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>
                        via CSV file
                      </p>
                      <p>อัปเดตข้อมูลจากไฟล์ CSV</p>
                    </div>
                  </UploadBtn>
                </label>
              </CustomUpload>
            </div>
          </UploadCard>
        )}
      </Container>
    </Layout>
  );
};

export default Home;

const Container = styled.div`
  margin-top: 120px;
  background-color: #fcfcfc;
`;

const UploadCard = styled.div`
  max-width: 1024px;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0 auto;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  .heading {
    border-bottom: 1px solid #e5e5e5;
    padding: 24px;
  }
  .body {
    padding: 24px;
  }
  .title {
    color: ${({ theme }) => theme.colors.black};
    font-weight: bold;
    font-size: 24px;
  }
  .description {
    font-size: 14px;
    color: #0089ff;
    margin-top: 8px;
  }
`;

const CustomUpload = styled.div`
  margin-top: 16px;
  input[type='file'] {
    display: none;
  }
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 87px calc(100% - 87px);
  font-size: 24px;
  color: ${({ theme }) => theme.colors.black};
  border: 0.5px solid #e5e5e5;
  .number {
    padding: 30px;
    background-color: #f3f5f8;
  }
  .layout {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    padding-left: 24px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.white};
    .action {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #a6aab4;
    }
  }
`;

const UploadBtn = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  padding: 24px;
  width: 643px;
  width: 100%;
`;

const CustomTable = styled(Table)`
  .ant-table {
    .ant-table-thead > tr > th {
      font-size: 10px;
      color: #a6aab4;
    }
  }
  .ant-table-thead > tr > th {
    padding: 22px 8px;
  }
`;

const Warning = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background-color: #eb5757;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
`;

const Tag = styled.div`
  display: inline-block;
  color: ${(props) => (props.type === 'agent-post' ? '#6fcf97' : '#F2C94C')};
  background-color: ${(props) =>
    props.type === 'agent-post' ? '#6fcf9725' : '#F2C94C25'};
  border-radius: 24px;
  padding: 6px 12px;
  font-size: 12px;
`;

const CustomMenu = styled(Menu)`
  .ant-dropdown-menu-item-divider {
    height: 2px;
    background-color: #0089ff;
  }
`;
