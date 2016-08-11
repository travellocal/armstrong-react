// IMPORTS
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Grid, Row, Col, SingleColumnRow, Button } from 'armstrong-react';

export class Buttons extends React.Component<{}, {}> {

  navigateTo(path: string) {
    (this.props as any).history.push(path);
  }

  public render() {
    return (

      <Grid>
        <Row>
          <Col>
            <article>
            <h1>Components: Buttons</h1>

            <div className="alert bg-negative">Warning: {`<Button />`} does not come with any background colour by design.You must specify a valid colour variable className e.g.{`<Button classname="bg-positive"/>`}</div>

            <pre className="callout major">
              {`import { Button } from 'armstrong-react';`}
            </pre>

            <pre className="callout minor">
              {`<Button className='(string)' onClick='(e?: SyntheticEvent)=> void' leftIcon='(string)' rightIcon='(string)' text='(string)' />`}
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
                  <td>leftIcon (string) </td>
                  <td>An icon to the left of the text</td>
                </tr>
                <tr>
                  <td>rightIcon (string) </td>
                  <td>An icon to the right of the text</td>
                </tr>
                <tr>
                  <td>text (string) </td>
                  <td>The text in the button</td>
                </tr>
                <tr>
                  <td>onClick ((e: SyntheticEvent) => void) </td>
                  <td>An event handler for clicking</td>
                </tr>
                <tr>
                  <td>disabled (boolean) </td>
                  <td>Disallows user interaction</td>
                </tr>
              </tbody>
            </table>


            <hr />

            <h1>Examples</h1>

            <h2>Simple buttons</h2>
            <Button className="bg-info" text="A normal button" />
            <Button disabled={true} className="bg-info" text="A disabled button" />

            <pre>
              {`<Button className="bg-info" text="A normal button" />
<Button disabled={true} className="bg-info" text="A disabled button" />`}
            </pre>

            <hr />

            <h2>Buttons with icons</h2>
            <Button className="bg-positive" leftIcon={Button.Icomoon.floppyDisk} text="Save" />
            <Button className="bg-negative" rightIcon={Button.Icomoon.bin2} text="Delete" />

            <pre>
              {`<Button className="bg-positive" leftIcon={Button.Icomoon.floppyDisk} text="Save" />
<Button className="bg-negative" rightIcon={Button.Icomoon.bin2} text="Delete" />`}
            </pre>
</article>
          </Col>
        </Row>
      </Grid >


    );
  }
}
