// IMPORTS
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, Row, Col, SingleColumnRow, Button } from 'armstrong-react';

export class GridSystem extends React.Component<{}, {}> {

  navigateTo(path: string) {
    (this.props as any).history.push(path);
  }

  public render() {
    return (

      <Grid>
        <Row>
          <Col>
            <article>
            <h1>Components: Grid system</h1>
            
            <p>The grid is at the heart of everything in Armstrong. Layouts, pages and components all make extensive use of the grid. In order to use Armstrong in a production project it's essential that you understand the basic principles of the grid and the three core components; grid, row and col.</p>
            
            <pre className="callout major">
              {`import { Grid, Row, Col, SingleColumnRow } from 'armstrong-react';`}
            </pre>

            <hr />
            
            <h2 id="grid">Grid</h2>

            <p>Grid takes the following props specifically, and will also spread additional HTML props to the top level div.</p>

            <pre className="callout minor">
                {`<Grid className='(string)' fillContainer='(boolean)' debugMode='(boolean)' table='(boolean)'/>`}
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
                    <td>className (string)</td>
                    <td>CSS classnames.Works well with armstrongs bg, fg schemes.</td>
                  </tr>
                  <tr>
                    <td>fillContainer (boolean)</td>
                    <td>Makes the grid fill the height and width of its container.Can be useful for fullscreen UI components such as hero banners or sidebars</td>
                  </tr>
                  <tr>
                    <td>table (boolean)</td>
                    <td>Makes the grid render as a table.The first row is the headers.</td>
                  </tr>
                  <tr>
                    <td>debugMode (boolean)</td>
                    <td>Turns on debug mode, allowing you to see the current screen mode and cell rendering.</td>
                  </tr>
                </tbody>
              </table>

              <hr />
              
              <h2 id="row">Row</h2>

              <p>Row should be used directly inside a grid and takes the following specifically, and will also spread additional HTML props to the top level div.</p>

              <pre className="callout minor">
                {`<Row className='(string)' fixed='(boolean|number)' maxCols='(number)' />`}
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
                    <td>className (string)</td>
                    <td>CSS classnames.Works well with armstrongs bg, fg schemes.</td>
                  </tr>
                  <tr>
                    <td>maxCols (number)</td>
                    <td>After this number of cols is hit, they will wrap automatically.</td>
                  </tr>
                  <tr>
                    <td>fixed (number|boolean)</td>
                    <td>Fixes the rows height. A boolean value will grow to fit the row's content whereas a number will set an absolute height in pixels.</td>
                  </tr>
                </tbody>
              </table>

              <hr />
              
              <h2 id="col">Col</h2>
            
              <p>Col should be used directly inside a row and takes the following props specifically, and will also spread additional HTML props to the top level div.</p>
              
              <pre className="callout minor">
                {`<Col className='(string)' fixed='(boolean|number)' centerContent='(string|object)' spans='(number)'/>`}
              </pre>

              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Options</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>className (string)</td>
                    <td></td>
                    <td>CSS classnames.Works well with armstrongs bg, fg schemes.</td>
                  </tr>
                  <tr>
                    <td>centerContent (string|centerContent)</td>
                    <td>horizontal: "[left/center/right]", vertical: "[top/center/bottom]"</td>
                    <td>Controls content alignment. A string value of <code>{`"both"`}</code> will center horizontally and vertically. An object like <code>{`{{ vertical: 'center', horizontal: 'right' }}`}</code> for example, allows finer grain control.</td>
                  </tr>
                  <tr>
                    <td>fixed (number|boolean)</td>
                    <td></td>
                    <td>Fixes the columns width.A boolean value will grow to fit its content whereas a number will set an absolute width for a column.</td>
                  </tr>
                  <tr>
                    <td>spans (number)</td>
                    <td></td>
                    <td>Controls how many columns are spanned (translates to <code>{`"flex-grow"`}</code>)</td>
                  </tr>
                </tbody>
              </table>

              <div className="alert bg-negative">Warning: If using centerContent on a {`<Col />`} with more than one child element then a wrapper div must be used around those elements. See the examples below for more information.</div>


              <hr />
              
              <h2 id="singleColumnRow">SingleColumnRow</h2>
            
              <p>SingleColumnRow is simply a shorthand component that creates a row with one column. If you later need to add another column within that row you must replace the <code>{`<SingleColumnRow />`}</code> component for the standard combination of <code>{`<Row><Col></Col></Row>`}</code>.</p>
              
              <pre className="callout minor">
                {`<SingleColumnRow className='(string)' fixed='(boolean|number)' centerContent='(string|object)' />`}
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
                    <td>className (string)</td>
                    <td>CSS classnames.Works well with armstrongs bg, fg schemes.</td>
                  </tr>
                  <tr>
                    <td>centerContent (string|centerContent)</td>
                    <td>Controls content alignment on the single column. A string value of <code>{`"both"`}</code> will center horizontally and vertically. An object like <code>{`{{ vertical: 'center', horizontal: 'right' }}`}</code> for example, allows finer grain control.</td>
                  </tr>
                  <tr>
                    <td>fixed (number|boolean)</td>
                    <td>Fixes the columns width.A boolean value will grow to fit its content whereas a number will set an absolute width for a column.</td>
                  </tr>
                </tbody>
              </table>

              <div className="alert bg-negative">Warning: If using centerContent on a {`<Col />`} with more than one child element then a wrapper div must be used around those elements. See the examples below for more information.</div>

            <hr />

            <h1 id="examples">Examples</h1>
            
            <h2>Simple grid</h2>
            
              <Grid className="helper-grid">
                <Row>
                  <Col centerContent="both">Column 1</Col>
                </Row>
              </Grid>
              <pre>
                {`<Grid>
  <Row>
    <Col>Column 1</Col>
  </Row>
</Grid>`}
              </pre>
            

            <hr />
            
            <h2>Multi-row grid</h2>

            
              <Grid className="helper-grid">
                <Row>
                  <Col centerContent="both">Column 1</Col>
                </Row>
                <Row>
                  <Col centerContent="both">Column 1</Col>
                  <Col centerContent="both">Column 2</Col>
                </Row>
                <Row>
                  <Col centerContent="both">Column 1</Col>
                  <Col centerContent="both">Column 2</Col>
                  <Col centerContent="both">Column 3</Col>
                </Row>
                <Row>
                  <Col centerContent="both">Column 1</Col>
                  <Col centerContent="both">Column 2</Col>
                  <Col centerContent="both">Column 3</Col>
                  <Col centerContent="both">Column 4</Col>
                </Row>
                <Row>
                  <Col centerContent="both">Column 1</Col>
                  <Col centerContent="both">Column 2</Col>
                  <Col centerContent="both">Column 3</Col>
                  <Col centerContent="both">Column 4</Col>
                  <Col centerContent="both">Column 5</Col>
                </Row>
              </Grid>

              <pre>
                {`<Grid>
  <Row>
    <Col>Column 1</Col>
  </Row>
  <Row>
    <Col>Column 1</Col>
    <Col>Column 2</Col>
  </Row>
  <Row>
    <Col>Column 1</Col>
    <Col>Column 2</Col>
    <Col>Column 3</Col>
  </Row>
  <Row>
    <Col>Column 1</Col>
    <Col>Column 2</Col>
    <Col>Column 3</Col>
    <Col>Column 4</Col>
  </Row>
  <Row>
    <Col>Column 1</Col>
    <Col>Column 2</Col>
    <Col>Column 3</Col>
    <Col>Column 4</Col>
    <Col>Column 5</Col>
  </Row>
</Grid>`}
              </pre>
            
<hr />
            
 <h2>Mixing fixed and fluid columns</h2>

            
              <Grid className="helper-grid">
                <Row>
                  <Col fixed={true}>Fixed</Col>
                  <Col>Fluid</Col>
                  <Col fixed={100}>Fixed-width 100px</Col>
                  <Col>Fluid</Col>
                </Row>
              </Grid>
              <pre>
                {`<Grid>
  <Row>
    <Col fixed={50}>Fixed 50px</Col>
    <Col>Fluid</Col>
    <Col fixed={100}>Fixed 100px</Col>
    <Col>Fluid</Col>
  </Row>
</Grid>`}
              </pre>

      <hr />      
            
            <h2>Column Alignment</h2>

            
              <Grid className="helper-grid">
                <Row fixed={100}>
                  <Col>No alignment</Col>
                  <Col centerContent="both">Center</Col>
                  <Col centerContent={{ vertical: "top", horizontal: "right" }}>Top right</Col>
                  <Col centerContent={{ vertical: "bottom", horizontal: "left" }}>Bottom left</Col>
                </Row>
              </Grid>
              <pre>
                {`<Grid>
  <Row>
    <Col>No alignment</Col>
    <Col centerContent="both">Center</Col>
    <Col centerContent={{vertical: "top", horizontal: "right"}}>Top right</Col>
    <Col centerContent={{vertical: "bottom", horizontal: "left"}}>Bottom left</Col>
  </Row>
</Grid>`}
              </pre>


<hr />      
            
            <h2>Using centerContent with more than one child element</h2>

            <div className="alert bg-negative">Armstrong targets direct descendant divs for it's centerContent property. If you are looking to use centerContent with more than one child element then you must add an empty {`<div>`} wrapper element which will become the sole target of the centering. See below for an example.</div>

            
              <Grid className="helper-grid">
                <Row>
                  <Col centerContent="both">
                  <div>
                  <Button className="bg-info" text="Element one" />
                  <Button className="bg-info" text="Element two" />
                  </div>
                  </Col>
                </Row>
              </Grid>
              <pre>
                {`<Grid>
  <Row>
    <Col centerContent="both">
      <div>
        <Button className="bg-info" text="Element one" />
        <Button className="bg-info" text="Element two" />
      </div>
    </Col>
  </Row>
</Grid>`}
              </pre>


            
<hr />

            <h2>Debug mode</h2>
            
              <Grid debugMode={true} className="helper-grid">
                <Row className="p-bottom-small">
                  <Col centerContent="both">Column 1</Col>
                  <Col centerContent="both">Column 2</Col>
                  <Col centerContent="both">Column 3</Col>
                </Row>
                <Row>
                  <Col centerContent="both">Column 1</Col>
                  <Col centerContent="both">Column 2</Col>
                  <Col centerContent="both">Column 3</Col>
                  <Col centerContent="both">Column 4</Col>
                </Row>
              </Grid>

              <pre>
                {`<Grid debugMode={true}>
  <Row>
    <Col>Column 1</Col>
    <Col>Column 2</Col>
    <Col>Column 3</Col>
  </Row>
  <Row>
    <Col>Column 1</Col>
    <Col>Column 2</Col>
    <Col>Column 3</Col>
    <Col>Column 4</Col>
  </Row>
</Grid>`}
              </pre>
            
         <hr />
         
            <h2>Fixed sidebar with a nested grid using <code>{`fillContainer=true`}</code></h2>

            
              <Grid debugMode={true} className="helper-grid">
                <Row fixed={500}>
                  <Col fixed={100}>
                  <Grid fillContainer={true}>
                   <Row>
                     <Col>Sidebar row 1</Col>
                   </Row>
                   <Row>
                     <Col>Sidebar row 2</Col>
                   </Row>
                  </Grid>
                  </Col>
                  <Col centerContent={true}>Main content</Col>
                </Row>
              </Grid>
              <pre>
                {`<Grid debugMode={true}>
  <Row fixed={500}
    <Col fixed={100}>
      <Grid fillContainer={true}>
        <Row>
          <Col>Sidebar row 1</Col>
        </Row>
        <Row>
          <Col>Sidebar row 2</Col>
        </Row>
      </Grid>
    </Col>
    <Col centerContent={true}>Main content</Col>
  </Row>
</Grid>`}
              </pre>

              <hr />
         
            <h2>Mixing a <code>{`<SingleColumnRow>`}</code> with a conventional grid setup.</h2>

            
              <Grid className="helper-grid">
                <SingleColumnRow>
                Single column row
                </SingleColumnRow>
                <Row>
                  <Col>Conventional column 1</Col>
                   </Row>
                   <Row>
                     <Col>Conventional column 2</Col>
                   </Row>
              </Grid>

              <pre>
                {`<Grid>
    <SingleColumnRow>Single column row</SingleColumnRow>
    <Row>
      <Col>Conventional column 1</Col>
    </Row>
    <Row>
      <Col>Conventional column 2</Col>
    </Row>
  </Grid>`}
              </pre>
            </article>
          </Col>


<Col className="secondary-nav" fixed={200}>
          
          <ul>
          <li><a href="#grid">Grid</a></li>
          <li><a href="#row">Row</a></li>
          <li><a href="#col">Col</a></li>
          <li><a href="#singleColumnRow">SingleColumnRow</a></li>
          <li><a href="#examples">Examples</a></li>
          </ul>
          
          </Col>

        </Row>
      </Grid>


    );
  }
}
