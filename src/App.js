import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'
import {
  SplitLayout,
  SplitCol,
  Div,
  View,
  Panel,
  PanelHeader,
  Group,
  SimpleCell,
  Placeholder,
  PanelHeaderBack,
  Link,
  Tabbar,
  TabbarItem,
  FixedLayout,
  CardGrid,
  Card,
  Header,
  Avatar,
  Switch,
  FormItem,
  Input,
  Button,
  Snackbar,
  IconButton,
  Alert,
  Progress
} from '@vkontakte/vkui';
import { Icon28UserOutline, Icon28ErrorCircleOutline, Icon28DollarOutline, Icon28MoneyTransfer, Icon28MoneySendOutline, Icon28CheckCircleOutline, Icon28SettingsOutline, Icon28NewsfeedOutline, Icon28UserCircleOutline, Icon28MessageOutline, Icon28RobotOutline, Icon28DonateOutline, Icon28DonateCircleFillYellow, Icon28CrownOutline, Icon28MoneyCircleOutline, Icon28FolderFill } from '@vkontakte/icons';
import { Icon28CheckCircleFill, Icon28CancelCircleFillRed, Icon28Users3, Icon28GraphOutline, Icon28ShuffleOutline } from "@vkontakte/icons";
import PropTypes from 'prop-types';
import '@vkontakte/vkui/dist/vkui.css';
import styles from './App.module.css';

export function App({ initialPanel }) {
  const [activePanel, setActivePanel] = React.useState(initialPanel);
  const [cookies, setCookie] = useCookies(['username', 'tg_id', 'balance']);
  const [simple, setSimple] = useState('one');
  const [snackbar, setSnackbar] = React.useState(null);
  const [username, setUsername] = useState('');
  const [popout, setPopout] = React.useState(null);
  const [isConnect, setIsConnect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [text, setText] = useState('one');
  const [purpose, setPurpose] = React.useState('');
  const [bot, setBot] = useState({});
  const [horizontalText, setHorizontalText] = useState('one');
  const [indicator, setIndicator] = useState('one');
  const [activeTab, setActiveTab] = React.useState('account');

  const onChangeUsername = (e) => {
    const { name, value } = e.currentTarget;

    const setStateAction = {
      username: setUsername,
      purpose: setPurpose,
    }[name];

    setStateAction && setStateAction(value);
  };

  const SnackBar = (status, text) => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={status === "success" ? <Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" /> : <Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
      >
        {text}
      </Snackbar>
    );
  };

  const closePopout = () => {
    setPopout(null);
  };

  useEffect(() => {
    let telegram = window.Telegram.WebApp;
    if(!telegram.initData) {
      return SnackBar("error", "Авторизация в приложение не выполнена.");
    } else {
      return console.log(telegram);
    }
    // if(!cookies.username || !cookies.tg_id || !cookies.balance) {
    //   setCookie("username", telegram)
    // }
  }, []);

  const menuPanel = (
    <FixedLayout filled vertical="bottom">
            <div
              style={{
                background: 'var(--vkui--color_background)',
              }}
            >
            <div style={{ maxWidth: 768, margin: 'auto' }}></div>
            <Tabbar style={{ position: 'static' }}>
              <TabbarItem selected={activePanel === 'account'} onClick={() => setActivePanel('account')} text="Профиль">
              <Icon28UserCircleOutline />
            </TabbarItem>
              <TabbarItem selected={activePanel === 'bots'} onClick={() => setActivePanel('bots')} text="Боты">
              <Icon28RobotOutline />
            </TabbarItem>
              <TabbarItem selected={activePanel === 'settings'} onClick={() => setActivePanel('settings')} text="Настройки">
              <Icon28SettingsOutline />
            </TabbarItem>
            </Tabbar>
    </div>
    </FixedLayout>
  );

  return (
    
    <SplitLayout header={<PanelHeader delimiter="none" />} popout={popout}>
      
      <SplitCol width="100%" stretchedOnMobile autoSpaced>
      {snackbar}
        <View activePanel={activePanel}>
        <Panel id="authorization">
            <PanelHeader>Авторизация</PanelHeader>
            {snackbar}
            <FixedLayout vertical="top">
            </FixedLayout>
            </Panel>


            
          <Panel id="account">
            <PanelHeader>Профиль</PanelHeader>
            {menuPanel}
            </Panel>



          <Panel id="settings">
            <PanelHeader>
              Настройки
            </PanelHeader>
            {menuPanel}
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}

App.propTypes = {
  initialPanel: PropTypes.string.isRequired,
};