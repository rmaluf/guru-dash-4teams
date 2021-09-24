import {IDataSource} from "../shared/common.types";
import {InfluxDB} from "influx";
import {ProviderFunction} from "./provider.types";
import {logger} from "../shared/logger";

import {getAzureMetrics} from "./azure/azure.provider";
import {getBambooMetrics} from "./bamboo/bamboo.provider";
import {getSonarMetrics} from "./sonar/sonar.provider";
import {getStrapiMetrics} from "./strapi/strapi.provider";
import {getJiraMetrics} from "./jira/jira.provider";
import {getJenkinsMetrics} from "./jenkins/jenkins.provider";

const providers: Record<string, ProviderFunction> = {
  azure: getAzureMetrics,
  bamboo: getBambooMetrics,
  sonar: getSonarMetrics,
  strapi: getStrapiMetrics,
  jira: getJiraMetrics,
  jenkins: getJenkinsMetrics,
};

export async function providerFactory(datasource: IDataSource) {
  const provider = providers[datasource.provider]

  if (!provider) {
    throw new Error('Unimplemented provider ' + datasource.provider);
  }

  logger.info('Starting ' + datasource.name);
  const metrics = await provider(datasource.meta);
  logger.info('Finishing ' + datasource.name);

  if (metrics?.length > 0) {
    return new InfluxDB(process.env.INFLUXDB!).writePoints(metrics);
  }
}
