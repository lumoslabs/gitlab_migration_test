import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getConfig from 'next/config'

import { createSwaggerSpec } from 'next-swagger-doc';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const { serverRuntimeConfig } = getConfig()

const wrapperStyle = {
  overflow: 'scroll',
  height: '100%',
  background: 'white'
}
const ApiDoc = ({ spec }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div style={wrapperStyle}>
    <SwaggerUI spec={spec} />
  </div>
};

export const getStaticProps: GetStaticProps = async ctx => {

  if (!serverRuntimeConfig.apidoc) {
    return {
      notFound: true
    }
  }

  const spec: Record<string, any> = createSwaggerSpec({
    title: 'Api doc',
    version: '0.0.1',
    openApiVersion: '3.0.0',
    apiFolder: './src/pages/api',
  });
  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
