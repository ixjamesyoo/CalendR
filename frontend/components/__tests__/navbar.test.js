import React from "react";
import expect from "expect";
import { shallow } from "enzyme";
import Navbar from "../navbar/navbar";

describe('Navbar', () => {
  it('Welcome renders hello world', () => {
    const welcome = shallow(<Navbar />);
    expect(welcome.find('nav').text()).toEqual('Hello world');
  });
});
