import ReactDOM from 'react-dom/client'
import { App } from './App'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import 'mantine-react-table/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css';

import '@/shared/config/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
