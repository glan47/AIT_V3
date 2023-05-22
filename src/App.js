import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

function TranslationForm() {
  const [form] = Form.useForm();
  const [translation, setTranslation] = useState('');
  const [selectedSourceLang, setSelectedSourceLang] = useState('中文'); // 保存选中的 sourceLang
  const [selectedTargetLang, setSelectedTargetLang] = useState('英语'); // 保存选中的 targetLang
  const [selectedTone, setSelectedTone] = useState('日常办公'); // 保存选中的 tone

  const [loading, setLoading] = useState(false); // 添加加载状态

  // 设置表单的初始值ping
  useEffect(() => {
    form.setFieldsValue({
      sourceLang: selectedSourceLang,
      targetLang: selectedTargetLang,
      tone: selectedTone
    });
  }, [form, selectedSourceLang, selectedTargetLang, selectedTone]);

  const handleTranslation = (values) => {
    setLoading(true); // 设置加载状态为 true
    setTranslation('');

    axios
      .post('http://localhost:8000/data', {
        text: values.text,
        sourceLang: values.sourceLang,
        targetLang: values.targetLang,
        tone: values.tone
      })
      .then(response => {
        setTranslation(response.data.translation);
        setLoading(false); // 在翻译内容输出后重置加载状态为 false

      })
      .catch(error => {
        console.error(error);
        setLoading(false); // 在翻译内容输出后重置加载状态为 false

      });
  };

  const handleSourceLangChange = (value) => {
    setSelectedSourceLang(value);
  };

  const handleTargetLangChange = (value) => {
    setSelectedTargetLang(value);
  };

  const handleToneChange = (value) => {
    setSelectedTone(value);
  };

  return (
    <Form form={form} onFinish={handleTranslation}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', marginRight: '16px' }}>


        <Form.Item label="选择翻译风格" name="tone">
            <Select onChange={handleToneChange} value={selectedTone}>
              <Option value="学术写作">学术写作</Option>
              <Option value="日常办公">日常办公</Option>
              <Option value="轻松玩笑">轻松玩笑</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Text to Translate" name="text">
            <TextArea placeholder="请输入要翻译的内容。。。" />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? 'Translating...' : 'Translate'}
            </Button>
          </Form.Item>

        </div>

        
        <div style={{ flex: '1' }}>
{/*
          <Form.Item label="Source Language" name="sourceLang">
            <Select onChange={handleSourceLangChange} value={selectedSourceLang}>
              <Option value="en">English</Option>
              <Option value="zh">Chinese</Option>
            </Select>
          </Form.Item>
*/}
          <Form.Item label="Target Language" name="targetLang">
            <Select onChange={handleTargetLangChange} value={selectedTargetLang}>
              <Option value="英语">英语</Option>
              <Option value="中文">中文</Option>
              
            </Select>
          </Form.Item>

          <Form.Item label="Translation">
            <TextArea readOnly value={translation} />
          </Form.Item>

        </div>
      </div>
    </Form>
  );
}

export default TranslationForm;




{/*



import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

*/}

