import React from 'react'
import {renderIntoDocument, cleanup, fireEvent} from 'react-testing-library'

// don't forget to clean up the document.body
afterEach(cleanup)

it('clicks submit button', () => {
  const spy = jest.fn()
  const {getByText} = renderIntoDocument(<button onClick={spy}>Submit</button>)

  fireEvent(
    getByText('Submit'),
    new MouseEvent('click', {
      bubbles: true, // click events must bubble for React to see it
      cancelable: true,
    }),
  )

  expect(spy).toHaveBeenCalledTimes(1)
})