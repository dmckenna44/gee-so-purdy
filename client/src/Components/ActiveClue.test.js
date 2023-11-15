import React from "react";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import ActiveClue from "./ActiveClue";


const view = render(<ActiveClue />);

test('ActiveClue has a question', () => {

  expect(view.getByText('Host/Create')).toBeInTheDocument();
})