// IMPORTS
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Grid, Row, Col, AutoCompleteInput, CheckboxInput, CalendarInput, RadioInput, SelectInput, TextInput, TimeInput } from 'armstrong-react';

export class FormElements extends React.Component<{}, {}> {

  navigateTo(path: string) {
    (this.props as any).history.push(path);
  }

  public render() {
    return (

      <Grid>
        <Row>
          <Col>
            <article>
              <h1>Components: Form Elements</h1>

              <p>Forms.No-one likes doing them.Let Armstrong take some of the pain out of the process by using these form elements.</p>

              <pre className="callout major">
                {`import { AutoCompleteInput, CheckboxInput, CalendarInput, RadioInput, SelectInput, TextInput, TimeInput } from 'armstrong-react';`}
              </pre>

              <h2 id="quickSummary">Quick summary of all form elements</h2>

              <Grid className="form-grid">
                <Row className="rs-xlarge-2col rs-small-1col rs-xlarge-spaced">
                  <Col>
                    <label>AutoCompleteInput</label>
                    <AutoCompleteInput placeholder="Select one item" options={[{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]} />
                  </Col>
                  <Col>
                    <label>AutoCompleteInput (multi) </label>
                    <AutoCompleteInput placeholder="Select one or more items" multiSelect={true} options={[{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]} />
                  </Col>
                  <Col>
                    <label>CalendarInput</label>
                    <CalendarInput icon={CalendarInput.Icomoon.calendar2} />
                  </Col>
                  <Col>
                    <label>TextInput</label>
                    <TextInput placeholder="Enter your text here" />
                  </Col>
                  <Col>
                    <label>SelectInput</label>
                    <SelectInput placeholder="Select one or more items" multiple={true} options={[{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]} />
                  </Col>
                  <Col>
                    <label>TimeInput</label>
                    <TimeInput time="08:30"/>
                  </Col>
                  <Col>
                    <RadioInput labelContent="RadioInput" />
                  </Col>
                  <Col>
                    <CheckboxInput label="CheckboxInput" />
                  </Col>
                </Row>
              </Grid>

              <hr />

              <h2 id="AutoCompleteInput">AutoCompleteInput</h2>

              <p><b>When to use: </b> TODO</p>

              <pre className="callout minor">
                {`<AutoCompleteInput />`}
              </pre>

              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>className (string) </td>
                    <td>CSS classnames.Works well with armstrongs bg, fg schemes.</td>
                  </tr>
                  <tr>
                    <td>value</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>minimumLength</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>placeholder</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>searchPlaceholder</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>noResultsMessage</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>options</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>remoteThrottle</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>remoteQuery</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>remoteQueryOnOpen</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>hasGoButton</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>goButtonContent</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>onSelected</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>visibleItems</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>canClear</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>disabled</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>multiSelect</td>
                    <td>TODO</td>
                  </tr>
                </tbody>
              </table>

              <h3>Example: Single option select</h3>

              <AutoCompleteInput placeholder="Select one item" options={[{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]} />

              <pre>
                {`<AutoCompleteInput placeholder="Select one item" options={[{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]} />`}
              </pre>

              <hr />

              <h3>Example: Multiple option select</h3>

              <AutoCompleteInput multiSelect={true} placeholder="Select one or more items" options={[{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]} />

              <pre>
                {`<AutoCompleteInput multiSelect={true} placeholder="Select one or more items" options={[{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]} />`}
              </pre>


              <hr />

              <h2 id="CalendarInput">CalendarInput</h2>

              <p><b>When to use: </b> TODO</p>

              <pre className="callout minor">
                {`<CalendarInput icon={CalendarInput.Icomoon.calendar2} />`}
              </pre>

              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>className (string) </td>
                    <td>CSS classnames.Works well with armstrongs bg, fg schemes.</td>
                  </tr>
                  <tr>
                    <td>locale (string) </td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>date</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>format</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>min</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>max</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>onDateChanged</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>alwaysShowCalendar</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>nativeInput</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>icon</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>disabled</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>returnString</td>
                    <td>TODO</td>
                  </tr>
                </tbody>
              </table>

              <h3>Example: Calendar icon and default date</h3>

              <CalendarInput icon={CalendarInput.Icomoon.calendar2} date="01/04/01" />

              <pre>
                {`<CalendarInput icon={CalendarInput.Icomoon.calendar2} date="01/04/01" />`}
              </pre>


              <hr />

              <h2 id="textInput">TextInput</h2>

              <p><b>When to use: </b> TODO</p>

              <pre className="callout minor">
                {`<TextInput />`}
              </pre>

              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>multiLine</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>readOnly</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>rightOverlayText</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>leftOverlayText</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>type </td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>leftIcon</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>rightIcon</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>placeholder</td>
                    <td>TODO</td>
                  </tr>
                </tbody>
              </table>

              <h3>Example: Simple text input with placeholder</h3>

              <TextInput placeholder="Enter your response here" />

              <pre>
                {`<TextInput placeholder="Enter your response here" />`}
              </pre>

              <hr />

              <h3>Example: text input with left icon and right suffix text</h3>

              <TextInput defaultValue="100.00" leftIcon={TextInput.Icomoon.coinPound} rightOverlayText="GBP" placeholder="Enter value" />

              <hr />

              <h2 id="selectInput">SelectInput</h2>

              <p><b>When to use: </b> TODO</p>

              <pre className="callout minor">
                {`<SelectInput />`}
              </pre>

              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>options</td>
                    <td>TODO</td>
                  </tr>
                  <tr>
                    <td>placeholder</td>
                    <td>TODO</td>
                  </tr>
                </tbody>
              </table>

              <h3>Example: Simple select box</h3>

              <SelectInput options={[{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]} />

              <pre>
                {`<SelectInput options={[{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]} />`}
              </pre>



              <hr />

              <h2 id="TimeInput">TimeInput</h2>

              <p><b>When to use: </b> TODO</p>

              <pre className="callout minor">
                {`<TimeInput />`}
              </pre>

              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>time (string) </td>
                    <td>in HH: dd format</td>
                  </tr>
                </tbody>
              </table>

              <h3>Example: Simple time selector</h3>

              <TimeInput time="08:30" />

              <pre className="m-top-medium">
                {`<TimeInput time="08:30" />`}
              </pre>


              <hr />

              <h2 id="radioInput">RadioInput</h2>

              <p><b>When to use: </b> TODO</p>

              <pre className="callout minor">
                {`<RadioInput />`}
              </pre>

              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>labelContent</td>
                    <td>TODO</td>
                  </tr>
                </tbody>
              </table>

              <h3>Example: Simple radioInput</h3>

              <RadioInput labelContent="Select this item" />

              <pre className="m-top-small">
                {`<RadioInput labelContent="Select this item" />`}
              </pre>


              <hr />

              <h2 id="checkboxInput">CheckboxInput</h2>

              <p><b>When to use: </b> TODO</p>

              <pre className="callout minor">
                {`<CheckboxInput />`}
              </pre>

              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>label</td>
                    <td>TODO</td>
                  </tr>
                </tbody>
              </table>

              <h3>Example: Simple checkbox</h3>

              <CheckboxInput label="Select this item" />

              <pre className="m-top-small">
                {`<CheckboxInput label="Select this item" />`}
              </pre>

            </article>

          </Col>

          <Col className="secondary-nav" width={200}>
            <ul>
              <li><a href="#quickSummary">Quick Summary</a></li>
              <li><a href="#AutoCompleteInput">AutoCompleteInput</a></li>
              <li><a href="#CalendarInput">CalendarInput</a></li>
              <li><a href="#textInput">TextInput</a></li>
              <li><a href="#selectInput">SelectInput</a></li>
              <li><a href="#TimeInput">TimeInput</a></li>
              <li><a href="#radioInput">RadioInput</a></li>
              <li><a href="#checkboxInput">CheckboxInput</a></li>
            </ul>
          </Col>


        </Row>
      </Grid >


    );
  }
}
