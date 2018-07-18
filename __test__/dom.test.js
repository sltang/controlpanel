import React from 'react'
import {render, getByText, getByLabelText} from 'react-testing-library'



// WILL find the div:

it('should find element', () => {
    const {container} = render(<div>Hello World</div>)
    // Matching a string:

    getByText(container, 'Hello World') // full string match
    getByText(container, 'llo Worl', {exact: false}) // substring match
    getByText(container, 'hello world', {exact: false}) // ignore case

    // Matching a regex:
    getByText(container, /World/) // substring match
    getByText(container, /world/i) // substring match, ignore case
    getByText(container, /^hello world$/i) // full string match, ignore case
    getByText(container, /Hello W?oRlD/i) // advanced regex

    // Matching with a custom function:
    getByText(container, (content, element) => content.startsWith('Hello'))
})

// WILL NOT find the div:
// it('should not find element', () => {
//     getByText(container, 'Goodbye World') // full string does not match
//     getByText(container, /hello world/) // case-sensitive regex with different case
//     // function looking for a span when it's actually a div:
//     getByText(container, (content, element) => {
//         return element.tagName.toLowerCase() === 'span' && content.startsWith('Hello')
//     })
// })

it('should find label element', () => {
    const spy = jest.fn()
    const { getByLabelText } = render(
        <div>
    <label htmlFor="username-input">Username</label> 
    <input id="username-input" defaultValue='chucknorris' onChange={spy}/></div>)
    //getByLabelText(container, 'Username')
    const inputNode = getByLabelText('Username')
    expect(inputNode.value).toBe('chucknorris', 'correct default value for username input')
})