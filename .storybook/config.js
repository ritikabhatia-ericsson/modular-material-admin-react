import 'storybook-chromatic'
import 'typeface-roboto'

import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { themes } from '@storybook/theming';
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter } from 'react-router-dom' //


import docsTheme from './theme'
import appTheme from '../src/_theme'

// import { GlobalStyle } from '../src/components/shared/global';

addParameters({
  options: {
    showRoots: true,
    theme: docsTheme,
    storySort: (a, b) => {
      const aNestingLevel = a[1].parameters.fileName.split('/').length
      const bNestingLevel = b[1].parameters.fileName.split('/').length

      return `${aNestingLevel}${a[1].id}`.localeCompare(`${bNestingLevel}${b[1].id}`)
    }
  },
});

addDecorator(withA11y);
addDecorator(story => (
  <div className="App">
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        {story()}
      </BrowserRouter>
    </ThemeProvider>
  </div>
));

// automatically import all files ending in *.stories.js
configure(
  [
    require.context('../src', true, /\.stories\.mdx$/),
    require.context('../src', true, /\.stories\.js$/),
  ],
  module
);

// loadFontsForStorybook();