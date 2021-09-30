import { IJenkinsMeasure, IJenkinsMeasureResponse, IJenkinsMetadata } from './jenkins.types';
import { IPoint } from 'influx';
import { logger } from '../../shared/logger';
import axios from 'axios';

export async function getJenkinsMetrics(metadata: IJenkinsMetadata) {
  const result: IPoint[] = [];

    for (const job of metadata.jobs) {
      for (const branch of metadata.branches) {
        logger.info(`Getting Jenkins measures for: ${job} from branch ${branch}`);
        const res = await axios.get<IJenkinsMeasureResponse>(`${metadata.url}/api/cucumber/builds?job=${job}&branch=${branch}`);
        result.push(map(branch, job, res.data));
    }
  }
  return result;

}

function map(branch: string,job: string, data: IJenkinsMeasureResponse):IPoint {
  return {
    measurement: String(data.measurement),
    tags: {
      branch
    },
    fields: {
      value: Number(data.value) || 0,
      project : job
    },
    timestamp: new Date(data.date),
  };
}