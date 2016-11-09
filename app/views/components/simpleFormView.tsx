import * as React from "react";
import {
  Grid, Row, Col, Image, Sample,
  SimpleForm,
  SimpleTextInput,
  SimpleSelectInput,
  SimpleRadioInput,
  SimpleCheckboxInput,
  SimpleCalendarInput,
  SimpleDateInput,
  SimpleTimeInput,
  SimpleToggleInput,
  SimpleAutoCompleteInput,
  Button
} from 'armstrong-react';


interface User {
  un: string;
  pw: string;
}

interface Registration {
  firstName: string;
  lastName: string;
  type: number;
  date: string;
  date2: string;
  time: string;
  age: number;
  children: number;
  requireAge: boolean;
  enabled: boolean;
  tags: string[];
}

interface ISimpleFormViewProps extends React.Props<SimpleFormView> {

}

export class SimpleFormView extends React.Component<ISimpleFormViewProps, { user: User, registration: Registration }> {
  private options: any[] = [{ id: 1, name: 'test' }, { id: 2, name: 'test 2' }];

  constructor() {
    super();
    this.state = {
      user: { un: "", pw: "" },
      registration: {
        firstName: "",
        date: "2016-11-03",
        date2: "2016-11-03",
        time: "00:30",
        lastName: "Armstrong",
        enabled: false,
        tags: [this.options[0]],
        type: null,
        requireAge: false,
        age: null,
        children: 1
      }
    }
  }
  render() {
    return (<Grid>
      <Row>
        <Col>
          <article>
            <h1>Components: Simple Form</h1>
            <p>Simple form is an alternative to armstrongs form library. If you simply need a form to edit an object with standard controls,
            this is for you. The other form component is built for immutable data and more complex scenarios</p>
            <pre className="callout major">
              {`import { SimpleForm } from 'armstrong-react';`}
            </pre>
            <div className="alert bg-warning">
              <b>Note:</b> While this component matures, please import all elements with the prefix 'Simple'. The JSX in the examples below isn't quite right.
            For example, 'Form' becomes 'SimpleForm', 'TextInput' becomes 'SimpleTextInput' etc.
            </div>
          </article>
          <Sample title="Simple Form - Simple example"
            description="A bare minimum working simple form"
            component={
              <SimpleForm className="name-form" entity={this.state.user}>
                <SimpleTextInput prop="un" />
                <SimpleTextInput prop="pw" type="password" />
                <Button className="bg-positive" onClick={() => alert(JSON.stringify(this.state.user))}>Submit</Button>
              </SimpleForm>
            } />

          <Sample title="Simple Form - More complex example"
            description="All the bells and whistles!"
            component={
              <SimpleForm entity={this.state.registration} className="state-form">
                <Grid className="form-grid">
                  <Row>
                    <Col>
                      <label>First name</label>
                      <SimpleTextInput type="text" prop="firstName" placeholder="whats your first name buddy? eg 'Neil'" />
                    </Col>
                    <Col>
                      <label>Last name</label>
                      <SimpleTextInput placeholder="Enter your name..." type="text" prop="lastName" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>Type</label>
                      <SimpleSelectInput prop="type" options={this.options} placeholder="select an option..." />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>Date</label>
                      <SimpleCalendarInput prop="date" />
                    </Col>
                    <Col>
                      <label>Another Date</label>
                      <SimpleDateInput prop="date2" />
                    </Col>
                    <Col>
                      <label>Time</label>
                      <SimpleTimeInput prop="time" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <SimpleToggleInput prop="enabled" className="m-top-small" label="Enabled?" />
                    </Col>
                    <Col>
                      <SimpleCheckboxInput prop="requireAge" label="Require age?" className="m-top-small" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>Age</label>
                      <SimpleTextInput type="number" prop="age" disabled={!this.state.registration.requireAge} />
                    </Col>
                     <Col>
                      <label>Tags</label>
                      <SimpleAutoCompleteInput multiSelect={true} prop="tags" options={this.options} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>Children</label>
                      <div>
                        <SimpleRadioInput prop="children" label="1 kid" value={1} />
                        <SimpleRadioInput prop="children" label="2 kids" value={2} />
                        <SimpleRadioInput prop="children" label="3 kids" value={3} />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className="bg-positive" onClick={() => alert(JSON.stringify(this.state.registration))}>Save</Button>
                    </Col>
                  </Row>
                </Grid>
              </SimpleForm>
            } />
        </Col>
      </Row>
    </Grid>
    )
  }
}