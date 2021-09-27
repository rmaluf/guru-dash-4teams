import { IJenkinsMeasure, IJenkinsMeasureResponse, IJenkinsMetadata } from './jenkins.types';
import { IPoint } from 'influx';
import { logger } from '../../shared/logger';
import axios from 'axios';

export async function getJenkinsMetrics(metadata: IJenkinsMetadata) {
  const result: IPoint[] = [];

    logger.info(`Getting Jenkins measures for: ${metadata.job} from branch ${metadata.branch}`);

      const res = await axios.get<IJenkinsMeasureResponse>(`${metadata.url}/api/cucumber/builds?job=${metadata.job}&branch=${metadata.branch}`, {});
      result.push(...map(metadata.branch, res.data.measure));

  return result;
}

function map(branch: string, measure: IJenkinsMeasure):IPoint[] {
  return measure.history.filter(registry => !!registry.value).map(registry => ({
    measurement: measure.metric,
    tags: {
      branch,
    },
    fields: {
      value: Number(registry.value) || 0,
      branch: branch
    },
    timestamp: new Date(registry.date),
  }));
}