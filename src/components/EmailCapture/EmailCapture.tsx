import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import * as React from 'react'
import { Box, Text, Heading, Flex } from 'rebass'
import styled from 'styled-components'
import { up, down, between, only } from 'styled-breakpoints'
import { lighten } from 'polished'

import Section from '../Section'

import Fade from 'react-reveal/Fade'
import { isEmail } from 'validator'

interface Props {
  data: any
}

interface State {
  email: any
  submitted: boolean
}

// const required = (value, props) => {
//   if (!value || (props.isCheckable && !props.checked)) {
//     return <span className='form-error is-visible'>Required</span>
//   }
// }

const emailaddress = (value: any) => {
  if (!isEmail(value)) {
    return (
      <Fade>
        <Error pb={2} className='form-error is-visible'>
        <Text fontSize='2' color='#e72c2c'>
          {value} is not a valid email
        </Text>
      </Error>
      </Fade>
    )
  }
}

const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class EmailCapture extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { email: '', submitted: false }
  }
  handleSubmit = e => {
    const email = this.state.email
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'emailcapture', ...this.state })
    }).then(res => {
      this.setState({ submitted: true })
    })

    e.preventDefault()
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  public render() {
    const { email } = this.state
    const {} = this.props
    return (
      <Section bg='lunar' py={[ 120, 120, 200, 200 ]}>
        <Box
          css={{ textAlign: 'center', margin: '0 auto' }}
          width={[1, 9 / 10, 7 / 10, 4 / 10]}
        >
          <Fade>
            <Heading as='h2' fontSize={8} mb={0} color='pulse'>
              Sweet deals &amp; updates?
            </Heading>
            <Text as='p' fontSize={4} color='pulse' mb={4}>
              Feel free to subscribe for unbeatable deals and the occasional
              company updates.
            </Text>
          </Fade>
        </Box>
        <Box
          css={{ textAlign: 'center', margin: '0 auto' }}
          width={[1, 9 / 10, 1 / 2, 4 / 10]}
        >
          {!this.state.submitted && (
            <Fade>
              <EmailForm name='emailcapture' onSubmit={this.handleSubmit}>
                <Flex
                  width={1}
                  flexWrap='wrap'
                  justifyContent='center'
                  alignItems='flex-start'
                >
                  <StyledInput
                    placeholder='Enter your email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    validations={[emailaddress]}
                  />
                  <SubmitButton className='button'>Subscribe</SubmitButton>
                </Flex>
              </EmailForm>
            </Fade>
          )}
          {this.state.submitted && (
            <Fade>
              <Box mt={4} bg='pulse' css={{borderRadius: '6rem'}} p={4}>
                <Text as='p' color='paleMoon'>Thanks for subscribing!</Text>
              </Box>
            </Fade>
          )}
        </Box>
      </Section>
    )
  }
}

const StyledInput = styled(Input)`
  border: 2px solid ${p => p.theme.colors.pulse};
  border-radius: 6rem;
  color: ${p => p.theme.colors.pulse};
  font-size: 1.8rem;
  line-height: 1.8rem;
  margin-bottom: 1rem;
  padding: 1.8rem 3rem 1.5rem;
  width: 100%;

  ${up('0')} {
    width: 100%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  ${up('1')} {
  }
`

const SubmitButton = styled(Button)`
  background-color: ${p => p.theme.colors.pulse};
  border-radius: 6rem;
  color: ${p => p.theme.colors.paleMoon};
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  line-height: 2.7rem;
  padding: 1.8rem 1rem 1.5rem;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  white-space: nowrap;
  transition: background-color 0.2s ease-in;

  ${up('0')} {
    width: 30%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:hover {
    background-color: ${p =>
      p.theme.colors.pulse && lighten(0.1, p.theme.colors.pulse)};
  }
  &:active {
    background-color: ${p =>
      p.theme.colors.pulse && lighten(0.2, p.theme.colors.pulse)};
  }
`

const EmailForm = styled(Form)`
  & > div > div {
    width: 100%;

    ${up('0')} {
      width: 70%;
    }
  }
`

const Error = styled(Box)``

export default EmailCapture
