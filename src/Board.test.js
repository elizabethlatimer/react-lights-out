import React from "react";
import {render, fireEvent } from '@testing-library/react'
import Board from './Board'

it("renders without crashing", () => {
  render(<Board />);
});

it("matches the initial snapshot", () => {
  const { asFragment } = render(<Board chanceLightStartsOn={1.0}/>);
  expect(asFragment()).toMatchSnapshot();
});

it("matches the snapshot after a single click", () => {
  const { asFragment, queryByTestId } = render(<Board chanceLightStartsOn={1.0}/>);
  fireEvent.click(queryByTestId("0-0"));
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when board is solved", () => {
  const { asFragment } = render(<Board chanceLightStartsOn={-1}/>)
  expect(asFragment()).toMatchSnapshot();

})