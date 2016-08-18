import * as React from "react";

import { expect, sinon } from "rokot-test";
import { mount, shallow } from 'enzyme';
import { Button } from "../../../components/interaction/button";

describe("<Button />", () => {
  it("should call onClicked when clicked", () => {
    const clickHandler = sinon.stub();
    const wrapper = shallow(<Button onClick={clickHandler} />);

    wrapper.find("button").simulate("click");

    expect(clickHandler.called).to.be.true;
  });

  describe("when props include leftIcon", () => {
    it("should apply icon-button-left class to button", () => {
      const wrapper = shallow(<Button leftIcon={Button.Icomoon.ampersand} />);

      expect(wrapper.find("button").hasClass("icon-button-left")).to.be.true;
    });

    it("should get contain an icon class", () => {
      const wrapper = shallow(<Button leftIcon={Button.Icomoon.ampersand} />);

      expect(wrapper.find("Icon")).to.have.length(1);
    });
  });

  describe("when props include rightIcon", () => {
    it("should apply icon-button-right class to button", () => {
      const wrapper = shallow(<Button rightIcon={Button.Icomoon.bullhorn} />);

      expect(wrapper.find("button").hasClass("icon-button-right")).to.be.true;
    });

    it("should get contain an icon class", () => {
      const wrapper = shallow(<Button rightIcon={Button.Icomoon.bullhorn} />);

      expect(wrapper.find("Icon")).to.have.length(1);
    });
  });

  describe("when props include rounded", () => {
    it("should apply rounded class to button", () => {
      const wrapper = shallow(<Button rounded />);

      expect(wrapper.find("button").hasClass("rounded")).to.be.true;
    });
  });

  describe("when children given", () => {
    it("should render as children of button", () => {
      const children = <div><span>OK</span></div>
      const wrapper = shallow(<Button>{children}</Button>);

      expect(wrapper.find("button").children().matchesElement(children)).to.be.true;
    });
  });
});
