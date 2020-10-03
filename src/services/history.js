import { createBrowserHistory } from 'history'

const history = createBrowserHistory({
    basename: process.env.REACT_APP_PUBLIC_URL ? process.env.REACT_APP_PUBLIC_URL : ''
})

export default history