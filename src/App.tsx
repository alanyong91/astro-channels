import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import loadable from "@loadable/component";

const ChannelsPage = loadable(
  () => import(/* webpackChunkName: "ChannelsPage" */ "./pages/ChannelsPage")
);

const ChannelDetailPage = loadable(
  () => import(/* webpackChunkName: "ChannelDetailPage" */ "./pages/ChannelDetailPage")
);

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ChannelsPage} exact />
        <Route path="/channels/:id" component={ChannelDetailPage} exact />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
