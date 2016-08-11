// IMPORTS
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, Row, Col, SingleColumnRow } from 'armstrong-react';

export class Installation extends React.Component<{}, {}> {

  navigateTo(path: string) {
    (this.props as any).history.push(path);
  }

  public render() {
    return (

      <Grid>
        <Row>
          <Col>
            <article>
            <h1>Get Started: Installation</h1>

            <div className="alert bg-negative">WARNING!: This library assumes you're using React and SASS.</div>
            
            <p>The Rokot platform components heavily rely on usage of the typings utility for typescript definitions management.If you don{`'`}t have typings installed: </p>

            <pre>npm i typings -g</pre>

            <h2 id="gettingStarted">Getting started</h2>

            <h3>Installation</h3>

            <p>Install via <code>npm</code></p>

            <pre>npm i armstrong-react --save</pre>

            <h3>Typings</h3>

            <p>You will need to install these ambient dependencies:</p>

            <pre>typings install react underscore classnames node -SA</pre>

            <div className="alert bg-info">NOTE: you may already have some of these ambient dependencies installed!</div>
            
            <h2 id="importingTheSCSS">Importing the SCSS</h2>

            <p>To make use of the default styles, you'll need to import a single SCSS entry point from the module into your root stylesheet. The simplest way of achieving this is to use webpack's sass-loader plugin and add the following line to your root SCSS file:</p>

            <pre>@import "~armstrong-react/dist/style";</pre>
            
            <div className="alert bg-info">NOTE: If you're not using webpack, you can use an absolute or relative path through your node_modules folder.</div>
            
            <h2 id="example">Example: Adding a simple Armstrong Button (TypeScript/JSX)</h2>

            <pre>
                {`import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Button } from "armstrong-react";

export class MyComponent extends React.Component<{}, {}> {

  private buttonClicked(e) {
    console.log('Clicked!')
  }

  public render() {
    return (
      <main>
        <h1>Below is a button!</h1>
        <Button className="bg-positive" text="Armstrong lives!" onClick={ this.buttonClicked } />
      </main>
    );
  }
}`}
              </pre>

              <h2 id="workbenchFolder">Workbench folder</h2>

              <p>Don't worry about this ;)</p>

              <h2 id="consumedLibraries">Consumed Libraries</h2>

              <ul>
              <li><a target="_blank" href="http://underscorejs.org/">Underscore</a></li>
              <li><a target="_blank" href="https://github.com/JedWatson/classnames">Classnames</a></li>
              </ul>
            </article>

          </Col>


<Col className="secondary-nav" fixed={200}>
          <ul>
          <li><a href="#gettingStarted">Getting started</a></li>
          <li><a href="#importingTheSCSS">Importing the SCSS</a></li>
          <li><a href="#example">Example: Adding a simple Armstrong Button</a></li>
          <li><a href="#workbenchFolder">Workbench folder</a></li>
          <li><a href="#consumedLibraries">Consumed Libraries</a></li>
          </ul>
          </Col>


        </Row>
      </Grid>


    );
  }
}
