import React from "react";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import Welcome from "./Welcome";


const view = render(<Welcome />);

test('ActiveClue has a question', () => {
  
  expect(view.getByText('Show Answer')).toBeInTheDocument();
})