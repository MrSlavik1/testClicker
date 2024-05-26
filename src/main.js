import { createRoot } from 'react-dom/client';
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { App } from './App';

createRoot(document.getElementById('root')).render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <App initialPanel="authorization" />
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>,
);
