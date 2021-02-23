import React from 'react';
import Deck from "./swipe/Deck";
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry, Layout, Text} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function App() {

  return (
      <ApplicationProvider {...eva} theme={eva.light}>
          <IconRegistry icons={EvaIconsPack} />
          <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

              <Deck />

          </Layout>
      </ApplicationProvider>
  );
}
