import * as React from "react";
import { shallow } from 'enzyme';
import { Button } from './../components/interaction/button';

it('Button contains a single child when set', () => {
  const button = shallow(
    <Button>waddup</Button>
  );
  expect(button.children().length).toEqual(1);
});

it('Button fires an event when clicked', () => {
  let output;
  const button = shallow(
    <Button onClick={()=> output = "hello world"}>waddup</Button>
  );

  button.find('button').simulate('click');
  expect(output).toEqual("hello world")
});

it('Button contains a single child when set', () => {
  const button = shallow(
    <Button leftIcon={Button.Icomoon.rocket}>waddup</Button>
  );
  expect(button.children()[0]).toEqual(1);
});