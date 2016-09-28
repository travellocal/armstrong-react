import * as React from "react";
import { Grid, Row, Col } from './../../../source/components/layout/grid';

interface IResponsiveProps extends React.Props<Responsive> {

}

export class Responsive extends React.Component<IResponsiveProps, {}> {
  render() {
    return <div>
      <Grid debugMode={true}>
        <Row className="rs-medium-1col">
          <Col width="2*">col 1</Col>
          <Col width="1*">col 2</Col>
        </Row>
        <Row className="rs-xlarge-4col rs-large-3col rs-medium-2col rs-small-1col">
          <Col>col 3</Col>
          <Col>col 4</Col>
          <Col>col 5</Col>
          <Col>col 6</Col>
          <Col>col 7</Col>
          <Col>col 8</Col>
        </Row>
      </Grid>
    </div>
  }
}