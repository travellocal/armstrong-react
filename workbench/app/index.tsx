// LIBS
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import { Grid, Row, Col } from './../../source/components/layout/grid';
import { BurgerMenu, BurgerMenuItem } from './../../source/components/navigation/burgerMenu';
import { Image } from './../../source/components/display/image';
import { routeFactory } from './routes';
import { browserHistory } from "react-router";

// VIEWS
import { Home } from "./views/home";
import { CalendarTest } from "./views/calendarTest";
import { Responsive } from "./views/responsive";

import { setLocale } from "../../source/config/config";

// STYLES
import "./theme/theme";

// HISTORY
//const hist = history();

// APP WRAPPER
export class App extends React.Component<any, { nav: boolean }> {
  navigateTo(path: string) {
    (this.props as any).history.push(path);
  }
  public render() {
    const view = this.props.children;
    return (
      <main>
        <Grid fillContainer={true}>
          <Row height={60} className="bg-brand-primary fg-white">
            <Col width={60}>
              <BurgerMenu buttonIcon={BurgerMenu.Icomoon.menu7} mode="slide">
                <BurgerMenuItem title="home" />
                <BurgerMenuItem title="test1" />
                <BurgerMenuItem title="test2" />
                <BurgerMenuItem title="test3" />
              </BurgerMenu>
            </Col>
            <Col verticalAlignment="center" horizontalAlignment="center">
              Header!
            </Col>
          </Row>
          <Row>
            <Col>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </main>
    );
  }
}

setLocale("en-GB");

ReactDOM.render(
  <Router history={hashHistory}>
    {routeFactory()}
  </Router>, document.getElementById('host'));


