import * as React from 'react'
import { Box, Flex, Text, Heading } from 'rebass'
import styled from 'styled-components'
import { up, down, between, only } from 'styled-breakpoints'
import Carousel from '../../components/Carousel'
import Fade from 'react-reveal/Fade'

import data from './data/slides.json'

interface IntroProps {
  children?: any
}

const Intro: React.SFC<IntroProps> = ({ children }) => (
  <Container>
    <Grid>
      <FlexCol width={[ 1, 1, 1/2 ]} bg='superNova' p={[ 3, 3, 4 ]}>
        <Carousel data={data} />
      </FlexCol>
      <FlexCol width={[ 1, 1, 1/2 ]} justifyContent='flex-end' alignItems='flex-end'>
        <Flashcard width={1} p={[ 2, 3, 3, 4 ]} justifyContent='center' alignItems='center'>
          <Box width={[ 1, 2/3, 2/3, 2/3 ]} py={[4, 4, 0, 0]}>
            <Text fontSize={[ 6, 7, 8, 8 ]} color='paleMoon' textAlign='center'>
            Now delivering to Marin, &amp; soon to be Sonoma County
            </Text>
          </Box>
        </Flashcard>
        <Box width={1/2} bg='white' css={{ height: '50%' }} p={[ 3, 3, 4 ]}>
          <Text as='p' fontSize={[ 3, 5 ]}>
            Delivery<br /> Schedule?
          </Text>
        </Box>
        <Box width={1/2} bg='superNova'  css={{ height: '50%' }} p={[ 3, 3, 4 ]}>
          <Text as='p' fontSize={[ 3, 5 ]}>
            (?)
          </Text>
        </Box>
      </FlexCol>
    </Grid>
  </Container>
)

Intro.defaultProps = {}

const Grid = styled(Flex)`
  /* box-shadow: 0 0 10rem rgba(0, 0, 0, 0.07); */
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
`

const FlexCol = styled(Flex)`
  flex-wrap: wrap;
  overflow: hidden;
`

const Container = styled(Flex)`
  flex-wrap: wrap;

  ${between('0', '1')} {
  }
  ${between('1', '2')} {
  }
  ${up('2')} {
  }
`

const Flashcard = styled(Flex)`
  background: ${p => p.theme.colors.purpleRain};
  background-size: cover;
  height: initial;
  
  ${between('0', '1')} {
  }
  ${between('1', '2')} {
  }
  ${up('1')} {
    height: 50%;
  }
`

export default Intro
