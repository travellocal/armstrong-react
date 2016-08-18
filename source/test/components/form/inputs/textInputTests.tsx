import * as React from "react";

import { expect, sinon } from "rokot-test";
import { mount, shallow } from 'enzyme';
import { TextInput } from "../../../../components/form/inputs/textInput";

describe("<TextInput />", () => {
  describe("when props do not include multiLine", () => {
    it("should contain an 'input'", () => {
      const wrapper = shallow(<TextInput />);

      expect(wrapper.find("input")).to.have.length(1);
    });

    it("should call onChange when typed in to", () => {
      const changeHandler = sinon.stub();
      const wrapper = shallow(<TextInput onChange={changeHandler} />);

      wrapper.find("input").simulate("change", "hello");

      expect(changeHandler.called).to.be.true;
    });

    describe("when props include type", () => {
      it("should apply type to input", () => {
        const wrapper = shallow(<TextInput type="number" />);

        expect(wrapper.find("input").props().type).to.equal("number");
      });
    });

    describe("when props do not include type", () => {
      it("should apply 'text' type to input", () => {
        const wrapper = shallow(<TextInput />);

        expect(wrapper.find("input").props().type).to.equal("text");
      });
    });
  });

  describe("when props include multiLine", () => {
    it("should contain a 'textarea'", () => {
      const wrapper = shallow(<TextInput multiLine />);

      expect(wrapper.find("textarea")).to.have.length(1);
    });

    it("should call onChange when typed in to", () => {
      const changeHandler = sinon.stub();
      const wrapper = shallow(<TextInput multiLine onChange={changeHandler} />);

      wrapper.find("textarea").simulate("change", "hello");

      expect(changeHandler.called).to.be.true;
    });
  });

  describe("when props include leftIcon", () => {
    it("should apply text-input-icon-left class to div", () => {
      const wrapper = shallow(<TextInput leftIcon={TextInput.Icomoon.ampersand} />);

      expect(wrapper.find("div").hasClass("text-input-icon-left")).to.be.true;
    });

    it("should contain an icon element", () => {
      const wrapper = shallow(<TextInput leftIcon={TextInput.Icomoon.ampersand} />);

      expect(wrapper.find("Icon")).to.have.length(1);
    });
  });

  describe("when props include rightIcon", () => {
    it("should apply text-input-icon-right class to div", () => {
      const wrapper = shallow(<TextInput rightIcon={TextInput.Icomoon.bullhorn} />);

      expect(wrapper.find("div").hasClass("text-input-icon-right")).to.be.true;
    });

    it("should contain an icon element", () => {
      const wrapper = shallow(<TextInput rightIcon={TextInput.Icomoon.bullhorn} />);

      expect(wrapper.find("Icon")).to.have.length(1);
    });
  });

  describe("when props include disabled", () => {
    it("should apply text-input-disabled class to div", () => {
      const wrapper = shallow(<TextInput disabled />);

      expect(wrapper.find("div").hasClass("text-input-disabled")).to.be.true;
    });
  });

  describe("when props include leftOverlayText", () => {
    it("should contain a div with same text", () => {
      const wrapper = shallow(<TextInput leftOverlayText="left overlay text" />);

      expect(wrapper.find(".input-overlay-text-left").text()).to.equal("left overlay text");
    });
  });

  describe("when props include rightOverlayText", () => {
    it("should contain a div with same text", () => {
      const wrapper = shallow(<TextInput rightOverlayText="right overlay text" />);

      expect(wrapper.find(".input-overlay-text-right").text()).to.equal("right overlay text");
    });
  });
});
